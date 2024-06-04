"use client";

import React, { useEffect, useState, useCallback } from "react";
import { LayoutGrid, List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import useSWR, { mutate } from "swr";
import { useDropzone } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DirectoryDetails } from "@/types/ModelTypes";
import { fetcher } from "@/config/fetcher";
import useAuth from "@/hooks/selectors/useAuth";
import { CreateDocument } from "@/services/Document/DocumentManagment";
import NewButton from "@/components/file-explorer/sidebar/NewButton";
import ModalAddFolder from "@/components/file-explorer/sidebar/ModalAddFolder";
import PageLoader from "@/components/PageLoader/PageLoader";
import UploadContainer from "@/components/file-explorer/UploadContainer";
import BreadCrumb from "@/components/file-explorer/breadCrumb/BreadCrumb";
import FilesContainer from "@/components/file-explorer/files/FilesContainer";
import { loadDirectoryData } from "@/utils/loadData";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/file-explorer/sidebar/Sidebar";
import { UUID } from "crypto";

export default function FileExplorer() {

    const router = useRouter();
	const dispatch = useDispatch();
	const { auth } = useAuth();
	const searchParams = useSearchParams();

	// Variables de estado
	const [viewMode, setViewMode] = useState<"list" | "grid">("list");
	const [selectedElement, setSelectedElement] =
		useState<string>("Mis Archivos");
	const [directory, setDirectory] = useState<DirectoryDetails | null>(null);
	const [sidebardirectory, setSidebarDirectory] =
		useState<DirectoryDetails | null>(null);
	const [shareDirectory, setShareDirectory] =
		useState<DirectoryDetails | null>(null);

	// Obtener IDs de los directorios

	const directoryId = searchParams?.get("id") ?? auth?.rootDirectoryId ?? "";

	const sidebardirectoryId = auth?.rootDirectoryId;

	const shared = searchParams?.get("shared") === "true";

	// Obtener datos
	const { data: directoryUnparsed, isLoading: isLoadingDirectory } =
		useSWR<DirectoryDetails>(
            !shared ? 
			`/directory/get_directory/${directoryId}` : null,
			fetcher,
		);

	let {
		data: sharedDirectoryUnparsed,
		isLoading: isLoadingSharedDirectory,
	} = useSWR<DirectoryDetails>(

		shared ? `/directory/get_directory/${directoryId}` : null,

		fetcher,
	);

    if (!sharedDirectoryUnparsed?.shared) {
       sharedDirectoryUnparsed = undefined 
    }

	const { data: sharedInfo, isLoading: isLoadingShared } =
		useSWR<DirectoryDetails>(`/directory/get_shared`, fetcher);

	const { data: sidebardirectoryUnparsed, isLoading: isLoadingSidebar } =
		useSWR<DirectoryDetails>(
			`/directory/get_directory/${sidebardirectoryId}`,
			fetcher,
		);

	// Manejar la carga de directorios
	useEffect(() => {

		if (selectedElement === "Compartidos" && sharedInfo && shared) {
			if (shared && (sharedDirectoryUnparsed !== undefined) && (sharedDirectoryUnparsed !== directoryUnparsed)) {	
				setShareDirectory(loadDirectoryData(sharedDirectoryUnparsed));
				setSidebarDirectory(loadDirectoryData(sharedInfo));
			} else if (shared) {
				setShareDirectory(loadDirectoryData(sharedInfo));
				setSidebarDirectory(loadDirectoryData(sharedInfo));
			}

		} else {
			if (!shared) {
				if (directoryUnparsed)
					setDirectory(loadDirectoryData(directoryUnparsed));
				if (sidebardirectoryUnparsed)
					setSidebarDirectory(
						loadDirectoryData(sidebardirectoryUnparsed),
					);
			}
		}
	}, [
		directoryUnparsed,
		sidebardirectoryUnparsed,
        sharedDirectoryUnparsed,
		selectedElement,
		sharedInfo,
		shared,
	]);

	// Manejar la carga de archivos
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const allowedTypes = [
				"application/pdf",
				"application/vnd.ms-powerpoint",
				"application/vnd.openxmlformats-officedocument.presentationml.presentation",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			];

			const filteredFiles = acceptedFiles.filter((file) =>
				allowedTypes.includes(file.type),
			);
			if (filteredFiles.length > 0) {
				for (const file of filteredFiles) {
					if (!auth?.uid) return;
					const response = await CreateDocument({
						file,
						directoryId,
						userId: auth?.uid,
						dispatch,
					});
					if (response)
						mutate(`/directory/get_directory/${directoryId}`);
				}
			} else {
				console.log("Error: Tipo de archivo no soportado.");
			}
		},
		[directoryId, auth?.uid, dispatch],
	);

	// Configuración de Dropzone
	const {
		getRootProps,
		getInputProps,
		isDragActive: dropzoneisDragActive,
	} = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

    const handleClick = (name: string) => {
        if (name === "Compartidos") {
            router.push(`/file-explorer?shared=true`);
        }else{
            router.push(`/file-explorer?share=false`);
        }
        setSelectedElement(name);
    }


	// Renderizar estado de carga
	if (isLoadingDirectory && isLoadingSidebar) return <PageLoader />;

	return (
		<div className="max-h-full flex-grow bg-white" style={{height: "calc(100dvh - 64px)"}}>
			<div className="flex h-full w-full pt-4">
				<SidebarSection
					sidebardirectory={sidebardirectory}
					sidebardirectoryId={sidebardirectoryId}
					handleClick={handleClick}
					selectedElement={selectedElement}
					directoryId={directoryId}
				/>
				<MainContent
					viewMode={viewMode}
					setViewMode={setViewMode}
					directory={directory}
					shareDirectory={shareDirectory}
					selectedElement={selectedElement}
					getRootProps={getRootProps}
					getInputProps={getInputProps}
					dropzoneisDragActive={dropzoneisDragActive}
					directoryId={directoryId}
				/>
            </div>
			<ModalAddFolder />
			<UploadContainer />
		</div>
	);
}

// Tipos de propiedades para SidebarSection
interface SidebarSectionProps {
	sidebardirectory: DirectoryDetails | null;
	sidebardirectoryId: UUID | undefined;
	handleClick: (name: string) => void;
	selectedElement: string;
	directoryId: string;
}

// Componente para la sección de la barra lateral
const SidebarSection = ({
	sidebardirectory,
	sidebardirectoryId,
	handleClick,
	selectedElement,
	directoryId,
}: SidebarSectionProps) => (
	<div className="hidden h-full flex-col place-content-between justify-start px-4 text-[#5C5868] md:flex md:w-2/6 lg:w-3/12 xl:w-2/12">
		<div className="relative flex h-14 w-full items-center justify-center">
			<NewButton directoryId={directoryId} />
		</div>
		<Sidebar
			sidebardirectory={sidebardirectory}
			sidebardirectoryId={sidebardirectoryId}
			handleClick={handleClick}
			selectedElement={selectedElement}
			isShared={selectedElement === "Compartidos"}
		/>
	</div>
);

// Tipos de propiedades para MainContent
interface MainContentProps {
	viewMode: "list" | "grid";
	setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
	directory: DirectoryDetails | null;
	shareDirectory: DirectoryDetails | null;
	selectedElement: string;
	getRootProps: () => any;
	getInputProps: () => any;
	dropzoneisDragActive: boolean;
	directoryId: string;
}

// Componente para el contenido principal
const MainContent = ({
	viewMode,
	setViewMode,
	directory,
	shareDirectory,
	selectedElement,
	getRootProps,
	getInputProps,
	dropzoneisDragActive,
	directoryId,
}: MainContentProps) => (
	<div className="flex h-full w-full flex-col px-4 md:w-4/6 md:px-6 lg:w-9/12 xl:w-10/12">
		<DndProvider backend={HTML5Backend}>
            <div className="flex h-14 items-center justify-between">
                <BreadCrumb
                    items={
                        selectedElement === "Compartidos"
                            ? shareDirectory?.path
                            : directory?.path
                    }
                />
                <div className="flex gap-3">
                    <ViewModeButton
                        mode="list"
                        currentMode={viewMode}
                        setViewMode={setViewMode}
                    />
                    <ViewModeButton
                        mode="grid"
                        currentMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </div>
            </div>
			<div
				{...getRootProps()}
				className={cn("my-4 h-full overflow-y-auto rounded-lg bg-gray-100 p-4 text-[#5C5868] border-2 border-transparent transition", 
                  dropzoneisDragActive && "border-blueFrida-700"
                )}
			>
				<input {...getInputProps()} />
				<FilesContainer
					viewMode={viewMode}
					directory={
						selectedElement === "Compartidos"
							? shareDirectory
							: directory
					}
					parentDirectoryId={directoryId}
					isShared={selectedElement === "Compartidos"}
				/>
			</div>
		</DndProvider>
	</div>
);

// Tipos de propiedades para ViewModeButton
interface ViewModeButtonProps {
	mode: "list" | "grid";
	currentMode: "list" | "grid";
	setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}

// Componente para los botones de modo de vista
const ViewModeButton = ({
	mode,
	currentMode,
	setViewMode,
}: ViewModeButtonProps) => (
	<button onClick={() => setViewMode(mode)}>
		{mode === "list" ? (
			<List
				size="40px"
				className="transition"
				color={currentMode === mode ? "mediumpurple" : "lightgray"}
			/>
		) : (
			<LayoutGrid
				size="40px"
				className="transition"
				strokeWidth={0}
				fill={currentMode === mode ? "mediumpurple" : "lightgray"}
			/>
		)}
	</button>
);

"use client";

import SidebarFolder from "@/components/file-explorer/sidebar/SidebarFolder";
import SidebarFile from "@/components/file-explorer/sidebar/SidebarFile";

import NewButton from "@/components/file-explorer/sidebar/NewButton";
import { LayoutGrid, List } from "lucide-react";
import { useEffect, useState } from "react";
import ModalAddFolder from "@/components/file-explorer/sidebar/ModalAddFolder";
import { DirectoryDetails } from "@/types/ModelTypes";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import useAuth from "@/hooks/selectors/useAuth";
import { useSearchParams } from "next/navigation";
import { Accordion } from "@/components/ui/accordion";
import PageLoader from "@/components/PageLoader/PageLoader";
import UploadContainer from "@/components/file-explorer/UploadContainer";
import BreadCrumb from "@/components/file-explorer/breadCrumb/BreadCrumb";
import FilesContainer from "@/components/file-explorer/files/FilesContainer";
import { loadDirectoryData } from "@/utils/loadData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function FileExplorer() {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const { auth } = useAuth();
    const searchParams = useSearchParams();
    const directoryId = searchParams?.get("id") ?? auth?.rootDirectoryId ?? "";
    const sidebardirectoryId = auth?.rootDirectoryId;
    const { data: directoryUnparsed, isLoading: isLoadingDirectory } =
        useSWR<DirectoryDetails>(
            `/directory/get_directory/${directoryId}`,
            fetcher,
        );
    const { data: sidebardirectoryUnparsed, isLoading: isLoadingSidebar } =
        useSWR<DirectoryDetails>(
            `/directory/get_directory/${sidebardirectoryId}`,
            fetcher,
        );
    
    const [directory, setDirectory] = useState<DirectoryDetails | null>(null);
    const [sidebardirectory, setSidebarDirectory] = useState<DirectoryDetails | null>(null);

    useEffect(() => {
        if (directoryUnparsed) setDirectory(loadDirectoryData(directoryUnparsed));
        if (sidebardirectoryUnparsed) setSidebarDirectory(loadDirectoryData(sidebardirectoryUnparsed));

    }, [directoryUnparsed, sidebardirectoryUnparsed]);

    if (isLoadingDirectory && isLoadingSidebar) return <PageLoader />;

    return (
        <div className="max-h-full flex-grow bg-white">
            <div className="flex h-full w-full pt-4">
                <div className="hidden h-full flex-col place-content-between justify-start gap-3 px-4 pb-16 text-[#5C5868] md:flex md:w-2/6 lg:w-3/12 xl:w-2/12">
                    <div className="relative flex h-20 w-full items-center justify-center ">
                        <NewButton directoryId={directoryId} />
                    </div>
                    <div className="my-3 h-screen w-full flex-wrap overflow-hidden overflow-y-auto scroll-smooth whitespace-nowrap rounded-lg  bg-[#F3F4F6] p-2">
                        <Accordion type="multiple">
                            {sidebardirectory &&
                                sidebardirectory.items.length > 0 &&
                                sidebardirectory.items.map((file, i) => {
                                    {
                                        if (file.type === "DIRECTORY")
                                            return (
                                                <SidebarFolder
                                                    key={file.id}
                                                    name={file.name}
                                                    id={file.id}
                                                    type={file.type}
                                                    ownerName={file.ownerName}
                                                    directoryId={
                                                        sidebardirectoryId
                                                    }
                                                />
                                            );
                                        else if (file.type === "DOCUMENT")
                                            return (
                                                <SidebarFile
                                                    key={file.id}
                                                    name={file.name}
                                                    type={file.type}
                                                    extension={file.extension}
                                                    id={file.id}
                                                    ownerName={file.ownerName}
                                                    directoryId={
                                                        sidebardirectoryId
                                                    }
                                                />
                                            );
                                    }
                                })}
                        </Accordion>
                    </div>
                </div>
                <div className="flex h-full w-full flex-col px-4 pb-16 md:w-4/6 md:px-6 lg:w-9/12 xl:w-10/12">
                    {/* CONTENEDOR DE DOCUMENTOS */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl">{directory?.name}</h1>
                        <div className="flex gap-3">
                            <button onClick={() => setViewMode("list")}>
                                <List
                                    size="40px"
                                    className="transition"
                                    color={
                                        viewMode === "list"
                                            ? "mediumpurple"
                                            : "lightgray"
                                    }
                                />
                            </button>
                            <button onClick={() => setViewMode("grid")}>
                                <LayoutGrid
                                    size="40px"
                                    className="transition"
                                    strokeWidth={0}
                                    fill={
                                        viewMode === "grid"
                                            ? "mediumpurple"
                                            : "lightgray"
                                    }
                                />
                            </button>
                        </div>
                    </div>
                    <DndProvider backend={HTML5Backend}>
                        <div className="text-xl text-[#5C5868]">
                            <BreadCrumb items={directory?.path} />
                        </div>
                        <div className="my-4 h-screen overflow-y-auto rounded-lg bg-gray-100 p-4 text-[#5C5868]">
                            <FilesContainer viewMode={viewMode} directory={directory} parentDirectoryId={directoryId}/>
                        </div>
                    </DndProvider>
                </div>
            </div>
            <ModalAddFolder />
            <UploadContainer />
        </div>
    );
}

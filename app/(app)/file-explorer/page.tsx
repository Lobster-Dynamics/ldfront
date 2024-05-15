"use client";

import File from "@/components/file-explorer/File";
import Folder from "@/components/file-explorer/Folder";
import SidebarFolder from "@/components/file-explorer/SidebarFolder";
import SidebarFile from "@/components/file-explorer/SidebarFile";

import NewButton from "@/components/file-explorer/NewButton";
import { Calendar, LayoutGrid, List } from "lucide-react";
import { useEffect, useState } from "react";
import ModalAddFolder from "@/components/file-explorer/ModalAddFolder";
import { DirectoryDetails } from "@/types/ModelTypes";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import useAuth from "@/hooks/selectors/useAuth";
import { loadDirectoryData } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
	Accordion,
} from "@/components/ui/accordion"
import PageLoader from "@/components/PageLoader/PageLoader";

export default function FileExplorer() {
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
    const { auth } = useAuth()
    const searchParams = useSearchParams();
    const directoryId = searchParams?.get("id") ?? auth?.rootDirectoryId ?? "";
    const sidebardirectoryId = auth?.rootDirectoryId;
    const { data: directoryUnparsed, isLoading: isLoadingDirectory } = useSWR<DirectoryDetails>(`/directory/get_directory/${directoryId}`, fetcher)
    const { data: sidebardirectoryUnparsed, isLoading: isLoadingSidebar } = useSWR<DirectoryDetails>(`/directory/get_directory/${sidebardirectoryId}`, fetcher)
    const [directory, setDirectory] = useState<DirectoryDetails | null>(null)
    const [sidebardirectory, setSidebarDirectory] = useState<DirectoryDetails | null>(null)


    useEffect(() => {
        if (directoryUnparsed) {
            setDirectory(loadDirectoryData(directoryUnparsed))
        }

        if (sidebardirectoryUnparsed) {
            setSidebarDirectory(loadDirectoryData(sidebardirectoryUnparsed))
        }
    }, [directoryUnparsed, sidebardirectoryUnparsed])

    if (isLoadingDirectory || isLoadingSidebar) return <PageLoader />

    return (
        <div className="max-h-full flex-grow bg-white">
            <div className="flex h-full w-full pt-4">
                <div className="hidden h-full flex-col place-content-between justify-start gap-3 px-4 pb-16 text-[#5C5868] md:flex md:w-2/6 lg:w-3/12 xl:w-2/12">
                    <div className="relative w-full h-20 flex justify-center items-center ">
                        <NewButton directoryId={directoryId}/>
                    </div>
                    <div className="my-3 w-full h-screen flex-wrap rounded-lg overflow-hidden overflow-y-auto scroll-smooth whitespace-nowrap  bg-[#F3F4F6] p-2">
                        <Accordion type="multiple" >
                            {sidebardirectory && sidebardirectory.items.length > 0 && (
                                sidebardirectory.items.map((file, i) => {
                                    {
                                        if (file.type === "DIRECTORY")
                                            return (
                                                <SidebarFolder
                                                    key={file.id}
                                                    name={file.name}
                                                    id={file.id}
                                                    type = {file.type}
                                                    ownerName={file.ownerName}
                                                    directoryId={sidebardirectoryId}
                                                />
                                            );
                                        else if (file.type === "DOCUMENT")
                                            return (
                                                <SidebarFile
                                                    key={file.id}
                                                    name={file.name}
                                                    type = {file.type}
                                                    extension={file.extension}
                                                    id={file.id}
                                                    ownerName={file.ownerName}
                                                    directoryId={sidebardirectoryId}
                                                />
                                            );
                                    }
                                })
                            )}
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
                                    color={viewMode === "list" ? "mediumpurple" : "lightgray"}
                                />
                            </button>
                            <button onClick={() => setViewMode("grid")}>
                                <LayoutGrid
                                    size="40px"
                                    className="transition"
                                    strokeWidth={0}
                                    fill={viewMode === "grid" ? "mediumpurple" : "lightgray"}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="text-xl text-[#5C5868]">
                        {/* TODO: Obtener PATH real */}
                        {directory?.path}
                    </div>
                    <div className="my-4 h-screen overflow-y-auto rounded-lg bg-gray-100 p-4 text-[#5C5868]">
                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns:
                                    viewMode === "grid"
                                        ? "repeat(auto-fit,minmax(12rem, 1fr))"
                                        : "minmax(0, 1fr)",
                                gap: viewMode === "grid" ? "1rem" : "0.5rem",
                            }}
                        >
                            {viewMode === "list" && (
                                <div className="flex justify-between">
                                    <p className="w-2/4">Nombre</p>
                                    <p className="w-1/4">Propietario</p>
                                    <div className="flex w-1/4 items-center justify-end gap-2">
                                        <Calendar size="20px" />
                                        <p>Fecha de subida</p>
                                    </div>
                                </div>
                            )}
                            {directory && directory.items.length > 0 && (
                                directory.items.map((file, i) => {
                                    {
                                        if (file.type === "DIRECTORY")
                                            return (
                                                <Folder
                                                    key={i}
                                                    name={file.name}
                                                    id={file.id}
                                                    viewMode={viewMode}
                                                    ownerName={file.ownerName}
                                                    uploadDate={new Date()} // TODO: Cambiar por fecha real
                                                    directoryId={directoryId}
                                                />
                                                
                                            );
                                        else if (file.type === "DOCUMENT")
                                            return (
                                                <File
                                                    key={i}
                                                    name={file.name}
                                                    extension={file.extension}
                                                    id={file.id}
                                                    viewMode={viewMode}
                                                    ownerName={file.ownerName}
                                                    uploadDate={new Date()} // TODO: Cambiar por fecha real
                                                    directoryId={directoryId}
                                                />
                                            );
                                    }
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalAddFolder />
        </div>
    );
}

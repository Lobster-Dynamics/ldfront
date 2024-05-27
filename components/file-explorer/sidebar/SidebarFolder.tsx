import { UUID } from "crypto";
import { DirectoryDetails } from "@/types/ModelTypes";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { useEffect, useRef, useState } from "react";
import SidebarFile from "@/components/file-explorer/sidebar/SidebarFile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, CurrentAccordionTrigger } from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import { loadDirectoryData } from "@/utils/loadData";
import useAuth from "@/hooks/selectors/useAuth";

interface SidebarFolderProps {
    id: UUID;
    type: "DIRECTORY" | "DOCUMENT";
    name: string;
    directoryId: UUID | undefined;
    ownerName: string;
}

export default function SidebarFolder({
    id,
    type,
    name,
    directoryId,
    ownerName
}: SidebarFolderProps) {
    const { data: directoryUnparsed, isLoading } = useSWR<DirectoryDetails>(`/directory/get_directory/${id}`, fetcher);
    const [directory, setDirectory] = useState<DirectoryDetails | null>(null);
    const fileRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { auth } = useAuth();
	const searchParams = useSearchParams();
	const currdir = searchParams?.get("id") ?? auth?.rootDirectoryId ?? "";

    const openDocument = () => {
        router.push(`/file-explorer?id=${id}`);
    };

    useEffect(() => {
        if (directoryUnparsed) {
            setDirectory(loadDirectoryData(directoryUnparsed));
        }
    }, [directoryUnparsed]);

    return (
        <div ref={fileRef} className="w-full pl-2 my-1 flex items-center">
            <AccordionItem value={`item-${id}`} className="w-full">
                {id === currdir ? (
                    <CurrentAccordionTrigger>
                        <button onClick={openDocument} className="flex-1 min-w-0 px-2">
                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
                                {name}
                            </p>
                        </button>
                    </CurrentAccordionTrigger>
                ) : (
                    <AccordionTrigger>
                        <button onClick={openDocument} className="flex-1 min-w-0 px-2">
                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
                                {name}
                            </p>
                        </button>
                    </AccordionTrigger>
                )}
                <AccordionContent>
                    {directory && directory.items.length > 0 && (
                        directory.items.map((file) => (
                            file.type === "DIRECTORY" ? (
                                <SidebarFolder
                                    key={file.id}
                                    name={file.name}
                                    id={file.id}
                                    type={file.type}
                                    ownerName={file.ownerName}
                                    directoryId={directoryId}
                                />
                            ) : (
                                <SidebarFile
                                    key={file.id}
                                    name={file.name}
                                    type={file.type}
                                    extension={file.extension}
                                    id={file.id}
                                    ownerName={file.ownerName}
                                    directoryId={directoryId}
                                />
                            )
                        ))
                    )}
                </AccordionContent>
            </AccordionItem>
        </div>
    );
}

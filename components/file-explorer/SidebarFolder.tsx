import { UUID } from "crypto";
import { DirectoryDetails } from "@/types/ModelTypes";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { loadDirectoryData } from "@/lib/utils";
import { useEffect, useState } from "react";
import SidebarFile from "@/components/file-explorer/SidebarFile";
import useAuth from "@/hooks/selectors/useAuth";
import { useSearchParams } from "next/navigation";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
  
interface SidebarFolderProps {
	id: UUID;
    type: "DIRECTORY" | "DOCUMENT";
	name: string;
    directoryId: string;
	ownerName: string;
}

export default function SidebarFolder({
	id,
    type,
    name,
    directoryId,
	ownerName
}:SidebarFolderProps) {
    const { data: directoryUnparsed, isLoading } = useSWR<DirectoryDetails>(`/directory/get_directory/${id}`, fetcher);
    const [directory, setDirectory] = useState<DirectoryDetails | null>(null);
    
    useEffect(() => {
        if (directoryUnparsed) {
            setDirectory(loadDirectoryData(directoryUnparsed))
        }
    }, [directoryUnparsed])

	return (
        
		<div className="ml-2 flex">
            <AccordionItem value={`item-${id}`}>
                <AccordionTrigger><p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {name}
                </p></AccordionTrigger>
            <AccordionContent>
                {directory && directory.items.length > 0 && (
                    directory.items.map((file) => {
                        {
                            if (file.type === "DIRECTORY")
                                return (
                                    <SidebarFolder
                                        key ={file.name}
                                        name={file.name}
                                        id={file.id}
                                        type = {file.type}
                                        ownerName={file.ownerName}
                                        directoryId={directoryId}
                                    />                  
                                );
                            else if (file.type === "DOCUMENT")
                                return (
                                    <SidebarFile
                                        key ={file.id}
                                        name={file.name}
                                        type = {file.type}
                                        extension={file.extension}
                                        id={file.id}
                                        ownerName={file.ownerName}
                                        directoryId={directoryId}
                                    />
                                );
                        }
                    })
                )}
            </AccordionContent>
            </AccordionItem>
        </div>
	)
}

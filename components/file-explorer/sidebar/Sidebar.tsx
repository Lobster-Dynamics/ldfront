import React from 'react';
import SidebarElement from "@/components/file-explorer/sidebar/SidebarElement";
import { Accordion } from "@/components/ui/accordion";
import SidebarFolder from "@/components/file-explorer/sidebar/SidebarFolder";
import SidebarFile from "@/components/file-explorer/sidebar/SidebarFile";
import { Home, Users } from "lucide-react";
import { DirectoryDetails } from "@/types/ModelTypes";
import { UUID } from 'crypto';

interface SidebarProps {
    sidebardirectory: DirectoryDetails | null;
    sidebardirectoryId: UUID | undefined;
    handleClick: (name: string) => void;
    selectedElement: string;
    isShared: boolean;
}

export default function Sidebar({ sidebardirectory, sidebardirectoryId, handleClick, selectedElement, isShared }: SidebarProps) {
    return (
        <div className="my-3 h-screen w-full flex-wrap overflow-hidden overflow-y-auto scroll-smooth whitespace-nowrap rounded-lg bg-[#F3F4F6] p-2">
            <SidebarElement Icon={<Home size={20} />} name="Mis Archivos"
                onClick={() => {
                    handleClick("Mis Archivos");
                }}
                selected={selectedElement === 'Mis Archivos'}
            />
            <SidebarElement Icon={<Users size={20} />} name="Compartidos"
                onClick={() => {
                    handleClick("Compartidos");
                }}
                selected={selectedElement === 'Compartidos'}
            />
            <Accordion type="multiple">
                {sidebardirectory && sidebardirectory.items.length > 0 &&
                    sidebardirectory.items.map((file) => {
                        if (file.type === 'DIRECTORY') {
                            return (
                                <SidebarFolder
                                    key={file.id}
                                    name={file.name}
                                    id={file.id}
                                    type={file.type}
                                    ownerName={file.ownerName}
                                    directoryId={sidebardirectoryId}
                                    pl={0}
                                    isShared={isShared}
                                />
                            );
                        } else if (file.type === 'DOCUMENT') {
                            return (
                                <SidebarFile
                                    key={file.id}
                                    name={file.name}
                                    type={file.type}
                                    extension={file.extension}
                                    id={file.id}
                                    ownerName={file.ownerName}
                                    directoryId={sidebardirectoryId}
                                    pl={0}
                                />
                            );
                        }
                        return null;
                    })}
            </Accordion>
        </div>
    );
}


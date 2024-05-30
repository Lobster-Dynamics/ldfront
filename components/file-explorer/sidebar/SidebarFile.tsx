import { File } from "lucide-react";
import { UUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SidebarFileProps {
    extension: ".docx" | ".pdf" | ".pptx" | null;
    id: UUID;
    type: "DIRECTORY" | "DOCUMENT";
    name: string;
    directoryId: UUID | undefined;
    ownerName: string;
    pl: number;
}

export default function SidebarFile({
    extension,
    id,
    type,
    name,
    directoryId,
    ownerName,
    pl
}: SidebarFileProps) {
    const fileRef = useRef<HTMLDivElement>(null);

    const [extensionType, setExtensionType] = useState<"/pdf-jair.png" | "/docx-jair.png" | "/pptx-jair.png">("/pdf-jair.png");
    const openDocument = () => {
        window.open(`/documento?id=${id}`, "_blank");
    };

    useEffect(() => {
        if (extension == ".docx") {
            setExtensionType("/docx-jair.png");
        } else if (extension == ".pdf") {
            setExtensionType("/pdf-jair.png");
        } else if (extension == ".pptx") {
            setExtensionType("/pptx-jair.png");
        }
    }, [extension]);

    return (
        <div ref={fileRef} style={{ paddingLeft: `${pl}rem`}} className="w-full my-1 flex items-center py-1 rounded-lg outline-none transition hover:cursor-pointer hover:bg-purpleFrida-500 hover:bg-opacity-10 focus:bg-purpleFrida-500 focus:bg-opacity-10">
            <Image
                src={extensionType}
                alt="fileicon"
                width={25}
                height={40}
                className="ml-7"
            />
            <button onClick={openDocument} className="min-w-0 pl-1">
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
                    {name}
                </p>
            </button>
        </div>
    );
}

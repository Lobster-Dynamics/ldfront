import { File } from "lucide-react";
import { UUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/selectors/useAuth";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface SidebarFileProps {
    extension: ".docx" | ".pdf" | ".pptx" | null;	
    id: UUID;
    type: "DIRECTORY" | "DOCUMENT";
	name: string;
    directoryId: UUID | undefined;
	ownerName: string;
}

export default function SidebarFile({
    extension,
	id,
    type, 
    name,
    directoryId,
	ownerName
}:SidebarFileProps) {
	const fileRef = useRef<HTMLDivElement>(null);

	const [extensionType, setExtensionType] = useState<"/pdf-jair.png" | "/docx-jair.png" | "/pptx-jair.png" >("/pdf-jair.png");
	const openDocument = () => {
		window.open(`/documento?id=${id}`, "_blank");
	};
	


	

	useEffect(() => {
		if (extension == ".docx"){
			setExtensionType("/docx-jair.png")
		} else if (extension == ".pdf"){
			setExtensionType("/pdf-jair.png")
		} else if (extension == ".pptx"){
			setExtensionType("/pptx-jair.png")
		}
	
	}, [extension]);

	return (
		<div ref={fileRef} className="pl-9 my-1 flex items-center py-1 rounded-lg outline-none transition hover:cursor-pointer hover:bg-purpleFrida-500 hover:bg-opacity-10 focus:bg-purpleFrida-500 focus:bg-opacity-10 px-2">
			<Image
				src={extensionType}
				alt="fileicon"
				width={25}
				height={40}
				className="self-center"
			/>
			<button onClick={openDocument}>
				<p className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
					{name}
				</p>
			</button>
			
		</div>
	)
}

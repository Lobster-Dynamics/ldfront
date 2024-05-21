import { File } from "lucide-react";
import { UUID } from "crypto";
import { useEffect, useRef } from "react";
  
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

	useEffect(() => {
		const openDocument = () => {
			window.open(`/documento?id=${id}`, "_blank");
		};


		if (fileRef.current) {
			fileRef.current.addEventListener("click", openDocument);
		}

		return () => {
			if (fileRef.current) {
				fileRef.current.removeEventListener("click", openDocument);
			}
		};
	}, []);

	return (
		<div ref={fileRef} className="ml-2 flex items-center py-1 rounded-lg outline-none transition hover:cursor-pointer hover:bg-purpleFrida-500 hover:bg-opacity-10 focus:bg-purpleFrida-500 focus:bg-opacity-10 px-2">
		    <File className="flex-shrink-0 h-4 w-4 ml-4"></File>
			<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
				{name}
			</p>
		</div>
	)
}

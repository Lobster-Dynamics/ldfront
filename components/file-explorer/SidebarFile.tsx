import { File } from "lucide-react";
import { UUID } from "crypto";
  
interface SidebarFileProps {
    extension: ".docx" | ".pdf" | ".pptx" | null;	
    id: UUID;
    type: "DIRECTORY" | "DOCUMENT";
	name: string;
    directoryId: string;
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
	return (
		<div className="ml-2 flex items-center py-1 rounded-lg outline-none transition hover:cursor-pointer hover:bg-purpleFrida-500 hover:bg-opacity-10 focus:bg-purpleFrida-500 focus:bg-opacity-10 px-2">
		    <File className="flex-shrink-0 h-4 w-4 ml-4"></File>
			<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
				{name}
			</p>
		</div>
	)
}

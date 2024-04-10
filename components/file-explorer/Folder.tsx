import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

interface FolderProps {
	name: string;
}

export default function Folder({ name }: FolderProps) {
	return (
		<div className="group flex h-fit w-44 flex-col rounded-lg p-2 pt-4 hover:bg-[#7B20C3] hover:bg-opacity-10 transition">
			<Image
				src="/folder.png"
				alt="folder"
				width={100}
				height={100}
				className="self-center"
			/>
			<div className="flex items-end justify-between">
			    <h1 className="overflow-hidden text-ellipsis whitespace-nowrap mt-2">
    				{name}
    			</h1>
                <EllipsisVertical className="text-transparent group-hover:text-black transition" />
			</div>
		</div>
	);
}

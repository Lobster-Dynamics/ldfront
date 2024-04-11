import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FolderProps {
	name: string;
}

export default function Folder({ name }: FolderProps) {
	return (
		<Link className="group flex h-fit w-44 flex-col rounded-lg p-2 pt-4 bg-[#7B20C3] bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10 transition hover:cursor-pointer outline-none" href="/file-explorer">
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
                <EllipsisVertical className="text-transparent group-hover:text-black group-focus:text-black transition" />
			</div>
		</Link>
	);
}

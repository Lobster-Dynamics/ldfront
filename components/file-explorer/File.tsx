import { UUID } from "crypto";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FileProps {
	name: string;
	extension: string | undefined;
	uuid: UUID;
}

export default function File({ name, extension, uuid }: FileProps) {
	return (
		<Link className="group flex h-fit w-44 flex-col rounded-lg p-2 pt-4 bg-[#7B20C3] bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10 transition hover:cursor-pointer outline-none" href="/documento" target="_blank">
			<Image
				src={`/${extension}.png`}
				alt="folder"
				width={77}
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

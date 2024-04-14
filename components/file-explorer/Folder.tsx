import { UUID } from "crypto";
import { CircleUserRound, EllipsisVertical } from "lucide-react";
import Image from "next/image";

interface FolderProps {
	name: string;
	viewMode: "list" | "grid";
	uuid: UUID;
	ownerName: string;
	uploadDate: Date;
}

export default function Folder({
	name,
	viewMode,
	ownerName,
	uploadDate,
}: FolderProps) {
	if (viewMode === "grid") {
		return (
			<div className="group flex flex-col rounded-lg p-2 pt-4 outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10" tabIndex={0} >
				<Image
					src="/folder.png"
					alt="folder"
					width={100}
					height={100}
					className="self-center"
				/>
				<div className="flex items-end justify-between">
					<p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
						{name}
					</p>
					<EllipsisVertical className="text-transparent transition group-hover:text-black group-focus:text-black" />
				</div>
			</div>
		);
	} else if (viewMode === "list") {
		return (
			<div className="h-16 border-t border-black border-opacity-30">
				<div className="group mt-2 flex justify-between rounded-lg p-2 outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10" tabIndex={0} >
					<div className="flex w-2/4 items-center gap-2">
						<div className="w-[50px]">
							<Image
								src="/folder.png"
								alt="folder"
								width={50}
								height={50}
								className="m-auto self-center"
							/>
						</div>
						<p className="overflow-hidden text-ellipsis whitespace-nowrap">
							{name}
						</p>
					</div>
					<div className="flex w-1/4 items-center gap-2">
						<CircleUserRound size="24px" />
						<p>{ownerName}</p>
					</div>
					<div className="flex w-1/4 items-center justify-end">
						<p>{uploadDate.toLocaleDateString("es-MX")}</p>
					</div>
				</div>
			</div>
		);
	}
}

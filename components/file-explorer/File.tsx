import { UUID } from "crypto";
import { CircleUserRound, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface FileProps {
	name: string;
	extension: "docx" | "pdf" | "pptx" | null;
	uuid: UUID;
	viewMode: "list" | "grid";
	ownerName: string;
	uploadDate: Date;
}

export default function File({
	name,
	extension,
	uuid,
	viewMode,
	ownerName,
	uploadDate,
}: FileProps) {
	const fileRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const openDocument = () => {
			window.open(`/documento?id=${uuid}`, "_blank");
		}

		if (fileRef.current) {
			fileRef.current.addEventListener("dblclick", openDocument);
			fileRef.current.addEventListener("keypress", e => {
				if (e.key === "Enter") openDocument();
			});
		}

		return () => {
			if (fileRef.current) {
				fileRef.current.removeEventListener("dblclick", openDocument);
				fileRef.current.addEventListener("keypress", e => {
					if (e.key === "Enter") openDocument();
				});
			}
		}
	}, [])

	if (viewMode === "grid") {
		return (
			<div className="group flex flex-col rounded-lg p-2 pt-4 outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10" tabIndex={0} ref={fileRef}>
				<Image
					src={`/${extension}.png`}
					alt="folder"
					width={77}
					height={100}
					className="self-center"
				/>
				<div className="flex items-end justify-between">
					<h1 className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
						{name}
					</h1>
					<EllipsisVertical className="text-transparent transition group-hover:text-black group-focus:text-black" />
				</div>
			</div>
		);
	} else if (viewMode === "list") {
		return (
			<div className="h-16 border-t border-black border-opacity-30">
				<div className="group mt-2 flex justify-between rounded-lg p-2 outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10" tabIndex={0} ref={fileRef}>
					<div className="flex w-2/4 items-center gap-2">
						<div className="w-[50px]">
							<Image
								src={`/${extension}.png`}
								alt="file icon"
								width={40}
								height={40}
								className="m-auto w-10 self-center"
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

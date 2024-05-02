import { UUID } from "crypto";
import { CircleUserRound, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface FolderProps {
	id: UUID;
	name: string;
	viewMode: "list" | "grid";
	ownerName: string;
	uploadDate: Date;
}

export default function Folder({
	id,
	name,
	viewMode,
	ownerName,
	uploadDate,
}: FolderProps) {
	const directoryRef = useRef<HTMLDivElement>(null);
	const router = useRouter();


	useEffect(() => {
		const handleFolderClick = () => {
			router.push(`/file-explorer?id=${id}`);
		}

		if (directoryRef.current) {
			directoryRef.current.addEventListener("dblclick", handleFolderClick);
			directoryRef.current.addEventListener("keypress", (e) => {
				if (e.key === "Enter") handleFolderClick();
			});
		}

		return () => {
			if (directoryRef.current) {
				directoryRef.current.removeEventListener("dblclick", handleFolderClick);
				directoryRef.current.removeEventListener("keypress", (e) => {
					if (e.key === "Enter") handleFolderClick();
				});
			}
		};
	}, []);

	if (viewMode === "grid") {
		return (
			<div
				className="group flex flex-col rounded-lg p-2 pt-4 outline-none transition hover:cursor-pointer hover:bg-purpleFrida-700 hover:bg-opacity-10 focus:bg-purpleFrida-700 focus:bg-opacity-10"
				tabIndex={0}
				ref={directoryRef}
			>
				<Image
					src="/folder.png"
					alt="folder"
					width={100}
					height={100}
					className="self-center"
				/>
				<div className="flex items-end justify-between">
					<p className="mt-2 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-center">
						{name}
					</p>
					<EllipsisVertical
						className="flex-shrink-0 text-transparent transition group-hover:text-black group-focus:text-black"
						size={20}
					/>
				</div>
			</div>
		);
	} else if (viewMode === "list") {
		return (
			<div className="h-16 border-t border-black border-opacity-30" ref={directoryRef}>
				<div
					className="group mt-2 flex justify-between rounded-lg p-2 outline-none transition hover:cursor-pointer hover:bg-purpleFrida-700 hover:bg-opacity-10 focus:bg-purpleFrida-700 focus:bg-opacity-10"
					tabIndex={0}
				>
					<div className="flex w-2/4 items-center gap-2">
						<div className="w-[50px] flex-shrink-0">
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

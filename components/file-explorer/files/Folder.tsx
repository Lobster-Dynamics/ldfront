import { UUID } from "crypto";
import { CircleUserRound, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SubMenu from "../SubMenu";
import {
	handleRightClick,
	openContextMenuButton,
} from "@/utils/contextMenuFunctions";

interface FolderProps {
	id: UUID;
	name: string;
	viewMode: "list" | "grid";
	ownerName: string;
	uploadDate: Date;
	directoryId: string;
}

const initialContextMenu = {
	show: false,
	x: 0,
	y: 0,
};

export default function Folder({
	id,
	name,
	viewMode,
	ownerName,
	uploadDate,
	directoryId,
}: FolderProps) {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const directoryRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const submenuRef = useRef<HTMLDivElement>(null);
	const [contextMenu, setContextMenu] = useState(initialContextMenu);

	const handleCloseMenu = (): void => {
		setMenuVisible(false);
	};

	useEffect(() => {
		const handleFolderClick = () => {
			router.push(`/file-explorer?id=${id}`);
		};

		let localRef = directoryRef.current;
		if (directoryRef.current) localRef = directoryRef.current;

		if (localRef) {
			localRef.addEventListener("dblclick", handleFolderClick);
			localRef.addEventListener("keypress", (e) => {
				if (e.key === "Enter") handleFolderClick();
			});
		}

		return () => {
			if (localRef) {
				localRef.removeEventListener("dblclick", handleFolderClick);
				localRef.removeEventListener("keypress", (e) => {
					if (e.key === "Enter") handleFolderClick();
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	if (viewMode === "grid") {
		return (
			<div
				className="group relative flex flex-col rounded-lg p-2 pt-4 outline-none transition hover:cursor-pointer hover:bg-purpleFrida-700 hover:bg-opacity-10 focus:bg-purpleFrida-700 focus:bg-opacity-10"
				tabIndex={0}
				ref={directoryRef}
				onContextMenu={(e) =>
					handleRightClick(e, setMenuVisible, setMenuPosition)
				}
			>
				<Image
					src="/folder.png"
					alt="folder"
					width={100}
					height={100}
					className="self-center"
				/>
				<div className="mx-auto flex w-[95%] items-end justify-between">
					<p className="mt-2 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-center">
						{name}
					</p>
					<button
						onClick={() =>
							openContextMenuButton(
								buttonRef,
								setMenuVisible,
								setMenuPosition,
							)
						}
						ref={buttonRef}
						className="absolute bottom-3 right-0"
					>
						<EllipsisVertical
							className="flex-shrink-0 text-transparent transition group-hover:text-black group-focus:text-black"
							size={20}
						/>
					</button>
				</div>
				{menuVisible && (
					<SubMenu
						show={menuVisible}
						x={menuPosition.x}
						y={menuPosition.y}
						uuid={id}
						onClose={handleCloseMenu}
						setContextMenu={setContextMenu}
						extension={null}
						directoryId={directoryId}
					/>
				)}
			</div>
		);
	} else if (viewMode === "list") {
		return (
			<div
				className="h-16 border-t border-black border-opacity-30"
				ref={directoryRef}
				onContextMenu={(e) =>
					handleRightClick(e, setMenuVisible, setMenuPosition)
				}
			>
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
				{menuVisible && (
					<SubMenu
						show={menuVisible}
						x={menuPosition.x}
						y={menuPosition.y}
						uuid={id}
						onClose={handleCloseMenu}
						setContextMenu={setContextMenu}
						extension={null}
						directoryId={directoryId}
					/>
				)}
			</div>
		);
	}
}

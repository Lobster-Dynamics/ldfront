import { CircleUserRound, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SubMenu from "../SubMenu";
import { UUID } from "crypto";
import {
	handleRightClick,
	openContextMenuButton,
} from "@/utils/contextMenuFunctions";
import { useDrag } from "react-dnd";
import { ReactDndItemTypes } from "@/utils/constants";
import { BreadCrumbDrop, FileItemDrag } from "@/types/AppTypes";
import { cn } from "@/lib/utils";
import { getEmptyImage } from "react-dnd-html5-backend";
import handleItemDrop from "@/lib/requests/functions";

interface FileProps {
	extension: ".docx" | ".pdf" | ".pptx" | null;
	id: UUID;
	name: string;
	viewMode: "list" | "grid";
	ownerName: string;
	uploadDate: Date;
	directoryId: string;
    isShared: boolean;
}

const initialContextMenu = {
	show: false,
	x: 0,
	y: 0,
};

export default function File({
	extension,
	id,
	name,
	viewMode,
	ownerName,
	uploadDate,
	directoryId,
    isShared
}: FileProps) {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const fileRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const submenuRef = useRef<HTMLDivElement>(null);

	const [dragHelperRef, setDragHelperRef] = useState<HTMLDivElement | null>(
		null,
	);

	const [contextMenu, setContextMenu] = useState(initialContextMenu);
	const cleanExtension = extension?.replace(".", "");

	const handleCloseMenu = (): void => {
		setMenuVisible(false);
	};

	const [{ isDragging }, dragRef, preview] = useDrag(
		() => ({
			type: ReactDndItemTypes.FILE,
			item: {
				id,
				name,
				extension,
				directoryId,
				type: "DOCUMENT",
				draggedComponent: dragHelperRef,
			} as FileItemDrag,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult<BreadCrumbDrop>();
				if (item && dropResult) {
					handleItemDrop(directoryId, dropResult.id, id);
				}
			},
		}),
		[dragHelperRef, id, extension],
	);

	useEffect(() => {
		// When dragging, hides the file preview being dragged (the one implemented in the web browser)
		// This to use a custom drag preview
		preview(getEmptyImage(), { captureDraggingState: true });

		const openDocument = () => {
			window.open(`/documento?id=${id}`, "_blank");
		};

		let localRef = fileRef.current;
		if (fileRef.current) localRef = fileRef.current;

		if (localRef) {
			localRef.addEventListener("dblclick", openDocument);
			localRef.addEventListener("keypress", (e) => {
				if (e.key === "Enter") openDocument();
			});
		}

		return () => {
			if (localRef) {
				localRef.removeEventListener("dblclick", openDocument);
				localRef.addEventListener("keypress", (e) => {
					if (e.key === "Enter") openDocument();
				});
			}
		};
	}, [id,preview]);


	if (viewMode === "grid") {
		return (
			<div
				className={cn(
					"group relative flex flex-col rounded-lg p-2 pt-4 outline-none transition hover:cursor-pointer hover:bg-purpleFrida-700 hover:bg-opacity-10 focus:bg-purpleFrida-700 focus:bg-opacity-10",
					{ "opacity-30": isDragging },
				)}
				tabIndex={0}
				ref={(div) => {
					setDragHelperRef(div);
                    // @ts-ignore
                    fileRef.current = div;
					dragRef(div);
				}}
				onContextMenu={(e) =>
					handleRightClick(e, setMenuVisible, setMenuPosition)
				}
			>
				<Image
					src={`/${cleanExtension}.png`}
					alt="folder"
					width={77}
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
						onClose={handleCloseMenu}
						uuid={id}
						setContextMenu={setContextMenu}
						extension={extension}
						directoryId={directoryId}
					/>
				)}
			</div>
		);
	} else if (viewMode === "list") {
		return (
			<div
				className="h-16 border-t border-black border-opacity-30"
				ref={(div) => {
					setDragHelperRef(div);
                    // @ts-ignore
                    fileRef.current = div;
					dragRef(div);
				}}
				onContextMenu={(e) =>
					handleRightClick(e, setMenuVisible, setMenuPosition)
				}
			>
				<div
					className={cn(
						"group mt-2 flex justify-between rounded-lg p-2 outline-none transition hover:cursor-pointer hover:bg-purpleFrida-500 hover:bg-opacity-10 focus:bg-purpleFrida-500 focus:bg-opacity-10",
						{ "opacity-30": isDragging },
					)}
					tabIndex={0}
				>
					<div className="flex w-2/4 items-center gap-2">
						<div className="w-[50px] flex-shrink-0">
							<Image
								src={`/${cleanExtension}.png`}
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
				{menuVisible && (
					<SubMenu
						show={menuVisible}
						x={menuPosition.x}
						y={menuPosition.y}
						uuid={id}
						onClose={handleCloseMenu}
						setContextMenu={setContextMenu}
						extension={extension}
						directoryId={directoryId}
                        isShared={isShared}
					/>
				)}
			</div>
		);
	}
}

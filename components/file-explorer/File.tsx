import { CircleUserRound, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SubMenu from "./SubMenu";
import { useOnClickOutside } from "@/hooks/selectors/use-on-click-outside";
import { setEngine } from "crypto";

interface FileProps {
	name: string;
	extension: ".docx" | ".pdf" | ".pptx" | null;
	uuid: string;
	viewMode: "list" | "grid";
	ownerName: string;
	uploadDate: Date;
}

const initialContextMenu = {
	show: false,
	x: 0,
	y: 0,
};

export default function File({
	name,
	extension,
	uuid,
	viewMode,
	ownerName,
	uploadDate,
}: FileProps) {
	const fileRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const submenuRef = useRef<HTMLDivElement>(null);

	const [contextMenu, setContextMenu] = useState(initialContextMenu);
	const cleanExtension = extension?.replace(".", "");

	useOnClickOutside(fileRef, () =>
		setContextMenu({ show: false, x: 0, y: 0 }),
	);

	const openContextMenuButton = () => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setContextMenu({ show: true, x: rect.left, y: rect.bottom });
		}
	};

	useEffect(() => {
		const openDocument = () => {
			window.open(`/documento?id=${uuid}`, "_blank");
		};

		const openContextMenu = (e: any) => {
			e.preventDefault();
			const { pageX, pageY } = e;
			setContextMenu({ show: true, x: pageX, y: pageY });
		};

		const closeContextMenu = (e: any) => {
			e.preventDefault();
			setContextMenu({ show: false, x: 0, y: 0 });
		};



		if (fileRef.current) {
			fileRef.current.addEventListener("contextmenu", (e) =>
				openContextMenu(e),
			);
			fileRef.current.addEventListener("dblclick", openDocument);
			fileRef.current.addEventListener("keypress", (e) => {
				if (e.key === "Enter") openDocument();
			});
		}

		return () => {
			if (fileRef.current) {
				fileRef.current.removeEventListener("contextmenu", (e) =>
					openContextMenu(e),
				);
				fileRef.current.removeEventListener("dblclick", openDocument);
				fileRef.current.addEventListener("keypress", (e) => {
					if (e.key === "Enter") openDocument();
				});
			}
		};
	}, [uuid]);

	if (viewMode === "grid") {
		return (
			<div
				className="group flex flex-col rounded-lg p-2 pt-4 outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10"
				tabIndex={0}
				ref={fileRef}
			>
				<Image
					src={`/${cleanExtension}.png`}
					alt="folder"
					width={77}
					height={100}
					className="self-center"
				/>
				<div className="flex items-end justify-between ">
					<p className="mt-2 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-center">
						{name}
					</p>
					<button
						onClick={openContextMenuButton}
						ref={buttonRef}
					>
						<EllipsisVertical
							className="flex-shrink-0 text-transparent transition group-hover:text-black group-focus:text-black"
							size={20}
						/>
					</button>
				</div>
				{contextMenu.show && (
					<SubMenu
						show={contextMenu.show}
						x={contextMenu.x}
						y={contextMenu.y}
						uuid={uuid}
						setContextMenu={setContextMenu}
						ref={submenuRef}
						extension={extension}
					/>
				)}
			</div>
		);
	} else if (viewMode === "list") {
		return (
			<div className="h-16 border-t border-black border-opacity-30">
				<div
					className="group mt-2 flex justify-between rounded-lg p-2 outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10"
					tabIndex={0}
					ref={fileRef}
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
				{contextMenu.show && (
					<SubMenu
						show={contextMenu.show}
						x={contextMenu.x}
						y={contextMenu.y}
						uuid={uuid}
						setContextMenu={setContextMenu}
						ref={submenuRef}
						extension={extension}
					/>
				)}
			</div>
		);
	}
}

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface FileDragLayerProps {
	extension: ".docx" | ".pdf" | ".pptx" | null;
	name: string;
	isResized: boolean;
}

export default function FileDragLayer({
	extension,
	name,
	isResized,
}: FileDragLayerProps) {
	const cleanExtension = extension ? extension.replace(".", "") : "folder";

	return (
		<div
			className={cn(
				"flex w-full justify-between rounded-lg bg-purpleFrida-700 bg-opacity-10 p-2 text-black outline-none",
				isResized && "bg-white bg-opacity-100 shadow-lg",
			)}
		>
			<div className="mx-auto flex w-full items-center gap-1">
				<div className="w-[50px] flex-shrink-0">
					<Image
						src={`/${cleanExtension}.png`}
						alt="file icon"
						width={20}
						height={20}
						className="m-auto w-8 self-center"
					/>
				</div>
				<p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
					{name}
				</p>
			</div>
		</div>
	);
}

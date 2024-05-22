"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { XYCoord } from "react-dnd";

interface FileDragLayerProps {
	extension: ".docx" | ".pdf" | ".pptx" | null;
	name: string;
	offSet: XYCoord;
	parentWidth: number;
	parentHeight: number;
}

function getItemStyles(Offset: XYCoord, isResized: boolean) {
	if (!Offset || !isResized) return {};

	let { x, y } = Offset;

	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform,
	};
}

export default function FileDragLayer({ extension, name, offSet, parentWidth, parentHeight }: FileDragLayerProps) {
	const cleanExtension = extension?.replace(".", "");
	const [isResized, setIsResized] = useState<boolean>(false);
	const [finalOffset, setFinalOffset] = useState<XYCoord>({ x: 0, y: 0 })

	useEffect(() => {
		let timer: NodeJS.Timeout;
		timer = setTimeout(() => setIsResized(true), 150); // Cambia de tamaño después de 3 segundos

		return () => clearTimeout(timer); // Limpiar el temporizador en desmontaje
	}, []);

	useEffect(() => {
		console.log({ x: offSet.x, y: offSet.y })
		setFinalOffset({ x: offSet.x + 100 - parentWidth / 2, y: offSet.y })
	}, [isResized])

	return (
		<div
			className={cn(
				"flex w-full bg-purpleFrida-700 bg-opacity-10 justify-between rounded-lg p-2 text-black outline-none transition-all ease-out",
				isResized && "mx-auto w-[200px] bg-white bg-opacity-100 shadow-md"
				// isResized && "bg-white bg-opacity-100 shadow-md"
			)}
			style={getItemStyles(finalOffset, isResized)}
		>
			<div className="flex w-full items-center gap-1 mx-auto">
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

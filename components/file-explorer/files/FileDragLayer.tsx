"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { XYCoord } from "react-dnd";

interface FileDragLayerProps {
	extension: ".docx" | ".pdf" | ".pptx" | null;
	name: string;
    offSet: XYCoord | null;
}

export default function FileDragLayer({ extension, name, offSet }: FileDragLayerProps) {
	const cleanExtension = extension?.replace(".", "");
	const [isResized, setIsResized] = useState<boolean>(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		timer = setTimeout(() => setIsResized(true), 150); // Cambia de tamaño después de 3 segundos

		return () => clearTimeout(timer); // Limpiar el temporizador en desmontaje
	}, []);

    console.log(offSet);

	return (
		<div
			className={cn(
				"flex w-full justify-between rounded-lg bg-white p-2 text-black outline-none transition-all ease-out",
				{
					"mx-auto w-[250px] bg-white bg-opacity-100 shadow-md":
						isResized,
				},
			)}
            // style={{left: offSet?.x, top: offSet?.y}}
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

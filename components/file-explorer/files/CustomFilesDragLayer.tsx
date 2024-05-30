import { useDragLayer, XYCoord } from "react-dnd";
import { ReactDndItemTypes } from "@/utils/constants";
import FileDragLayer from "./FileDragLayer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function getItemStyles(
	initialOffset: XYCoord | null,
	clientOffset: XYCoord | null,
	offsetWidth: number,
	isResized: boolean,
) {
	if (!initialOffset || !clientOffset) {
		return { display: "none" };
	}

	let pos: XYCoord;
	let width: number;
	if (!isResized) {
		pos = initialOffset; // Posición inicial del item (Creo en referencia a DNDProvider)
		width = offsetWidth; // Ancho del componente (Item original)
	} else {
		pos = clientOffset; // Posición actual del cursor
		width = 250; // Ancho del componente (Item que se dragea)
	}

	const transform = `translate(${pos.x}px, ${pos.y}px)`;

	return {
		transform,
		WebkitTransform: transform,
		width: `${width}px`,
	};
}

export default function CustomFilesDragLayer() {
	const { itemType, isDragging, item, currentOffset, clientOffset } =
		useDragLayer((monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			currentOffset: monitor.getSourceClientOffset(),
			clientOffset: monitor.getClientOffset(),
			isDragging: monitor.isDragging(),
		}));
	const [isResized, setIsResized] = useState<boolean>(false);
	const [isFinishedTransition, setIsFinishedTransition] = useState<boolean>(false);

	const renderItem = () => {
		switch (itemType) {
			case ReactDndItemTypes.FILE:
				return (
					<FileDragLayer
						name={item.name}
						extension={item.extension}
						isResized={isResized}
					/>
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;
		let timerFinished: NodeJS.Timeout;
		if (isDragging) {
			// Iniciar el temporizador cuando comience el drag
			timer = setTimeout(() => setIsResized(true), 100);
			timerFinished = setTimeout(() => setIsFinishedTransition(true), 250);
		} else {
			// Limpiar el temporizador y restablecer el estado cuando termine el drag
			//   @ts-ignore
			clearTimeout(timer);
			//   @ts-ignore
			clearTimeout(timerFinished);
			setIsResized(false);
			setIsFinishedTransition(false);
		}
		return () => {
			clearTimeout(timer); // Limpiar el temporizador en desmontaje
			clearTimeout(timerFinished); // Limpiar el temporizador en desmontaje
		}
	}, [isDragging, item]);

    if (!isDragging || itemType !== ReactDndItemTypes.FILE) return null;

	return (
		<div className="pointer-events-none fixed left-0 top-0 z-[100] h-full">
			<div
				style={getItemStyles(
					currentOffset,
					clientOffset,
					item?.draggedComponent.offsetWidth,
					isResized,
				)}
				className={cn("transition-all ease-out", { "transition-none": isFinishedTransition })}
			>
				{renderItem()}
			</div>
		</div>
	);
}

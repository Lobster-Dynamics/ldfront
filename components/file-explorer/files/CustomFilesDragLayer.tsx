import { useDragLayer, XYCoord } from "react-dnd";
import { ReactDndItemTypes } from "@/utils/constants";
import FileDragLayer from "./FileDragLayer";

function getItemStyles(Offset: XYCoord | null, offsetWidth: number) {
	if (!Offset) {
		return {
			display: "none",
		};
	}

	let { x, y } = Offset;

	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform,
		width: `${offsetWidth}px`,
	};
}

export default function CustomFilesDragLayer() {
	const {
		itemType,
		isDragging,
		item,
		initialOffset,
		currentOffset,
		clientOffset,
	} = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		clientOffset: monitor.getClientOffset(),
		isDragging: monitor.isDragging(),
	}));

	function renderItem() {
		switch (itemType) {
			case ReactDndItemTypes.FILE:
				return (
					<FileDragLayer
						name={item.name}
						extension={item.extension}
						offSet={getOffset()}
						parentWidth={item?.draggedComponent.offsetWidth}
						parentHeight={item?.draggedComponent.offsetHeight}
					/>
				);
			default:
				return null;
		}
	}

	function getOffset() {
		if (!clientOffset)
			return {
				x: item?.draggedComponent.offsetLeft,
				y: item?.draggedComponent.offsetTop,
			};

		return {
			x: clientOffset.x - item?.draggedComponent.offsetLeft,
			y: clientOffset.y - item?.draggedComponent.offsetTop,
		};
		// if (!currentOffset || !initialOffset) return {x: 0, y: 0};

		// return {
		// 	x: currentOffset.x - initialOffset.x,
		// 	y: currentOffset.y - initialOffset.y
		// };
	}

	if (!isDragging) return null;

	return (
		<div className="pointer-events-none fixed left-0 top-0 z-[100] h-full">
			<div
				style={getItemStyles(
					currentOffset,
					item?.draggedComponent.offsetWidth,
				)}
			>
				{renderItem()}
			</div>
		</div>
	);
}

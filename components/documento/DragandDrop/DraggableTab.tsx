import { cn } from "@/lib/utils";
import { Tab } from "@/types/AppTypes";
import { LucideIcon } from "lucide-react";
import React from "react";
import { useDrag } from "react-dnd";

interface DraggableTabProps {
    tab: Tab;
    selectTab: (tabId: string) => void;
    selectedTabId: string;
    Icon: LucideIcon;
    vertically: boolean;
}

const ItemTypes = {
    TAB: 'tab',
};

const DraggableTab: React.FC<DraggableTabProps> = ({ tab, selectTab, selectedTabId ,Icon, vertically }) => {

    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.TAB,
        item: tab,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
		<div
			// @ts-ignore
			ref={dragRef}
			onClick={() => selectTab(tab.id)}
			style={{
				opacity: isDragging ? 0.5 : 1,
				writingMode: vertically ? "vertical-rl" : "horizontal-tb",
			}}
			className="mx-1 flex cursor-pointer flex-row items-center  p-2 font-mono text-2xl"
		>
			<div
				className={cn(
					"mr-4 text-gray-400",
                    { "text-black": selectedTabId === tab.id},
                    { "mb-2 ml-4 rotate-90": vertically}
				)}
			>
				<Icon />
			</div>
			<p
				className={cn("text-gray-400 text-nowrap", {"text-black" : selectedTabId === tab.id})}
			>
				{tab.content}
			</p>
			<p className={`mx-1 font-normal text-gray-400`}>|</p>
		</div>
	);
};

export default DraggableTab;

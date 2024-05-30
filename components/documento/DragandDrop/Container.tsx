import React from "react";
import { useDrop } from "react-dnd";
import DraggableTab from "./DraggableTab";
import { Tab } from "@/types/AppTypes";

interface ContainerProps {
	tabs: Tab[];
	onDrop: (tab: Tab, containerId: string) => void;
	containerId: string;
	selectTab: (containerId: string, tabId: string) => void;
	selectedTabId: string;
	isHidden: boolean;
}

const ItemTypes = {
	TAB: "tab",
};

const Container: React.FC<ContainerProps> = ({
	tabs,
	onDrop,
	containerId,
	selectTab,
	selectedTabId,
	isHidden,
}: ContainerProps) => {
	const [, dropRef] = useDrop({
		accept: ItemTypes.TAB,
		drop: (item: Tab, monitor) => {
			if (monitor) {
				onDrop(item, containerId);
			}
		},
	});

	const selectedTab = tabs.find((tab) => tab.id === selectedTabId);

	return (
        // @ts-ignore
		<div ref={dropRef} 
			className="flex min-h-0 w-full max-h-full h-full flex-col rounded-lg bg-[#f8f8f9]"
		>
			<div className="flex overflow-x-auto rounded-lg bg-gray-200 ">
				{tabs.map((tab) => (
					<DraggableTab
						key={tab.id}
						tab={tab}
						selectedTabId={selectedTabId}
						selectTab={(tabId) => selectTab(containerId, tabId)}
						Icon={tab.Icon}
					/>
				))}
			</div>
			<div className="h-full overflow-y-auto rounded shadow">
				{selectedTab
					? selectedTab.component
					: "Selecciona un componente"}
			</div>
		</div>
	);
};

export default Container;

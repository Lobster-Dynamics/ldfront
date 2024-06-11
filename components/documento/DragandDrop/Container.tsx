import React from "react";
import { useDrop } from "react-dnd";
import DraggableTab from "./DraggableTab";
import { Tab } from "@/types/AppTypes";
import { cn } from "@/lib/utils";

interface ContainerProps {
	tabs: Tab[];
	onDrop: (tab: Tab, containerId: string) => void;
	containerId: string;
	selectTab: (containerId: string, tabId: string) => void;
	selectedTabId: string;
	isVerticalHidden: boolean;
	isHorizontalHidden: boolean;
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
	isVerticalHidden,
	isHorizontalHidden,
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

	if (isVerticalHidden || isHorizontalHidden) {
		return (
			<div
				// @ts-ignore
				ref={dropRef}
				className={cn(
					"flex h-full max-h-full min-h-0 flex-col overflow-x-auto rounded-lg bg-gray-200",
					{
						"flex-row": isHorizontalHidden && !isVerticalHidden,
					},
				)}
			>
				{tabs.map((tab) => (
					<DraggableTab
						tab={tab}
						key={tab.id}
						selectedTabId={selectedTabId}
						selectTab={(tabId) => selectTab(containerId, tabId)}
						Icon={tab.Icon}
						vertically={isVerticalHidden}
					/>
				))}
			</div>
		);
	}

	return (
		<div
			// @ts-ignore
			ref={dropRef}
			className="flex h-full max-h-full min-h-0 w-full flex-col rounded-lg bg-[#f8f8f9]"
            data-test-id={`dropZone${containerId}`}
		>
			<div className="flex overflow-x-auto rounded-lg bg-gray-200" data-test-id={`dragContainer${containerId}`}>
				{tabs.map((tab) => (
					<DraggableTab
						key={tab.id}
						tab={tab}
						selectedTabId={selectedTabId}
						selectTab={(tabId) => selectTab(containerId, tabId)}
						Icon={tab.Icon}
						vertically={false}
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

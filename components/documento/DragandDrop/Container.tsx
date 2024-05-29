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
			className="flex min-h-0 w-full h-full flex-col rounded-lg bg-green-300"
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
                {/* <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum veniam hic, repudiandae vero maiores harum deserunt consectetur numquam quae recusandae voluptatum similique tempora earum reprehenderit facere corporis officiis, delectus perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae officiis explicabo et iure nostrum aspernatur nam porro numquam illo voluptatum earum hic culpa dicta, quam eius nihil ipsam asperiores? Cum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, repudiandae? Dolorum expedita vero magni autem suscipit voluptatibus, quo, doloremque excepturi ipsu Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium tenetur praesentium fugit nisi reiciendis a porro ipsa aliquid est! Quisquam sit eius corrupti a blanditiis facilis ipsam tenetur et placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit eum debitis provident adipisci reprehenderit! Quisquam mollitia enim inventore sed esse debitis, rem error saepe, quam laudantium dignissimos nobis quo voluptates? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nihil non iusto nam deleniti animi voluptatibus architecto ab atque repudiandae. Quae dignissimos deserunt praesentium maiores autem laboriosam ut, minima earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aperiam, reprehenderit tempora possimus eos sapiente similique, sint pariatur at, suscipit obcaecati tenetur explicabo odio fugit dolorum? Earum molestias quis amet!</p> */}
				{selectedTab
					? selectedTab.component
					: "Selecciona un componente"}
			</div>
		</div>
	);
};

export default Container;

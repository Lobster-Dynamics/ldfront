import { Tab } from "@/types/AppTypes";
import React from "react";
import { useDrag } from "react-dnd";

interface DraggableTabProps {
    tab: Tab;
    selectTab: (tabId: string) => void;
    selectedTabId: string;
    Icon: JSX.Element;
}

const ItemTypes = {
    TAB: 'tab',
};

const DraggableTab: React.FC<DraggableTabProps> = ({ tab, selectTab, selectedTabId ,Icon }) => {

    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.TAB,
        item: tab,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        // @ts-ignore
        <div ref={dragRef}
            onClick={() => selectTab(tab.id)}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="flex flex-row cursor-pointer items-center p-2  mx-1 font-mono text-2xl"
        >
            <div className={`mr-4 ${selectedTabId === tab.id ? "text-black" : "text-gray-400"}  `}>
                {Icon}
            </div>
            <p className={`${selectedTabId === tab.id ? "text-black" : "text-gray-400"}`}>
                {tab.content}
            </p>
            <p className={`font-normal text-gray-400 mx-1`}>|</p>
        </div>
    );
};

export default DraggableTab;

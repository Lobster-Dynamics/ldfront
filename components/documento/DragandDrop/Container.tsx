import React from "react";
import { useDrop } from "react-dnd";
import DraggableTab from "./DraggableTab";

interface ContainerProps {
  tabs: Tab[];
  onDrop: (tab: Tab, containerId: string) => void;
  containerId: string;
  selectTab: (containerId: string, tabId: string) => void;
  selectedTabId: string;
}

const ItemTypes = {
  TAB: 'tab',
};

const Container: React.FC<ContainerProps> = ({ tabs, onDrop, containerId, selectTab, selectedTabId }) => {

  const [, dropRef] = useDrop({
    accept: ItemTypes.TAB,
    drop: (item: Tab, monitor) => {
      if (monitor) {
        onDrop(item, containerId);
      }
    },
  });

  const selectedTab = tabs.find((tab) => tab.id === selectedTabId);
// @ts-ignore
  return (
    <div
      ref={dropRef}
      className="flex-1 min-h-0 p-4 rounded-lg bg-[#f8f8f9] flex flex-col m-4"
    >
      <div className="flex overflow-x-auto mb-4">
        {tabs.map((tab) => (
          <DraggableTab key={tab.id} tab={tab} selectTab={(tabId) => selectTab(containerId, tabId)} Icon={tab.Icon} />
        ))}
      </div>
      <div className="overflow-auto h-full bg-white p-4 shadow rounded">
        {selectedTab ? selectedTab.component : "Mielda de caballo"}
      </div>
    </div>
  );
};

export default Container;

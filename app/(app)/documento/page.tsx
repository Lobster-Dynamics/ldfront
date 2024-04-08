"use client";
import React, { useState,useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Paper from '@/components/documento/Paper';
import Container from '@/components/documento/DragandDrop/Container';
import Wordcloud from '@/components/documento/Wordcloud';

//Iconos

import { ScrollText, MessageSquare, List, Cloud, BookOpen, Workflow } from 'lucide-react';

const Visualizador = () => {
  const [tabs, setTabs] = useState<{
    [key: string]: Tab[];
  }>({
    left: [
      { id: 'left-1', content: 'Documento', component: <Paper/>, Icon: <ScrollText/> },
      { id: 'left-2', content: 'Grafo', component: <div>Mielda de yegua</div> , Icon: <Workflow/> },
    ],
    rightTop: [
      { id: 'right-top-1', content: 'Chat', component: <div>Mielda de Toltuga</div>, Icon: <MessageSquare/> },
      { id: 'right-top-2', content: 'Resumen', component: <div>Mielda de gatito</div>, Icon: <BookOpen/> },
    ],
    rightBottom: [
      { id: 'right-bottom-1', content: 'Word Cloud', component: <Wordcloud/>, Icon: <Cloud/> },
      { id: 'right-bottom-2', content: 'Palabras Clave', component: <div>Mielda de tigle</div>, Icon: <List/> },
    ],
  });

  const [selectedTabs, setSelectedTabs] = useState<{
    [key: string]: string;
  }>({
    left: '',
    rightTop: '',
    rightBottom: '',
  });

  const moveTab = useCallback((tab: Tab, targetContainerId: string) => {
    setTabs((prevTabs) => {
      const sourceContainerId = Object.keys(prevTabs).find((key) =>
        prevTabs[key].some((t) => t.id === tab.id)
      );
      if (!sourceContainerId) return prevTabs;

      const sourceTabs = prevTabs[sourceContainerId].filter((t) => t.id !== tab.id);
      const targetTabs = [...prevTabs[targetContainerId], tab];

      return {
        ...prevTabs,
        [sourceContainerId]: sourceTabs,
        [targetContainerId]: targetTabs,
      };
    });
  }, []);

  const selectTab = useCallback((containerId: string, tabId: string) => {
    setSelectedTabs((prevSelectedTabs) => ({
      ...prevSelectedTabs,
      [containerId]: tabId,
    }));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-white">
        <div className="w-1/2 h-full flex flex-col">
          <Container
            tabs={tabs.left}
            onDrop={moveTab}
            containerId="left"
            selectTab={selectTab}
            selectedTabId={selectedTabs.left}
          />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <div className='h-1/3 flex'>
          <Container
            tabs={tabs.rightTop}
            onDrop={moveTab}
            containerId="rightTop"
            selectTab={selectTab}
            selectedTabId={selectedTabs.rightTop}
          />
          </div>
          <Container
            tabs={tabs.rightBottom}
            onDrop={moveTab}
            containerId="rightBottom"
            selectTab={selectTab}
            selectedTabId={selectedTabs.rightBottom}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Visualizador;

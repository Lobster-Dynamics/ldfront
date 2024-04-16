"use client";
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Paper from '@/components/documento/Paper';
import Container from '@/components/documento/DragandDrop/Container';
import Wordcloud from '@/components/documento/Wordcloud';
import { chatData } from '@/utils/constants';
import { Tab } from '@/types/AppTypes';

//Iconos

import { ScrollText, MessageSquare, List, Cloud, BookOpen, Workflow, Search, Settings } from 'lucide-react';
import Keywords from '@/components/documento/Keywords';
import Chat from '@/components/documento/Chat';
import Summary from '@/components/documento/Summary';
import Graph from '@/components/documento/Graph';
import ModalBorrar from '@/components/documento/KeyWords/ModalBorrar';
import ModalAdd from '@/components/documento/KeyWords/ModalAdd';
import Modal from '@/components/ui/Modal';
import ModalDefinicion from '@/components/documento/ModalDefinition';

const Visualizador = () => {
    const sample = ["Computer", "Vision", "Applications", "Demand", "Breakthroughs", "Crops", "Broad"]
    const [tabs, setTabs] = useState<{
        [key: string]: Tab[];
    }>({
        left: [
            { id: 'left-1', content: 'Documento', component: <Paper />, Icon: <ScrollText /> },
            { id: 'left-2', content: 'Grafo', component: <Graph />, Icon: <Workflow /> },
        ],
        rightTop: [
            { id: 'right-top-1', content: 'Chat', component: <Chat Chat={chatData} />, Icon: <MessageSquare /> },
            { id: 'right-top-2', content: 'Resumen', component: <Summary />, Icon: <BookOpen /> },
        ],
        rightBottom: [
            { id: 'right-bottom-1', content: 'Word Cloud', component: <Wordcloud />, Icon: <Cloud /> },
            { id: 'right-bottom-2', content: 'Palabras Clave', component: <Keywords keywords={sample} />, Icon: <List /> },
        ],
    });

    const [selectedTabs, setSelectedTabs] = useState<{
        [key: string]: string;
    }>({
        left: 'left-1',
        rightTop: 'right-top-1',
        rightBottom: 'right-bottom-1',
    });

    const moveTab = useCallback((tab: Tab, targetContainerId: string) => {
        setTabs((prevTabs) => {
            const sourceContainerId = Object.keys(prevTabs).find((key) =>
                prevTabs[key].some((t) => t.id === tab.id)
            );
            if (!sourceContainerId) return prevTabs;
    
            // If the source and target containers are the same, return the previous tabs without changes
            if (sourceContainerId === targetContainerId) return prevTabs;
    
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
            <div className="flex flex-col h-screen bg-white">
                <div className='flex w-full h-full pb-10 md:pb-20'>
                    <div className="w-1/2 flex flex-col">
                        <Container
                            tabs={tabs.left}
                            onDrop={moveTab}
                            containerId="left"
                            selectTab={selectTab}
                            selectedTabId={selectedTabs.left}
                        />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className='h-2/5 flex'>
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
            </div>
            <ModalBorrar/>
            <ModalAdd/>
			<ModalDefinicion/>
        </DndProvider>
    );
};

export default Visualizador;

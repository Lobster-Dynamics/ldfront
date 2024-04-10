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
            <div className="flex flex-col overflow-y-clip h-screen bg-white">

                <div className="w-full h-20 flex  flex-col  bg-white justify-center text-bold text-4xl  ">
                    <nav className="w-full h-20 bg-white flex items-center px-5 border-black border-b-2">
                        <div className="flex flex-row  items-center">
                            <h1 className="text-purple-500 text-4xl  mr-4">FRIDA</h1>
                            <h1 className="text-black text-4xl ">Research Engine</h1>
                        </div>
                        <div className='flex flex-grow items-center  justify-start '>
                            <div className="ml-2 mr-10 border-black border-l-2 h-14 align-center"/>
                        <div className="flex flex-row border-black border-2 rounded-lg py-2 px-2 justify-start items-center">
                            <Search className="h-6 w-6 text-black" />
                            <input
                                className="form-input pl-4  pr-24 text-lg rounded-lg "
                                type="search"
                                placeholder="Buscar en mis papers"
                            />
                        </div>
                        </div>

                        <div className="flex flex-grow justify-end items-center space-x-4">
                            <Settings className="h-6 w-6 text-gray-600" />
                            <div className="border-l-2 border-black mx-2 h-14 align-center"/>
                            <span className="text-gray-600 text-2xl">Cuenta</span>
                        </div>
                    </nav>

                </div>
                <div className="w-full flex pb-20 h-screen">
                    <div className="w-1/2  flex flex-col">
                        <Container
                            tabs={tabs.left}
                            onDrop={moveTab}
                            containerId="left"
                            selectTab={selectTab}
                            selectedTabId={selectedTabs.left}
                        />
                    </div>
                    <div className="w-1/2 h-screen pb-20 flex flex-col">
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
            </div>
            <ModalBorrar/>
            <ModalAdd/>
        </DndProvider>
    );
};

export default Visualizador;

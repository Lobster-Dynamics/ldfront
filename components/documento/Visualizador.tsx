"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Paper from '@/components/documento/Paper';
import Container from '@/components/documento/DragandDrop/Container';
import WordCloud from '@/components/documento/Wordcloud';
import { chatData } from '@/utils/constants';
import { Tab } from '@/types/AppTypes';
import { ScrollText, MessageSquare, List, Cloud, BookOpen, Workflow } from 'lucide-react';
import Keywords from '@/components/documento/Keywords';
import Chat from '@/components/documento/Chat';
import Summary from '@/components/documento/Summary';
import Graph from '@/components/documento/Graph';
import ModalBorrar from '@/components/documento/KeyWords/ModalBorrar';
import ModalAdd from '@/components/documento/KeyWords/ModalAdd';
import ModalDefinicion from '@/components/documento/ModalDefinition';
import useSWR from 'swr';
import { fetcher } from '@/config/fetcher';
import { Document } from '@/types/ModelTypes';
import { useSearchParams } from 'next/navigation';

const Visualizador = () => {
    const searchParams = useSearchParams();
    const id = searchParams?.get("id") ?? "0";
    const { data: document } = useSWR<Document>(`/document/get_document/${id}`, fetcher);
    const [tabs, setTabs] = useState<{ [key: string]: Tab[] }>({
        left: [],
        rightTop: [],
        rightBottom: [],
    });

    const [selectedTabs, setSelectedTabs] = useState<{
        [key: string]: string;
    }>({
        left: 'left-1',
        rightTop: 'right-top-1',
        rightBottom: 'right-bottom-1',
    });

    useEffect(() => {
        setTabs({
            left: [
                {
                    id: 'left-1',
                    content: 'Documento',
                    component: document ? <Paper title={document.name} parse={document.parsed_llm_input.content} /> : <h1>Cargando...</h1>,
                    Icon: <ScrollText />
                },
                { id: 'left-2', content: 'Grafo', component: <Graph />, Icon: <Workflow /> },
            ],
            rightTop: [
                { id: 'right-top-1', content: 'Chat', component: <Chat Chat={chatData} id={id} />, Icon: <MessageSquare /> },
                { id: 'right-top-2', content: 'Resumen', component: document ?  <Summary summary={document?.summary.secctions} />  : <h1>Cargando...</h1> , Icon: <BookOpen /> },

            ],
            rightBottom: [
                { id: 'right-bottom-1', content: 'Word Cloud', component: <WordCloud uuid={id} width={500} height={500}/>, Icon: <Cloud /> },
                { id: 'right-bottom-2', content: 'KeyConcepts', component: document ?  <Keywords documentId={id} keywords={document?.key_concepts} /> : <h1>Cargando...</h1>, Icon: <List /> },

            ],
        });
    }, [document,id]);

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

            // Select the first tab in the source container
            if (sourceTabs.length > 0) {
                setSelectedTabs((prevSelectedTabs) => ({
                    ...prevSelectedTabs,
                    [sourceContainerId]: sourceTabs[0].id,
                }));
            }

            // Select the moved tab in the target container
            setSelectedTabs((prevSelectedTabs) => ({
                ...prevSelectedTabs,
                [targetContainerId]: tab.id,
            }));

            return {
                ...prevTabs,
                [sourceContainerId]: sourceTabs,
                [targetContainerId]: targetTabs,
            };
        });
    }, [setSelectedTabs]);

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
            <ModalBorrar />
            <ModalAdd />
            <ModalDefinicion />

        </DndProvider>
    );
};

export default Visualizador;


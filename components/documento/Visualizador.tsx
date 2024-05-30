"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Paper from '@/components/documento/Paper';
import Container from '@/components/documento/DragandDrop/Container';
import WordCloud from '@/components/documento/Wordcloud';
import { Tab } from '@/types/AppTypes';
import { ScrollText, MessageSquare, List, Cloud, BookOpen, Workflow } from 'lucide-react';
import Keywords from '@/components/documento/Keywords';
import Chat from '@/components/documento/Chat';
import Summary from '@/components/documento/Summary';
import GraphViz from '@/components/graph/Graph';
import ModalBorrar from '@/components/documento/KeyWords/ModalBorrar';
import ModalAdd from '@/components/documento/KeyWords/ModalAdd';
import ModalDefinicion from '@/components/documento/ModalDefinition';
import useSWR from 'swr';
import { fetcher } from '@/config/fetcher';
import { Document } from '@/types/ModelTypes';
import { useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/selectors/useAuth';

const Visualizador = () => {
    const searchParams = useSearchParams();
    const id = searchParams?.get("id") ?? "0";
    const { data: documentData } = useSWR<Document>(`/document/get_document/${id}`, fetcher);
    const [tabs, setTabs] = useState<{ [key: string]: Tab[] }>({
        left: [],
        rightTop: [],
        rightBottom: [],
    });
    const { auth } = useAuth()

    const verticalResizeRef = useRef<HTMLDivElement>(null);
    const horizontalResizeRef = useRef<HTMLDivElement>(null);
    const leftContainerRef = useRef<HTMLDivElement>(null);
    const rightContainerRef = useRef<HTMLDivElement>(null);
    const topContainerRef = useRef<HTMLDivElement>(null);
    const bottomContainerRef = useRef<HTMLDivElement>(null);
    const [leftContainerWidth, setleftContainerWidth] = useState<string>("calc(50% - 23px)");
    const [rightContainerWidth, setRightContainerWidth] = useState<string>("calc(50% - 23px)");
    const [topContainerHeight, setTopContainerHeight] = useState<string>("calc(40% - 7px)");
    const [bottomContainerHeight, setBottomContainerHeight] = useState<string>("calc(60% - 7px)");
    const [isLeftContainerHidden, setIsLeftContainerHidden] = useState<boolean>(false);
    const [isRightContainerHidden, setIsRightContainerHidden] = useState<boolean>(false);
    const [isBottomContainerHidden, setIsBottomContainerHidden] = useState<boolean>(false);
    const [isTopContainerHidden, setIsTopContainerHidden] = useState<boolean>(false);

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
                    component: documentData ? <Paper title={documentData.name} parse={documentData.parsed_llm_input.content} /> : <h1>Cargando...</h1>,
                    Icon: <ScrollText />
                },
                { 
                    id: 'left-2', 
                    content: 'Grafo', 
                    component: documentData ? <GraphViz key_concepts={documentData.key_concepts} relationships={documentData.relationships}/> : <h1>Cargando...</h1>, 
                    Icon: <Workflow /> 
                },
            ],
            rightTop: [
                { id: 'right-top-1', content: 'Chat', component: <Chat id={id} userid={auth?.uid} />, Icon: <MessageSquare /> },
                { id: 'right-top-2', content: 'Resumen', component: documentData ?  <Summary summary={documentData?.summary.secctions} />  : <h1>Cargando...</h1> , Icon: <BookOpen /> },
            ],
            rightBottom: [
                { id: 'right-bottom-1', content: 'Word Cloud', component: <WordCloud uuid={id} width={500} height={500}/>, Icon: <Cloud /> },
                { id: 'right-bottom-2', content: 'KeyConcepts', component: documentData ?  <Keywords documentId={id} keywords={documentData?.key_concepts} /> : <h1>Cargando...</h1>, Icon: <List /> },

            ],
        });
    }, [documentData, id, auth?.uid]);

    useEffect(() => {
        const mouseDownVerticalHandler = (e: MouseEvent) => {
			// @ts-ignore
			const leftWidth = parseInt(leftContainerRef.current?.offsetWidth, 10);
            // @ts-ignore
            const rightWidth = parseInt(rightContainerRef.current?.offsetWidth, 10);
			const x = e.clientX;

			const mouseMoveHandler = (e: MouseEvent) => {
				const dx = e.clientX - x;
                if (leftWidth + dx <= 50)
                    setIsLeftContainerHidden(true);
                else if (rightWidth - dx >= 50) {
                    setIsLeftContainerHidden(false);
                    setleftContainerWidth(`${leftWidth + dx}px`);
                }
                if (rightWidth - dx <= 50)
                    setIsRightContainerHidden(true);
                else if (leftWidth + dx >= 50) {
                    setIsRightContainerHidden(false);
                    if (tabs.rightTop.length > 0) setIsTopContainerHidden(false);
                    if (tabs.rightBottom.length > 0) setIsBottomContainerHidden(false);
                    setRightContainerWidth(`${rightWidth - dx}px`);
                }
			};

			const mouseUpHandler = () => {
				document.removeEventListener("mousemove", mouseMoveHandler);
				document.removeEventListener("mouseup", mouseUpHandler);
			};

			document.addEventListener("mousemove", mouseMoveHandler);
			document.addEventListener("mouseup", mouseUpHandler);
		};

        const mouseDownHorizontalHandler = (e: MouseEvent) => {
			// @ts-ignore
			const topHeight = parseInt(topContainerRef.current?.offsetHeight, 10);
            // @ts-ignore
            const bottomHeight = parseInt(bottomContainerRef.current?.offsetHeight, 10);
			const y = e.clientY;

			const mouseMoveHandler = (e: MouseEvent) => {
				const dy = e.clientY - y;
                if (topHeight + dy <= 50)
                    setIsTopContainerHidden(true);
                else if (bottomHeight - dy >= 50) {
                    setIsTopContainerHidden(false);
                    setTopContainerHeight(`${topHeight + dy}px`);
                }
                if (bottomHeight - dy <= 50)
                    setIsBottomContainerHidden(true);
                else if (topHeight + dy >= 50) {
                    setIsBottomContainerHidden(false);
                    setBottomContainerHeight(`${bottomHeight - dy}px`);
                }
			};

			const mouseUpHandler = () => {
				document.removeEventListener("mousemove", mouseMoveHandler);
				document.removeEventListener("mouseup", mouseUpHandler);
			};

			document.addEventListener("mousemove", mouseMoveHandler);
			document.addEventListener("mouseup", mouseUpHandler);
		};

        const handleWindowResize = () => {
            if (!isLeftContainerHidden && !isRightContainerHidden) {
                setleftContainerWidth("calc(50% - 23px)");
                setRightContainerWidth("calc(50% - 23px)");
            }
            else if (isLeftContainerHidden && !isRightContainerHidden)
                setRightContainerWidth("calc(100% - 23px)");
            else if (!isLeftContainerHidden && isRightContainerHidden)
                setleftContainerWidth("calc(100% - 23px)");

            if (!isTopContainerHidden && !isBottomContainerHidden) {
                setTopContainerHeight("calc(40% - 7px)");
                setBottomContainerHeight("calc(60% - 7px)");
            }
            else if (isTopContainerHidden && !isBottomContainerHidden)
                setBottomContainerHeight("calc(100% - 7px)");
            else if (!isTopContainerHidden && isBottomContainerHidden)
                setTopContainerHeight("calc(100% - 7px)");
        };

        // Minimize the containers if they do not have any tabs
        if (tabs.left.length === 0 && tabs.rightTop.length === 0 && tabs.rightBottom.length === 0) {// Only change when tabs are loaded
        } else {
            if (tabs.left.length === 0) {
                setIsLeftContainerHidden(true);
                setIsRightContainerHidden(false);
                setIsBottomContainerHidden(false);
                setIsTopContainerHidden(false);
                setRightContainerWidth("calc(100% - 23px)");
                setleftContainerWidth("50px");
            } 
            if (tabs.rightTop.length === 0 && tabs.rightBottom.length === 0) {
                setIsRightContainerHidden(true);
                setIsLeftContainerHidden(false);
                setleftContainerWidth("calc(100% - 83px)");
                setRightContainerWidth("50px");
                setTopContainerHeight("calc(40% - 7px)");
                setBottomContainerHeight("calc(60% - 7px)");
            } 
            if (tabs.rightTop.length === 0 && !isRightContainerHidden) {
                setIsTopContainerHidden(true);
                setIsBottomContainerHidden(false);
                setTopContainerHeight("50px");
                setBottomContainerHeight("calc(100% - 57px)");
            }
            if (tabs.rightBottom.length === 0 && !isRightContainerHidden) {
                setIsBottomContainerHidden(true);
                setIsTopContainerHidden(false);
                setTopContainerHeight("calc(100% - 57px)");
                setBottomContainerHeight("50px");
            }
        }

        window.addEventListener('resize', handleWindowResize);

		const localVerticalResizeRef = verticalResizeRef.current;
        const localHorizontalResizeRef = horizontalResizeRef.current;
		if (localVerticalResizeRef) localVerticalResizeRef.addEventListener("mousedown", mouseDownVerticalHandler);
        if (localHorizontalResizeRef) localHorizontalResizeRef.addEventListener("mousedown", mouseDownHorizontalHandler);

		return () => {
            window.removeEventListener('resize', handleWindowResize);
			if (localVerticalResizeRef) localVerticalResizeRef.removeEventListener("mousedown", mouseDownVerticalHandler);
            if (localHorizontalResizeRef) localHorizontalResizeRef.removeEventListener("mousedown", mouseDownHorizontalHandler);
		};
    }, [isLeftContainerHidden, isRightContainerHidden, isTopContainerHidden, isBottomContainerHidden, tabs]);

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
            <div className="flex flex-col w-screen" style={{height: "calc(100vh - 64px)"}}>
                <div className='flex gap-1 w-full h-full'>
                    <div className="ml-4 my-4" style={{width: leftContainerWidth}} ref={leftContainerRef}>
                        <Container
                            tabs={tabs.left}
                            onDrop={moveTab}
                            containerId="left"
                            selectTab={selectTab}
                            selectedTabId={selectedTabs.left}
                            isVerticalHidden={isLeftContainerHidden}
                            isHorizontalHidden={false}
                        />
                    </div>
                    <div className='flex items-center justify-center grow-0 shrink-0 mt-4 w-[6px] cursor-ew-resize hover:bg-blueFrida-500 rounded-lg transition' style={{height: `calc(100% - 32px)`}} ref={verticalResizeRef}>
                        <span
                            className="block h-8 w-[2px] bg-gray-400"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="flex gap-1 flex-col mr-4 my-4" style={{width: rightContainerWidth}} ref={rightContainerRef}>
                        <div style={{height: topContainerHeight}} ref={topContainerRef}>
                            <Container
                                tabs={tabs.rightTop}
                                onDrop={moveTab}
                                containerId="rightTop"
                                selectTab={selectTab}
                                selectedTabId={selectedTabs.rightTop}
                                isVerticalHidden={isRightContainerHidden}
                                isHorizontalHidden={isTopContainerHidden}
                            />
                        </div>
                        <div className='flex items-center justify-center h-[6px] w-full cursor-ns-resize hover:bg-blueFrida-500 rounded-lg transition' ref={horizontalResizeRef}>
                            <span
                                className="block h-[2px] w-8 bg-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <div style={{height: bottomContainerHeight}} ref={bottomContainerRef}>
                            <Container
                                tabs={tabs.rightBottom}
                                onDrop={moveTab}
                                containerId="rightBottom"
                                selectTab={selectTab}
                                selectedTabId={selectedTabs.rightBottom}
                                isVerticalHidden={isRightContainerHidden}
                                isHorizontalHidden={isBottomContainerHidden}
                            />
                        </div>
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


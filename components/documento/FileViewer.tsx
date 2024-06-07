"use client";

import { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import ContextMenu from "@/components/documento/ContextMenu";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

const options = {
	cMapUrl: "/cmaps/",
	standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

interface FileViewerProps {
    documentUrl: string;
}

export default function FileViewer({ documentUrl } : FileViewerProps) {
	const [file, setFile] = useState<PDFFile>(documentUrl);
	const [numPages, setNumPages] = useState<number>();
	const containerRef = useRef<HTMLElement>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedText, setSelectedText] = useState("");
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
	const [width, setWidth] = useState<number>(0);
	const [scale, setScale] = useState<number>(1);

	useEffect(() => {
		const handleResize = (entries: any) => {
			for (let entry of entries) {
				setWidth(entry.contentRect.width);
			}
		};

		const resizeObserver = new ResizeObserver(handleResize);

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, [containerRef]);

	function onDocumentLoadSuccess({
		numPages: nextNumPages,
	}: PDFDocumentProxy): void {
		setNumPages(nextNumPages);
	}

	const nextPage = () => {
		if (currentPage < (numPages ?? 0)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleRightClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	): void => {
		event.preventDefault();
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			setSelectedText(selection.toString());
			setMenuVisible(true);
			setMenuPosition({
				x: event.clientX,
				y: event.clientY,
			});
		}
	};

	const handleCloseMenu = (): void => {
		setMenuVisible(false);
	};

	const removeTextLayerOffset = () => {
		const textLayers = document.querySelectorAll(
			".react-pdf__Page__textContent",
		);
		textLayers.forEach((layer: any) => {
			const { style } = layer;
			style.top = "0";
			style.left = "0";
			style.transform = "";
		});
	};

	return (
		<div onContextMenu={handleRightClick} className="relative w-full">
			<div>
				<div className="sticky top-0 z-20 flex h-6 w-full justify-around gap-2 bg-[#f8f8f9]">
                <div className="flex">
						<button onClick={prevPage} disabled={currentPage === 1}>
                            <ChevronLeft size={18} className={cn({ "opacity-30": currentPage === 1 })} />
                        </button>
                        <p className="mx-2">{currentPage} / {numPages}</p>
						<button onClick={nextPage} disabled={currentPage === numPages}>
                            <ChevronRight size={18} className={cn({ "opacity-30": currentPage === numPages })} />
                        </button>
					</div>
                    <div>
						<button
							onClick={() =>
								setScale((prev) => {
									if (prev >= 1.5) {
										return prev;
									}
									return prev + 0.1;
								})
							}
							disabled={scale >= 1.5}
						>
							<ZoomIn
								size={24}
								className={cn({ "opacity-30": scale >= 1.5 })}
							/>
						</button>
						<button
							onClick={() =>
								setScale((prev) => {
									if (prev <= 1) {
										return prev;
									}
									return prev - 0.1;
								})
							}
							disabled={scale <= 1}
						>
							<ZoomOut
								size={24}
								className={cn({ "opacity-30": scale <= 1 })}
							/>
						</button>
					</div>
				</div>
				{/* @ts-ignore */}
				<div ref={containerRef}>
					<ScrollArea>
						<Document
							file={file}
							onLoadSuccess={onDocumentLoadSuccess}
							options={options}
						>
							<Page
								key={`page_${currentPage}`}
								pageNumber={currentPage}
								scale={scale}
								onLoadSuccess={removeTextLayerOffset}
								width={width}
							/>
						</Document>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</div>
			{menuVisible && (
				<ContextMenu
					x={menuPosition.x}
					y={menuPosition.y}
					visible={menuVisible}
					selectedText={selectedText}
					onClose={handleCloseMenu}
				/>
			)}
		</div>
	);
}

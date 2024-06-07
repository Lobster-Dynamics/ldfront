"use client";

import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import ContextMenu from "@/components/documento/ContextMenu";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

const options = {
	cMapUrl: "/cmaps/",
	standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

export default function FileViewer() {
	const [file, setFile] = useState<PDFFile>("example.pdf");
	const [numPages, setNumPages] = useState<number>();
	const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedText, setSelectedText] = useState("");
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

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
        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
          textLayers.forEach((layer: any) => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
      }

	return (
		<div onContextMenu={handleRightClick}>
			<div>
				<div
					ref={setContainerRef}
				>
					<button onClick={prevPage}>Página anterior</button>
					<button onClick={nextPage}>Siguiente página</button>
					<Document
						file={file}
						onLoadSuccess={onDocumentLoadSuccess}
						options={options}
					>
						<Page
							key={`page_${currentPage}`}
							pageNumber={currentPage}
							scale={1.5}
                            onLoadSuccess={removeTextLayerOffset}
						/>
					</Document>
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

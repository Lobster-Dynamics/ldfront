import React, { useEffect, useRef, useState } from "react";
import { ExplicacionFragmento } from "@/types/ModelTypes";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExplicacionProps {
	id: string;
	explicaciones: ExplicacionFragmento[];
}

export default function Explicacion({ id, explicaciones }: ExplicacionProps) {
	const [explicacion, setExplicacion] = useState<ExplicacionFragmento>(
		explicaciones[0],
	);
	const toolTipRef = useRef<HTMLDivElement>(null);
	const [toolTipWidth, setToolTipWidth] = useState<number>(0);

	const handleClickbutton = (explicacion: ExplicacionFragmento): void => {
		setExplicacion(explicacion);
	};

	useEffect(() => {
		if (toolTipRef.current) {
			// Inicializa el ancho inicialmente
			setToolTipWidth(toolTipRef.current.offsetWidth);

			// Función callback para ResizeObserver
			const handleResize = (entries: any) => {
				for (let entry of entries) {
					setToolTipWidth(entry.target.offsetWidth);
				}
			};

			// Crea una instancia de ResizeObserver y pasa la función callback
			const resizeObserver = new ResizeObserver(handleResize);

			// Observa el elemento actual
			resizeObserver.observe(toolTipRef.current);

			// Limpieza: desconecta el ResizeObserver cuando el componente se desmonte
			return () => resizeObserver.disconnect();
		}
	}, [toolTipRef]);

	return (
		<div
			className="relative flex h-full w-full flex-row overflow-y-auto"
			data-test-id="explanationComponent"
		>
			<div className="relative w-4/12" ref={toolTipRef}>
				<ScrollArea className="h-full">
					<ul className="relative w-full space-y-2 rounded-md" data-test-id="explanationTooltip">
						{explicaciones.map((explicacion, index) => (
							<TooltipProvider key={index}>
								<Tooltip>
									<TooltipTrigger
										asChild
										className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-md px-4 py-2 hover:bg-purple-200"
										onClick={() =>
											handleClickbutton(explicacion)
										}
										style={{
											width: `${toolTipWidth}px`,
										}}
									>
										<li data-test-id="explanationToolTipTrigger">{explicacion.titulo}</li>
									</TooltipTrigger>

									<TooltipContent>
										<p data-test-id="explanationToolTipContent">{explicacion.titulo}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</ul>
					<ScrollBar />
				</ScrollArea>
				<div className="absolute inset-y-0 right-0 w-px bg-gray-300"></div>
			</div>
			<div className="h-full w-8/12 pl-5">
				<ScrollArea className="h-full">
					<h2 className="mx-2 mb-10 mt-4 font-mono text-2xl font-bold" data-test-id="explanationContentTitle">
						{explicacion.titulo}
					</h2>
					<p className="mx-2 mb-4 font-mono text-xl" data-test-id="explanationContentText">
						{explicacion.texto}
					</p>
					<ScrollBar />
				</ScrollArea>
			</div>
		</div>
	);
}

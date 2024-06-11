import React, { useState } from "react";
import { ExplicacionFragmento } from "@/types/ModelTypes";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  
interface ExplicacionProps {
    id: string;
    explicaciones: ExplicacionFragmento[];
}

export default function Explicacion({ id, explicaciones }: ExplicacionProps) {
    const [explicacion, setExplicacion] = useState<ExplicacionFragmento>(explicaciones[0]);


    const handleClickbutton = (explicacion: ExplicacionFragmento): void => {
        setExplicacion(explicacion);
    };

    return (
        <div className="overflow-y-auto w-full h-full flex flex-row relative" data-test-id="explanationComponent">
            <div className="w-1/5 relative">
                <ScrollArea className="h-full">
                    <ul className="rounded-md p-2 w-full relative space-y-2">
                        {explicaciones.map((explicacion, index) => (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger
                                        asChild>
                                            <li
                                            className="cursor-pointer w-full rounded-md px-4 py-2 hover:bg-purple-200 overflow-hidden text-ellipsis whitespace-nowrap"
                                            onClick={() => handleClickbutton(explicacion)}
                                        >
                                            {explicacion.titulo}
                                        </li>
                                    </TooltipTrigger>
                            
                                    <TooltipContent>
                                        <p>{explicacion.titulo}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </ul>
                    <ScrollBar />
                </ScrollArea>
                <div className="absolute inset-y-0 right-0 w-px bg-gray-300"></div>
            </div>
            <div className="w-4/5 px-5 h-full">
                <ScrollArea className="h-full">
                    <h2 className="font-bold font-mono text-2xl mt-4 mb-10">{explicacion.titulo}</h2>
                    <p className="text-xl font-mono mb-4">{explicacion.texto}</p>
                    <ScrollBar />
                </ScrollArea>
                
            </div>
        </div>
    );
}


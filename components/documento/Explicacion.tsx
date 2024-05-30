import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ComboBox from "./ComboBox";
import { openContextMenuButton } from "@/utils/contextMenuFunctions";
import { ExplicacionFragmento } from "@/types/ModelTypes";
import { fetcher } from '@/config/fetcher';
import useSWR from "swr";

interface ExplicacionProps {
    id: string;
}

export default function Explicacion({ id }: ExplicacionProps) {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const { data: explicaciones, error } = useSWR<ExplicacionFragmento[]>(`/document/get_explanations/${id}`, fetcher);

    const [explicacion, setExplicacion] = useState<ExplicacionFragmento>({ titulo: "No has solicitado explicaciones.", texto: "" });

    useEffect(() => {
        if (explicaciones && explicaciones.length > 0) {
            setExplicacion(explicaciones[0]);
        } else {
            setExplicacion({ titulo: "No has solicitado explicaciones.", texto: "" });
        }
    }, [explicaciones]);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleCloseMenu = (): void => {
        setMenuVisible(false);
    };

    const handleOpenContextMenu = (): void => {
        if (explicaciones && explicaciones.length > 0) {
            openContextMenuButton(buttonRef, setMenuVisible, setMenuPosition);
        }
    };

    return (
        <div className="p-10 overflow-y-auto w-full">
            <button 
                ref={buttonRef} 
                onClick={() => openContextMenuButton(
                    buttonRef,
                    setMenuVisible,
                    setMenuPosition,)
                }
                className="w-auto flex items-center bg-gray-200 rounded-lg justify-start gap-2 px-2 py-2 hover:bg-purple-200">
                Fragmentos
            </button>
            {menuVisible && (
                <ComboBox 
                    visible={menuVisible} 
                    x={menuPosition.x} 
                    y={menuPosition.y} 
                    onClose={handleCloseMenu} 
                    explicaciones={explicaciones} 
                    setExplicacion={setExplicacion} 
                />
            )}
            <h2 className="font-bold font-mono text-2xl mt-4 mb-10">{explicacion.titulo}</h2>
            <p className="text-xl font-mono mb-4">{explicacion.texto}</p>
        </div>
    );
}

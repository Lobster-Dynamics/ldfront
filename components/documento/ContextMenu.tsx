import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { toggleModalDefinicion,setModalDefinicionDetails,toggleModalExplicacionFragmento,setModalExplicacionFragmento  } from "@/redux/slices/modalSlice";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { useSearchParams } from "next/navigation";

interface ContextMenuProps {
    visible: boolean;
    x: number;
    y: number;
    onClose: () => void;
    selectedText: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    visible,
    x,
    y,
    onClose,
    selectedText,
}) => {
    const dispatch = useDispatch();
    const [verSignificado, setVerSignificado] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); // Referencia para el contenedor del menú
    const searchParams = useSearchParams();
    const docid = searchParams?.get("id") ?? "";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setVerSignificado(false);
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [onClose]);

    const copyToClipboard = async () => {
        if (selectedText) {
            await navigator.clipboard.writeText(selectedText);
            onClose();
        }
    };

    const handleModalExplicacion = async () => {
        const config = axiosConfig();
        if (!config) return;

        try {
            const response = await axiosClient.post(`/document/get_explanation`,{id: docid, query: selectedText}, config);
            const explicacion = response.data["msg"];

            dispatch(toggleModalExplicacionFragmento());
            dispatch(setModalExplicacionFragmento({explication: explicacion}));
            onClose();
        } catch (error) {
            console.error("Error fetching explication:", error);
        }
    };

    const verDefinicion = selectedText.trim() !== "" && selectedText.split(" ").length === 1;
    const verExplicacion = selectedText.trim() !== "" && selectedText.split(" ").length > 1;


    if (!visible) return null;

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            style={{ position: "fixed", top: `${y}px`, left: `${x}px` }}
            className="relative"
        >
            <ul className="rounded border bg-white shadow-lg">
                {selectedText.trim() !== "" && (
                    <li
                        className="cursor-pointer px-4 py-2 hover:bg-blueFrida-300"
                        onClick={copyToClipboard}
                    >
                        Copiar
                    </li>
                )}
                {verDefinicion && (
                    <li
                        className="cursor-pointer px-4 py-2 hover:bg-blueFrida-300"
                        onClick={() => setVerSignificado(!verSignificado)}
                    >
                        Definiciones
                    </li>)
                }
                {verExplicacion && (
                    <li 
                        className="cursor-pointer px-4 py-2 hover:bg-blueFrida-300"
                        onClick={handleModalExplicacion}
                    >
                        Explicar
                    </li>
                )}
            </ul>
            {verSignificado && (
                <ul
                    className="absolute top-16 left-28 rounded border bg-white "
                >
                    <li className="cursor-pointer hover:bg-blueFrida-300 px-4 py-2" onClick={() => {
                        dispatch(toggleModalDefinicion())
                        dispatch(setModalDefinicionDetails({ word: selectedText, language: "es" }))
                    }}> Español </li>
                    <li className="cursor-pointer hover:bg-blueFrida-300 px-4 py-2" onClick={() => {
                        
                        dispatch(toggleModalDefinicion())
                        dispatch(setModalDefinicionDetails({ word: selectedText, language: "en" }))
                    }}



                    > Ingles </li>
                </ul>
            )}
        </div>,
        document.getElementById("portal-root")!,
    );
};

export default ContextMenu;

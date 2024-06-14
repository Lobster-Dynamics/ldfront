import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { toggleModalDefinicion, setModalDefinicionDetails, toggleModalExplicacionFragmento, setModalExplicacionFragmento } from "@/redux/slices/modalSlice";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { useSearchParams } from "next/navigation";
import { mutate } from "swr";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    const [hide, setHide] = useState(false);
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

        const toastId = toast.info("Cargando explicación", {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#ffffff",
                border: "1px solid #7B20C3",
                color: "#AC73D9",
            },
            progressStyle: {
                background: "#7B20C3",
            },
            icon: (
                <span role="img" aria-label="light'bulb">
                    💡
                </span>
            ),
        });

        toastId
        setHide(true);
        try {
            const response = await axiosClient.post(`/document/get_explanation`, { id: docid, query: selectedText }, config);
            const explicacion = response.data["msg"];

            dispatch(toggleModalExplicacionFragmento());
            dispatch(setModalExplicacionFragmento({ explication: explicacion }));
            mutate(`/document/get_explanations/${docid}`)
            toast.dismiss(toastId);
            setHide(false);
            onClose();
        } catch (error) {
            console.error("Error fetching explication:", error);
            toast.update(toastId, {
                render: "Failed to load explanation.",
                autoClose: 5000,
            });
            setHide(false); 
            onClose();
        }
    };

    const verDefinicion = selectedText.trim() !== "" && selectedText.split(" ").length === 1;
    const verExplicacion = selectedText.trim() !== "" && selectedText.split(" ").length > 1;

    if (!visible) return null;

    return ReactDOM.createPortal(
        <div>
            <div
                ref={menuRef}
                style={{ position: "fixed", top: `${y}px`, left: `${x}px` }}
                className={` ${hide ? "hidden" : ""} relative z-10`}
            >
                <ul className="rounded border bg-white shadow-lg">
                    {selectedText.trim() !== "" && (
                        <li
                            className="cursor-pointer px-4 py-2 hover:bg-blueFrida-300"
                            onClick={copyToClipboard}
                            data-test-id="copyToClipboardButton"
                        >
                            Copiar
                        </li>
                    )}
                    {verDefinicion && (
                        <li
                            className="cursor-pointer px-4 py-2 hover:bg-blueFrida-300"
                            onClick={() => setVerSignificado(!verSignificado)}
                            data-test-id="viewDefinitionButton"
                        >
                            Definiciones
                        </li>)
                    }
                    {verExplicacion && (
                        <li
                            className="cursor-pointer px-4 py-2 hover:bg-blueFrida-300"
                            onClick={handleModalExplicacion}
                            data-test-id="viewExplanationButton"
                        >
                            Explicar
                        </li>
                    )}
                </ul>
                {verSignificado && (
                    <ul
                        className="absolute top-16 left-28 rounded border bg-white "
                    >
                        <li
                            className="cursor-pointer hover:bg-blueFrida-300 px-4 py-2"
                            onClick={() => {
                                dispatch(toggleModalDefinicion())
                                dispatch(setModalDefinicionDetails({ word: selectedText, language: "es" }))
                            }}
                            data-test-id="viewDefinitionButtonSP"
                        > Español </li>
                        <li className="cursor-pointer hover:bg-blueFrida-300 px-4 py-2" onClick={() => {

                            dispatch(toggleModalDefinicion())
                            dispatch(setModalDefinicionDetails({ word: selectedText, language: "en" }))
                        }}
                            data-test-id="viewDefinitionButtonEN"
                        > Ingles </li>
                    </ul>
                )}
            </div>
            <ToastContainer />
        </div>,
        document.getElementById("portal-root")!,
    );
};

export default ContextMenu;


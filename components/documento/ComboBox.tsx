import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { toggleModalDefinicion, setModalDefinicionDetails, toggleModalExplicacionFragmento, setModalExplicacionFragmento } from "@/redux/slices/modalSlice";
import { useSearchParams } from "next/navigation";
import { ExplicacionFragmento } from "@/types/ModelTypes";

interface ComboBoxProps {
    visible: boolean;
    x: number;
    y: number;
    onClose: () => void;
    explicaciones: ExplicacionFragmento[] | undefined;
    setExplicacion: Dispatch<SetStateAction<ExplicacionFragmento>>;
}

const ComboBox: React.FC<ComboBoxProps> = ({
    visible,
    x,
    y,
    onClose,
    explicaciones,
    setExplicacion
}) => {
    const dispatch = useDispatch();
    const [verSignificado, setVerSignificado] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const docid = searchParams?.get("id") ?? "";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [onClose]);

    const handleClickbutton = (explicacion: ExplicacionFragmento): void => {
        setExplicacion(explicacion);
        onClose();
    };

    if (!visible || !explicaciones) return null;

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            style={{ position: "fixed", top: `${y}px`, left: `${x}px` }}
            className="relative"
        >
            <ul className="rounded border bg-gray-200 shadow-lg">
                {explicaciones.map((explicacion, index) => (
                    <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-purple-200"
                        onClick={() => handleClickbutton(explicacion)}
                    >
                        {explicacion.titulo}
                    </li>
                ))}
            </ul>
        </div>,
        document.getElementById("portal-root")!
    );
};

export default ComboBox;

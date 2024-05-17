import React, { useState, useRef } from "react";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import ContextMenu from './ContextMenu'; 
import ModalDefinicion from "./ModalDefinition";
interface PaperProps {
    title: string;
    parse: string[];
}

const Paper: React.FC<PaperProps> = ({ title, parse }) => {
    const [images, setImages] = useState<boolean>(true);
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [selectedText, setSelectedText] = useState<string>('');
    const textAreaRef = useRef<HTMLDivElement>(null);

    console.log(parse)

    const toggleImages = (): void => {
        setImages(!images);
    };

    const isUrl = (text: string): boolean => {
        try {
            new URL(text);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            setSelectedText(selection.toString());
            setMenuVisible(true);
            setMenuPosition({
                x: event.clientX,
                y: event.clientY
            });
        }
    };

    const handleCloseMenu = (): void => {
        setMenuVisible(false);
    };

    return (
        <div ref={textAreaRef} className="custom-text-selection relative p-10 overflow-y-auto w-full" onContextMenu={handleRightClick}>
            <ContextMenu visible={menuVisible} x={menuPosition.x} y={menuPosition.y} onClose={handleCloseMenu} selectedText={selectedText} />
            <div className="absolute top-0 right-0 mr-4 flex flex-col items-center mb-3">
                <label htmlFor="Imagenes" className="text-gray-500 mb-2">Imágenes</label>
                <Switch
                    checked={images}
                    onChange={toggleImages}
                    className={`switch ${images ? `bg-purple-600` : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span className={`${images ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
            </div>
            <h1 className="font-bold font-mono text-2xl mb-10">{title}</h1>
            {parse.map((paragraph, index) => (
                isUrl(paragraph) && images ? (
                    <div key={index} className="mb-4">
                        <Image src={paragraph} alt={`Image at index ${index}`} className="w-2/3" width={500} height={300} layout="responsive" />
                    </div>
                ) : (
                    !isUrl(paragraph) && (
                        <p key={index} className="text-xl font-mono mb-4">
                            {paragraph}
                        </p>
                    )
                )
            ))}
        </div>
    );
};

export default Paper;


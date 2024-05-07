import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Switch } from "@headlessui/react";

interface Paperprops {
    title: string;
    parse: string[];
}

export default function Paper({ title, parse }: Paperprops) {

    const [images, setImages] = useState(true);

    const toggleImages = () => {
        setImages(!images);
    }

    const isUrl = (text: string) => {
        try {
            new URL(text);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <div className="relative p-10 overflow-y-auto w-full">
            <div className="absolute top-0 right-0 mr-4 flex flex-col items-center mb-3" >
                <label htmlFor="Imagenes" className="text-gray-500  mb-2">
                 Imagenes 
                </label>

                <Switch
                  checked={images}
                  onChange={toggleImages}
                  className={`switch ${
                    images ? `bg-purple-600` : "bg-gray-200"
                  } relative inline-flex h-6 lg:h-8 w-11 lg:w-16 items-center rounded-full`}
                >
                  <span
                    className={`${
                     images 
                        ? "translate-x-6 lg:translate-x-10"
                        : "translate-x-1"
                    } inline-block h-4 lg:h-5 w-4 lg:w-5 transform rounded-full bg-white transition`}
                  />
                </Switch>
            </div>
            <h1 className="font-bold font-mono text-2xl mb-10">
                {title}
            </h1>
            {parse.map((paragraph, index) => {
                if (isUrl(paragraph) && images) {
                    // Imagen 
                    return (
                        <div key={index} className="mb-4">
                            <Image src={paragraph} alt={`Image at index ${index}`} className="w-2/3" width={500} height={300} layout="responsive" />
                        </div>
                    );
                } if( !isUrl(paragraph)) {
                    // Parrafo 
                    return (
                        <p key={index} className="text-xl font-mono mb-4">
                            {paragraph}
                        </p>
                    );
                }
            })}
        </div>

    );
}

import React from "react";
import Image from "next/image";

interface Paperprops {
    title: string;
    parse: string[];
}

export default function Paper({ title, parse }: Paperprops) {

    const isUrl = (text: string) => {
        try {
            new URL(text);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <div className="p-10 overflow-y-auto w-full">
            <h1 className="font-bold font-mono text-2xl mb-10">
                {title}
            </h1>
            {parse.map((paragraph, index) => {
                if (isUrl(paragraph)) {
                    // Imagen 
                    return (
                        <div key={index} className="mb-4">
                            <Image src={paragraph} alt={`Image at index ${index}`} className="w-2/3" width={500} height={300} layout="responsive" />
                        </div>
                    );
                } else {
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

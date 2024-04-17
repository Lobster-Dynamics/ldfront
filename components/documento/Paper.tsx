import React from "react";

interface Paperprops {
    title: string;
    parse: string[];
}

export default function Paper({ title, parse }: Paperprops) {
    
    return (
        <div className="p-10 overflow-y-auto w-full">
            <h1 className="font-bold font-mono text-2xl mb-10">
                {title}
            </h1>
            {parse.map((paragraph:string,index:any) => (
                <p key={index} className="text-xl font-mono mb-4">
                    {paragraph}
                </p>
            ))}
        </div>

    );
}

import { WordDefinition } from "@/types/ModelTypes";
import React from "react";

interface DicProps {
    WordDef: WordDefinition
}
export default function DicLi({ WordDef }: DicProps){

    return(
        <div className="">
            <ul className="list-disc">
                <li className="text-1xl font-medium">{WordDef.Definition}</li>
                <ul className="list-square list-inside ml-8" style={{ listStyleType: 'square' }}>
                    {WordDef.examples.map((examples, i) => (
                        <li className="text-sm" key={i}>{examples}</li>
                    ))}
                </ul>
            </ul>
        </div>

        // <div className="flex">
        //     <ul className="list-disc list-outside">
        //         <li className="text-1xl text-semibold">{WordDef.Definition}</li>
        //     </ul>
        //     <ul className="list-inside ml-4 flex-grow" style={{ listStyleType: 'square' }}>
        //         {WordDef.examples.map((examples, index) => (
        //             <li key={index} className="text-sm">{examples}</li>
        //         ))}
        //     </ul>
        // </div>
    );
} 
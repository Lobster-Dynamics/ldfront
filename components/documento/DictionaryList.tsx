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

            );
} 

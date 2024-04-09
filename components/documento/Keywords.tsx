import { Plus, X } from "lucide-react";
import { Lobster } from "next/font/google";

interface KeywordsProps {
    keywords: string[];
}

export default function Keywords({ keywords }: KeywordsProps) {

    return (
        <div className="flex flex-wrap  p-6 ">
            {keywords.map((keyword) => (
                <Keyword keyword={keyword} />
            ))}
            <button className="bg-gray-200 my-2 rounded-3xl p-2">
                <Plus className="text-white" />
            </button>

        </div>
    );
}


interface KeywordProps {
    keyword: string;
}

const Keyword = ({ keyword }: KeywordProps) => {
    return (
        <>
            <div className="group bg-gray-200 my-2 font-mono hover:bg-purple-200 items-start flex rounded-2xl shadow-sm flex-row px-3 py-2 font-medium mr-4">
                <button className="text-black">{keyword}</button>
                <button>
                    <X className="ml-3 text-red-500 opacity-0 group-hover:opacity-100" style={{ cursor: "url('Lobster.cur'), auto" }} />
                </button>
            </div>

        </>
    );
};


import { toggleModalBorrar, toggleModalAñadirConcepto, toggleModalDefinicion } from "@/redux/slices/modalSlice";
import { Plus, X } from "lucide-react";
import { KeyConcept } from "@/types/ModelTypes";
import { useDispatch } from "react-redux";
import { setModalBorrarDetails } from "@/redux/slices/modalSlice";
import { toggleModalKeyConcept, setModalKeyConcept } from "@/redux/slices/modalSlice";


interface KeywordsProps {
    keywords: KeyConcept[];
    documentId: string;
}

export default function Keywords({ keywords, documentId }: KeywordsProps) {


    const dispatch = useDispatch();

    return (
        <div className="flex flex-wrap  p-6 ">
            {keywords.map((keyword) => (
                <Keyword keyword={keyword.name} documentId={documentId} id={keyword.id} key={keyword.id} keyconcept={keyword} />))}
        </div>
    );
}

interface KeywordProps {
    id: string;
    keyconcept: KeyConcept;
    keyword: string;
    documentId: string;
}

const Keyword = ({ keyword, id, documentId, keyconcept }: KeywordProps) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="group my-2 mr-4 flex flex-row items-start rounded-2xl bg-gray-200 px-3 py-2 font-mono font-medium shadow-sm hover:bg-blueFrida-300" data-test-id="keywordsComponent">
                <button className="text-black hover:underline"
                    onClick={() => {
                        dispatch(setModalKeyConcept({ keyConcept: keyconcept }))
                        dispatch(toggleModalKeyConcept())
                    }}


                >
                    {keyword}
                </button>

                <button
                    onClick={() => {
                        dispatch(setModalBorrarDetails({ id: id, documentId: documentId }))
                        dispatch(toggleModalBorrar())
                    }}

                >
                    <X
                        className="ml-3 text-redFrida-400 opacity-0 group-hover:opacity-100"
                        style={{ cursor: "url('Lobster.cur'), auto" }}
                    />
                </button>
            </div>
        </>
    );
};

import Modal from "@/components/ui/Modal";
import { toggleModalDefinicion } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSWR from "swr";
import { Dictionary } from "@/types/ModelTypes";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ModalDefinicion() {
    const { isOpen, word, language } = useSelector((state: RootState) => state.modal.modalDefinicion);
    const url = `${process.env.NEXT_PUBLIC_DICTIONARY_URL}/meaning?word=${encodeURIComponent(word)}&lang=${encodeURIComponent(language)}`;
    const { data: dictionary, error } = useSWR<Dictionary>(url, fetcher);
    
    const dispatch = useDispatch();

    const meanings = dictionary?.meanings ?? [];

    return (
        <Modal 
            active={isOpen} 
            setActive={() => dispatch(toggleModalDefinicion())} 
            className="relative max-h-96 w-1/2 min-w-96 max-w-[600px] overflow-y-auto px-8 py-4"
        >
            <div className="sticky -top-4 -mt-4 mb-4 grid grid-cols-2 border-b bg-white pt-4">
                <h1 className="text-start text-2xl leading-loose">Diccionario</h1>
                <button
                    onClick={() => dispatch(toggleModalDefinicion())}
                    className="w-fit text-red-500  text-1xl justify-self-end"
                >
                    Cerrar
                </button>
            </div>
            <hr className="mb-4" />

            <h1 className="text-2xl text-start font-bold">{word}</h1>
            {meanings.length > 0 ? (
                <div className="ml-5 flex flex-col justify-start w-full text-start items-start space-y-2">
                    {meanings.slice(0, 5).map((meaning, index) => (
                        <p key={index} className="text-mono text-sm font-medium" data-test-id="definitionItemParagraph">
                            {meaning}
                        </p>
                    ))}
                </div>
            ) : (
                <p>No se encontro ninguna definición</p>
            )}

            <p className="text-mono text-xs text-end font-bold mt-4">
                {`Lobster Dictionary "${language}" edition`}
            </p> 
        </Modal>
    );
}


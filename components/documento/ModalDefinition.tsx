import Modal from "@/components/ui/Modal";
import { toggleModalDefinicion } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSWR from "swr";
import { Dictionary } from "@/types/ModelTypes";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ModalDefinicion() {
    const { isOpen, word, language } = useSelector((state: RootState) => state.modal.modalDefinicion);
    const url = `http://140.84.175.1:5000/meaning?word=${encodeURIComponent(word)}&lang=${encodeURIComponent(language)}`;
    const { data: dictionary, error } = useSWR<Dictionary>(url, fetcher);
    
    const dispatch = useDispatch();

    const meanings = dictionary?.meanings ?? [];

    return (
        <Modal 
            active={isOpen} 
            setActive={() => dispatch(toggleModalDefinicion())} 
            className="w-1/3 px-8 py-4"
        >
            <div className="grid grid-cols-2 mb-4">
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
                        <p key={index} className="text-mono text-sm font-medium">
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


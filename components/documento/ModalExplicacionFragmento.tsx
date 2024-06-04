import Modal from "@/components/ui/Modal";
import { toggleModalDefinicion, toggleModalExplicacionFragmento } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSWR from "swr";
import { Dictionary } from "@/types/ModelTypes";


export default function ModalExplicacionFragmento() {
    const { isOpen, explication } = useSelector((state: RootState) => state.modal.modalExplicacionFragmento);
    
    
    const dispatch = useDispatch();


    return (
        <Modal 
            active={isOpen} 
            setActive={() => dispatch(toggleModalExplicacionFragmento())} 
            className="w-1/3 px-8 py-4"
        >
            <div className="grid grid-cols-2 mb-4">
                <h1 className="text-start text-2xl leading-loose">Explicación</h1>
                <button
                    onClick={() => dispatch(toggleModalExplicacionFragmento())}
                    className="w-fit text-red-500  text-1xl justify-self-end"
                >
                    Cerrar
                </button>
            </div>
            <hr className="mb-4" />

            {explication.length > 0 ? (
                <div className="flex flex-col justify-start w-full text-start items-start space-y-2">
                    <p className="text-mono text-lg font-medium">
                            {explication}
                        </p>
                </div>
            ) : (
                <p>No se encontro ninguna explicación.</p>
            )}

        </Modal>
    );
}


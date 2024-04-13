import Modal from "@/components/ui/Modal";
import { toggleModalDefinicion } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { definitionData } from "@/utils/constants";
import DicLi from "./DictionaryList";

export default function ModalDefinicion() {

    const dispatch = useDispatch();

    const { modalDefinicion } = useSelector((state: RootState) => state.modal);

    return (
        <Modal 
            active={modalDefinicion} 
            setActive={() => dispatch(toggleModalDefinicion())} 
            className="w-1/3 px-8 py-4"
        >
                <div className="grid grid-cols-2">
                    <h1 className="text-start font-mono text-2xl leading-loose">
                        Dictionary
                    </h1>
                    <button
                        onClick={() => {dispatch(toggleModalDefinicion())
                        }}
                        className="w-fit text-red-500 font-mono text-1xl justify-self-end"
                    >
                        Cerrar
                    </button>
                    
                </div>
                
				<hr />
                <div className="flex  justify-start w-full text-start items-start">

                <DicLi WordDef={definitionData}/>
                </div>

                <p className="text-mono text-xs text-end font-bold">Cambridge Dictionary</p>

        </Modal>
    );
}
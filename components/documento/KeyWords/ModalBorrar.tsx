import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/ui/Modal";
import { toggleModalBorrar } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { errorHandler } from "@/utils/errorHandler";
import { mutate } from "swr";

export default function ModalBorrar() {
    const dispatch = useDispatch();

    const { isOpen, id, documentId } = useSelector((state: RootState) => state.modal.modalBorrar);

    const handleDelete = async () => {
        try {

            const config = axiosConfig(false);

            if (!config) return

            await axiosClient.delete(`/document/delete_key_concept/${documentId}/${id}`, config)

            mutate(`/document/get_document/${documentId}`)

            dispatch(toggleModalBorrar());
        } catch (error:any) {
            errorHandler(error)
        }
    };

    return (
        <Modal
            active={isOpen}
            setActive={() => dispatch(toggleModalBorrar())}
            className="w-1/3 p-8"
        >
            <h1 className="text-start font-mono text-4xl leading-loose">
                ¿Esta seguro de que desea eliminar este concepto?
            </h1>
            <div className="flex justify-end mt-8">
                <div className="flex w-1/2 justify-between">
                    <button
                        className="font-mono text-2xl text-red-500"
                        onClick={() => {
                            dispatch(toggleModalBorrar());
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        className="font-mono text-2xl text-purple-500"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </Modal>
    );
}


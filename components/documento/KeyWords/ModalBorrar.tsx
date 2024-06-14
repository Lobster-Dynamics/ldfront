import React from "react";
import Modal from "@/components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
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

            if (!config) return;

            await axiosClient.delete(`/document/delete_key_concept/${documentId}/${id}`, config);

            mutate(`/document/get_document/${documentId}`);

            dispatch(toggleModalBorrar());
        } catch (error: any) {
            errorHandler(error);
        }
    };

    return (
        <Modal
            active={isOpen}
            setActive={() => dispatch(toggleModalBorrar())}
            className="w-[600px] p-6 bg-white rounded-lg shadow-lg"
        >
            <div className="flex items-start text-start text-2xl font-semibold text-gray-700 mb-4">
                <h2>¿Está seguro de que desea eliminar este concepto?</h2>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-red-500 text-white  rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => dispatch(toggleModalBorrar())}
                >
                    Cancelar
                </button>
                <button
                    className="ml-4 px-4 py-2  bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
            </div>
        </Modal>
    );
}


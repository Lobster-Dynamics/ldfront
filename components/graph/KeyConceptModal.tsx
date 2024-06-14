import React from "react";
import Modal from "@/components/ui/Modal";
import { KeyConcept } from "@/types/ModelTypes";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalKeyConcept } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";


export const KeyConceptModal = () => {

    const dispatch = useDispatch();

    const {isOpen, keyConcept} = useSelector((state: RootState) => state.modal.modalKeyConcept);
    return (
        <>
            <Modal
                className="w-[600px] p-6 bg-white rounded-lg shadow-lg"
                active={isOpen}
                setActive={ () => {dispatch(toggleModalKeyConcept())}}
            >
                <div className="flex flex-col text-start">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4" data-test-id="graphKeyConceptModalTitle">
                        {keyConcept?.name}
                    </h2>
                     <hr className="mb-4 text-black" />
                    <p className="text-lg text-gray-600 font-light ">
                        {keyConcept?.description}
                    </p>
                    <div className="mt-6 self-end">
                        <button
                            className="px-4 py-2 font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                            onClick={() => {dispatch(toggleModalKeyConcept())}}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}


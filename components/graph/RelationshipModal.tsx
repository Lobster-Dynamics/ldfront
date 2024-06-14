import React from "react";
import Modal from "@/components/ui/Modal";
import { Relationship, KeyConcept } from "@/types/ModelTypes";
import { MoveRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalKeyConcept } from "@/redux/slices/modalSlice";
import { setModalKeyConcept } from "@/redux/slices/modalSlice";

export interface RelationshipModalProps {
    active: boolean;
    setActive: any;
    fatherConcept: KeyConcept;
    childConcept: KeyConcept;
    relationship: Relationship;
};

export const RelationshipModal = ({
    fatherConcept,
    childConcept,
    relationship,
    active,
    setActive
}: RelationshipModalProps) => {
    const dispatch = useDispatch();

    return (
        <>
            <Modal
                className="w-[600px] p-6 bg-white rounded-lg shadow-lg"
                active={active}
                setActive={setActive}>
                <div className="flex  items-start text-start text-2xl font-semibold text-gray-700 mb-4" data-test-id="graphRelationshipModalContent">
                    <h2> Relacion entre <i>{fatherConcept.name}</i> y <i>{childConcept.name}</i></h2>
                </div>
                 <hr className="mb-4 text-black" />
                <p className="text-lg font-light text-gray-600 text-start ">
                    {relationship.description}
                </p>
                <div className="flex align-center items-center justify-start mt-3 self-center align-center">
                    <p className="hover:underline hover:text-purpleFrida-300" onClick={() => {
                        dispatch(toggleModalKeyConcept());
                        dispatch(setModalKeyConcept({ keyConcept: fatherConcept}));
                        setActive(false);
                    }}>{fatherConcept.name}</p>
                    <MoveRight size={40} className="text-purpleFrida-500 mx-4 " />
                    <p className=" hover:underline hover:text-purpleFrida-300"
                        onClick={() => {
                            dispatch(toggleModalKeyConcept());
                            dispatch(setModalKeyConcept({ keyConcept: childConcept}));
                            setActive(false);
                        }}
                    >{childConcept.name}</p>

                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                        onClick={() => setActive(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </>
    );
}


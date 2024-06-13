import React from "react";
import Modal from "@/components/ui/Modal";
import { KeyConcept } from "@/types/ModelTypes";

export interface KeyConceptModalProps {
    active: boolean;
    setActive: any;
    keyConcept: KeyConcept
};

export const KeyConceptModal = ({keyConcept, active, setActive}: KeyConceptModalProps) => {
    
    return (
        <>
            <Modal
                className="w-[600px]"
                active={active}
                setActive={setActive}
            >
                    <p className="text-2xl font-bold" data-test-id="graphKeyConceptModalTitle">{keyConcept.name}</p>
                    <br></br>
                    <p className="text-lg text-left">{keyConcept.description}</p>
            </Modal>
        </>
    );
}
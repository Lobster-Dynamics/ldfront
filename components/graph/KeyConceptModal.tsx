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
                active={active}
                setActive={setActive}>
                <div>
                    <p>{keyConcept.name}</p>
                    <p>{keyConcept.description}</p>
                </div>
            </Modal>
        </>
    );
}
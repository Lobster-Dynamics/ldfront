import React from "react";
import Modal from "@/components/ui/Modal";
import { Relationship, KeyConcept } from "@/types/ModelTypes";
import { ArrowRight } from "lucide-react";

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
    return (
        <>
            <Modal
                className="w-[600px]"
                active={active}
                setActive={setActive}>
                <div className="flex items-center text-2xl font-bold" data-test-id="graphRelationshipModalContent">
                    <p>{fatherConcept.name}</p>
                    <br></br>
                    <ArrowRight size={70}/>
                    <br></br>
                    <p>{childConcept.name}</p>
                </div>
                <br></br>
                <p className="text-left">{relationship.description}</p>
            </Modal>
        </>
    );
}
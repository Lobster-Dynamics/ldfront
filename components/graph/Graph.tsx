import { useState } from "react";
import { GraphCanvas, InternalGraphNode } from "reagraph";

import { KeyConcept, Relationship } from "@/types/ModelTypes";
import { KeyConceptModal } from "./KeyConceptModal";
import { RelationshipModal } from "./RelationshipModal";
import { useDispatch } from "react-redux";
import { toggleModalKeyConcept } from "@/redux/slices/modalSlice";
import { setModalKeyConcept } from "@/redux/slices/modalSlice";

export interface GraphProps  {
    key_concepts: KeyConcept[];
    relationships: Relationship[];
};

enum GraphVizState {
    VisualizingGraph, 
    VisualizingEdge, 
    VisualizingNode
}

/**
 * Takes the following aruments
 * @param key_concepts key concepts of the document
 * @param relationships relationships between key concepts of the document
 * 
 * This component is a Graph (network graph) in which each node is a 
 * key concept of a document and each edge a relationshp between two key concepts
 * the father of the relationship is the origin of each edge and the child of the relaitonship
 * is the destination of each edge 
 */
export default function GraphViz({
    key_concepts, 
    relationships
}: GraphProps) {

    const dispatch = useDispatch();

    const [graphVizState, setGraphVizState] = 
        useState<GraphVizState>(GraphVizState.VisualizingGraph);
    
    const [currentlySelectedKeyConcept, setCurrentlySelectedKeyConcept] = 
        useState<KeyConcept | null>(null);

    const [currentlySelectedRelationship, setCurrentlySelectedRelationship] = 
        useState<Relationship | null>(null);

    let conceptsMap: Map<string, KeyConcept> = 
        new Map<string, KeyConcept>();
    let relationshipsMap: Map<string, Relationship> = 
        new Map<string, Relationship>();
    
    
    // convert key concepts to nodes of the graph
    let keyConceptNodes = []
    for (let keyConcept of key_concepts) {
        keyConceptNodes.push(
            {
                id: keyConcept.id, 
                label: keyConcept.name, 
                fill: "#DBDEFF"
            }
        )
        conceptsMap.set(keyConcept.id, keyConcept);
    }

    // convert relationships to edges of the graph
    let graphEdges = []
    for (let relationship of relationships) {
        graphEdges.push(
            {
                id: relationship.id,
                source: relationship.father_concept_id, 
                target: relationship.child_concept_id,
                label: "",
                minDistance: 1200,
                size: 2 
            }
        )
        relationshipsMap.set(relationship.id, relationship);
    }

    return (
        <div className="custom-text-selection relative p-10 h-full w-full" data-test-id="graphComponent">
            <GraphCanvas
                nodes={keyConceptNodes}
                edges={graphEdges}
                onNodeClick={(node, props, event) => {
                    setGraphVizState(GraphVizState.VisualizingNode);
                    const concept = conceptsMap.get(node.id);
                    if (concept !== undefined) {
                        setCurrentlySelectedKeyConcept(concept);
                        dispatch(setModalKeyConcept({ keyConcept: concept}));
                        dispatch(toggleModalKeyConcept());
                    }

                }}
                onEdgeClick={(edge, event) => {
                    setGraphVizState(GraphVizState.VisualizingEdge);
                    const relationship = relationshipsMap.get(edge.id);
                    if (relationship !== undefined) {
                        setCurrentlySelectedRelationship(relationship);
                    }
                }}
            />

            {/** KEY CONCEPT MODAL*/}
            {currentlySelectedKeyConcept &&
                (
                    <KeyConceptModal
                    />
                )
            }

            {/** RELATIONSHIP MODAL*/}
            {currentlySelectedRelationship &&
                (
                    <RelationshipModal 
                        active={graphVizState == GraphVizState.VisualizingEdge}
                        relationship={currentlySelectedRelationship}
                        fatherConcept={conceptsMap.get(currentlySelectedRelationship.father_concept_id)!}
                        childConcept={conceptsMap.get(currentlySelectedRelationship.child_concept_id)!}
                        setActive={(some: boolean) => {
                            if (!some) {
                                setGraphVizState(GraphVizState.VisualizingGraph)
                            }
                        }}
                    />
                )

            }
        </div>
    );
}

import { Chatword, SearchItem, WordDefinition } from "@/types/ModelTypes";

export const ItemTypes = {
	TAB: 'tab',
};

export const ReactDndItemTypes = {
    FILE: "FileItemDrag",
    BREADCRUMB: "BreadCrumbDrop",
}

export const definitionData: WordDefinition = {
  Definition: "adj. existing or happening in many places and/or among many people:",
  examples: [
    "There are reports of widespread flooding in northern France.",
    "Malnutrition in the region is widespread - affecting up to 78 percent of children under five years old.",
    "The campaign has received widespread support."
  ]  
}

export const searchItems: SearchItem[] = [
    { extension: ".docx", id: "084bec09-cd21-4747-924d-ad619c5da8fe", name: "Actividad5_VR.docx" },
    { extension: ".pdf", id: "43f7afac-c345-4355-a603-d08c1534eb06", name: "SDD.SoftwareDesignDocument.pdf" },
    { extension: ".pptx", id: "f1079ca6-63f3-4c97-8f49-686467e6ba74", name: "Actividad2PresentacionPruebasU_1.pptx"},
    { extension: null, id: "b9784113-d2a2-42b5-b495-81b88947306f", name: "Folder Chido" }
]

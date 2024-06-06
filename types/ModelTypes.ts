import { UUID } from "crypto";

export interface Chatword {
	Chat: ChatDetails[];
}

export interface ChatDetails {
    mes_id: string;
	message: string;
	role: string;
}

export interface WordDefinition {
	Definition: string;
	examples: string[];
}


export interface ExplicacionFragmento{
    [key: string]: any;
    titulo: string;
    texto: string;
}

export interface UserAuth {
	token: string;
	refreshToken: string;
	name: string;
	lastname: string;
	email: string;
	rootDirectoryId: UUID;
	uid: string;
}



export interface DirectoryItemDetails {
	extension: ".docx" | ".pdf" | ".pptx" | null;
	id: UUID;
	type: "DOCUMENT" | "DIRECTORY";
	name: string;
	ownerId: string;
	ownerName: string;
    uploadDate: string;
}

export interface PathItem {
    name: string;
    id: UUID;
}

export interface DirectoryDetails {
	id: UUID;
	name: string;
	ownerId: string;
	ownerName: string;
	items: DirectoryItemDetails[];
	path: PathItem[];
    shared: boolean;
    uploadDate: string;
}

export interface Relationship {
    id: string;
    father_concept_id: string;
    child_concept_id: string;
    description: string;
}

export interface Document {
    bibliographic_info: BibliographicInfo | null; 
    extension: string;
    id: string;
    id_raw_doc: string;
    key_concepts: KeyConcept[];
    name: string;
    owner_id: string;
    parsed_llm_input: ParsedLLMInput; 
    relationships: Relationship[]; 
    summary: Summary;
    users_with_access: any[]; 
}

export interface BibliographicInfo {
    authors?: Author[]; 
    publisher?: string;
    publishment_date?: any;
    title?: string;
}

export interface Author {
    name: string;
    surnames: string[];
}

export interface KeyConcept {
    description: string;
    id: string;
    name: string;
    relationships: any[]; 
}

export interface ParsedLLMInput {
    content: string[];
    image_sections: any | null; 
}

export interface Summary {
    secctions: Section[]; 
}

export interface Section {
    body: string;
    title: string;
}

export interface Dictionary  {
    language: string; 
    meanings: string[];
    start: string;
    word: string;
}

export interface SearchItem {
    extension: ".docx" | ".pdf" | ".pptx" | null;
	id: UUID;
    name: string;
}

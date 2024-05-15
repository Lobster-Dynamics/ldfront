import { UUID } from "crypto";
import { AttributeValue, Optional, Scale, Spiral } from "react-wordcloud";
import { Props as TippyProps } from 'tippy.js';

export interface Chatword {
	Chat: ChatDetails[];
}

export interface ChatDetails {
	Message: string;
	role: string;
}

export interface Files {
	files: File[];
}

export interface File {
	name: string;
	type: string;
	extension: ".docx" | ".pdf" | ".pptx" | null;
	uuid: UUID;
	owner: string;
	uploadDate: Date;
}

export interface WordDefinition {
	Definition: string;
	examples: string[];
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
    relationships: any[] | null; 
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


export interface DirectoryDetails {
	id: UUID;
	name: string;
	ownerId: string;
	ownerName: string;
	items: DirectoryItemDetails[];
	path: PathItem[];
}

export interface PathItem {
    name: string;
    id: UUID;
}

export type Options  = {
	colors: string[];
	enableTooltip: boolean;
	deterministic: boolean;
	fontFamily: string;
	fontSizes: [number, number];
	fontStyle: string;
	fontWeight: string;
	padding: number;
	rotations: number;
	rotationAngles: [number, number];
	scale: Scale;
	transitionDuration: number;
	enableOptimizations: boolean;
	spiral: Spiral;
	svgAttributes: Record<string, AttributeValue> | undefined;
  	textAttributes: Record<string, AttributeValue> | undefined;
  	tooltipOptions: Optional<TippyProps> | undefined;
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
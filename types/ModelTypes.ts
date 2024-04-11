import { UUID } from "crypto";

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
	extension?: "docx" | "pdf" | "pptx";
	uuid: UUID
}
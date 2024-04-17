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
	name: string;
	lastname: string;
	email: string,
	rootDirectoryId: UUID,
	uid: string
}

export interface DocumentDetails {
    extension: ".docx" | ".pdf" | ".pptx" | null;
    id: string;
    name: string;
    ownerId: string;
}


export interface Chatword {
	Chat: ChatDetails[];
}

export interface ChatDetails {
	Message: string;
	role: string;
}

export interface WordDefinition {
	Definition: string;
	examples: string[];
}
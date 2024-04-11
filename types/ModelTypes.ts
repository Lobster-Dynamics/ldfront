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

export interface UserAuth {
    id: number;
    name: string;
    lname: string;
    token?: string;
}

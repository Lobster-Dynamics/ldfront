import { Chatword, Files, SearchItem, WordDefinition } from "@/types/ModelTypes";

export const ItemTypes = {
	TAB: 'tab',
};


export const chatData: Chatword = {
	Chat: [
		{ Message: "Hello! How can I assist you today?", role: "bot" },
		{ Message: "I'm having trouble logging in.", role: "user" },
		{ Message: "Did you forget your password?", role: "bot" },
		{ Message: "No, I'm sure I'm using the right password.", role: "user" },
		{ Message: "Can you try resetting your password just in case?", role: "bot" },
		{ Message: "Okay, I've reset my password and I can log in now. Thanks!", role: "user" },
		{ Message: "You're welcome! Is there anything else I can help with?", role: "bot" },
		{ Message: "Yes, how do I update my profile picture?", role: "user" },
		{ Message: "You can update your profile picture in the account settings.", role: "bot" },
		{ Message: "Found it, thanks!", role: "user" },
		{ Message: "Is there anything else I can assist you with?", role: "bot" },
		{ Message: "No, that's all for now.", role: "user" },
		{ Message: "If you have any more questions, feel free to ask. Have a great day!", role: "bot" },
		{ Message: "Will do. Thanks for the help!", role: "user" },
		{ Message: "You're welcome! Goodbye!", role: "bot" }
	]
};

export const filesData: Files = {
	files: [
		{ name: "Ciencias Sociales", type: "folder", extension: null, uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Diego Minjares", uploadDate: new Date() },
		{ name: "Biologia", type: "folder" , extension: null, uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Daniel Morales", uploadDate: new Date() },
		{ name: "Computación", type: "folder" , extension: null, uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Rodrigo Reyes", uploadDate: new Date() },
		{ name: "Redes Neuronales", type: "file", extension: ".pdf" , uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Jair Santos", uploadDate: new Date() },
		{ name: "Historia de la Computación", type: "file", extension: ".docx" , uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Adrián Hernández", uploadDate: new Date() },
		{ name: "Inteligencia Artificial", type: "file", extension: ".pptx" , uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Diego Minjares", uploadDate: new Date() },
		{ name: "Ciencias Sociales", type: "folder" , extension: null, uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Rodrigo Reyes", uploadDate: new Date()},
		{ name: "Biologia", type: "folder" , extension: null, uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Daniel Morales", uploadDate: new Date()},
		{ name: "Redes Neuronales", type: "file", extension: ".pdf" , uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Jair Santos", uploadDate: new Date() },
		{ name: "Historia de la Computación", type: "file", extension: ".docx" , uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Adrián Hernández", uploadDate: new Date() },
		{ name: "Inteligencia Artificial", type: "file", extension: ".pptx", uuid: "ba42e009-5ac9-46fa-a8d5-f25f55b00e8f", owner: "Rodrigo Reyes", uploadDate: new Date() }
	]
};

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
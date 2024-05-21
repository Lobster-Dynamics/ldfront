import { UUID } from "crypto";

export interface Tab {
	id: string;
	content: string;
	component: JSX.Element;
	Icon: JSX.Element;
}

export interface FileItemDrag {
    id: UUID;
    type: "DIRECTORY" | "DOCUMENT";
}

export interface BreadCrumbDrop {
    id: UUID;
}
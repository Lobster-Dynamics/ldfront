import { UUID } from "crypto";
import { DirectoryItemDetails } from "./ModelTypes";

// Interfaces & Types for React DnD
export interface Tab {
	id: string;
	content: string;
	component: JSX.Element;
	Icon: JSX.Element;
}

export type FileItemDrag = Omit<DirectoryItemDetails, "ownerId" | "ownerName"> & {
    directoryId: UUID;
    draggedComponent: HTMLDivElement | null;
};

export type BreadCrumbDrop = {
	id: UUID;
}

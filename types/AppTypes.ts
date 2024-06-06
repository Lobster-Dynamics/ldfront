import { UUID } from "crypto";
import { DirectoryItemDetails } from "./ModelTypes";
import { LucideIcon } from "lucide-react";

// Interfaces & Types for React DnD
export interface Tab {
	id: string;
	content: string;
	component: JSX.Element;
	Icon: LucideIcon;
}

export type FileItemDrag = Omit<DirectoryItemDetails, "ownerId" | "ownerName"> & {
    directoryId: UUID;
    draggedComponent: HTMLDivElement | null;
};

export type BreadCrumbDrop = {
	id: UUID;
}

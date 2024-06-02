import { Calendar } from "lucide-react";
import React from "react";
import Folder from "./Folder";
import File from "./File";
import { DirectoryDetails } from "@/types/ModelTypes";
import CustomFilesDragLayer from "./CustomFilesDragLayer";
import styles from "@/styles/FileExplorer.FilesContainer.module.css";
import { cn } from "@/lib/utils";

interface FilesContainerProps {
	viewMode: "list" | "grid";
	directory: DirectoryDetails | null;
	parentDirectoryId: string;
    isShared: boolean;
}

export default function FilesContainer({
	viewMode,
	directory,
	parentDirectoryId,
    isShared
}: FilesContainerProps) {
	return (
		<div
			className={cn(
				viewMode === "grid" &&
					directory &&
					directory?.items.length <= 3 &&
					styles.gridViewNoFull,
				viewMode === "grid" &&
					directory &&
					directory?.items.length > 3 &&
					styles.gridView,
				viewMode === "list" && styles.listView,
			)}
		>
			{/* TITLE OF LIST MODE */}
			{viewMode === "list" && (
				<div className="flex items-center justify-between">
					<p className="w-2/4 text-sm md:text-base">Nombre</p>
					<p className="w-1/4 text-sm md:text-base">Propietario</p>
					<div className="flex w-1/4 items-center justify-center gap-2 sm:justify-end">
						<Calendar size="20px" />
						<p className="hidden text-sm sm:block md:text-base">
							Fecha de creación
						</p>
					</div>
				</div>
			)}
			{directory &&
				directory.items.length > 0 &&
				directory.items.map((file, i) => {
					if (file.type === "DIRECTORY")
						return (
							<Folder
								key={i}
								name={file.name}
								id={file.id}
								viewMode={viewMode}
								ownerName={file.ownerName}
								uploadDate={file.uploadDate}
								directoryId={parentDirectoryId}
								isShared={isShared}
							/>
						);
					else if (file.type === "DOCUMENT")
						return (
							<File
								key={i}
								name={file.name}
								extension={file.extension}
								id={file.id}
								viewMode={viewMode}
								ownerName={file.ownerName}
								uploadDate={file.uploadDate}
								directoryId={parentDirectoryId}
								isShared={isShared}
							/>
						);
				})}
			<CustomFilesDragLayer />
		</div>
	);
}

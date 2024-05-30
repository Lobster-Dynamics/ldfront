import { Calendar } from "lucide-react";
import React from "react";
import Folder from "./Folder";
import File from "./File";
import { DirectoryDetails } from "@/types/ModelTypes";
import CustomFilesDragLayer from "./CustomFilesDragLayer";

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
			className="grid"
			style={{
				gridTemplateColumns:
					viewMode === "grid"
						? "repeat(auto-fit,minmax(12rem, 1fr))"
						: "minmax(0, 1fr)",
				gap: viewMode === "grid" ? "1rem" : "0.5rem",
			}}
		>
			{/* TITLE OF LIST MODE */}
			{viewMode === "list" && (
				<div className="flex justify-between">
					<p className="w-2/4">Nombre</p>
					<p className="w-1/4">Propietario</p>
					<div className="flex w-1/4 items-center justify-end gap-2">
						<Calendar size="20px" />
						<p>Fecha de subida</p>
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
                                uploadDate={new Date()} // TODO: Cambiar por fecha real
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
                                uploadDate={new Date()} // TODO: Cambiar por fecha real
                                directoryId={parentDirectoryId}
                                isShared={isShared}
                            />
                        );
				})}
            <CustomFilesDragLayer />
		</div>
	);
}

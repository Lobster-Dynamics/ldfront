"use client";

import File from "@/components/file-explorer/File";
import Folder from "@/components/file-explorer/Folder";
<<<<<<< Updated upstream
import { filesData } from "@/utils/constants";
=======
import Sidebar from "@/components/file-explorer/Sidebar";
import NewButton from "@/components/file-explorer/NewButton";
>>>>>>> Stashed changes
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

export default function FileExplorer() {
	const [viewMode, setViewMode] = useState("list");

	// TODO: Request a cloud function para obtener los archivos/folders

	return (
		<div className="flex-grow bg-white">
			<div className="flex h-full w-full pt-4">
				<div className="flex flex-col justify-start place-content-between gap-3 h-full w-1/6 px-4">
					{/* TODO: IMPLEMENTAR COMPONENTE SIDEBAR */}
					<NewButton></NewButton>
					<Sidebar></Sidebar>
				</div>
				<div className="flex w-5/6 flex-col px-4 md:px-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl">Archivos</h1>
						<div className="flex gap-3">
							<button onClick={() => setViewMode("list")}>
								<List
									size="40px"
									className="transition"
									color={
										viewMode === "list"
											? "mediumpurple"
											: "lightgray"
									}
								/>
							</button>
							<button onClick={() => setViewMode("grid")}>
								<LayoutGrid
									size="40px"
									className="transition"
									strokeWidth={0}
									fill={
										viewMode === "grid"
											? "mediumpurple"
											: "lightgray"
									}
								/>
							</button>
						</div>
					</div>
					<div className="text-xl text-[#5C5868]">
						Mi Unidad &gt; Ciencias Sociales
					</div>
					<div className="my-4 flex-grow flex-wrap rounded-lg bg-[#F3F4F6] p-4 overflow-y-auto">
						<div className="flex flex-wrap gap-4 overflow-y-auto">
							{/* CONTENEDOR DOCUMENTOS */}
							{filesData.files.map((file, i) => {
								if (file.type === "folder")
									return <Folder key={i} name={file.name} />;
								else if (file.type === "file")
									return <File key={i} name={file.name} extension={file.extension} uuid={file.uuid} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

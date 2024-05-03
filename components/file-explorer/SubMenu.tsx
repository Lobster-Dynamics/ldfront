import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { mutate } from "swr";
import { RefObject } from "react";

interface SubMenuProps {
	show: boolean;
	x: number;
	y: number;
	uuid: string;
	setContextMenu: (contextMenu: {
		show: boolean;
		x: number;
		y: number;
	}) => void;
	ref: RefObject<HTMLDivElement>;
	extension: ".docx" | ".pdf" | ".pptx" | null;
	directoryId: string;
}

export default function SubMenu({
	x,
	y,
	show,
	uuid,
	setContextMenu,
	ref,
	extension,
	directoryId
}: SubMenuProps) {
	const handleFileDelete = async () => {
		if (extension === null) {
			console.log("se borro la carpeta");
			setContextMenu({ show: false, x: 0, y: 0 });
		} else {
			const config = axiosConfig(true);
			if (!config) return;
			setContextMenu({ show: false, x: 0, y: 0 });

			Swal.fire({
				title: "¿Estás seguro?",
				text: "Estás a punto de eliminar el documento.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#7B20C3",
				cancelButtonColor: "#d33",
				confirmButtonText: "¡Confirmar!",
				showLoaderOnConfirm: true,
				preConfirm: async () => {
					try {
						await axiosClient.get(
							`/document/delete_document/${uuid}/${directoryId}`,
							config,
						);
					} catch (error) {
						console.error("Error deleting file:", error);
						await Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Error al borrar el archivo. Por favor, intenta nuevamente.",
						});
					}
				},
				allowOutsideClick: () => !Swal.isLoading(),
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "¡Eliminado!",
						text: "Tu archivo ha sido eliminado.",
						icon: "success",
					});
					mutate(`/directory/get_directory/${directoryId}`);
				}
			});
		}
	};

	const handleFileRename = async () => {
		if (extension === null) {
			console.log("se renombro la carpeta");
			setContextMenu({ show: false, x: 0, y: 0 });
		} else {
			const config = axiosConfig(true);
			if (!config) return;
			setContextMenu({ show: false, x: 0, y: 0 });
			Swal.fire({
				title: "Renombrar",
				text: "Estás a punto de cambiar el nombre del documento.",
				input: "text",
				showCancelButton: true,
				confirmButtonColor: "#7B20C3",
				cancelButtonColor: "#d33",
				confirmButtonText: "Renombrar",
				showLoaderOnConfirm: true,
				preConfirm: async (new_name) => {
					try {
						await axiosClient.get(
							`/document/rename_document/${uuid}/${new_name}`,
							config,
						);
					} catch (error) {
						console.error("Error renaming file:", error);
						await Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Error al renombrar el archivo. Por favor, intenta nuevamente.",
						});
					}
				},
				allowOutsideClick: () => !Swal.isLoading(),
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "¡Renombrado!",
						text: "Tu archivo ha sido renombrado.",
						icon: "success",
					});
					mutate(`/directory/get_directory/${directoryId}`);
				}
			});
		}
	};

	return (
		<div
			ref={ref}
			className={cn(
				"items-left border-gray absolute z-20 w-28 justify-start rounded-sm border bg-white  opacity-0 transition",
				{ "opacity-100": show },
			)}
			style={{ top: `${y}px`, left: `${x}px` }}
		>
			<button
				onClick={() => {
					if (extension === null) {
						console.log("Se abrio la carpeta")
						setContextMenu({ show: false, x: 0, y: 0 });
					} else {
						window.open(`/documento?id=${uuid}`, "_blank");
						setContextMenu({ show: false, x: 0, y: 0 });
					}
				}}
				className="w-full items-start justify-start px-2 py-2 text-start hover:bg-purple-200"
			>
				Abrir
			</button>
			<hr />
			<button className="w-full items-start justify-start px-2 py-2 text-start hover:bg-purple-200">
				Compartir
			</button>
			<hr />
			<button
				className="w-full items-start justify-start px-2 py-2 text-start hover:bg-purple-200"
				onClick={handleFileDelete}
			>
				Eliminar
			</button>
			<hr />
			<button
				className="w-full items-start justify-start px-2 py-2 text-start hover:bg-purple-200"
				onClick={handleFileRename}
			>
				Renombrar
			</button>
		</div>
	);
}

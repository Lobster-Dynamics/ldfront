import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { mutate } from "swr";
import { RefObject, useEffect, useRef } from "react";
import { FolderOpen } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import { TextCursorInput } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";  
import ReactDOM from "react-dom";


interface SubMenuProps {
	show: boolean;
	x: number;
	y: number;
	onClose: () => void;
	uuid: string;
	setContextMenu: (contextMenu: {
		show: boolean;
		x: number;
		y: number;
	}) => void;
	extension: ".docx" | ".pdf" | ".pptx" | null;
	directoryId: string;
}

export default function SubMenu({
	x,
	y,
	show,
	onClose,
	uuid,
	setContextMenu,
	extension,
	directoryId
}: SubMenuProps) {
	const router = useRouter();
	const menuRef = useRef<HTMLDivElement>(null);

	const handleFileDelete = async () => {
		if (extension === null) {
			const config = axiosConfig(true);
			if (!config) return;
			onClose();

			Swal.fire({
				title: "¿Estás seguro?",
				text: "Estás a punto de eliminar la carpeta y todos sus elementos.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#7B20C3",
				cancelButtonColor: "#d33",
				confirmButtonText: "¡Confirmar!",
				showLoaderOnConfirm: true,
				preConfirm: async () => {
					try {
						await axiosClient.get(
							`/directory/delete_directory/${uuid}/${directoryId}`,
							config,
						);
					} catch (error) {
						console.error("Error deleting directory:", error);
						await Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Error al borrar la carpeta. Por favor, intenta nuevamente.",
						});
					}
				},
				allowOutsideClick: () => !Swal.isLoading(),
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "¡Eliminado!",
						text: "Tu carpeta ha sido eliminado con todos sus elementos.",
						icon: "success",
					});
					mutate(`/directory/get_directory/${directoryId}`);
				}
			});
			
		} else {
			const config = axiosConfig(true);
			if (!config) return;
			onClose();

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
			const config = axiosConfig(true);
			if (!config) return;
			onClose();
			Swal.fire({
				title: "Renombrar",
				text: "Estás a punto de cambiar el nombre de la carpeta.",
				input: "text",
				showCancelButton: true,
				confirmButtonColor: "#7B20C3",
				cancelButtonColor: "#d33",
				confirmButtonText: "Renombrar",
				showLoaderOnConfirm: true,
				preConfirm: async (new_name) => {
					try {
						await axiosClient.get(
							`/document/rename_document/${uuid}/${new_name}/FOLDER`,
							config,
						);
					} catch (error) {
						console.error("Error renaming directory:", error);
						await Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Error al renombrar la carpeta. Por favor, intenta nuevamente.",
						});
					}
				},
				allowOutsideClick: () => !Swal.isLoading(),
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "¡Renombrada!",
						text: "Tu carpeta ha sido renombrada.",
						icon: "success",
					});
					mutate(`/directory/get_directory/${directoryId}`);
				}
			});
		} else {
			const config = axiosConfig(true);
			if (!config) return;
			onClose();
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
							`/document/rename_document/${uuid}/${new_name}/DOCUMENT`,
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

	useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside, true);
		document.addEventListener("contextmenu", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
			document.removeEventListener("contextmenu", handleClickOutside, true);
        };
    }, [onClose]);

	return ReactDOM.createPortal(
		<div
			ref={menuRef}
			className={cn(
				"items-left border-gray absolute z-20 w-40 justify-start rounded-sm border bg-white  opacity-0 transition",
				{ "opacity-100": show },
			)}
			style={{ top: `${y}px`, left: `${x}px` }}
		>
			<button
				onClick={() => {
					if (extension === null) {
						router.push(`/file-explorer?id=${uuid}`);
						onClose();
					} else {
						window.open(`/documento?id=${uuid}`, "_blank");
						onClose();
					}
				}}
				className="w-full flex items-center justify-start gap-2 px-2 py-2 hover:bg-purple-200"
			>
				<FolderOpen />
				<p>Abrir</p>
			</button>
			<button
				className="w-full flex items-center justify-start gap-2 px-2 py-2 hover:bg-purple-200"
				onClick={handleFileRename}
			>
				<TextCursorInput />
				<p>Renombrar</p>
			</button>
			<button className="w-full flex items-center justify-start gap-2 px-2 py-2 hover:bg-purple-200">
				<UserRoundPlus />
				<p>Compartir</p>
			</button>
			
			<hr />
			<button
				className="w-full flex items-center text-red-500 justify-start gap-2 px-2 py-2 hover:bg-purple-200"
				onClick={handleFileDelete}
			>
				<Trash2 />
				<p>Eliminar</p>
			</button>
			
			
		</div>,
		document.getElementById("portal-root")!,
	);
}

import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { useDispatch } from "react-redux";
import { mutate } from "swr";
import useAuth from "@/hooks/selectors/useAuth";
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
}

export default function SubMenu({
	x,
	y,
	show,
	uuid,
	setContextMenu,
	ref,
}: SubMenuProps) {
	const dispatch = useDispatch();
	const { auth } = useAuth();

	const handleFileDelete = async () => {
		const config = axiosConfig(true);
		if (!config) return;

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
						`/document/delete_document/${uuid}`,
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
				mutate(`/document/get_documents/${auth?.uid}`);
			}
		});
	};

	const handleFileRename = async () => {
		const config = axiosConfig(true);
		if (!config) return;

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
				mutate(`/document/get_documents/${auth?.uid}`);
			}
		});
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
			<button className="w-full items-start justify-start px-2 py-2 text-start hover:bg-purple-200">
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
			<button className="w-full items-start justify-start px-2 py-2 text-start hover:bg-purple-200"
				onClick={handleFileRename}
			>
				Renombrar
			</button>
		</div>
	);
}

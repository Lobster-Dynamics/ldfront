import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";
import { useDispatch } from "react-redux";
import { mutate } from "swr";
import useAuth from "@/hooks/selectors/useAuth";

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
}

export default function SubMenu({
	x,
	y,
	show,
	uuid,
	setContextMenu,
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

	return (
		<div
			className={cn(
				"items-left border-gray  absolute z-20 justify-start rounded-sm border bg-white py-2 opacity-0 transition",
				{ "opacity-100": show },
			)}
			style={{ top: `${y}px`, left: `${x}px` }}
		>
			<button
				className="flex w-full items-start justify-start px-2 text-start hover:bg-purple-200"
				onClick={handleFileDelete}
			>
				Eliminar
			</button>
		</div>
	);
}

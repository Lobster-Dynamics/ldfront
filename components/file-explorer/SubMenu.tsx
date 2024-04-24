import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";

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
	const handleFileDelete = async (e: any) => {
		try {
			console.log("Deleted file: ", uuid);
			const config = axiosConfig(true);
			if (!config) return;
			await axiosClient.get(`/document/delete_document/${uuid}`, config);
			Swal.fire({
				icon: "success",
				title: "Se borro exitosamente",
			});
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Error al borrar el archivo",
			});
		}
		setContextMenu({ show: false, x: 0, y: 0 });
	};

	return (
		<div
			className={cn(
				"items-left absolute  z-20 justify-start rounded-sm border border-black bg-white p-2 opacity-0 transition",
				{ "opacity-100": show },
			)}
			style={{ top: `${y}px`, left: `${x}px` }}
		>
			<button
				className="flex w-full items-start justify-start  px-4 text-start text-start hover:bg-purple-200"
				onClick={handleFileDelete}
			>
				Eliminar
			</button>
		</div>
	);
}

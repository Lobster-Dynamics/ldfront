import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { toggleModalAñadirCarpeta } from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/selectors/useAuth";

interface NewButtonProps {
	directory_id: string;
}

export default function NewButton({ directory_id }: NewButtonProps) {
	const { auth } = useAuth();

	const dispatch = useDispatch();
	const menuRef = useRef<HTMLDivElement>(null);
	const [menu, setMenu] = useState(false);

	const handleFileUpload = async (e: any) => {
		try {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			formData.append("directory_id", directory_id);
			formData.append("userId", String(auth?.uid));
			console.log("Uploaded file:", file);
			const config = axiosConfig(true);
			if (!config) return;
			await axiosClient.post(
				"/document/upload_document",
				formData,
				config,
			);
			Swal.fire({
				icon: "success",
				title: "Carga exitosa",
			});
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Error al cargar el archivo",
			});
		}
		setMenu(false);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				// Type assertion
				setMenu(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuRef]);

	return (
		<div>
			<button
				onClick={() => setMenu(true)}
				className="flex items-center self-center"
			>
				<label className="flex h-14 cursor-pointer items-center self-center rounded-lg border-2 border-black bg-[#F3F4F6] p-4 transition hover:bg-purpleFrida-700 hover:bg-opacity-10">
					<Plus size={30} />
					<p className="lg:text-md min-[0px]:hidden lg:block xl:text-2xl">
						Nuevo
					</p>
				</label>
			</button>
			{menu && (
				<div
					ref={menuRef}
					className="absolute right-0 top-1/2 z-10 -mr-20  rounded-lg border border-gray-300 bg-white"
				>
					<label className="mb-2 block w-full px-4 py-2 text-start text-2xl hover:bg-blueFrida-500">
						Archivo
						<input
							type="file"
							accept=".pdf,.docx,.pptx"
							className="hidden"
							onChange={handleFileUpload}
						/>
					</label>
					<button
						className="block px-4 py-2 text-start text-2xl hover:bg-blueFrida-500"
						onClick={() => {
							setMenu(false);
							dispatch(toggleModalAñadirCarpeta());
						}}
					>
						{" "}
						Crear Carpeta
					</button>
				</div>
			)}
		</div>
	);
}

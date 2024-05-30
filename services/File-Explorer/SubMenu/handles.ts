import Swal from "sweetalert2";
import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { InputAlert } from "@/lib/alerts/alerts";
import { errorHandler } from "@/utils/errorHandler";

export const handleFileShare = async (
	extension: ".docx" | ".pdf" | ".pptx" | null,
	uuid: string,
	directoryId: string,
	onClose: () => void 
) => {
	const config = axiosConfig();
	if (!config) return;
	onClose();

	if (extension == null) {
		InputAlert("Ingrese el correo", async (email) => {
			try {
			await axiosClient.put(
					"/directory/share_directory",
					{
						directory_id: directoryId,
						shared_email: email,
						priority: "EDIT",
					},
					config,
				);
			} catch (error: any) {
				errorHandler(error);
			}
		},
        "Se ha compartido la carpeta !",
        "Felicidades!",
        "Compartir",
        "Cancelar",
        "success"
        );
	} else {
        InputAlert("Ingrese el correo", async (email) => {
			try {
				await axiosClient.put(
					"/directory/share_directory",
					{
						document_id: uuid,
						shared_email: email,
						priority: "EDIT",
					},
					config,
				);
			} catch (error: any) {
				errorHandler(error);
			}
		},
        "Se ha compartido el archivo!",
        "Felicidades!",
        "Compartir",
        "Cancelar",
        "success"
        );
	}
};

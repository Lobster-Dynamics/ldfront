import Swal from "sweetalert2";
import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { ErrorAlert, InputAlert } from "@/lib/alerts/alerts";
import { RequestResponse, errorHandler } from "@/utils/errorHandler";
import { AxiosError } from "axios";

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
                await ErrorAlert("Error al compartir el documento", error?.response?.data?.msg ?? "No se encontro el recurso solicitado");
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
                const config = axiosConfig();
                if (!config) return;
                const response = await axiosClient.put(
                    "/document/share_document",
                    {
                        document_id: uuid,
                        shared_email: email,
                        priority: "EDIT",
                    },
                    config,
                );


            } catch (error: any) {
                await ErrorAlert("Error al compartir el documento", error?.response?.data?.msg ?? "No se encontro el recurso solicitado");
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

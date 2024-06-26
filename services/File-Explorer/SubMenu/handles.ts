import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { AcceptAlert, ErrorAlert, InputAlert } from "@/lib/alerts/alerts";

export const handleFileShare = async (
    extension: ".docx" | ".pdf" | ".pptx" | null,
    uuid: string,
    onClose: () => void
) => {
    const config = axiosConfig();
    if (!config) return;
    onClose();

    if (extension == null) {
        InputAlert("Ingrese el correo", async (email) => {
            try {
                const  response = await axiosClient.put(
                    "/directory/share_directory",
                    {
                        directory_id: uuid,
                        shared_email: email,
                        priority: "EDIT",
                    },
                    config,
                );

                if (response) {

                    AcceptAlert("Se ha compartido la carpeta !");


                }

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
                if (response) {

                    AcceptAlert("Se ha compartido el documento!");


                }



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

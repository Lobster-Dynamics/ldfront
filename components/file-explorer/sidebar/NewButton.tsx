import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/selectors/useAuth";
import { ErrorAlert, InputAlert } from "@/lib/alerts/alerts";
import { mutate } from "swr";
import { errorHandler } from "@/utils/errorHandler";
import { Stack } from "@/types/ReduxTypes";
import { addElement } from "@/redux/slices/stackSlice";

interface NewButtonProps {
    directoryId: string;
}

interface ResponseUpload {
    document_id: string;
    msg: string;
    user_id: string;
}

export default function NewButton({ directoryId }: NewButtonProps) {
    const dispatch = useDispatch();

    const { auth } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);
    const [menu, setMenu] = useState(false);

    const handleFileUpload = async (e: any) => {
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("directory_id", directoryId);
            formData.append("userId", String(auth?.uid));
            console.log("Uploaded file:", file);
            const config = axiosConfig(true);
            if (!config) return;
            const response = await axiosClient.post<ResponseUpload>(
                "/document/upload_document",
                formData,
                config,
            );

            const newStack: Stack = {
                name: file.name,
                id: response.data.document_id,
                cargado: true,
            };

            dispatch(addElement(newStack));
        } catch (err: any) {
            errorHandler(err);
        }
        mutate(`/directory/get_directory/${directoryId}`);
        setMenu(false);
    };

    const handleFolderCreate = async () => {
        const request = async (name: string) => {
            const config = axiosConfig();
            if (!config) return;

            const data = { name: name, directory_id: directoryId };

            try {
                await axiosClient.post(
                    "/directory/create_directory",
                    data,
                    config,
                );
                mutate(`/directory/get_directory/${directoryId}`);
            } catch (error) {
                await ErrorAlert(
                    "Error al crear la carpeta",
                    "Por favor, intenta nuevamente",
                );
            }
        };
        InputAlert(
            "Crear Carpeta",
            request,
            "Carpeta creada correctamente!!",
            "Felicidades!",
            "Crear",
            "Cancelar",
            "success",
        );
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
                        onClick={handleFolderCreate}
                    >
                        {" "}
                        Crear Carpeta
                    </button>
                </div>
            )}
        </div>
    );
}

import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { toggleModalAñadirCarpeta } from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/selectors/useAuth";

export default function NewButton() {

    const {auth} = useAuth()

    const dispatch = useDispatch();
    const menuRef = useRef<HTMLDivElement>(null);
    const [menu, setMenu] = useState(false);

    const handleFileUpload = async (e: any) => { 
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId",String(auth?.uid));
            console.log("Uploaded file:", file);
            const config = axiosConfig(true);
            if (!config) return;
            await axiosClient.post("/document/upload_document", formData, config);
            Swal.fire({
                icon: 'success',
                title: 'Carga exitosa',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cargar el archivo',
            });
        }
        setMenu(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) { // Type assertion
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
            <button onClick={() => setMenu(true)} className="self-center items-center flex">
                <label className="cursor-pointer border-2 border-black self-center items-center flex h-14 rounded-lg bg-[#F3F4F6] hover:bg-purpleFrida-700 hover:bg-opacity-10 transition p-4">
                    <Plus size={30} />
                    <p className="min-[0px]:hidden lg:block lg:text-md xl:text-2xl">
                        Nuevo
                    </p>
                </label>
            </button>
            {menu && (
                <div ref={menuRef} className="-mr-20 absolute right-0 top-1/2 z-10  bg-white border border-gray-300 rounded-lg">
                    <label className="block mb-2 hover:bg-blueFrida-500 text-2xl w-full text-start py-2 px-4" >
                        Archivo
                        <input
                            type="file"
                            accept=".pdf,.docx,.pptx"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                    <button className="block text-2xl hover:bg-blueFrida-500 py-2 px-4 text-start" onClick={() => {

                        setMenu(false)
                        dispatch(toggleModalAñadirCarpeta())
                    }

                    }> Crear Carpeta
                    </button>
                </div>
            )}
        </div>
    );
}


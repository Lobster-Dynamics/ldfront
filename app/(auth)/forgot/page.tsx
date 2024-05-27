"use client";

import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";
import axiosClient from "@/config/axiosClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


export default function Forgot() {

    const [email, setEmail] = useState("");
    const router = useRouter();


    const handleSendEmail = async (e: any) => {

		e.preventDefault();

		if (email === "") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Tienes que escribir un correo valido",
			});
			return;
		}

		try {
			const { data } = await axiosClient.post(
				"/user/forgot_password",
				{
					"email": email,
				},
			);

			// router.push("/file-explorer");
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se ha mandado un enlace al correo para resetear tu contraseña"
            })
            router.push("/login");

		} catch (err: any) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: err.response.data.message || "Ha ocurrido un error",
			});
		}
	};

    return (
        <AuthWrapper>
            <InitialContainer image={false} title="Restablecer Contraseña">
                <div className="mt-5 w-full flex justify-center">
                    <li className="text-sm">Sera enviado un correo con las instrucciones para restablecer tu contraseña.</li>
                </div>
                <input
                    type="text"
                    placeholder="Correo"
                    className=" mt-10 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
                    value={email}
					onChange={(e) => setEmail(e.target.value)}
                />
                <button className="mt-5 rounded-lg bg-purple-700 px-8 py-2 text-2xl text-white"
                onClick={handleSendEmail}>
                   Restablecer 
                </button>
            </InitialContainer>
        </AuthWrapper>
    );
}

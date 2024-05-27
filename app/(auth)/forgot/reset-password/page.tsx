"use client";

import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";
import axiosClient from "@/config/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


export default function Reset_Password() {

    const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams?.get("email") ?? "";
    const token = searchParams?.get("token") ?? "";

    const handleVerifyPassword = async (e: any) => {

		e.preventDefault();

		if (password !== repeatPassword) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Las contraseñas no coinciden",
			});
			return;
		}

		try {
			const { data } = await axiosClient.post(
				"/user/verify_password",
				{
					"email": email,
                    "password": password,
                    "repeat-password": repeatPassword,
                    "token": token

				},
			);

            Swal.fire({
                icon: "success",
                title: "Exito!" ,
                text: "Contraseña actualizada correctamente."
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
            <div className="flex w-full flex-col  justify-evenly ">
				<input
					type="password"
					placeholder="Contraseña"
					className=" mt-12 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirmar contraseña"
					className=" mt-12 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				/>
			</div>
			<button
				className="mt-10 rounded-lg bg-purpleFrida-500 px-8 py-2 text-2xl text-white"
				onClick={handleVerifyPassword}
			>
				Confirmar
			</button>
            </InitialContainer>
        </AuthWrapper>
    );
}

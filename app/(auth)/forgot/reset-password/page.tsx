"use client";

import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";
import axiosClient from "@/config/axiosClient";
import { AcceptAlert, ErrorAlert } from "@/lib/alerts/alerts";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


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
			ErrorAlert("Oops...", "Las contraseñas no coinciden");
			return;
		}

		try {
			await axiosClient.post("/user/verify_password", {
				email: email,
				password: password,
				"repeat-password": repeatPassword,
				token: token,
			});

            AcceptAlert("Se ha restablecido la contraseña correctamente", "success");
			router.push("/login");
		} catch (err: any) {
			ErrorAlert("Oops...", "Ocurrió un error al restablecer la contraseña");
		}
	};

    return (
        <AuthWrapper>
            <InitialContainer image={false} title="Restablecer Contraseña">
            <div className="flex w-full flex-col  justify-evenly ">
				<input
					type="password"
					placeholder="Contraseña"
					className="w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirmar contraseña"
					className="mt-5 w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				/>
			</div>
			<button
				className="mt-5 rounded-lg bg-purpleFrida-500 px-8 py-2 text-xl md:text-2xl text-white"
				onClick={handleVerifyPassword}
			>
				Confirmar
			</button>
            </InitialContainer>
        </AuthWrapper>
    );
}

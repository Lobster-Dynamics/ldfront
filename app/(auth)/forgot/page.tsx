"use client";

import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";
import axiosClient from "@/config/axiosClient";
import { AcceptAlert, ErrorAlert } from "@/lib/alerts/alerts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Forgot() {
	const [email, setEmail] = useState("");
	const router = useRouter();

	const handleSendEmail = async (e: any) => {
		e.preventDefault();

		if (email === "") {
			ErrorAlert("Oops...", "Tienes que escribir un correo válido");
			return;
		}

		try {
			await axiosClient.post("/user/forgot_password", {
				email: email,
			});

			AcceptAlert("Se envió el correo correctamente", "success");
			router.push("/login");
		} catch (err: any) {
			ErrorAlert("Oops...", "Ocurrió un error al enviar el correo");
		}
	};

	return (
		<AuthWrapper>
			<InitialContainer image={false} title="Restablecer Contraseña">
				<p className="w-full text-sm opacity-60">
					Se le enviará un correo con las instrucciones para
					restablecer su contraseña.
				</p>
				<input
					type="text"
					placeholder="Correo"
					className="mt-5 w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					className="mt-5 rounded-lg bg-purpleFrida-500 px-8 py-2 text-xl md:text-2xl text-white"
					onClick={handleSendEmail}
				>
					Restablecer
				</button>
                <Link href="/login" className="mt-2 -mb-5 text-blueFrida-700 font-semibold p-2">Cancelar</Link>
			</InitialContainer>
		</AuthWrapper>
	);
}

"use client";

import { useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axiosClient from "@/config/axiosClient";
import jsCookie from "js-cookie";
import { setAuth } from "@/redux/slices/authSlice";
import { loadUserAuthData } from "@/utils/loadData";
import { AcceptAlert, ErrorAlert } from "@/lib/alerts/alerts";
import Link from "next/link";

interface StepProps {
	setStep: (step: number) => void;
	name: string;
	setName: (name: string) => void;
	lastname: string;
	setLastname: (lastname: string) => void;
}

interface Step2Props {
	user: string;
	setUser: (user: string) => void;
	password: string;
	setPassword: (password: string) => void;
	repeatPassword: string;
	setRepeatPassword: (repeatPassword: string) => void;
    handleCreateAccount: (e: any) => void;
}

export default function Create() {
	const [step, setStep] = useState<number>(0);
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const dispatch = useDispatch();
	const router = useRouter();

	const handleCreateAccount = async (e: any) => {
		e.preventDefault();

		if (password !== repeatPassword) {
            ErrorAlert("Oops...", "Las contraseñas no coinciden");
			return;
		}

		try {
			const { data } = await axiosClient.post(
				"/user/create_account_email",
				{
					"email": user,
					"password": password,
                    "name": name,
                    "lastname": lastname,
				},
			);
			const userData = loadUserAuthData(data);

			jsCookie.set("token", userData.token, {
				expires: new Date().setMonth(new Date().getMonth() + 1),
                secure: true
			});

			jsCookie.set("refreshToken", userData.refreshToken, {
				expires: new Date().setMonth(new Date().getMonth() + 1),
                secure: true
			});

			dispatch(setAuth(userData));
            AcceptAlert("Cuenta creada correctamente", "success");
			// router.push("/file-explorer");
		} catch (err: any) {
			ErrorAlert("Oops...", "Ocurrió un error al crear la cuenta");
		}
	};

	return (
		<AuthWrapper>
			<InitialContainer title="Registro">
				{step === 0 ? (
					<Step1
						setStep={setStep}
						name={name}
						setName={setName}
						lastname={lastname}
						setLastname={setLastname}
					/>
				) : (
					<Step2
						user={user}
						setUser={setUser}
						password={password}
						setPassword={setPassword}
						repeatPassword={repeatPassword}
						setRepeatPassword={setRepeatPassword}
                        handleCreateAccount={handleCreateAccount}
					/>
				)}
                <div className="mt-4 flex w-full flex-row text-start">
                    <p className="text-base md:text-xl">¿Ya tienes cuenta?</p>
                    <Link className="ml-2 text-base md:text-xl font-bold text-purpleFrida-500 underline hover:cursor-pointer" href="/login">
                        Iniciar Sesión
                    </Link>
                </div>
			</InitialContainer>
		</AuthWrapper>
	);
}

const Step1 = ({
	setStep,
	name,
	setName,
	lastname,
	setLastname,
}: StepProps) => {
	return (
		<>
			<input
				type="text"
				placeholder="Nombre"
				className="w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Apellido"
				className="mt-5 w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
			/>
			<button
				className="mt-5 rounded-lg bg-purpleFrida-500 px-8 py-2 text-xl md:text-2xl text-white"
				onClick={() => setStep(1)}
			>
				Continuar
			</button>
		</>
	);
};

const Step2 = ({
	user,
	setUser,
	password,
	setPassword,
	repeatPassword,
	setRepeatPassword,
    handleCreateAccount,
}: Step2Props) => {
	return (
		<>
			<div className="flex w-full flex-col  justify-evenly ">
				<input
					type="text"
					placeholder="Correo"
					className="w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Contraseña"
					className="mt-5 w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
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
				onClick={handleCreateAccount}
			>
				Registrar
			</button>
		</>
	);
};

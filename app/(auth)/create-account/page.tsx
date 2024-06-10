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
import StrongPassword from "@/components/auth/create-account/StrongPassword";
import { cn } from "@/lib/utils";
import { validateEmail } from "@/utils/functions";

interface StepProps {
	step: number;
	setStep: (step: number) => void;
	name: string;
	setName: (name: string) => void;
	lastname: string;
	setLastname: (lastname: string) => void;
}

interface Step2Props {
	step: number;
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

		if (!validateEmail(user)) {
			ErrorAlert("Oops...", "El correo no es válido");
			return;
		} else if (password !== repeatPassword) {
			ErrorAlert("Oops...", "Las contraseñas no coinciden");
			return;
		} else if (
			password.length < 6 ||
			!/[a-z]/.test(password) ||
			!/[A-Z]/.test(password) ||
			!/[0-9]/.test(password) ||
			!/[^A-Za-z0-9]/.test(password)
		) {
			ErrorAlert(
				"Oops...",
				"La contraseña no cumple con el formato requerido",
			);
			return;
		}

		try {
			const { data } = await axiosClient.post(
				"/user/create_account_email",
				{
					email: user,
					password: password,
					name: name,
					lastname: lastname,
				},
			);
			const userData = loadUserAuthData(data);

			jsCookie.set("token", userData.token, {
				expires: new Date().setMonth(new Date().getMonth() + 1),
				secure: true,
			});

			jsCookie.set("refreshToken", userData.refreshToken, {
				expires: new Date().setMonth(new Date().getMonth() + 1),
				secure: true,
			});

			AcceptAlert("Cuenta creada correctamente", "success").then(() =>
				dispatch(setAuth(userData)),
			);
		} catch (err: any) {
			ErrorAlert("Oops...", "Ocurrió un error al crear la cuenta");
		}
	};

	return (
		<AuthWrapper>
			<InitialContainer title="Registro">
				<Step1
					step={step}
					setStep={setStep}
					name={name}
					setName={setName}
					lastname={lastname}
					setLastname={setLastname}
				/>
				<Step2
					step={step}
					user={user}
					setUser={setUser}
					password={password}
					setPassword={setPassword}
					repeatPassword={repeatPassword}
					setRepeatPassword={setRepeatPassword}
					handleCreateAccount={handleCreateAccount}
				/>
				<div className="mt-4 flex w-full flex-row text-start">
					<p className="text-base md:text-xl">¿Ya tienes cuenta?</p>
					<Link
						className="ml-2 text-base font-bold text-purpleFrida-500 underline hover:cursor-pointer md:text-xl"
						href="/login"
					>
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
	step,
}: StepProps) => {
	const handleContinue = (e: React.MouseEvent) => {
		e.preventDefault();

		if (name === "" || lastname === "") {
		    ErrorAlert("Oops...", "Debes completar todos los campos");
		    return;
		} else if (name.length < 2 || lastname.length < 2) {
		    ErrorAlert("Oops...", "El nombre y Apellido deben tener al menos 2 caracteres");
		    return;
		}

		setStep(1);
	};

	return (
		<div
			className={cn("flex w-full flex-col items-center", {
				hidden: step !== 0,
			})}
		>
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
				className="mt-5 rounded-lg bg-purpleFrida-500 px-8 py-2 text-xl text-white md:text-2xl"
				onClick={handleContinue}
			>
				Continuar
			</button>
		</div>
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
	step,
}: Step2Props) => {
	return (
		<div
			className={cn("flex w-full flex-col items-center", {
				"hidden": step !== 1,
			})}
		>
			<div className="flex w-full flex-col  justify-evenly ">
				<input
					type="text"
					placeholder="Correo"
					className="w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<StrongPassword
					id="passwordInputCreate"
					placeholder="Contraseña"
					value={password}
					setValue={setPassword}
				/>
				<StrongPassword
					id="repeatPasswordInputCreate"
					placeholder="Confirmar contraseña"
					value={repeatPassword}
					setValue={setRepeatPassword}
				/>
			</div>
			<button
				className="mt-5 rounded-lg bg-purpleFrida-500 px-8 py-2 text-xl text-white md:text-2xl"
				onClick={handleCreateAccount}
			>
				Registrar
			</button>
			<div />
		</div>
	);
};

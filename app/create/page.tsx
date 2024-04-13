"use client";
import React, { useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";

interface StepProps {
	setStep: (step: number) => void;
}

export default function Create() {
	const [step, setStep] = useState<number>(0);

	return (
		<AuthWrapper>
			<InitialContainer title="Registro">
				{step === 0 ? <Step1 setStep={setStep} /> : <Step2 />}
			</InitialContainer>
		</AuthWrapper>
	);
}

const Step1 = ({ setStep }: StepProps) => {
	return (
		<>
			<input
				type="text"
				placeholder="Nombre(s)"
				className="mt-10 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
			/>
			``
			<input
				type="text"
				placeholder="Apellido(s)"
				className="mt-10 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
			/>
			<button
				className="mt-10 rounded-lg bg-purple-700 px-8 py-2 text-2xl text-white"
				onClick={() => setStep(1)}
			>
				Continuar
			</button>
		</>
	);
};

const Step2 = () => {
	return (
		<>
			<div className="flex w-full flex-col  justify-evenly ">
				<input
					type="text"
					placeholder="Correo"
					className=" mt-8 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
				/>
				<input
					type="password"
					placeholder="Contraseña"
					className=" mt-12 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
				/>
				<input
					type="text"
					placeholder="Confirmar contraseña"
					className=" mt-12 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
				/>
			</div>
			<button className="mt-10 rounded-lg bg-purple-700 px-8 py-2 text-2xl text-white">
				Registrar
			</button>
		</>
	);
};

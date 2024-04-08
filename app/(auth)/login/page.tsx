"use client";

import Image from "next/image";

export default function Login() {
	return (
		<div className="relative flex flex-grow flex-col items-center justify-center bg-gray-100">
			<Image
				src="/mapa_login.png"
				layout="fill"
				objectFit="cover"
				alt="Background"
				className="absolute z-0"
			/>

			<div className="z-10 flex w-2/5 flex-col items-center rounded-xl  border-8 border-black bg-white p-10">
				<Image
					src="/logoFrida.png"
					alt="logoFrida"
					width="350"
					height="50"
					className="w-2/5"
				/>
				<h1 className="mt-10 text-3xl text-slate-800">Bienvenido</h1>
				<hr className="my-4 h-0.5    w-full border-0 bg-slate-500" />
				<input
					type="text"
					placeholder="Usuario"
					className="w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
				/>
				<input
					type="text"
					placeholder="Contraseña"
					className="mt-5 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
				/>
				<div className="mt-5 w-full text-start">
					<p className="justify-start text-xl font-bold text-purple-700 underline">
						¿Olvidaste tu contraseña?
					</p>
				</div>
				<button className="mt-5 rounded-lg bg-purple-700 px-8 py-2 text-2xl text-white">
					Continuar
				</button>
				<div className="mt-4 flex w-full flex-row text-start">
					<p className=" text-xl">¿No tienes una cuenta?</p>
					<p className="ml-2 text-xl font-bold text-purple-700 underline">
						Registrarse
					</p>
				</div>
			</div>
		</div>
	);
}

"use client";

import { logOut } from "@/redux/slices/authSlice";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import jsCookie from "js-cookie";

export default function Profile() {
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleShowRepeatPassword = () => {
		setShowRepeatPassword(!showRepeatPassword);
	};

	const handleLogout = () => {
		dispatch(logOut());
		jsCookie.remove("token");
		jsCookie.remove("refreshToken");
	};

	return (
		<div className="flex-grow bg-white pt-10">
			<div className="mx-auto w-full max-w-screen-lg px-2.5 md:px-28">
				<div className="flex items-center justify-between">
					<p className="text-2xl">Cuenta</p>
					<button className="group transition-none focus:outline-none">
						<LogOut
							className="hover:text-redFrida-400 group-focus:text-redFrida-400 h-8 transition"
							onClick={handleLogout}
						/>
					</button>
				</div>
				<div className="mt-4 rounded-lg bg-gray-100 p-10">
					<div className="flex justify-between gap-16">
						<div className="flex w-full flex-col">
							<label htmlFor="name">Nombre</label>
							<input
								type="text"
								placeholder="Rodrigo"
								className="mt-2 rounded-lg bg-zinc-200 p-2 placeholder:text-black"
							/>
						</div>
						<div className="flex w-full flex-col">
							<label htmlFor="surname">Apellido</label>
							<input
								type="text"
								placeholder="Reyes"
								className="mt-2 rounded-lg bg-zinc-200 p-2 placeholder:text-black"
							/>
						</div>
					</div>
					<div className="my-4 w-1/2 pr-8">
						<div className="flex w-full flex-col">
							<label htmlFor="surname">Correo</label>
							<input
								type="email"
								placeholder="rodrigoreyes@mail.com"
								className="mt-2 rounded-lg bg-zinc-200 p-2 placeholder:text-black"
							/>
						</div>
					</div>
					<div className="flex justify-between gap-16">
						<div className="relative flex w-full flex-col">
							<label htmlFor="name">Contraseña</label>
							<input
								type={showPassword ? "text" : "password"}
								className="mt-2 rounded-lg bg-zinc-200 p-2 placeholder:text-black"
							/>
							{showPassword ? (
								<Eye
									className="absolute bottom-2 right-2 h-6 text-[#5C5868]"
									onClick={handleShowPassword}
								/>
							) : (
								<EyeOff
									className="absolute bottom-2 right-2 h-6 text-[#5C5868]"
									onClick={handleShowPassword}
								/>
							)}
						</div>
						<div className="relative flex w-full flex-col">
							<label htmlFor="surname">Repetir contraseña</label>
							<input
								type={showRepeatPassword ? "text" : "password"}
								className="mt-2 rounded-lg bg-zinc-200 p-2 placeholder:text-black"
							/>
							{showRepeatPassword ? (
								<Eye
									className="absolute bottom-2 right-2 h-6 text-[#5C5868]"
									onClick={handleShowRepeatPassword}
								/>
							) : (
								<EyeOff
									className="absolute bottom-2 right-2 h-6 text-[#5C5868]"
									onClick={handleShowRepeatPassword}
								/>
							)}
						</div>
					</div>
					<button className="bg-purpleFrida-300 hover:bg-purpleFrida-500 focus:bg-purpleFrida-500 mx-auto mt-8 block rounded-lg px-8 py-2 text-white transition">
						Guardar cambios
					</button>
				</div>
			</div>
		</div>
	);
}

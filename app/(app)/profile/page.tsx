"use client";

import { logOut } from "@/redux/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";
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
					<button className="hover:text-[#E55E86] hover:bg-accent p-2 transition rounded-md" onClick={handleLogout}>Cerrar sesión</button>
				</div>
				<div className="mt-4 rounded-lg bg-[#F3F4F6] p-10">
					<div className="flex justify-between gap-16">
						<div className="flex w-full flex-col">
							<label htmlFor="name" className="text-[#5C5868]">
								Nombre
							</label>
							<input
								type="text"
								placeholder="Rodrigo"
								className="mt-2 rounded-lg bg-[#E3E1E1] p-2 placeholder:text-black"
							/>
						</div>
						<div className="flex w-full flex-col">
							<label htmlFor="surname" className="text-[#5C5868]">
								Apellido
							</label>
							<input
								type="text"
								placeholder="Reyes"
								className="mt-2 rounded-lg bg-[#E3E1E1] p-2 placeholder:text-black"
							/>
						</div>
					</div>
					<div className="my-4 w-1/2 pr-8">
						<div className="flex w-full flex-col">
							<label htmlFor="surname" className="text-[#5C5868]">
								Correo
							</label>
							<input
								type="email"
								placeholder="rodrigoreyes@mail.com"
								className="mt-2 rounded-lg bg-[#E3E1E1] p-2 placeholder:text-black"
							/>
						</div>
					</div>
					<div className="flex justify-between gap-16">
						<div className="relative flex w-full flex-col">
							<label htmlFor="name" className="text-[#5C5868]">
								Contraseña
							</label>
							<input
								type={showPassword ? "text" : "password"}
								className="mt-2 rounded-lg bg-[#E3E1E1] p-2 placeholder:text-black"
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
							<label htmlFor="surname" className="text-[#5C5868]">
								Repetir contraseña
							</label>
							<input
								type={showRepeatPassword ? "text" : "password"}
								className="mt-2 rounded-lg bg-[#E3E1E1] p-2 placeholder:text-black"
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
					<button className="mx-auto mt-8 block rounded-lg bg-[#9D5BD2] px-8 py-2 text-white">
						Guardar cambios
					</button>
				</div>
			</div>
		</div>
	);
}

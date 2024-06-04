"use client";

import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";
import axiosClient from "@/config/axiosClient";
import jsCookie from "js-cookie"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { errorHandler } from "@/utils/errorHandler";
import { loadUserAuthData } from "@/utils/loadData";
import Link from "next/link";

export default function Login() {

	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useDispatch()
	const router = useRouter()

    const handleforgot = () => {
        router.push("/forgot");
    };

	const handleLogin = async (e: any) => {
		e.preventDefault()
		try {
			const { data } = await axiosClient.post("/user/login_email", { "email": user, "password": password })
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

			router.push("/file-explorer")
		} catch (err: any) {
            errorHandler(err)
				}
	}


    return (
        <AuthWrapper>
            <InitialContainer title="Iniciar sesión">
                <input
                    data-test-id="usernameInputLogin"
                    type="text"
                    placeholder="Usuario"
                    className="w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    data-test-id="passwordInputLogin"
                    type="password"
                    placeholder="Contraseña"
                    className="mt-5 w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-5 w-full text-start">
                    <button onClick={handleforgot}>
                        <p className="justify-start text-base md:text-xl font-bold text-purpleFrida-500 underline">
                            ¿Olvidaste tu contraseña?
                        </p>
                    </button>
                    
                </div>
                <button 
                    onClick={handleLogin} 
                    className="mt-5 rounded-lg bg-purpleFrida-500 px-8 py-2 text-xl md:text-2xl text-white"
                    data-test-id="loginButton"
                >

                    Continuar
                </button>
                <div className="mt-4 flex w-full flex-row text-start">
                    <p className="text-base md:text-xl">¿No tienes cuenta?</p>
                    <Link className="ml-2 text-base md:text-xl font-bold text-purpleFrida-500 underline hover:cursor-pointer" href="/create-account">
                        Registrarse
                    </Link>
                </div>
            </InitialContainer>
        </AuthWrapper>
    );
}

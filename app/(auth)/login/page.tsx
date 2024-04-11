"use client";

import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";

export default function Login() {
    return (
        <AuthWrapper>
            <InitialContainer title="Iniciar sesión">
                <hr className="my-4 h-0.5 w-full border-0 bg-slate-500" />
                <input
                    type="text"
                    placeholder="Usuario"
                    className="w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
                />
                <input
                    type="password" 
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
                    <p className="text-xl">¿No tienes una cuenta?</p>
                    <p className="ml-2 text-xl font-bold text-purple-700 underline hover:cursor-pointer"
                       onClick={() => (window.location.href = "/create")}
                    >
                        Registrarse
                    </p>
                </div>
            </InitialContainer>
        </AuthWrapper>
    );
}


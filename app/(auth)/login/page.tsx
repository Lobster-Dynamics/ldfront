"use client";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className=" mx-auto bg-gray-100 h-screen overflow-hidden">
        {/* Parte de Arriba */}
      <div className="w-full h-20 flex flex-col  bg-white justify-center text-bold text-4xl  ">
        <div className="flex flex-row ml-5">
          <h1 className="text-purple-500 mr-4">FRIDA</h1>
          <h1 className="text-black">Research Engine</h1>
        </div>
      </div>

      <div className="relative flex justify-center items-center min-h-screen">

        <Image
          src="/mapa_login.png"
          layout="fill"
          objectFit="cover"
          alt="Background"
          className="absolute z-0"
        />
     
        <div className=" flex flex-col items-center z-10 border-8 w-2/5  bg-white rounded-xl border-black p-10">
                <Image
                    src="/logoFrida.png"
                    alt="logoFrida"
                    width="350" 
                    height="50"
                    className="w-2/5"
                    />
                    <h1 className="text-slate-800 text-3xl mt-10">Bienvenido</h1>
                    <hr className="h-0.5 my-4    bg-slate-500 border-0 w-full"/>
                    <input type="text" placeholder="Usuario" className="w-full text-black text-3xl border-b border-slate-300 focus:border-slate-600 focus:outline-none"/>
                    <input type="text" placeholder="Contraseña" className="w-full mt-5 text-black text-3xl border-b border-slate-300 focus:border-slate-600 focus:outline-none"/>
                    <div className="w-full text-start mt-5">
                    <p className="justify-start underline text-purple-700 text-xl font-bold">¿Olvidaste tu contraseña?</p>
                    </div>
                    <button className="bg-purple-700 mt-5 text-white text-2xl rounded-lg px-8 py-2">
                        Continuar
                    </button>
                    <div className="flex w-full mt-4 text-start flex-row">
                        <p className=" text-xl">¿No tienes una cuenta?</p>
                        <p className="text-purple-700 text-xl font-bold ml-2 underline">Registrarse</p>

                    </div>



        </div>
      </div>
    </div>
  );
}

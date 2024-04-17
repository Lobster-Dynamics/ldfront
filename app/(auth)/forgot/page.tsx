import AuthWrapper from "@/components/AuthWrapper";
import InitialContainer from "@/components/InitialContainer";


export default function Forgot() {

    return (
        <AuthWrapper>
            <InitialContainer image={false} title="Restablecer Contraseña">
                <div className="mt-5 w-full flex justify-center">
                    <li className="text-sm">Sera enviado un correo con las instrucciones para restablecer tu contraseña.</li>
                </div>
                <input
                    type="text"
                    placeholder="Correo"
                    className=" mt-10 w-full border-b border-slate-300 text-3xl text-black outline-none focus:border-slate-600"
                />
                <button className="mt-5 rounded-lg bg-purple-700 px-8 py-2 text-2xl text-white">
                   Restablecer 
                </button>
            </InitialContainer>
        </AuthWrapper>
    );
}

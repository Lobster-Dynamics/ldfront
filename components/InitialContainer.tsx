import Image from "next/image";
import { ReactNode } from "react";

export default function InitialContainer({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    return (
        <div className="z-10 flex w-2/5 flex-col items-center rounded-xl  border-8 border-black bg-white p-10">
            <Image
                src="/logoFrida.png"
                alt="logoFrida"
                width="350"
                height="50"
                className="w-2/5"
            />
            <h1 className="mt-10 text-3xl text-slate-800">{title}</h1>
            {children}
        </div>
    );
}

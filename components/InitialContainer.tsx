import Image from "next/image";
import { ReactNode } from "react";

export default function InitialContainer({
    children,
    title,
    image = true, 
}: {
    children: ReactNode;
    title: string;
    image?: boolean;
}) {
    return (
		<div className="z-10 flex w-11/12 flex-col items-center rounded-xl border-black bg-white p-10 shadow-xl md:w-8/12 lg:w-2/5 my-10">
			{image && (
				<Image
					src="/logoFrida.png"
					alt="logoFrida"
					width="350"
					height="50"
					className="w-2/5"
				/>
			)}

			<h1 className="mt-5 text-center text-3xl text-slate-800">
				{title}
			</h1>
            <hr className="my-4 h-0.5 w-full border-0 bg-slate-500" />
			{children}
		</div>
	);
}

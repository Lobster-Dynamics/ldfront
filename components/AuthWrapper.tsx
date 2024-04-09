import Image from "next/image";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex flex-grow flex-col items-center justify-center bg-gray-100">
			<Image
				src="/mapa_login.png"
				layout="fill"
				objectFit="cover"
				alt="Background"
				className="absolute z-0"
			/>
			{children}
		</div>
	);
}

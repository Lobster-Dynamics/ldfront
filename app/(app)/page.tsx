"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const user = null;

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, []);

	return (
		<div className="">
			<h1>Hola</h1>
		</div>
	);
}

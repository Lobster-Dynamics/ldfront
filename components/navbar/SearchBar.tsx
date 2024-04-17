"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
	return (
		// TODO: Implementar SearchBar y mejorar el diseño
		<div className="hidden md:block relative lg:ml-6 w-1/2">
			<Search className="absolute bottom-0 left-2 top-0 m-auto h-8" />
			<input
				type="text"
				placeholder="Buscar en mis documentos"
				className="w-80 md:96 rounded-lg border-2 lg:w-10/12 max-w-[600px] border-gray-600 py-2 pl-12 transition focus:border-purple-500 focus:outline-none"
			/>
		</div>
	);
}

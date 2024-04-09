"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
	return (
		// TODO: Implementar SearchBar y mejorar el diseño
		<div className="relative ml-6">
			<Search className="absolute bottom-0 left-2 top-0 m-auto h-8" />
			<input
				type="text"
				placeholder="Buscar en mis documentos"
				className="w-96 rounded-lg border-2 border-gray-600 py-2 pl-12 transition focus:border-purple-500 focus:outline-none"
			/>
		</div>
	);
}

"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/selectors/use-on-click-outside";
import { SearchItem } from "@/types/ModelTypes";
import SearchBarItem from "./SearchBarItem";
import { axiosConfig } from "@/config/axiosConfig";
import axiosClient from "@/config/axiosClient";

function useDebounceValue(value:any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Actualizar debouncedValue después de delay
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Hace que setDebouncedValue solo se ejecute después de que se cumpla el tiempo de retraso (delay) y no antes
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}

export default function SearchBar() {
	const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const searchBarRef = useRef<HTMLDivElement | null>(null);

    const debouncedQuery = useDebounceValue(searchValue, 350);
    const controller = new AbortController();

    const handleClickOutside = () => {
        setIsActive(false);
        setSearchResults([]);
    }

    useOnClickOutside(searchBarRef, () => handleClickOutside());

    useEffect(() => {
        const signal = controller.signal;
        (async () => {
            setSearchResults([]);
            try {
                const config = axiosConfig(false, signal);
                if (!config || searchValue === "") return;

                const { data} = await axiosClient(`/document/search_document/${debouncedQuery}`, config)

                setSearchResults(data);
            }
            catch {
                console.log("Error")
            }
        })();

        return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery]);

	return (
		// TODO: Implementar SearchBar y mejorar el diseño
		<div className="hidden w-1/2 md:block lg:ml-6">
			<div
				className={cn("relative w-80 max-w-[600px] lg:w-10/12", {
					"rounded-lg shadow-md": searchResults.length > 0,
				})}
                ref={searchBarRef}
			>
				<Search className="absolute bottom-0 left-2 top-0 m-auto h-8" />
				<input
					type="text"
					placeholder="Buscar en mis documentos"
					className={cn(
						"w-full rounded-lg bg-gray-100 py-2 pl-12 transition focus:bg-white",
						{
							"focus:shadow-md": searchResults.length == 0,
							"rounded-none": searchResults.length > 0,
						},
					)}
                    onClick={() => setIsActive(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    data-test-id="searchBarInput"
				/>
                {isActive && (
                    <div className="absolute w-full rounded-b-lg bg-white shadow-md">
                        {searchResults.map((item) => (
                            <SearchBarItem
                                key={item.id}
                                extension={item.extension}
                                id={item.id}
                                itemName={item.name}
                            />
                        ))}
                    </div>
                )}
			</div>
		</div>
	);
}

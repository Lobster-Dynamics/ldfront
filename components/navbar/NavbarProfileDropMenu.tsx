"use client";

import { LogOut, UserRound } from "lucide-react";
import {
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/authSlice";
import jsCookie from "js-cookie";

export default function NavbarProfileDropMenu() {
	const dispatch = useDispatch<any>();

	const handleLogout = () => {
		dispatch(logOut());
		jsCookie.remove("token");
		jsCookie.remove("refreshToken");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserRound className="h-8 transition hover:text-purpleFrida-300" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-4 w-40">
				<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => window.location.assign("/profile")}>
                    <UserRound className="mr-2 h-4" />
                    <span>Perfil</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-2 h-4 text-redFrida-400" />
					<span className="text-redFrida-400">Cerrar sesión</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

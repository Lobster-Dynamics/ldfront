import Link from "next/link";
import SearchBar from "./SearchBar";
import { Settings } from "lucide-react";
import NavbarProfileDropMenu from "./NavbarProfileDropMenu";

interface NavbarProps {
	isAuth: boolean
}

export default function Navbar({ isAuth }: NavbarProps) {
	return (
		<div className="sticky inset-x-0 top-0 z-30 h-16 bg-white">
			<header className="border-b border-gray-200 px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center md:gap-3 lg:flex-grow">
						<Link href="/" data-test-id="navbarHomeLink">
							<div className="flex gap-2 text-2xl lg:text-3xl">
								<h1 className="text-purpleFrida-300">FRIDA</h1>
								<h1 className="text-black">Research Engine</h1>
							</div>
						</Link>
						{!isAuth && (
							<span
								className="hidden md:block h-8 w-px bg-gray-400"
								aria-hidden="true"
							/>
						)}
						{!isAuth && <SearchBar />}
					</div>
					{!isAuth && (
						<div className="hidden md:flex items-center gap-3">
							{/* <Link
								href="/profile"
								className="text-lg transition hover:text-purpleFrida-300 focus:text-purpleFrida-300 focus:outline-none"
							>
								Cuenta
							</Link> */}
                            <NavbarProfileDropMenu />
						</div>
					)}
				</div>
			</header>
		</div>
	);
}

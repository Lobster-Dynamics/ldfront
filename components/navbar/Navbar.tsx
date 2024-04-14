import Link from "next/link";
import SearchBar from "./SearchBar";
import { Settings } from "lucide-react";

export default function Navbar() {
	const user = "null";

	return (
		<div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
			<header className="border-b border-gray-200 px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-3">
						<Link href="/">
							<div className="flex gap-2 text-3xl">
								<h1 className="text-purple-500">FRIDA</h1>
								<h1 className="text-black">Research Engine</h1>
							</div>
						</Link>
						{user && (
							<span
								className="h-8 w-px bg-gray-400"
								aria-hidden="true"
							/>
						)}
						{user && <SearchBar />}
					</div>
					{user && (
						<div className="flex items-center gap-3">
							<Link
								href="/settings"
								className="group transition-none focus:outline-none"
							>
								<Settings className="h-8 transition hover:text-purple-500 group-focus:text-purple-500" />
							</Link>
							<span
								className="h-8 w-px bg-gray-400"
								aria-hidden="true"
							/>
							<Link
								href="/profile"
								className="text-lg transition hover:text-purple-500 focus:text-purple-500 focus:outline-none"
							>
								Cuenta
							</Link>
						</div>
					)}
				</div>
			</header>
		</div>
	);
}

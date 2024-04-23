import { cn } from "@/lib/utils";

interface SubMenuProps {
    show: boolean;
	x: number;
	y: number;
}

export default function SubMenu({ x, y, show }: SubMenuProps) {
	console.log(x);
	return (
		<div
			className={cn(
				"absolute z-20 border border-black bg-white p-2 opacity-0 transition",
                {"opacity-100": show},
			)}
            style={{ top: `${y}px`, left: `${x}px`}}
		>
			Borrar Documento
		</div>
	);
}

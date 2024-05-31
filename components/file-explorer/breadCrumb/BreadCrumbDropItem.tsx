import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ReactDndItemTypes } from "@/utils/constants";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useDrop } from "react-dnd";

interface BreadCrumbDropItemProps {
	name: string;
	id: UUID;
    isActive: boolean;
}

export default function BreadCrumbDropItem({
	id,
	name,
    isActive
}: BreadCrumbDropItemProps) {
	const router = useRouter();

	const handleItemClick = (id: UUID) => {
		router.push(`/file-explorer?id=${id}`);
	};

	const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
		accept: ReactDndItemTypes.FILE,
		drop: () => ({ id: id }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	return (
		<BreadcrumbItem>
			<BreadcrumbLink
				className={cn(
					"rounded-lg px-2 py-1 outline-none transition md:text-xl hover:cursor-pointer",
					{
						"bg-blueFrida-500 bg-opacity-50 outline-2 outline-blueFrida-700":
							isOver,
					},
                    {"text-black": isActive},
				)}
				onClick={() => handleItemClick(id)}
				// @ts-ignore
				ref={dropRef}
			>
				{name}
			</BreadcrumbLink>
		</BreadcrumbItem>
	);
}

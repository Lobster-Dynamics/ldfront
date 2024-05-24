import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ReactDndItemTypes } from "@/utils/constants";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useDrop } from "react-dnd";

interface BreadCrumbDropItemProps {
	name: string;
	id: UUID;
}

export default function BreadCrumbDropItem({
	id,
	name,
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
					"rounded-lg py-1 px-2 text-xl outline-none transition",
					{
						"bg-blueFrida-500 bg-opacity-50 outline-2 outline-blueFrida-700":
							isOver,
					},
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

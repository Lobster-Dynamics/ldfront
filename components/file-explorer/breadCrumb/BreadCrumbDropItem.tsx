import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { PathItem } from "@/types/ModelTypes";
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

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
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
				className="text-xl"
				onClick={() => handleItemClick(id)}
                // @ts-ignore
                ref={drop}
			>
				{name}
			</BreadcrumbLink>
		</BreadcrumbItem>
	);
}

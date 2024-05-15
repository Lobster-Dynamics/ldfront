import { PathItem } from "@/types/ModelTypes";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";

interface BreadCrumbProps {
	items: PathItem[] | undefined;
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
	const router = useRouter();

    const handleItemClick = (id: UUID) => {
        router.push(`/file-explorer?id=${id}`);
    }
    
    return (
		<Breadcrumb>
			<BreadcrumbList>
                {items?.map((item, index) => (
                    <>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink className="text-xl" onClick={() => handleItemClick(item.id)}>{item.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </>
                ))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

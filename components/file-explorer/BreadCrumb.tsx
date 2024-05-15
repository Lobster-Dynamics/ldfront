import { PathItem } from "@/types/ModelTypes";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

interface BreadCrumbProps {
	items: PathItem[] | undefined;
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
                {items?.map((item, index) => (
                    <>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink className="text-xl" href={`/file-explorer?id=${item.id}`}>{item.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </>
                ))}
				{/* <BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/components">
						Components
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem> */}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

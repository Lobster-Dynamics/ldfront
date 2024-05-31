"use client";

import { BreadcrumbEllipsis, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { PathItem } from "@/types/ModelTypes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BreadCrumDropMenuProps {
	items: PathItem[] | undefined;
}

export default function BreadCrumbDropMenu({ items }: BreadCrumDropMenuProps) {
	const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleItemClick = (id: UUID) => {
		router.push(`/file-explorer?id=${id}`);
	};

	return (
		<BreadcrumbItem>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger
					className="flex items-center gap-1"
					aria-label="Toggle menu"
				>
					<BreadcrumbEllipsis className="h-4 w-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					{items?.map((item, index) => (
						<DropdownMenuItem key={index} onClick={() => handleItemClick(item.id)} className="cursor-pointer">
                            {item.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</BreadcrumbItem>
	);
}
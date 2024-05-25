import { PathItem } from "@/types/ModelTypes";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import React from "react";
import BreadCrumbDropItem from "./BreadCrumbDropItem";

interface BreadCrumbProps {
	items: PathItem[] | undefined;
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items?.map((item, index) => (
					<React.Fragment key={index}>
                        <BreadCrumbDropItem id={item.id} name={item.name} />
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

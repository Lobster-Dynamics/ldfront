import { PathItem } from "@/types/ModelTypes";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BreadCrumbDropItem from "./BreadCrumbDropItem";
import { Fragment } from "react";
import BreadCrumbDropMenu from "./BreadCrumbDropMenu";

interface BreadCrumbProps {
	items: PathItem[] | undefined;
}

const ITEMS_TO_DISPLAY = 3;

export default function BreadCrumb({ items }: BreadCrumbProps) {
	const showDropMenu =
		items === undefined ? false : items.length > ITEMS_TO_DISPLAY;
	const displayItems =
		items && showDropMenu
			? [items[0], ...items.slice(-ITEMS_TO_DISPLAY)]
			: items;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{displayItems?.map((item, index) => (
					<Fragment key={index}>
						{index === 1 && showDropMenu ? (
							<BreadCrumbDropMenu
								items={items?.slice(1, -ITEMS_TO_DISPLAY + 1)}
							/>
						) : (
							<BreadCrumbDropItem id={item.id} name={item.name} isActive={index === displayItems.length - 1} />
						)}
						{index < displayItems.length - 1 && (
							<BreadcrumbSeparator />
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

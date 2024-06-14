import { UUID } from "crypto";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface SearchBarItemProps {
	extension: ".docx" | ".pdf" | ".pptx" | null;
	id: UUID;
	itemName: string;
}

export default function SearchBarItem({
	extension,
	id,
	itemName,
}: SearchBarItemProps) {
	const imageName = extension?.replace(".", "") ?? "folder";
	const itemRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		const openDocument = () => {
			window.open(`/documento?id=${id}`, "_blank");
		};

		const openDirectory = () => {
			router.push(`/file-explorer?id=${id}`);
		};

		let localRef = itemRef.current;
		if (itemRef.current) localRef = itemRef.current;

		if (localRef) {
			if (extension === null)
				localRef.addEventListener("click", openDirectory);
			else localRef.addEventListener("click", openDocument);
		}

		return () => {
			if (localRef) {
				if (extension === null)
					localRef.removeEventListener("click", openDirectory);
				else localRef.removeEventListener("click", openDocument);
			}
		};
	}, [id, router, extension]);

	return (
		<div className="border-t border-black border-opacity-30" data-test-id="searchBarItem">
			<div
				className="group flex justify-between rounded-lg p-2 outline-none transition hover:cursor-pointer hover:bg-purpleFrida-500 hover:bg-opacity-10 focus:bg-purpleFrida-500 focus:bg-opacity-10"
				tabIndex={0}
                ref={itemRef}
			>
				<div className="flex w-full">
					<div className="flex w-8 flex-shrink-0 items-center">
						<Image
							src={`/${imageName}.png`}
							alt="file icon"
							height={30}
							width={30}
							className="m-auto w-5"
						/>
					</div>
					<p className="overflow-hidden text-ellipsis whitespace-nowrap ">
						{itemName}
					</p>
				</div>
			</div>
		</div>
	);
}

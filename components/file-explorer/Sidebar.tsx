import { ChevronRight, ChevronDown } from "lucide-react";
import { Dot } from "lucide-react";
import { useState } from "react";

interface File {
	name: string;
	type: string;
	childs?: string[];
}

export default function Sidebar() {
	const [openIndexes, setOpenIndexes] = useState<number[]>([]);

	const files: File[] = [
		{
			name: "Ciencias Sociales",
			type: "folder",
			childs: ["Ciencias no Sociales"],
		},
		{ name: "Biologia", type: "folder" },
		{ name: "Computación", type: "folder" },
		{ name: "Langostas", type: "file" },
		{ name: "Filosofía", type: "folder" },
		{ name: "Ciencias Sociales", type: "folder" },
		{ name: "Biologia", type: "folder" },
		{ name: "Computación", type: "folder" },
		{ name: "Filosofía", type: "folder" },
		{ name: "Tipos de Langostas", type: "file" },
		{ name: "Como ser amigo de una langosta", type: "file" },
	];

	const handleClick = (index: number) => {
		const currentIndex = openIndexes.indexOf(index);
		const newOpenIndexes = [...openIndexes];

		if (currentIndex === -1) {
			newOpenIndexes.push(index);
		} else {
			newOpenIndexes.splice(currentIndex, 1);
		}

		setOpenIndexes(newOpenIndexes);
	};

	return (
		<div className="my-4 w-full flex-grow flex-wrap rounded-lg bg-[#F3F4F6] p-4">
			{files.map((file, i) => {
				if (file.type === "folder")
					return (
						<div className="my-2 ml-2 flex" key={i}>
							<button onClick={() => handleClick(i)}>
								{openIndexes.includes(i) ? (
									<ChevronDown className="flex-shrink-0"></ChevronDown>
								) : (
									<ChevronRight className="flex-shrink-0"></ChevronRight>
								)}
							</button>
							<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
								{file.name}
							</p>
						</div>
					);
				else if (file.type === "file")
					return (
						<div className="my-2 ml-2 flex" key={i}>
							<Dot className="flex-shrink-0"></Dot>
							<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
								{file.name}
							</p>
						</div>
					);
			})}
		</div>
	);
}

import { File } from "lucide-react";
import { useState } from "react";
import { ReactNode } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
  } from "@/components/ui/accordion"
  
interface File {
	name: string;
	type: string;
	childs?: File[];
}

export default function Sidebar() {
	const files: File[] = [
		{
			name: "Ciencias Sociales",
			type: "folder",
			childs: [{ name: "Ciencias no Sociales", type: "folder", childs:[{name: "No se", type: "folder", childs:[{name:"El pepe", type:"file"}]}] }, 
			{ name: "Como hacer amigos", type: "file" },],
		},
		{ name: "Biologia", type: "folder" , childs: []},
		{ name: "Computación", type: "folder", childs: [] },
		{ name: "Langostas", type: "file" },
		{ name: "Filosofía", type: "folder", childs: [] },
		{ name: "Ciencias Sociales", type: "folder", childs: [] },
		{ name: "Biologia", type: "folder", childs: [] },
		{ name: "Computación", type: "folder", childs: [] },
		{ name: "Filosofía", type: "folder", childs: [] },
		{ name: "Tipos de Langostas", type: "file" },
		{ name: "Como ser amigo de una langosta", type: "file" },
		{ name: "Biologia", type: "folder" , childs: []},
		{ name: "Computación", type: "folder", childs: [] },
		{ name: "Langostas", type: "file" },
		{ name: "Filosofía", type: "folder", childs: [] },
		{ name: "Ciencias Sociales", type: "folder", childs: [] },
		{ name: "Biologia", type: "folder", childs: [] },
		{ name: "Computación", type: "folder", childs: [] },
		{ name: "Filosofía", type: "folder", childs: [] },
		{ name: "Tipos de Langostas", type: "file" },
		{ name: "Como ser amigo de una langosta", type: "file" },
		{ name: "Biologia", type: "folder" , childs: []},
		{ name: "Computación", type: "folder", childs: [] },
		{ name: "Langostas", type: "file" },
		{ name: "Filosofía", type: "folder", childs: [] },
		{ name: "Ciencias Sociales", type: "folder", childs: [] },
		{ name: "Biologia", type: "folder", childs: [] },
		{ name: "Computación", type: "folder", childs: [] },
		{ name: "Filosofía", type: "folder", childs: [] },
		{ name: "Tipos de Langostas", type: "file" },
		{ name: "Como ser amigo de una langosta", type: "file" },
	];
	
	function MakeAccordion({children}:{children?:File[];}){
		return (
			<Accordion type="multiple" >
			{children?.map((file, i) => {
				if (file.type === "folder")
					return (
						<div className="ml-1 flex" key={i}>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger><p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
								{file.name}
							</p></AccordionTrigger>
							<AccordionContent>
								<MakeAccordion children={file.childs}></MakeAccordion>
							</AccordionContent>
							</AccordionItem>
						</div>
					);
				else if (file.type === "file")
					return (
						<div className="ml-1 flex items-center py-1 rounded-lg outline-none transition hover:cursor-pointer hover:bg-[#7B20C3] hover:bg-opacity-10 focus:bg-[#7B20C3] focus:bg-opacity-10 px-2" key={i}>
							<File className="flex-shrink-0 h-4 w-4 ml-4"></File>
							<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
								{file.name}
							</p>
						</div>
					);
			})}
			</Accordion>
		)
	}
	

	return (
		<div className="my-3 w-full h-screen flex-wrap rounded-lg overflow-hidden overflow-y-auto scroll-smooth whitespace-nowrap  bg-[#F3F4F6] p-2">
			<MakeAccordion children={files}></MakeAccordion>
		</div>
	)
}

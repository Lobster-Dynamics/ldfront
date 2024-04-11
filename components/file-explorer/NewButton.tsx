import { Plus } from "lucide-react";

export default function NewButton() {
	return (
		<div className="border-2 border-black self-center items-center flex h-14 rounded-lg bg-[#F3F4F6] hover:bg-[#7B20C3] hover:bg-opacity-20 transition p-4">
            <Plus size={30} />
            <p className="min-[0px]:hidden lg:block lg:text-md xl:text-2xl">
				Nuevo
			</p>
        </div>
	);
}
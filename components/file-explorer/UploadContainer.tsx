import { useSelector } from "react-redux";
import { Stack } from "@/types/ReduxTypes";
import { RootState } from "@/redux/store";
import { LoadingSpinner } from "../PageLoader/LoadingSpinner";
import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteElement, emptyStack } from "@/redux/slices/stackSlice";
import 'react-toastify/dist/ReactToastify.css';

export default function UploadContainer() {
	const dispatch = useDispatch();
	const stack = useSelector((state: RootState) => state.stack.stack);
	useEffect(() => {
		console.log("Stack changed:", stack);
	}, [stack]);

	if (stack.length === 0) {
		return null;
	}

	return (
		<div className="absolute bottom-0 right-0 z-10 flex w-4/12 flex-col h-48   rounded-md bg-white p-4 shadow-lg">
            <div className="flex mb-2 flex-row items-center justify-end mr-5 font-extralight">
                <h1 className="text-base hover:cursor-pointer"
                    onClick={() => dispatch(emptyStack())}
                >
                   Borrar todo 
                </h1>   
            </div>
			{stack.map((item: Stack) => (
				<div
					key={item.id}
					className="flex mb-2 flex-row items-center justify-between"
				>
					<div className="flex flex-row items-center gap-2">
						{!item.cargado && (
							<X
								className="text-red-300 hover:cursor-pointer"
								onClick={() => {
									dispatch(deleteElement(item.id));
								}}
								size={20}
							/>
						)}

						<h1
                            className={`text-xl ${!item.cargado && " font-light hover:underline hover:cursor-pointer"}`}
							onClick={() =>
								window.open(
									`/documento?id=${item.id}`,
									"_blank",
								)
							}
						>
							{item.name}
						</h1>
					</div>
					{item.cargado ? (
						<LoadingSpinner />
					) : (
						<Check className="text-green-300" size={20} />
					)}
				</div>
			))}
		</div>
	);
}

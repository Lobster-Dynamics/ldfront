import { toggleModalBorrar, toggleModalAñadirConcepto, toggleModalDefinicion } from "@/redux/slices/modalSlice";
import { Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { KeyConcept } from "@/types/ModelTypes";

interface KeywordsProps {
	keywords: KeyConcept[];
}

export default function Keywords({ keywords }: KeywordsProps) {

    const dispatch = useDispatch();
	return (
		<div className="flex flex-wrap  p-6 ">
			{keywords.map((keyword) => (
				<Keyword keyword={keyword.name} key={keyword.id} />
			))}
			<button className="my-2 rounded-3xl bg-gray-200 p-2"
            onClick={() => {
                dispatch(toggleModalAñadirConcepto())
            }}
            >
				<Plus className="text-white" />
			</button>
		</div>
	);
}

interface KeywordProps {
	keyword: string;
}

const Keyword = ({ keyword }: KeywordProps) => {
    const dispatch = useDispatch();
	return (
		<>
			<div className="group my-2 mr-4 flex flex-row items-start rounded-2xl bg-gray-200 px-3 py-2 font-mono font-medium shadow-sm hover:bg-purple-200">
				<button className="text-black hover:underline" 
				onClick={() => {
					dispatch(toggleModalDefinicion())
				}}
				
			
				>
					{keyword}
				</button>

				<button
                onClick={() => {
                    dispatch(toggleModalBorrar())
                }}

                >
					<X
						className="ml-3 text-red-500 opacity-0 group-hover:opacity-100"
						style={{ cursor: "url('Lobster.cur'), auto" }}
					/>
				</button>
			</div>
		</>
	);
};

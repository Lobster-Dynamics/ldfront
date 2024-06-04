import Modal from "@/components/ui/Modal";
import { toggleModalAñadirConcepto } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addKeyConcept } from "@/services/Document/KeyConcept/KeyConceptManagment";
import { useState } from "react";
import { mutate } from "swr";

export default function ModalAdd() {
	const dispatch = useDispatch();

	const { isOpen, documentId } = useSelector(
		(state: RootState) => state.modal.modalAñadirConcepto,
	);
	const [keyword, setKeyword] = useState("");

	const handleClick = async () => {
		try {
			if (keyword === "") return;
			addKeyConcept(documentId, keyword);
			mutate(`/document/get_document/${documentId}`);
			dispatch(toggleModalAñadirConcepto());
		} catch (err: any) {
			console.log(err);
		}
	};

	return (
		<Modal
			active={isOpen}
			setActive={() => dispatch(toggleModalAñadirConcepto())}
			className="w-1/3 p-8"
		>
			<h1 className=" mt-4 text-start font-mono text-4xl">
				Añadir keyword{" "}
			</h1>
			<div className="mt-6 flex justify-start">
				<input
					type="text"
					className=" hover:none w-5/6 rounded-lg border-2 border-gray-500 p-4 font-mono text-xl text-gray-400"
					placeholder="keyword"
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</div>
			<div className="mt-8 flex justify-end">
				<div className="flex w-1/2 justify-between">
					<button
						className="font-mono text-2xl text-red-500"
						onClick={() => {
							dispatch(toggleModalAñadirConcepto());
						}}
					>
						Cancelar
					</button>
					<button
						className="font-mono text-2xl text-purple-500"
						onClick={() => {
							handleClick();
						}}
					>
						Añadir
					</button>
				</div>
			</div>
		</Modal>
	);
}

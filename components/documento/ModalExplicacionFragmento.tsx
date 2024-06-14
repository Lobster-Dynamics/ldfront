import React from "react";
import Modal from "@/components/ui/Modal";
import { toggleModalExplicacionFragmento } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ModalExplicacionFragmento() {
	const { isOpen, explication } = useSelector(
		(state: RootState) => state.modal.modalExplicacionFragmento,
	);

	const dispatch = useDispatch();

	return (
		<Modal
			active={isOpen}
			setActive={() => dispatch(toggleModalExplicacionFragmento())}
			className="w-[600px] p-6 bg-white rounded-lg shadow-lg"
		>
			<div className="flex items-start text-start text-2xl font-semibold text-gray-800 mb-4">
				<h2>Explicación</h2>
			</div>
			
			{explication.length > 0 ? (
				<div className="flex w-full flex-col items-start justify-start space-y-2 text-start h-80 overflow-y-auto">
					<p className="text-lg text-gray-600" data-test-id="explanationItemParagraph">
						{explication}
					</p>
				</div>
			) : (
				<p>No se encontró ninguna explicación.</p>
			)}

			<div className="mt-4 flex justify-end">
				<button
					className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
					onClick={() => dispatch(toggleModalExplicacionFragmento())}
				>
					Cerrar
				</button>
			</div>
		</Modal>
	);
}


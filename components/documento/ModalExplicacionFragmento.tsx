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
			className="relative max-h-96 w-1/2 min-w-96 max-w-[600px] overflow-y-auto px-8 py-4"
		>
			<div className="sticky -top-4 -mt-4 mb-4 grid grid-cols-2 border-b bg-white pt-4">
				<h1 className="text-start text-2xl leading-loose">
					Explicación
				</h1>
				<button
					onClick={() => dispatch(toggleModalExplicacionFragmento())}
					className="text-1xl w-fit  justify-self-end text-red-500"
				>
					Cerrar
				</button>
			</div>

			{explication.length > 0 ? (
				<div className="flex w-full flex-col items-start justify-start space-y-2 text-start">
					<p className="text-mono text-lg font-medium" data-test-id="explanationItemParagraph">
						{explication}
					</p>
				</div>
			) : (
				<p>No se encontro ninguna explicación.</p>
			)}
		</Modal>
	);
}

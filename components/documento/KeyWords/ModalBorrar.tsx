import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/ui/Modal";
import { toggleModalBorrar } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";

export default function ModalBorrar() {
	const dispatch = useDispatch();

	const { modalBorrar } = useSelector((state: RootState) => state.modal);

	return (
		<Modal
			active={modalBorrar}
			setActive={() => dispatch(toggleModalBorrar())}
            className="w-1/3 p-8"
		>
				<h1 className="text-start font-mono text-4xl leading-loose">
					¿Desea eliminar &apos;Crops&apos; de los keywords?
				</h1>{" "}
				<div className="flex justify-end mt-8">
					<div className="flex w-1/2 justify-between">
						<button
							className="font-mono text-2xl text-red-500"
							onClick={() => {
								dispatch(toggleModalBorrar());
							}}
						>
							Cancelar
						</button>
						<button className="font-mono text-2xl text-purple-500">
							Eliminar
						</button>
					</div>
				</div>
		</Modal>
	);
}

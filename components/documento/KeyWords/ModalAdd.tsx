import Modal from "@/components/ui/Modal";
import { toggleModalAñadirConcepto } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ModalAdd() {

    const dispatch = useDispatch();

    const { modalAñadirConcepto } = useSelector((state: RootState) => state.modal);

    return (

        <Modal active={modalAñadirConcepto} setActive={() => dispatch(toggleModalAñadirConcepto())} className="w-1/3 p-8" >

            <h1 className=" font-mono text-4xl text-start mt-4">Añadir keyword </h1>
            <div className="flex justify-start mt-6">
            <input
            type="text"
            className=" p-4 text-xl rounded-lg font-mono w-5/6 border-2 border-gray-500 text-gray-400 hover:none"
            placeholder="keyword"
            />
            </div>
            <div className="flex justify-end mt-8">
					<div className="flex w-1/2 justify-between">
						<button
							className="font-mono text-2xl text-red-500"
							onClick={() => {
								dispatch(toggleModalAñadirConcepto());
							}}
						>
							Cancelar
						</button>
						<button className="font-mono text-2xl text-purple-500">
							Añadir
						</button>
					</div>
				</div>

         </Modal >


    );
}

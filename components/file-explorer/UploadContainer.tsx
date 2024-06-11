// Import statements
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Stack } from "@/types/ReduxTypes";
import { deleteElement, emptyStack } from "@/redux/slices/stackSlice";
import { LoadingSpinner } from "../PageLoader/LoadingSpinner";
import { Check, X } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { mutate } from "swr";
import useAuth from "@/hooks/selectors/useAuth";


interface UploadItemProps {
    item: Stack;
}

const UploadItem: React.FC<UploadItemProps> = ({ item}) => {
    const { auth } = useAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!item.cargado) {
            console.log(`/directory/get_directory/${auth?.rootDirectoryId}`);
            mutate(`/directory/get_directory/${auth?.rootDirectoryId}`);

                    }
    }, [item.cargado, item.id,auth?.rootDirectoryId]);

    return (
        <div className="flex mb-2 flex-row items-center justify-between" data-test-id="upload-item">
            <div className="flex flex-row items-center gap-2">
                {item.cargado ? (
                    <LoadingSpinner />
                ) : (
                    <Check data-test-id="check" className="text-green-300" size={20} />
                )}
                <h1
                    className={`text-xl ${!item.cargado ? "font-light hover:underline hover:cursor-pointer" : ""}`}
                    onClick={() => window.open(`/documento?id=${item.id}`, "_blank")}
                >
                    {item.name}
                </h1>
            </div>
            {!item.cargado && (
                <X
                    className="text-red-300 hover:cursor-pointer"
                    onClick={() => dispatch(deleteElement(item.id))}
                    size={20}
                />
            )}
        </div>
    );
};


// UploadContainer Component
const UploadContainer: React.FC = () => {
    const dispatch = useDispatch();
    const stack = useSelector((state: RootState) => state.stack.stack);

    useEffect(() => {
        console.log("Stack changed:", stack);
    }, [stack]);

    if (stack.length === 0) {
        return null;
    }

    return (
        <div className="absolute bottom-0 right-0 z-10 flex w-4/12 flex-col h-48 rounded-md bg-white p-4 shadow-lg">
            <div className="flex mb-2 flex-row items-center justify-end mr-5 font-extralight">
                <h1 className="text-base hover:cursor-pointer" onClick={() => dispatch(emptyStack())}>
                    Borrar todo
                </h1>
            </div>
            {stack.map((item: Stack) => (
                <UploadItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default UploadContainer;


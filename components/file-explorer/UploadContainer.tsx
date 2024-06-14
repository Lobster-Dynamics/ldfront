import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Stack } from "@/types/ReduxTypes";
import { deleteElement, emptyStack } from "@/redux/slices/stackSlice";
import { LoadingSpinner } from "../PageLoader/LoadingSpinner";
import { Check, X, ChevronUp, ChevronDown } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { mutate } from "swr";
import useAuth from "@/hooks/selectors/useAuth";

interface UploadItemProps {
    item: Stack;
}

const UploadItem: React.FC<UploadItemProps> = ({ item }) => {
    const { auth } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!item.cargado) {
            console.log(`/directory/get_directory/${auth?.rootDirectoryId}`);
            mutate(`/directory/get_directory/${auth?.rootDirectoryId}`);
        }
    }, [item.cargado, item.id, auth?.rootDirectoryId]);

    return (
        <div className="flex mb-2 flex-row items-center justify-between" data-test-id="upload-item">
            <div className="flex flex-row items-center gap-2">
                {!item.cargado && (
                    <X
                        className="text-red-500 hover:cursor-pointer"
                        onClick={() => dispatch(deleteElement(item.id))}
                        size={20}
                    />
                )}

                <h1
                    className={`text-xl ${!item.cargado ? "font-light hover:underline hover:cursor-pointer" : ""}`}
                    onClick={() => window.open(`/documento?id=${item.id}`, "_blank")}
                >
                    {item.name}
                </h1>
            </div>
            {item.cargado ? (
                <LoadingSpinner />
            ) : (
                <Check data-test-id="check" className="text-green-500" size={20} />
            )}
        </div>
    );
};

const UploadContainer: React.FC = () => {
    const [expanded, setExpanded] = useState(true);
    const dispatch = useDispatch();
    const stack = useSelector((state: RootState) => state.stack.stack);

    useEffect(() => {
        console.log("Stack changed:", stack);
    }, [stack]);

    if (stack.length === 0) {
        return null;
    }

    return (
        <div className={`absolute bottom-0 right-4 z-10 flex min-w-[300px] xl:min-w-[400px] 2xl:min-w-[450px] flex-col rounded-md bg-white shadow-lg ${expanded ? 'h-48' : 'h-12'}`}>
            <div className="flex flex-row items-center justify-end bg-blueFrida-300 opacity-70 p-4 rounded-t-md">
                {expanded ? (
                    <ChevronDown className="hover:cursor-pointer" onClick={() => setExpanded(false)} size={20} /> 
                ) : (
                    <ChevronUp className="hover:cursor-pointer" onClick={() => setExpanded(true)} size={20} />
                )}
                <X className="ml-2 hover:cursor-pointer" onClick={() => dispatch(emptyStack())} size={20} />
            </div>
            {expanded && (
                <div className="p-4">
                    {stack.map((item: Stack) => (
                        <UploadItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadContainer;


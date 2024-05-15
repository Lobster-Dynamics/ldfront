import { useSelector } from "react-redux";
import { Stack } from "@/types/ReduxTypes";
import { RootState } from "@/redux/store";
import { LoadingSpinner } from "../PageLoader/LoadingSpinner";
import { useEffect } from "react";
import { Check } from "lucide-react";

export default function UploadContainer() {
    const stack = useSelector((state: RootState) => state.stack.stack);
    useEffect(() => {
        console.log("Stack changed:", stack);
    }, [stack]);
    return (
        <div className="absolute bottom-0 right-0 z-10 flex w-4/12 flex-col rounded-md bg-white p-4 shadow-sm">
            {stack.map((item: Stack) => (
                <div key={item.id} className="flex flex-row justify-between">
                    <h1 className="text-lg">{item.name}</h1>
                    {item.cargado ? <LoadingSpinner /> : <Check className="text-green-500" size={20} />}
                </div>
            ))}
        </div>
    );
}

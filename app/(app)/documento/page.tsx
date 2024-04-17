import Visualizador from "@/components/documento/Visualizador";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <Visualizador />
        </Suspense>
    )
}
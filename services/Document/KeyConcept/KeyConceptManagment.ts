import { errorHandler } from "@/utils/errorHandler";
import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { AceptAlert } from "@/lib/alerts/alerts";

export async function addKeyConcept(document_id: string, keyword: string) {
    try{
        const config = axiosConfig();
        if (!config) return;

        await axiosClient.post(
            "/document/add_key_concept",
            {
                document_id: document_id,
                name: keyword
            },
            config
        );
        AceptAlert("Se ha añadido el concepto!");
    }catch(err:any){
        errorHandler(err);
    }
} 

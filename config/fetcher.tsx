import axiosClient from "./axiosClient";
import { axiosConfig } from "@/config/axiosConfig";


const config = axiosConfig();
export const fetcher = (url: string) => axiosClient(url,config ?? {}).then((datos) => datos.data)


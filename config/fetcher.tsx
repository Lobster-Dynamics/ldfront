import axiosClient from "./axiosClient";
import { axiosConfig } from "@/config/axiosConfig";


export const fetcher = (url: string) =>axiosClient(url, axiosConfig() ?? undefined).then((res) => res.data);

export const postFetcher = (url: string, data: any) => axiosClient.post(url, data, axiosConfig() ?? undefined).then((res) => res.data);

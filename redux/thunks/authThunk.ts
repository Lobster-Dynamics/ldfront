import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadAuth = createAsyncThunk(
    "/auth/loadAuthFromToken",
    async () => {
        try {
            const config = axiosConfig();
            if (!config) return;

            const { data } = await axiosClient("/user/load_profile", config)

            return data;
        } catch(error: any) {
            // TODO: Actualizar manejo de errores
            console.log(error)
        }
    }
)
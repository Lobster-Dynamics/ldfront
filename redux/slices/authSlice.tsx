import { UserAuth } from "@/types/ModelTypes";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null as null | UserAuth,
        cargando: true
    },
    reducers: {} // Add an empty object for the reducers property
})

import { createSlice } from "@reduxjs/toolkit"
import { UserAuth } from "@/types/ModelTypes"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth:null as null | UserAuth,
        cargando: true
    },
})

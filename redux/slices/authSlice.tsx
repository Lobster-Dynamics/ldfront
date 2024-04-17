import { UserAuth } from "@/types/ModelTypes";
import { createSlice } from "@reduxjs/toolkit";
import { loadAuth } from "../thunks/authThunk";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null as null | UserAuth,
        cargando: true
    },
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload
            state.cargando = false
        },
    },
    extraReducers(builder) {
        builder.addCase(loadAuth.pending, (state, action) => {
            state.cargando = true;
        }),
        builder.addCase(loadAuth.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.cargando = false;
        }),
        builder.addCase(loadAuth.rejected, (state, action) => {
            state.cargando = false;
        })
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

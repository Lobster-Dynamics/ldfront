import { createSlice } from "@reduxjs/toolkit";

//Se crea la slice

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modalDefinicion: false,
        modalAñadirConcepto: false,
        modalBorrar: false,
    },
    reducers: {
        toggleModalDefinicion: (state: { modalDefinicion: boolean; }) => {
            state.modalDefinicion = !state.modalDefinicion;
        },
        toggleModalAñadirConcepto: (state: { modalAñadirConcepto: boolean; }) => {
            state.modalAñadirConcepto = !state.modalAñadirConcepto;
        },
        toggleModalBorrar: (state: { modalBorrar: boolean; }) => {
            state.modalBorrar = !state.modalBorrar;
        }
    }
})

export const { toggleModalDefinicion, toggleModalAñadirConcepto, toggleModalBorrar } = modalSlice.actions;

export default modalSlice.reducer


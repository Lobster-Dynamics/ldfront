import { createSlice } from "@reduxjs/toolkit";

//Se crea la slice

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modalDefinicion: false,
        modalAñadirConcepto: false,
        modalBorrar: false,
        modalAñadirCarpeta: false,
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
        },
        toggleModalAñadirCarpeta: (state: { modalAñadirCarpeta: boolean; }) => {
            state.modalAñadirCarpeta = !state.modalAñadirCarpeta;
        }
    }
})

export const { toggleModalDefinicion,toggleModalAñadirCarpeta, toggleModalAñadirConcepto, toggleModalBorrar } = modalSlice.actions;

export default modalSlice.reducer


import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//Se crea la slice

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modalDefinicion:{
            isOpen: false,
            word: "",
            language: "",
        },
        modalAñadirConcepto: false,
        modalBorrar: false,
        modalAñadirCarpeta: false,
    },
    reducers: {
        toggleModalDefinicion: (state) => {
            state.modalDefinicion.isOpen = !state.modalDefinicion.isOpen;
        },
         setModalDefinicionDetails: (state, action: PayloadAction<{ word: string; language: string; }>) => {
            state.modalDefinicion.word = action.payload.word;
            state.modalDefinicion.language = action.payload.language;
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

export const { setModalDefinicionDetails,toggleModalDefinicion, toggleModalAñadirCarpeta, toggleModalAñadirConcepto, toggleModalBorrar } = modalSlice.actions;

export default modalSlice.reducer


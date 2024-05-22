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
        modalBorrar:{
            isOpen: false,
            id: "",
            documentId: "",
        },
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
        toggleModalBorrar: (state) => {
            state.modalBorrar.isOpen = !state.modalBorrar.isOpen;
        },
        setModalBorrarDetails: (state, action: PayloadAction<{ id: string; documentId: string; }>) => {
            state.modalBorrar.id = action.payload.id;
            state.modalBorrar.documentId = action.payload.documentId;
        },
        toggleModalAñadirCarpeta: (state: { modalAñadirCarpeta: boolean; }) => {
            state.modalAñadirCarpeta = !state.modalAñadirCarpeta;
        }
    }
})

export const { setModalBorrarDetails,setModalDefinicionDetails,toggleModalDefinicion, toggleModalAñadirCarpeta, toggleModalAñadirConcepto, toggleModalBorrar } = modalSlice.actions;

export default modalSlice.reducer


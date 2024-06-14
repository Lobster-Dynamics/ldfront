import { KeyConcept } from "@/types/ModelTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//Se crea la slice

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modalDefinicion: {
            isOpen: false,
            word: "",
            language: "",
        },
        modalAñadirConcepto: {
            isOpen: false,
            documentId: "",
        },
        modalBorrar: {
            isOpen: false,
            id: "",
            documentId: "",
        },
        modalAñadirCarpeta: false,
        modalExplicacionFragmento: {
            isOpen: false,
            explication: ""
        },
        modalKeyConcept: {
            isOpen: false,
            keyConcept: null as KeyConcept | null 
        }
    },
    reducers: {
        
        toggleModalKeyConcept: (state) => {
            state.modalKeyConcept.isOpen = !state.modalKeyConcept.isOpen;
        },
        setModalKeyConcept: (state, action: PayloadAction<{ keyConcept: KeyConcept | null }>) => {
            state.modalKeyConcept.keyConcept = action.payload.keyConcept;
        },

        toggleModalExplicacionFragmento: (state) => {
            state.modalExplicacionFragmento.isOpen = !state.modalExplicacionFragmento.isOpen;
        },
        setModalExplicacionFragmento: (state, action: PayloadAction<{explication: string; }>) => {
            state.modalExplicacionFragmento.explication =   action.payload.explication;
        },
        toggleModalDefinicion: (state) => {
            state.modalDefinicion.isOpen = !state.modalDefinicion.isOpen;
        },
        setModalDefinicionDetails: (state, action: PayloadAction<{ word: string; language: string; }>) => {
            state.modalDefinicion.word = action.payload.word;
            state.modalDefinicion.language = action.payload.language;
        },
        setModalAñadirConceptoDetails: (state, action: PayloadAction<{ documentId: string; }>) => {
            state.modalAñadirConcepto.documentId = action.payload.documentId;
        },
        toggleModalAñadirConcepto: (state) => {
            state.modalAñadirConcepto.isOpen = !state.modalAñadirConcepto.isOpen;
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

export const { setModalBorrarDetails,setModalDefinicionDetails,toggleModalDefinicion, toggleModalAñadirCarpeta, toggleModalAñadirConcepto, toggleModalBorrar, toggleModalExplicacionFragmento, setModalExplicacionFragmento,setModalAñadirConceptoDetails, toggleModalKeyConcept,setModalKeyConcept } = modalSlice.actions;

export default modalSlice.reducer


import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Stack } from "@/types/ReduxTypes";

export const stackSlice = createSlice({
    name: "stack",

    initialState: {
        stack: [] as Stack[],
    },

    reducers: {
        addElement: (state, action: PayloadAction<Stack>) => {
            state.stack.push(action.payload);
        },
        ChangeElement: (state, action: PayloadAction<string>) => {
            const index = state.stack.findIndex(
                (element) => element.id === action.payload,
            );
            if (index !== -1) {
                state.stack[index].cargado = false;
            }
        },
         deleteElement: (state, action: PayloadAction<string>) => {
            const index = state.stack.findIndex(
                (element) => element.id === action.payload,
            );
            if (index !== -1) {
                state.stack.splice(index, 1);
            }
        },

        emptyStack: (state) => {
            state.stack = [];
        },

    },
});

export const { addElement,ChangeElement,deleteElement,emptyStack} = stackSlice.actions;
export default stackSlice.reducer;

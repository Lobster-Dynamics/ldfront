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
        deleteElement: (state, action: PayloadAction<string>) => {
            const index = state.stack.findIndex(
                (element) => element.id === action.payload,
            );
            if (index !== -1) {
                state.stack[index].cargado = false;
            }
        },
    },
});

export const { addElement,deleteElement } = stackSlice.actions;
export default stackSlice.reducer;

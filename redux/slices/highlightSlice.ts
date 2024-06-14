import { ChatHighlight } from "@/types/ModelTypes";
import { createSlice } from "@reduxjs/toolkit";

export const highlightSlice = createSlice({
    name: 'highlight',
    initialState: {
        highlightSection: null as null | ChatHighlight[],
    },
    reducers: {
        setHighlights: (state, action) => {
            state.highlightSection = action.payload
        },
    }
});

export const { setHighlights } = highlightSlice.actions;

export default highlightSlice.reducer;

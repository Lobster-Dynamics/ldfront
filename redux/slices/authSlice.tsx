import { UserAuth } from "@/types/ModelTypes";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null as null | UserAuth,
        cargando: true
    },
    reducers: {

     setAuth:(state,action)=>{
      state.auth = action.payload
      state.cargando = false
  },
    } // Add an empty object for the reducers property
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

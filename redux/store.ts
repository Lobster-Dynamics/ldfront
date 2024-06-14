import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./slices/modalSlice";
import { authSlice } from "./slices/authSlice";
import { stackSlice } from "./slices/stackSlice";
import { highlightSlice } from "./slices/highlightSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    stack: stackSlice.reducer,
    highlight: highlightSlice.reducer
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


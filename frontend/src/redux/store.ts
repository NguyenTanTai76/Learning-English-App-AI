import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import snackbarReducer from "./slices/snackbarSlice";
import editorReducer from "./slices/editorSlice";
import lessonReducer from "./slices/lessonSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    editor: editorReducer,
    lessons: lessonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

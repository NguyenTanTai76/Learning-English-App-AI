import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Lesson {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: { _id: string; username: string };
}

interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  currentLesson: null,
  loading: false,
  error: null,
};

export const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
    setCurrentLesson: (state, action: PayloadAction<Lesson>) => {
      state.currentLesson = action.payload;
    },
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.lessons.unshift(action.payload);
    },
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      const index = state.lessons.findIndex(
        (l) => l._id === action.payload._id
      );
      if (index !== -1) state.lessons[index] = action.payload;
    },
    removeLesson: (state, action: PayloadAction<string>) => {
      state.lessons = state.lessons.filter((l) => l._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateLessonInState: (state, action: PayloadAction<Lesson>) => {
      const index = state.lessons.findIndex(
        (l) => l._id === action.payload._id
      );
      if (index !== -1) {
        state.lessons[index] = action.payload;
      }
      if (state.currentLesson?._id === action.payload._id) {
        state.currentLesson = action.payload;
      }
    },
  },
});

export const {
  setLessons,
  setCurrentLesson,
  addLesson,
  updateLesson,
  removeLesson,
  setLoading,
  setError,
  updateLessonInState,
} = lessonSlice.actions;

export const selectLessons = (state: RootState) => state.lessons.lessons;

export default lessonSlice.reducer;

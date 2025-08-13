// src/hooks/useLessons.ts
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import {
  setError,
  setLessons,
  setLoading,
  setCurrentLesson,
  addLesson,
  updateLessonInState,
  removeLesson,
} from "../redux/slices/lessonSlice";
import {
  fetchLessons as apiFetchLessons,
  fetchLessonById as apiFetchLessonById,
  createLesson as apiCreateLesson,
  updateLesson as apiUpdateLesson,
  deleteLesson as apiDeleteLesson,
} from "../api/lessonApi";
import type { LessonFormData } from "../types/lesson";
import type { Lesson } from "../types/lesson";

export const useLessons = () => {
  const dispatch = useDispatch();
  const { lessons, loading, currentLesson, error } = useSelector(
    (state: RootState) => state.lessons
  );

  // loadLessons
  const loadLessons = useCallback(
    async (page = 1) => {
      try {
        dispatch(setLoading(true));
        const data = await apiFetchLessons(page);
        dispatch(setLessons(data));
      } catch (err: any) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load lessons";
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // fetchLessonById (memoized)
  const fetchLessonById = useCallback(
    async (id: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const data: Lesson = await apiFetchLessonById(id);
        dispatch(setCurrentLesson(data));
        return data;
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load lesson";
        dispatch(setError(errorMessage));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // handleCreateLesson
  const handleCreateLesson = useCallback(
    async (formData: LessonFormData) => {
      try {
        dispatch(setLoading(true));

        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", formData.content);
        if (formData.image) payload.append("image", formData.image);

        const data = await apiCreateLesson(payload);
        dispatch(addLesson(data));
        return data;
      } catch (err: any) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create lesson";
        dispatch(setError(errorMessage));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // updateLesson
  const updateLesson = useCallback(
    async (id: string, formData: FormData) => {
      try {
        dispatch(setLoading(true));
        const updatedLesson = await apiUpdateLesson(id, formData);
        dispatch(updateLessonInState(updatedLesson));
        return updatedLesson;
      } catch (err: any) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update lesson";
        dispatch(setError(errorMessage));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // deleteLesson
  const deleteLesson = useCallback(
    async (id: string): Promise<{ success: boolean; message?: string }> => {
      try {
        dispatch(setLoading(true));
        await apiDeleteLesson(id);
        dispatch(removeLesson(id));
        return { success: true, message: "Xóa bài học thành công" };
      } catch (err: any) {
        console.error("Lỗi khi xóa bài học:", err);

        let errorMessage = "Không thể xóa bài học";
        if (err.response) {
          errorMessage =
            err.response.data?.message ||
            (err.response.status === 403
              ? "Bạn không có quyền xóa bài học này"
              : err.response.status === 404
              ? "Bài học không tồn tại"
              : errorMessage);
        }

        dispatch(setError(errorMessage));
        return { success: false, message: errorMessage };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return {
    lessons,
    loading,
    error,
    currentLesson,
    loadLessons,
    fetchLessonById,
    createLesson: handleCreateLesson,
    updateLesson,
    deleteLesson,
  };
};

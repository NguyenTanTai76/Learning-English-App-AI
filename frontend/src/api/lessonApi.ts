import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { Lesson } from "../types/lesson";

export const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/lessons`;

export const getAuthHeader = (): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const fetchLessons = async (page = 1): Promise<Lesson[]> => {
  const res = await axios.get(`${API_URL}?page=${page}`);
  return res.data.data;
};

export const fetchLessonById = async (id: string): Promise<Lesson> => {
  try {
    const token = localStorage.getItem("accessToken");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.get(`${API_URL}/${id}`, {
      timeout: 10000,
      headers,
      validateStatus: (status) => status < 500,
    });

    if (!res.data || !res.data.data) {
      throw new Error("Invalid response format");
    }

    const payload = res.data.data;

    const lesson = payload.lesson ?? payload;

    if (payload.comments) {
      (lesson as any).comments = payload.comments;
    }

    return lesson as Lesson;
  } catch (err: any) {
    console.error("API Error Details:", {
      error: err,
      message: err?.message,
      response: err?.response?.data,
    });

    throw new Error(
      err?.response?.data?.message || "Không thể tải bài học. Vui lòng thử lại"
    );
  }
};

export const updateLesson = async (
  id: string,
  formData: FormData
): Promise<Lesson> => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const res = await axios.put(`${API_URL}/${id}`, formData, config);
  return res.data.data;
};

export const createLesson = async (data: FormData): Promise<Lesson> => {
  const token = localStorage.getItem("accessToken");
  const config: AxiosRequestConfig = {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const res = await axios.post(API_URL, data, config);
  return res.data.data;
};

export const deleteLesson = async (id: string): Promise<void> => {
  console.log(`Deleting lesson with ID: ${id}`);
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  console.log("Delete response:", response);
  return response.data;
};

export const addComment = async (
  lessonId: string,
  content: string
): Promise<Comment> => {
  const res = await axios.post(
    `${API_URL}/${lessonId}/comments`,
    { content },
    getAuthHeader()
  );
  return res.data.data;
};

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLessons } from "../../hooks/useLessons";
import LessonForm from "./LessonForm";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/slices/snackbarSlice";
import type { LessonFormData } from "../../types/lesson";
import Loading from "../Loading";

const EditLessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentLesson, fetchLessonById, updateLesson, loading } =
    useLessons();

  useEffect(() => {
    if (!id) {
      navigate("/lessons");
      return;
    }

    const loadLesson = async () => {
      try {
        await fetchLessonById(id);
      } catch (error: any) {
        console.error("Error loading lesson:", error);
        dispatch(
          openSnackbar({
            message: error.message || "Không thể tải bài học",
            type: "error",
          })
        );
        navigate("/lessons");
      }
    };

    loadLesson();
  }, [id, dispatch, navigate, fetchLessonById]);

  const handleSubmit = async (data: LessonFormData) => {
    if (!id) return;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Chỉ append image nếu có file mới
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      await updateLesson(id, formData);

      dispatch(
        openSnackbar({
          message: "Cập nhật bài học thành công!",
          type: "success",
        })
      );
      navigate(`/lessons/${id}`);
    } catch (error) {
      console.error("Update error:", error);
      dispatch(
        openSnackbar({
          message: "Cập nhật thất bại: " + (error as Error).message,
          type: "error",
        })
      );
    }
  };

  if (loading) return <div><Loading/></div>;
  if (!currentLesson) return <div>Không tìm thấy bài học</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa bài học</h1>
      <LessonForm
        initialData={{
          title: currentLesson.title,
          content: currentLesson.content,
          imageUrl: currentLesson.imageUrl,
        }}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditLessonPage;

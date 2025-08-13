import { useNavigate } from "react-router-dom";
import { useLessons } from "../../hooks/useLessons";
import type { LessonFormData } from "../../types/lesson";
import LessonForm from "./LessonForm";

const CreateLessonPage = () => {
  const navigate = useNavigate();
  const { createLesson, loading } = useLessons();

  const handleSubmit = async (data: LessonFormData) => {
    try {
      await createLesson(data);
      navigate("/lessons");
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          📘 Create New Lesson
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
          <LessonForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateLessonPage;

import { useEffect, useState } from "react";
import { useLessons } from "../hooks/useLessons";
import { Link } from "react-router-dom";
import LessonCard from "../components/Lesson/LessonCard";
import Loading from "../components/Loading";

const LessonsPage = () => {
  const { lessons, loading, loadLessons, deleteLesson } = useLessons();
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bài học này?")) {
      const { success, message } = await deleteLesson(id);

      if (success) {
        setNotification({
          type: "success",
          message: message || "Xóa bài học thành công",
        });
        await loadLessons();
      } else {
        setNotification({
          type: "error",
          message: message || "Xóa bài học thất bại",
        });
      }

      setTimeout(() => setNotification(null), 5000);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto py-8 relative">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed flex items-center justify-between gap-3 top-20 right-4 p-4 rounded-lg shadow-lg z-50 w-[350px] animate-fadeIn
          ${
            notification.type === "success"
              ? "bg-green-50 border border-green-300 text-green-800"
              : "bg-red-50 border border-red-300 text-red-800"
          }`}
        >
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-xl leading-none text-gray-500 hover:text-gray-700 transition"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">📚 Lessons</h1>
        <Link
          to="/lessons/new"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-700 active:scale-95 transition-all duration-200"
        >
          ➕ Create New
        </Link>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="transform transition hover:scale-[1.02] hover:shadow-lg"
          >
            <LessonCard lesson={lesson} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;

import { Link } from "react-router-dom";
import type { Lesson } from "../../types/lesson";

interface Props {
  lesson: Lesson;
  showFullContent?: boolean;
  onDelete?: (id: string) => void;
}

const LessonCard = ({ lesson, showFullContent = false, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {lesson.imageUrl && (
        <img
          src={lesson.imageUrl}
          alt={lesson.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/lessons/${lesson._id}`} className="hover:text-blue-600">
            {lesson.title}
          </Link>
        </h3>
        <p className={`text-gray-600 ${showFullContent ? "" : "line-clamp-3"}`}>
          {lesson.content}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            By: {lesson.author?.username || "Unknown"}
          </span>
          <div className="flex space-x-2">
            <Link
              to={`/lessons/${lesson._id}/edit`}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Edit
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(lesson._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;

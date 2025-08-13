import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LessonCard from "./LessonCard";
import { useLessons } from "../../hooks/useLessons";
import Loading from "../Loading";

const LessonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentLesson, loading, fetchLessonById } = useLessons();

  useEffect(() => {
    if (id) {
      fetchLessonById(id);
    }
  }, [id, fetchLessonById]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (!loading && !currentLesson) return <div>Lesson not found</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <LessonCard lesson={currentLesson!} showFullContent={true} />
      </div>
    </div>
  );
};

export default LessonDetailPage;

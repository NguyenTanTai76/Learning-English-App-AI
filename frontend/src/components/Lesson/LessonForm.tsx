import { useForm } from "react-hook-form";
import type { LessonFormData } from "../../types/lesson";
import { useEffect } from "react";

interface Props {
  initialData?: {
    title: string;
    content: string;
    imageUrl?: string;
  };
  onSubmit: (data: LessonFormData) => void;
  loading: boolean;
}

const LessonForm = ({ initialData, onSubmit, loading }: Props) => {
  const { register, handleSubmit, setValue, reset } = useForm<LessonFormData>();

  useEffect(() => {
    reset({
      title: initialData?.title || "",
      content: initialData?.content || "",
    });
  }, [initialData, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setValue("image", e.target.files[0], { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hiển thị ảnh hiện tại */}
      {initialData?.imageUrl && (
        <div>
          <p className="text-sm font-medium text-gray-700">Current Image:</p>
          <img
            src={initialData.imageUrl}
            alt="Current lesson"
            className="mt-2 w-48 h-auto object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Tiêu đề */}
      <input
        {...register("title", { required: true })}
        placeholder="Enter lesson title"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Nội dung */}
      <textarea
        {...register("content", { required: true })}
        placeholder="Write lesson content..."
        rows={5}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Upload file */}
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-100 file:text-blue-700
          hover:file:bg-blue-200 cursor-pointer"
      />

      {/* Nút Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Saving..." : "Save Lesson"}
      </button>
    </form>
  );
};

export default LessonForm;

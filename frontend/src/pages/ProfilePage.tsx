import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          <Loading />
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 transform transition-all hover:shadow-xl">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <h2 className="text-3xl font-bold mt-4 text-gray-900">
            Your Profile
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-6 text-gray-700 text-lg">
          <div className="border-b pb-4">
            <p className="font-semibold text-gray-800">Username</p>
            <p className="mt-1">{user.username}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Email</p>
            <p className="mt-1">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

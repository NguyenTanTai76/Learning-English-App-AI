import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import weConnectImg from "../../assets/images/weconnect-logo.png";
import Loading from "../../components/Loading";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
        <img
          src={weConnectImg}
          alt="WeConnect Logo"
          className="mx-auto mb-6 max-w-[160px]"
        />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;

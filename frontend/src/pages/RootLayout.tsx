import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../redux/slices/snackbarSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Loading from "../components/Loading";

const RootLayout = () => {
  const dispatch = useDispatch();

  // Lấy snackbar state từ redux store
  const { open, message, type } = useSelector(
    (state: RootState) => state.snackbar
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow w-full">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => dispatch(closeSnackbar())}
      >
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>
          AI Writing Assistant ©{new Date().getFullYear()} | Powered by Advanced
          AI Solutions
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;

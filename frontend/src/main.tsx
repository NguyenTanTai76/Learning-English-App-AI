import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./redux/store";
import { loadUserFromStorage } from "./redux/slices/authSlice";
import theme from "./configs/muiConfig";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthLayout from "./pages/auth/AuthLayout";
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditorPage from "./pages/EditorPage";
import PrivateRoute from "./pages/PrivateRoute";
import LessonsPage from "./pages/LessonsPage";
import CreateLessonPage from "./components/Lesson/CreateLessonPage";
import LessonDetailPage from "./components/Lesson/LessonDetailPage";
import EditLessonPage from "./components/Lesson/EditLessonPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "write", element: <EditorPage /> },
      {
        path: "lessons",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <LessonsPage />
              </PrivateRoute>
            ),
          },
          {
            path: "new",
            element: (
              <PrivateRoute>
                <CreateLessonPage />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <LessonDetailPage />
              </PrivateRoute>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <PrivateRoute>
                <EditLessonPage />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

store.dispatch(loadUserFromStorage());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

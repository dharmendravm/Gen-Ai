import { createBrowserRouter } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import HomePage from "@/features/interview/pages/Home.jsx";
import InterviewProvider from "@/features/interview/context/interview.provider.jsx";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <InterviewProvider>
          <HomePage />
        </InterviewProvider>
      </Protected>
    ),
  },
]);

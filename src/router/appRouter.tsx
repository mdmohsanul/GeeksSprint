import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import ManagerDashboard from "@/pages/ManagerDashboard";
import EngineerDashboard from "@/pages/EngineerDashboard";
import AssignmentPage from "@/pages/AssignmentPage";
import ProjectPage from "@/pages/ProjectPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "manager",
            element: (
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "manager/assignments",
            element: (
              <ProtectedRoute allowedRoles={["manager"]}>
                <AssignmentPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "manager/projects",
            element: (
              <ProtectedRoute allowedRoles={["manager"]}>
                <ProjectPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "manager/projects/:projectId",
            element: (
              <ProtectedRoute allowedRoles={["manager"]}>
                <ProjectDetailPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "engineer",
            element: (
              <ProtectedRoute allowedRoles={["engineer"]}>
                <EngineerDashboard />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default appRouter;

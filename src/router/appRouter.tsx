import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ]
  },
]);


export default appRouter;
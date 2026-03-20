import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import GuestGuard from "./components/GuestGuard/GuestGuard";
import AuthContextProvider from "./Context/AuthContextProvider";
import Feed from "./pages/Feed/Feed";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import WholePost from "./pages/WholePost/WholePost";

export default function App() {

  const client = new QueryClient()

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <AuthGuard />,
          children: [
            { index: true, element: <Feed /> },
            { path: "feed", element: <Feed /> },
            { path: "WholePost/:postId", element: <WholePost />},
            { path: "profile", element: <Profile /> },
          ],
        },
        {
          element: <GuestGuard />,
          children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <QueryClientProvider client={client}>
        <AuthContextProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </AuthContextProvider>
    </QueryClientProvider>

  );
}

import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import GameDetails from "../Pages/GameDetails";
import AllApps from "../Pages/AllApps";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";

import AuthLayouts from "../Layouts/AuthLayouts";
import PrivateRoute from "../Provider/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";

import UserInfo from "../Pages/UserInfo";
import MyProfile from "../Pages/MyProfile";
import UpdateProfile from "../Pages/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("/gameData.json").then((res) => res.json()),
      },
      {
        path: "games",
        element: <AllApps />,
        loader: () => fetch("/gameData.json").then((res) => res.json()),
      },
      {
        path: "game/:id",
        element: (
          <PrivateRoute>
            <GameDetails />
          </PrivateRoute>
        ),
        loader: () => fetch("/gameData.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "user-info",
    element: <UserInfo />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

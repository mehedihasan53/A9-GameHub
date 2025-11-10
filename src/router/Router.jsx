import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import GameDetails from "../Pages/GameDetails";
import AllApps from "../Pages/AllApps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("/gameData.json").then((res) => res.json()),
      },

      {
        path: "/games",
        element: <AllApps />,
        loader: () => fetch("/gameData.json").then((res) => res.json()),
      },

      {
        path: "/game/:id",
        element: <GameDetails />,
        loader: () => fetch("/gameData.json").then((res) => res.json()),
      },
    ],
  },
]);

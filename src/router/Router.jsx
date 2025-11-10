import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import PopularGame from "../components/PopularGame";
import GameDetails from "../Pages/GameDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/popular-game",
        element: <PopularGame />,
        loader: () =>
          fetch("/gameData.json")
            .then((res) => res.json())
            .then((data) =>
              data.sort((a, b) => b.ratings - a.ratings).slice(0, 3)
            ),
      },
      {
        path: "/game/:id",
        element: <GameDetails />,
        loader: () =>
          fetch("/gameData.json")
            .then((res) => res.json())
            .then((data) => data),
      },
    ],
  },
]);

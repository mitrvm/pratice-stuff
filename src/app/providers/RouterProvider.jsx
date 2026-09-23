import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";
import { NakedLayout } from "../../pages/layouts";
import { pageRoutes } from "../routes";
import { MainPage } from "../../pages/main";

function BubbleError() {
  const error = useRouteError();
  if (error) {
    throw error;
  }
  return null;
}

const router = createBrowserRouter([
  {
    element: <NakedLayout />,
    errorElement: <BubbleError />,
    children: [
      { path: "/", element: <MainPage /> },

      ...pageRoutes.map(({ path, Component }) => ({
        path,
        element: <Component />,
      })),

      {
        loader: async () => redirect("/"),
        path: "*",
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}

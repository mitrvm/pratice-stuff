import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";
import { NakedLayout } from "../../pages/layouts";
import { mainPageRoute } from "../../pages/main";

function BubbleError() {
  const error = useRouteError();
  if (error) {
    throw error;
  }
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    element: <NakedLayout />,
    children: [
      mainPageRoute,
      {
        loader: async () => redirect(pathKeys.root),
        path: "*",
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}

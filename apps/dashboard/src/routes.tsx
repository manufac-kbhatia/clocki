import { createBrowserRouter } from "react-router";
import {App} from "./App.tsx";
import { PageA } from "./pages/Page-A";
import { PageB } from "./pages/Page-B/index.tsx";
import { ErrorPage } from "./pages/ErrorPage/index.tsx";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "page-a",
        element: <PageA />,
      },
      {
        path: "page-b",
        element: <PageB />,
      },
    ],
  },
]);
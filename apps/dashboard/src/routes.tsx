import { createBrowserRouter } from "react-router";
import { App } from "./App.tsx";
import { ErrorPage } from "./pages/ErrorPage/index.tsx";
import { Register } from "./pages/Register/index.tsx";
import { SetupOrganisation } from "./pages/Setup-Organisation/index.tsx";
import ProtectedRoute from "./pages/Protected-Route/index.tsx";
import { Login } from "./pages/Login/index.tsx";
import { Dashboard } from "./pages/Dashboard/index.tsx";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Dashboard />, errorElement: <ErrorPage /> }],
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setup-organisation",
    element: (
      <ProtectedRoute>
        <SetupOrganisation />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

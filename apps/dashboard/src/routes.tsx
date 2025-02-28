import { createBrowserRouter } from "react-router";
import { App } from "./App.tsx";
import { ErrorPage } from "./pages/ErrorPage/index.tsx";
import { SignUp } from "./pages/Signup";
import { SetupOrganisation } from "./pages/Setup-Organisation/index.tsx";
import ProtectedRoute from "./pages/Protected-Route/index.tsx";
import { SignIn } from "./pages/Signin/index.tsx";
import { Dashboard } from "./pages/Dashboard/index.tsx";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Dashboard />, errorElement: <ErrorPage /> }],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
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
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
]);

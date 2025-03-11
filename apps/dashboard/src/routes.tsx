import { createBrowserRouter } from "react-router";
import { App } from "./App.tsx";
import { ErrorPage } from "./pages/ErrorPage/index.tsx";
import { Register } from "./pages/Register/index.tsx";
import { SetupOrganisation } from "./pages/Setup-Organisation/index.tsx";
import ProtectedRoute from "./pages/Protected-Route/index.tsx";
import { Login } from "./pages/Login/index.tsx";
import { Dashboard } from "./pages/Dashboard/index.tsx";
import PageA from "./pages/Page-A/index.tsx";
import { Home } from "./pages/Home/index.tsx";
import { PersistentAuth } from "./pages/PersistentAuth/index.tsx";

// export const Routers = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <App />
//       </ProtectedRoute>
//     ),
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "/", element: <Dashboard />, errorElement: <ErrorPage /> },
//       { path: "/page", element: <PageA />, errorElement: <ErrorPage /> },
//     ],
//   },
//   {
//     path: "/register",
//     element: <Register />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/setup-organisation",
//     element: (
//       <ProtectedRoute>
//         <SetupOrganisation />
//       </ProtectedRoute>
//     ),
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <ErrorPage />,
//   },
// ]);

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PersistentAuth>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </PersistentAuth>
        ),
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home />, errorElement: <ErrorPage /> },
          { path: "/page", element: <PageA />, errorElement: <ErrorPage /> },
        ],
      },
      { path: "/register", element: <Register />, errorElement: <ErrorPage /> },
      {
        path: "/setup-organisation",
        element: (
          <PersistentAuth>
            <ProtectedRoute>
              <SetupOrganisation />
            </ProtectedRoute>
          </PersistentAuth>
        ),
        errorElement: <ErrorPage />,
      },
      { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
    ],
  },
]);

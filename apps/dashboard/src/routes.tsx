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
import CheckCompanyStatus from "./pages/CheckCompanyStatus/index.tsx";
import ManageEmployee from "./pages/ManageEmployee/index.tsx";
import EmployeeDetails from "./components/EmployeeDetails/index.tsx";
import CompanySettings from "./pages/CompanySettings/index.tsx";
import MySettings from "./pages/MySettings/index.tsx";

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
    element: (
      <PersistentAuth>
        <App />
      </PersistentAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <CheckCompanyStatus>
              <Dashboard />
            </CheckCompanyStatus>
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home />, errorElement: <ErrorPage /> },
          { path: "/page", element: <PageA />, errorElement: <ErrorPage /> },
          { path: "/manage-users", element: <ManageEmployee />, errorElement: <ErrorPage /> },
          {
            path: "/manage-users/employee/:id",
            element: <EmployeeDetails />,
            errorElement: <ErrorPage />,
          },
          { path: "/settings", element: <CompanySettings />, errorElement: <ErrorPage /> },
          { path: "/my-settings", element: <MySettings />, errorElement: <ErrorPage /> },
        ],
      },
      { path: "/register", element: <Register />, errorElement: <ErrorPage /> },
      {
        path: "/setup-organisation",
        element: (
          <ProtectedRoute>
            <SetupOrganisation />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
    ],
  },
]);

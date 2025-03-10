import { Navigate, Outlet, useLocation } from "react-router";
import { useClockiContext } from "../../context";
import { LocatioState } from "../../utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { auth } = useClockiContext();
  const {pathname} = useLocation();
  const state: LocatioState = {
    from: pathname.length > 0 ? pathname : undefined,
  }

  console.log("auth", auth);

  return auth?.isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={state} replace={true} />
  );
};

export default ProtectedRoute;

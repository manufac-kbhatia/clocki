import { Navigate, useLocation } from "react-router";
import { useClockiContext } from "../../context";
import { LocatioState } from "../../utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useClockiContext();
  const { pathname } = useLocation();
  const state: LocatioState = {
    from: pathname.length > 0 ? pathname : undefined,
  };

  return auth?.isAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/login" state={state} replace={true} />
  );
};

export default ProtectedRoute;

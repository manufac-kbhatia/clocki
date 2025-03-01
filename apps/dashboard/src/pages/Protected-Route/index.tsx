import { Navigate } from "react-router";
import { useClockiContext } from "../../context";
import { Loader } from "../../components/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useClockiContext();
  if (isAuthLoading === true) return <Loader />;
  return isAuthenticated === false ? <Navigate to="/sign-up" replace={true} /> : <>{children}</>;
};

export default ProtectedRoute;

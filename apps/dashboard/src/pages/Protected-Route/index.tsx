import { Navigate } from "react-router";
import { useClockiContext } from "../../context";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {isAuthenticated} = useClockiContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-up" replace />;
};

export default ProtectedRoute;

import { Navigate, useLocation } from "react-router";
import { useClockiContext } from "../../context";
import { LocatioState } from "../../utils";

interface CheckCompanyStatusProps {
  children: React.ReactNode;
}

const CheckCompanyStatus: React.FC<CheckCompanyStatusProps> = ({ children }) => {
  const { auth } = useClockiContext();
  const { pathname } = useLocation();
  const state: LocatioState = {
    from: pathname.length > 0 ? pathname : undefined,
  };

  return auth?.employee?.createdOrganisation || auth?.employee?.organisation  ? (
    children
  ) : (
    <Navigate to="/setup-organisation" state={state} replace={true} />
  );
};

export default CheckCompanyStatus;

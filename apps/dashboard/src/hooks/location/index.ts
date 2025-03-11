import { useLocation, useNavigate } from "react-router";
import { LocatioState } from "../../utils";

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const locatoin = useLocation();
  const state = locatoin.state as LocatioState | null;
  const from = state?.from ?? "/";
  return () => navigate(from, { replace: true });
};

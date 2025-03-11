import { useClockiContext } from "../../context";
import { axiosPrivate } from "../axios";
import { RefreshTokenResponse } from "@repo/schemas/rest";
const useRefreshToken = () => {
  const { setAuth } = useClockiContext();
  const refresh = async () => {
    const response = await axiosPrivate.get<RefreshTokenResponse>("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken, isAuthenticated: response.data.success };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;

import { useEffect } from "react";
import { axiosPrivate } from ".";
import { useClockiContext } from "../../context";
import useRefreshToken from "../token";
import { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useClockiContext();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers["Authorization"] === undefined) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config as InternalAxiosRequestConfig & { sent?: boolean };
        if (error.response?.status === HttpStatusCode.Unauthorized && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else if (error.response?.status === HttpStatusCode.Forbidden) {
          notifications.show({
            title: "Session Expired",
            message: "Please login again",
            autoClose: 4000,
            color: "red",
          });
          setAuth((prev) => {
            return { ...prev, accessToken: undefined, isAuthenticated: false, employee: undefined };
          });
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptors);
      axiosPrivate.interceptors.request.eject(requestInterceptors);
    };
  }, [auth, navigate, refresh, setAuth]);
  return axiosPrivate;
};

export default useAxiosPrivate;

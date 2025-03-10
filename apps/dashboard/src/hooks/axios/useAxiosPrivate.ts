import { useEffect } from "react";
import { axiosPrivate } from ".";
import { useClockiContext } from "../../context";
import useRefreshToken from "../token";
import { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from "axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useClockiContext();

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
          console.log("Again calling the request", prevRequest);
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptors);
      axiosPrivate.interceptors.request.eject(requestInterceptors);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;

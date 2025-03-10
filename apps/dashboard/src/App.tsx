import { Outlet } from "react-router";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles
import { useEffect, useState } from "react";
import useRefreshToken from "./hooks/token";
import { useClockiContext } from "./context";
import { Loader } from "./components/Loader";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useClockiContext();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (auth?.isAuthenticated === false || auth?.isAuthenticated === undefined) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth?.isAuthenticated, refresh]);

  return <>{isLoading === true ? <Loader /> : <Outlet />}</>;
}

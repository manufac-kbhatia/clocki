import { useState, useEffect } from "react";
import { useClockiContext } from "../../context";
import useRefreshToken from "../../hooks/token";
import { Loader } from "@mantine/core";
import { Center } from "@mantine/core";

interface PersistentAuthProps {
  children: React.ReactNode;
}

export const PersistentAuth: React.FC<PersistentAuthProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useClockiContext();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setIsLoading(false);
      }
    };

    if (auth?.isAuthenticated === false || auth?.isAuthenticated === undefined) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading === true ? <Center h={"100vh"}><Loader /></Center> : children;
};

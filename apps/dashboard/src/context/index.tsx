import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren, JSX, Dispatch, SetStateAction } from "react";
import { useGetMe } from "../hooks/api";
import { GetMeReponse } from "@repo/schemas/rest";

interface Context {
  isAuthenticated?: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | undefined>>;
  user?: GetMeReponse["me"];
  setUser: Dispatch<SetStateAction<GetMeReponse["me"] | undefined>>;
  isAuthLoading: boolean;
}

const ContextInstance = createContext<Context | undefined>(undefined);

export function ContextProvider({ children }: PropsWithChildren): JSX.Element {
  const { isError, data, isPending: isAuthLoading } = useGetMe();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState<GetMeReponse["me"]>();

  useEffect(() => {
    setUser(data?.me);
    setIsAuthenticated(!isError);
  }, [data, isError]);

  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      isAuthLoading,
      setIsAuthenticated,
      user,
      setUser,
    };
  }, [isAuthenticated, isAuthLoading, user, setIsAuthenticated, setUser]);

  return <ContextInstance.Provider value={contextValue}>{children}</ContextInstance.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useClockiContext(): Context {
  const context = useContext(ContextInstance);
  if (context === undefined) {
    throw new Error("useClockiContext must be used within a ContextProvider");
  }
  return context;
}

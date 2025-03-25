import { EmployeeWithOrganisation } from "@repo/schemas/rest";
import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren, JSX, Dispatch, SetStateAction } from "react";

interface Auth {
  accessToken?: string;
  isAuthenticated?: boolean;
  employee?: EmployeeWithOrganisation;
}
interface Context {
  auth?: Auth;
  setAuth: Dispatch<SetStateAction<Auth | undefined>>;
}

const ContextInstance = createContext<Context | undefined>(undefined);

export function ContextProvider({ children }: PropsWithChildren): JSX.Element {
  const [auth, setAuth] = useState<Auth>();

  const contextValue = useMemo(() => {
    return {
      auth,
      setAuth,
    };
  }, [auth, setAuth]);

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

import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren, JSX, Dispatch, SetStateAction } from "react";

interface Context {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const ContextInstance = createContext<Context | undefined>(undefined);

export function ContextProvider({ children }: PropsWithChildren): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
    };
  }, [isAuthenticated]);

  return (
    <ContextInstance.Provider value={contextValue}>
      {children}
    </ContextInstance.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useClockiContext(): Context {
  const context = useContext(ContextInstance);
  if (context === undefined) {
    throw new Error("useClockiContext must be used within a ContextProvider");
  }
  return context;
}

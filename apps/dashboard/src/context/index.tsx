import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren, JSX, Dispatch, SetStateAction } from "react";

interface Context {
  user?: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
}

const ContextInstance = createContext<Context | undefined>(undefined);

export function ContextProvider({ children }: PropsWithChildren): JSX.Element {
  const [user, setUser] = useState<string>();

  const contextValue = useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user]);

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

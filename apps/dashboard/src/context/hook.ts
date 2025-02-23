import { Context } from "react";

export function useClockiContext(): Context {
  const context = useContext(ContextInstance);
  if (context === undefined) {
    throw new Error("useClockiContext must be used within a ContextProvider");
  }
  return context;
}

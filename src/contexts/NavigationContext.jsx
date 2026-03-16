import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const value = useMemo(
    () => ({ isLoading, startLoading, stopLoading }),
    [isLoading, startLoading, stopLoading],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationLoading() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error(
      "useNavigationLoading must be used within NavigationProvider",
    );
  }
  return ctx;
}

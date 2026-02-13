import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface InitialLoaderContextType {
  isFirstVisit: boolean;
  loaderComplete: boolean;
  shouldAnimate: boolean;
}

const InitialLoaderContext = createContext<InitialLoaderContextType | null>(null);

const STORAGE_KEY = "emilee-portfolio-visited";

interface InitialLoaderProviderProps {
  children: ReactNode;
}

export function InitialLoaderProvider({ children }: InitialLoaderProviderProps) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const hasVisited = sessionStorage.getItem(STORAGE_KEY);

    if (!hasVisited) {
      setIsFirstVisit(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    } else {
      // Not first visit - skip loader, immediately allow animations
      setLoaderComplete(true);
    }

    setIsInitialized(true);
  }, []);

  const onLoaderComplete = useCallback(() => {
    setLoaderComplete(true);
  }, []);

  // shouldAnimate is true when:
  // - Loader has completed (first visit)
  // - OR it's not the first visit (return visitor)
  const shouldAnimate = loaderComplete;

  // Don't render until we've checked sessionStorage
  if (!isInitialized) {
    return null;
  }

  return (
    <InitialLoaderContext.Provider
      value={{
        isFirstVisit,
        loaderComplete,
        shouldAnimate,
      }}
    >
      {children}
      {isFirstVisit && !loaderComplete && (
        <InitialLoader onComplete={onLoaderComplete} />
      )}
    </InitialLoaderContext.Provider>
  );
}

export function useInitialLoader() {
  const context = useContext(InitialLoaderContext);
  if (!context) {
    throw new Error("useInitialLoader must be used within InitialLoaderProvider");
  }
  return context;
}

// Import the loader component (circular dependency avoided by placing at end)
import { InitialLoader } from "./InitialLoader";

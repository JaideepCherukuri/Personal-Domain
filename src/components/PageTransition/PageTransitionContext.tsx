import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import gsap from "gsap";
import { useLenis } from "../SmoothScroll";

interface PageTransitionContextType {
  isTransitioning: boolean;
  pendingNavigation: string | null;
  triggerTransition: (to: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

const STAGGER_DELAY = 0.1; // Delay between top and bottom bar

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const navigate = useNavigate();
  const navigationRef = useRef<string | null>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const triggerTransition = useCallback((to: string) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Skip animation on mobile (drawer has its own transition) or if user prefers reduced motion
    if (prefersReducedMotion || isMobile) {
      // Scroll to top before navigation on mobile
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      navigate({ to });
      return;
    }

    navigationRef.current = to;
    setPendingNavigation(to);
    setIsTransitioning(true);
  }, [navigate, lenis]);

  useEffect(() => {
    if (!isTransitioning) return;

    const topBar = topBarRef.current;
    const bottomBar = bottomBarRef.current;
    if (!topBar || !bottomBar) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Hide bars and reset state
        gsap.set([topBar, bottomBar], { visibility: "hidden" });
        setIsTransitioning(false);
        setPendingNavigation(null);
        navigationRef.current = null;
      },
    });

    // === ENTRY: Bars slide in from left ===
    tl.fromTo(topBar,
      { xPercent: -100, visibility: "visible" },
      { xPercent: 0, duration: 0.5, ease: "power3.inOut" },
      0
    )
    .fromTo(bottomBar,
      { xPercent: -100, visibility: "visible" },
      { xPercent: 0, duration: 0.5, ease: "power3.inOut" },
      STAGGER_DELAY
    );

    // Midpoint - scroll reset and navigation
    tl.call(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      if (navigationRef.current) {
        navigate({ to: navigationRef.current });
      }
    });

    // Brief pause while screen is covered
    tl.to({}, { duration: 0.15 });

    // === EXIT: Bars slide out to the right ===
    tl.to(topBar, {
      xPercent: 100,
      duration: 0.5,
      ease: "power3.inOut",
    })
    .to(bottomBar, {
      xPercent: 100,
      duration: 0.5,
      ease: "power3.inOut",
    }, `-=${0.5 - STAGGER_DELAY}`);

    return () => {
      tl.kill();
    };
  }, [isTransitioning, navigate, lenis]);

  const barBaseStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    width: "100vw",
    height: "50vh",
    backgroundColor: "black",
    pointerEvents: "none",
    zIndex: 9999,
  };

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        pendingNavigation,
        triggerTransition,
      }}
    >
      {children}

      {/* Top bar - covers top half of screen */}
      <div
        ref={topBarRef}
        style={{
          ...barBaseStyle,
          top: 0,
          visibility: "hidden",
        }}
        aria-hidden="true"
      />

      {/* Bottom bar - covers bottom half of screen */}
      <div
        ref={bottomBarRef}
        style={{
          ...barBaseStyle,
          bottom: 0,
          visibility: "hidden",
        }}
        aria-hidden="true"
      />
    </PageTransitionContext.Provider>
  );
}

export function usePageTransitionContext() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransitionContext must be used within PageTransitionProvider");
  }
  return context;
}

export { PageTransitionContext };

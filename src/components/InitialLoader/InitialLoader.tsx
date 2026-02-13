import { useEffect, useRef } from "react";
import gsap from "gsap";

interface InitialLoaderProps {
  onComplete: () => void;
}

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topBar = topBarRef.current;
    const bottomBar = bottomBarRef.current;
    const container = containerRef.current;

    if (!topBar || !bottomBar || !container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip animation entirely
      gsap.set(container, { display: "none" });
      onComplete();
      return;
    }

    // Create timeline for loader animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide container after animation
        gsap.set(container, { display: "none" });
        onComplete();
      },
    });

    // Brief hold, then bars slide out
    tl.to({}, { duration: 0.3 }) // Hold for 0.3s
      .to(
        topBar,
        {
          xPercent: 100,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "slide"
      )
      .to(
        bottomBar,
        {
          xPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "slide"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      {/* Top bar - slides right */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#FBFDE2]"
      />
      {/* Bottom bar - slides left */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#FBFDE2]"
      />
    </div>
  );
}

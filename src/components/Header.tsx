import { useRef, useEffect } from "react";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const { shouldAnimate, isFirstVisit } = useInitialLoader();
  const hasAnimated = useRef(false);

  // Set initial state
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !isFirstVisit) {
      gsap.set(header, { opacity: 1, y: 0 });
      return;
    }

    // Hidden state for first visit
    gsap.set(header, { opacity: 0, yPercent: -100 });
  }, [isFirstVisit]);

  // Run entrance animation when shouldAnimate becomes true
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (!shouldAnimate || hasAnimated.current) return;
    if (!isFirstVisit) return;

    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Header slides down from top
    gsap.to(header, {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.1,
    });
  }, [shouldAnimate, isFirstVisit]);

  return (
    <header
      ref={headerRef}
      className="relative z-50 flex w-full items-start justify-between bg-white px-[7px] py-[13px] md:px-8 md:py-4 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]"
    >
      {/* Logo / Name */}
      <div className="flex flex-col">
        {/* Mobile: Stacked name */}
        <h1 className="md:hidden font-light text-[92px] text-black tracking-[-7.36px] leading-[75px]">
          <span className="block">JAIDEEP</span>
          <span className="block">CHERUKURI</span>
        </h1>
        {/* Desktop: Single line */}
        <h1 className="hidden md:block font-light text-[92px] text-black tracking-[-7.36px] leading-normal">
          JAIDEEP CHERUKURI
        </h1>
        <p className="font-normal text-[9px] md:text-xs text-black tracking-[0.72px] md:tracking-[0.96px] leading-normal mt-4 md:mt-2">
          PERSONAL PORTFOLIO
        </p>
      </div>
    </header>
  );
}

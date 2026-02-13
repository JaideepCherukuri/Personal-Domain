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
      className="relative z-50 flex w-full items-start justify-between bg-black px-[7px] py-[13px] md:px-8 md:py-4"
    >
      <div className="flex flex-col">
        {/* Mobile: Stacked name — Geist Pixel Circle */}
        <h1
          className="md:hidden text-[48px] text-[#FBFDE2] tracking-[-2px] leading-[44px]"
          style={{
            fontFamily: '"GeistPixelCircle", monospace',
            textShadow: '3px 3px rgba(251, 253, 226, 0.15)',
          }}
        >
          <span className="block">JAIDEEP</span>
          <span className="block">CHERUKURI</span>
        </h1>
        {/* Desktop: Single line — Geist Pixel Circle */}
        <h1
          className="hidden md:block text-[72px] text-[#FBFDE2] tracking-[-3px] leading-normal"
          style={{
            fontFamily: '"GeistPixelCircle", monospace',
            textShadow: '4px 4px rgba(251, 253, 226, 0.15)',
          }}
        >
          JAIDEEP CHERUKURI
        </h1>
        <p className="font-normal text-[9px] md:text-xs text-[#FBFDE2] tracking-[0.72px] md:tracking-[0.96px] leading-normal mt-4 md:mt-2 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
          PERSONAL PORTFOLIO
        </p>
      </div>
    </header>
  );
}

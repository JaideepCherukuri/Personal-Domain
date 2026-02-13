import { useEffect, useRef } from "react";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

const iconX = "/assets/icon-x.svg";
const iconLinkedIn = "/assets/icon-linkedin.svg";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { shouldAnimate, isFirstVisit } = useInitialLoader();
  const hasAnimated = useRef(false);

  // Set initial state
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !isFirstVisit) {
      gsap.set(footer, { opacity: 1, y: 0 });
      return;
    }

    // Hidden state for first visit
    gsap.set(footer, { opacity: 0, y: 50 });
  }, [isFirstVisit]);

  // Run entrance animation when shouldAnimate becomes true
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    if (!shouldAnimate || hasAnimated.current) return;
    if (!isFirstVisit) return;

    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Footer slides up from bottom
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.4,
    });
  }, [shouldAnimate, isFirstVisit]);

  return (
    <footer
      ref={footerRef}
      className="flex w-full flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 bg-white px-4 sm:px-6 py-4 text-[10px] sm:text-[12px] tracking-tight border-t border-black/5 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]"
    >
      <span className="font-normal">JAIDEEP CHERUKURI</span>
      <div className="flex items-center gap-4">
        <a
          href="https://x.com/0xjaideep"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="X (Twitter)"
        >
          <img src={iconX} alt="X" className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://www.linkedin.com/in/jaideep-cherukuri"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="LinkedIn"
        >
          <img src={iconLinkedIn} alt="LinkedIn" className="w-3.5 h-3.5" />
        </a>
        <span className="text-gray-300 text-[10px] ml-1">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

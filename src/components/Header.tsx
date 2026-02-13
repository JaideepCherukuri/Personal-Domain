import { useRef, useEffect, useMemo } from "react";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

function splitToSpans(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="glyph inline-block"
      style={{ whiteSpace: char === " " ? "pre" : undefined }}
    >
      {char}
    </span>
  ));
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const nameDesktopRef = useRef<HTMLHeadingElement>(null);
  const nameMobile1Ref = useRef<HTMLSpanElement>(null);
  const nameMobile2Ref = useRef<HTMLSpanElement>(null);
  const { shouldAnimate, isFirstVisit } = useInitialLoader();
  const hasAnimated = useRef(false);

  const desktopChars = useMemo(() => splitToSpans("JAIDEEP CHERUKURI"), []);
  const mobileFirstLine = useMemo(() => splitToSpans("JAIDEEP"), []);
  const mobileSecondLine = useMemo(() => splitToSpans("CHERUKURI"), []);

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

  // Run entrance + glyph animation
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

    // Header slides in
    const tl = gsap.timeline();

    tl.to(header, {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Get all glyph spans visible in current viewport
    const glyphs = header.querySelectorAll(".glyph");

    // Set initial glyph state: invisible, shifted down, slightly scaled
    gsap.set(glyphs, {
      opacity: 0,
      y: 20,
      scale: 0.6,
      filter: "blur(4px)",
    });

    // Stagger glyphs in
    tl.to(
      glyphs,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: {
          each: 0.04,
          from: "start",
        },
        ease: "power3.out",
      },
      "-=0.2"
    );

    // After entrance, add a subtle shimmer pulse to the text-shadow
    tl.to(
      glyphs,
      {
        textShadow: "4px 4px 8px rgba(251, 253, 226, 0.3)",
        duration: 1.2,
        ease: "power1.inOut",
        stagger: {
          each: 0.06,
          from: "start",
          repeat: -1,
          yoyo: true,
        },
      },
      "+=0.3"
    );
  }, [shouldAnimate, isFirstVisit]);

  return (
    <header
      ref={headerRef}
      className="relative z-50 flex w-full items-start justify-between bg-black px-[7px] py-[13px] md:px-8 md:py-4"
    >
      <div className="flex flex-col">
        {/* Mobile: Stacked name */}
        <h1
          className="md:hidden text-[48px] text-[#FBFDE2] tracking-[-2px] leading-[44px]"
          style={{
            fontFamily: '"Geist-Circle", monospace',
            textShadow: "3px 3px rgba(251, 253, 226, 0.12)",
          }}
        >
          <span ref={nameMobile1Ref} className="block">
            {mobileFirstLine}
          </span>
          <span ref={nameMobile2Ref} className="block">
            {mobileSecondLine}
          </span>
        </h1>
        {/* Desktop: Single line */}
        <h1
          ref={nameDesktopRef}
          className="hidden md:block text-[72px] text-[#FBFDE2] tracking-[-3px] leading-normal"
          style={{
            fontFamily: '"Geist-Circle", monospace',
            textShadow: "4px 4px rgba(251, 253, 226, 0.12)",
          }}
        >
          {desktopChars}
        </h1>
        <p className="font-normal text-[9px] md:text-xs text-[#FBFDE2] tracking-[0.72px] md:tracking-[0.96px] leading-normal mt-4 md:mt-2 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
          PERSONAL PORTFOLIO
        </p>
      </div>
    </header>
  );
}

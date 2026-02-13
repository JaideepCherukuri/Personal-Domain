import { useRef, useEffect, useMemo } from "react";
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
  const shimmerStarted = useRef(false);

  const desktopChars = useMemo(() => splitToSpans("Jaideep Cherukuri"), []);
  const mobileFirstLine = useMemo(() => splitToSpans("Jaideep"), []);
  const mobileSecondLine = useMemo(() => splitToSpans("Cherukuri"), []);

  // Start the shimmer loop on mount
  useEffect(() => {
    const header = headerRef.current;
    if (!header || shimmerStarted.current) return;
    shimmerStarted.current = true;

    const glyphs = header.querySelectorAll(".glyph");

    gsap.to(glyphs, {
      textShadow: "4px 4px 8px rgba(251, 253, 226, 0.3)",
      duration: 1.2,
      ease: "power1.inOut",
      stagger: {
        each: 0.06,
        from: "start",
        repeat: -1,
        yoyo: true,
      },
    });
  }, []);

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
          <span className="block">{mobileFirstLine}</span>
          <span className="block">{mobileSecondLine}</span>
        </h1>
        {/* Desktop: Single line */}
        <h1
          className="hidden md:block text-[72px] text-[#FBFDE2] tracking-[-3px] leading-normal"
          style={{
            fontFamily: '"Geist-Circle", monospace',
            textShadow: "4px 4px rgba(251, 253, 226, 0.12)",
          }}
        >
          {desktopChars}
        </h1>
        <p className="font-normal text-[9px] md:text-xs text-[#FBFDE2] tracking-[0.72px] md:tracking-[0.96px] leading-normal mt-4 md:mt-2 font-[Geist_Sans,sans-serif]">
          Personal Portfolio
        </p>
      </div>
    </header>
  );
}

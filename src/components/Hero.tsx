import { useEffect, useRef, useState } from "react";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

const heroImage = "/assets/bc219d29b05830aea41cdafd0492a59848956872.webp";

// Star icons for role labels
const starCreativeDirector = "/assets/da285ae4164b0300b49d38883e59c7a57c592331.svg";
const starGraphicDesigner = "/assets/2ed42d8fcc7af6d9c2b6c52ff75df05cea37d1c6.svg";
const starContentCreator = "/assets/d60a33db2a19db7edf8ae5c5253e52f11ba71d9d.svg";
const starStrategist = "/assets/5e069f7969b51cbd70c3025759a5dc834e335db2.svg";

// Desktop star icons (different assets)
const starDesktopA = "/assets/8a4f1231599a3e44d8525f58bd23e31f1c0eadec.svg";
const starDesktopB = "/assets/f0f1fcd0aa63f82526ab0ef601ca920fd6cdfab3.svg";
const starDesktopC = "/assets/8a4f1231599a3e44d8525f58bd23e31f1c0eadec.svg";
const starDesktopD = "/assets/f0f1fcd0aa63f82526ab0ef601ca920fd6cdfab3.svg";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<(HTMLImageElement | null)[]>([]);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const mobileLabelsRef = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLImageElement>(null);
  const desktopLabelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { shouldAnimate, isFirstVisit } = useInitialLoader();
  const hasAnimated = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set initial hidden state
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !isFirstVisit) {
      // Show everything immediately
      if (sectionRef.current) gsap.set(sectionRef.current, { opacity: 1 });
      if (mobileImageRef.current) gsap.set(mobileImageRef.current, { opacity: 1, x: 0 });
      if (mobileLabelsRef.current) gsap.set(mobileLabelsRef.current, { opacity: 1, x: 0 });
      if (desktopImageRef.current) gsap.set(desktopImageRef.current, { opacity: 1 });
      desktopLabelsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1 });
      });
      return;
    }

    // Set initial hidden state for first visit
    if (sectionRef.current) gsap.set(sectionRef.current, { opacity: 1 });

    // Mobile elements
    if (mobileImageRef.current) gsap.set(mobileImageRef.current, { opacity: 0, x: -50 });
    if (mobileLabelsRef.current) gsap.set(mobileLabelsRef.current, { opacity: 0, x: 50 });

    // Desktop elements
    if (desktopImageRef.current) gsap.set(desktopImageRef.current, { opacity: 0 });
    desktopLabelsRef.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0 });
    });
  }, [isFirstVisit]);

  // Run entrance animation when shouldAnimate becomes true
  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    if (!isFirstVisit) return;

    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const baseDelay = 0.2; // Stagger after header

    if (isMobile) {
      // Mobile: image slides from left
      if (mobileImageRef.current) {
        gsap.to(mobileImageRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: baseDelay,
        });
      }

      // Mobile: labels slide from right
      if (mobileLabelsRef.current) {
        gsap.to(mobileLabelsRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: baseDelay + 0.1,
        });
      }
    } else {
      // Desktop: fade in image
      if (desktopImageRef.current) {
        gsap.to(desktopImageRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: baseDelay,
        });
      }

      // Desktop: fade in labels
      desktopLabelsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: baseDelay + 0.1 + index * 0.05,
          });
        }
      });
    }

    // Stars spin animation (after entrance completes)
    const stars = starsRef.current.filter(Boolean);
    if (stars.length > 0) {
      gsap.fromTo(
        stars,
        { rotation: 0 },
        {
          rotation: 360,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          delay: baseDelay + 0.5, // After entrance animations
        }
      );
    }
  }, [shouldAnimate, isFirstVisit, isMobile]);

  // For return visitors, still run stars animation
  useEffect(() => {
    if (isFirstVisit) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const stars = starsRef.current.filter(Boolean);
    if (stars.length > 0) {
      gsap.fromTo(
        stars,
        { rotation: 0 },
        {
          rotation: 360,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.2,
        }
      );
    }
  }, [isFirstVisit]);

  const setDesktopLabelRef = (index: number) => (el: HTMLDivElement | null) => {
    desktopLabelsRef.current[index] = el;
  };

  const setStarRef = (index: number) => (el: HTMLImageElement | null) => {
    starsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-white font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      {/* Mobile Layout */}
      <div className="md:hidden relative w-full h-[656px] overflow-hidden">
        {/* Image container - face on left half of viewport */}
        <div ref={mobileImageRef} className="absolute top-0 left-0 w-full h-full">
          <img
            src={heroImage}
            alt="Portrait of Emilee Durrett"
            className="w-full h-full object-cover object-[78%_center]"
          />
        </div>

        {/* Mobile: Role labels positioned absolutely in bottom right */}
        <div ref={mobileLabelsRef} className="absolute right-[37px] bottom-[54px] flex flex-col gap-[34px]">
          <div className="flex items-center gap-2">
            <img
              ref={setStarRef(0)}
              src={starCreativeDirector}
              alt=""
              className="w-6 h-[22px]"
            />
            <span className="text-[9px] tracking-[0.72px] font-normal">
              CREATIVE DIRECTOR
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              ref={setStarRef(1)}
              src={starGraphicDesigner}
              alt=""
              className="w-6 h-[22px]"
            />
            <span className="text-[9px] tracking-[0.72px] font-normal">
              GRAPHIC DESIGNER
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              ref={setStarRef(2)}
              src={starContentCreator}
              alt=""
              className="w-6 h-[22px]"
            />
            <span className="text-[9px] tracking-[0.72px] font-normal">
              CONTENT CREATOR
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              ref={setStarRef(3)}
              src={starStrategist}
              alt=""
              className="w-6 h-[22px]"
            />
            <span className="text-[9px] tracking-[0.72px] font-normal">
              STRATEGIST
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <img
          ref={desktopImageRef}
          src={heroImage}
          alt="Portrait of Emilee Durrett"
          className="w-full h-auto max-h-[743px] object-cover object-top"
        />

        {/* Desktop: Role labels scattered across image */}
        {/* Creative Director */}
        <div ref={setDesktopLabelRef(0)} className="absolute left-[18%] top-[30%] flex items-center gap-2 text-[12px] tracking-[0.96px] leading-none">
          <span className="font-normal">CREATIVE DIRECTOR</span>
          <img ref={setStarRef(4)} src={starDesktopA} alt="" className="h-3.5 w-3.5" />
        </div>

        {/* Graphic Designer */}
        <div ref={setDesktopLabelRef(1)} className="absolute right-[16%] top-[42%] flex items-center gap-2 text-[12px] tracking-[0.96px] leading-none">
          <img ref={setStarRef(5)} src={starDesktopB} alt="" className="h-3.5 w-3.5" />
          <span className="font-normal">GRAPHIC DESIGNER</span>
        </div>

        {/* Content Creator */}
        <div ref={setDesktopLabelRef(2)} className="absolute left-[16%] top-[63%] flex items-center gap-2 text-[12px] tracking-[0.96px] leading-none">
          <span className="font-normal">CONTENT CREATOR</span>
          <img ref={setStarRef(6)} src={starDesktopC} alt="" className="h-3.5 w-3.5" />
        </div>

        {/* Strategist */}
        <div ref={setDesktopLabelRef(3)} className="absolute right-[18%] top-[70%] flex items-center gap-2 text-[12px] tracking-[0.96px] leading-none">
          <img ref={setStarRef(7)} src={starDesktopD} alt="" className="h-3.5 w-3.5" />
          <span className="font-normal">STRATEGIST</span>
        </div>
      </div>
    </section>
  );
}

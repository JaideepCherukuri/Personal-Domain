import { useEffect, useRef } from "react";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

const aboutImage = "/assets/jaideep-portrait.png";
const iconX = "/assets/icon-x.svg";
const iconLinkedIn = "/assets/icon-linkedin.svg";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, isFirstVisit } = useInitialLoader();
  const hasAnimated = useRef(false);

  // Set initial state
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !isFirstVisit) {
      if (imageRef.current) gsap.set(imageRef.current, { opacity: 1, x: 0 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, x: 0 });
      return;
    }

    // Hidden state for first visit
    if (imageRef.current) gsap.set(imageRef.current, { opacity: 0, x: -50 });
    if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, x: 50 });
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

    const baseDelay = 0.2;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: baseDelay,
      });
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: baseDelay + 0.15,
      });
    }
  }, [shouldAnimate, isFirstVisit]);

  return (
    <section ref={sectionRef} className="w-full bg-white font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Portrait image */}
        <div ref={imageRef} className="w-full lg:w-[43%] lg:shrink-0 bg-black">
          <img
            src={aboutImage}
            alt="Portrait of Jaideep Cherukuri"
            className="w-full h-auto lg:h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div ref={contentRef} className="flex-1 px-6 py-10 lg:px-12 lg:py-16 lg:pl-16">
          {/* Header */}
          <p className="text-[11px] tracking-[0.88px] mb-2">A BIT ABOUT ME</p>
          <h2 className="font-light text-[48px] sm:text-[64px] lg:text-[82px] tracking-[-4px] lg:tracking-[-6.56px] leading-[1] mb-8 lg:mb-12">
            HELLO THERE
          </h2>

          {/* Bio paragraphs */}
          <div className="text-[11px] tracking-[0.88px] leading-[1.6] max-w-[562px] space-y-4 mb-10 lg:mb-12">
            <p>
              I'm Jaideep — a product builder, entrepreneur, and UC Berkeley alum
              working at the intersection of AI agents, stablecoins, and
              borderless money. I believe the next era of the internet will be
              defined by autonomous commerce — where agents negotiate, transact,
              and settle on behalf of people and businesses.
            </p>
            <p>
              I'm currently building Halofy (HALO) — an Agentic Banking OS that
              provides the missing financial infrastructure layer between AI
              agents and money. Think of it as the universal plumbing that lets
              agents become economic actors — with delegated authentication,
              scoped payment sessions, and an immutable audit trail, all
              protocol-agnostic.
            </p>
            <p>
              Before this, I built and exited stablecoin payment rails for
              merchants — turning the complexities of digital asset settlement
              into something simple enough for any business to use. That
              experience taught me that the real unlock isn't the technology
              itself, but making it invisible to the end user.
            </p>
            <p>
              My journey started at SRM University studying Computer Science,
              then a transformative semester at UC Berkeley's Sutardja Center for
              Entrepreneurship &amp; Technology, where I was part of the Startup
              Semester program. That experience — hackathon wins, VC pitches,
              late-night building — shaped how I think about products today:
              start with a real problem, move fast, and never stop iterating.
            </p>
            <p>
              I'm an Entrepreneur First alum, a product enthusiast at heart, and
              someone who's been obsessed with the future of money since before
              it was cool. If you're building in agentic commerce, digital
              assets, or fintech infrastructure — I'd love to connect.
            </p>
          </div>

          {/* Two columns: What I Do and Technologies */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24 mb-10 lg:mb-12">
            {/* What I Do */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">WHAT I BUILD &amp; THINK ABOUT:</p>
              <ul className="lowercase space-y-1">
                <li>agentic banking &amp; autonomous commerce</li>
                <li>stablecoin infrastructure &amp; payment rails</li>
                <li>digital asset settlement systems</li>
                <li>protocol-agnostic middleware</li>
                <li>ai agent financial tooling</li>
                <li>product strategy &amp; 0-to-1 building</li>
                <li>fintech ux that feels invisible</li>
                <li>borderless money &amp; intent-based transactions</li>
              </ul>
            </div>

            {/* Background */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">WHERE I'VE BEEN:</p>
              <ul className="lowercase space-y-1">
                <li>halofy (halo) — founder</li>
                <li>stablecoin merchant rails — exited</li>
                <li>entrepreneur first — alum</li>
                <li>uc berkeley — scet startup semester</li>
                <li>srm university — computer science</li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/0xjaideep"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="X (Twitter)"
            >
              <img src={iconX} alt="X" className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jaideep-cherukuri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <img src={iconLinkedIn} alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

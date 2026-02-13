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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !isFirstVisit) {
      if (imageRef.current) gsap.set(imageRef.current, { opacity: 1, x: 0 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, x: 0 });
      return;
    }

    if (imageRef.current) gsap.set(imageRef.current, { opacity: 0, x: -50 });
    if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, x: 50 });
  }, [isFirstVisit]);

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
            alt="Jaideep Cherukuri"
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
              I've been thinking about money longer than I've been writing code.
              Not about making it. About how it works. What makes a number in a
              database worth something. Why trust moves the way it does. That
              kind of curiosity doesn't go away. It just finds different outlets.
            </p>
            <p>
              I studied CS in Chennai, spent a semester at Berkeley's Sutardja
              Center, and somewhere between the hackathons and the 3am
              conversations, the way I see building changed completely. I stopped
              caring about what's technically impressive and started caring about
              what's actually useful.
            </p>
            <p>
              After Berkeley, I built stablecoin payment rails for merchants.
              Infrastructure that lets businesses move digital money without
              understanding any of the plumbing. We found an exit. The biggest
              takeaway wasn't about crypto or growth. It was simpler than that:
              if someone notices your infrastructure, you haven't finished
              building it.
            </p>
            <p>
              These days I'm deep in the space where AI and money intersect. The
              financial system assumes a human is always in the loop. Someone
              typing passwords, reading screens, clicking buttons. But agents
              don't work that way. They need entirely new rails, new trust
              models, a financial layer that was never built because nobody
              needed it before. I think building that layer is one of the most
              important problems in tech right now. And honestly, it's the most
              fun I've had.
            </p>
          </div>

          {/* Two columns */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24 mb-10 lg:mb-12">
            {/* What I think about */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">WHAT I THINK ABOUT:</p>
              <ul className="lowercase space-y-1">
                <li>what happens when machines become economic actors</li>
                <li>infrastructure that knows how to disappear</li>
                <li>the gap between how money works and how it should</li>
                <li>stablecoins &amp; autonomous settlement</li>
                <li>zero-to-one product building</li>
                <li>trust in systems without humans in the loop</li>
                <li>why the best technology feels like it was always there</li>
              </ul>
            </div>

            {/* Where I've been */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">WHERE I'VE BEEN:</p>
              <ul className="lowercase space-y-1">
                <li>uc berkeley, sutardja center for entrepreneurship</li>
                <li>entrepreneur first</li>
                <li>stablecoin infrastructure (built it, exited)</li>
                <li>srm university, computer science</li>
                <li>enough hackathons to know the best ideas come at 3am</li>
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

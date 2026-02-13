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
          <p className="text-[11px] tracking-[0.88px] mb-2">A BIT ABOUT ME</p>
          <h2 className="font-light text-[48px] sm:text-[64px] lg:text-[82px] tracking-[-4px] lg:tracking-[-6.56px] leading-[1] mb-8 lg:mb-12">
            HELLO THERE
          </h2>

          <div className="text-[11px] tracking-[0.88px] leading-[1.6] max-w-[562px] space-y-4 mb-10 lg:mb-12">
            <p>
              Money is the oldest protocol. Before HTTP, before TCP/IP, before
              language even had grammar, humans were inventing ways to make trust
              portable. Shells, ledgers, gold, paper, digits on a screen. Every
              generation rewrites the rules. I think we're in the middle of the
              next rewrite.
            </p>
            <p>
              I'm building Halofy. The short version: an operating system that
              lets AI agents actually move money. Right now, the smartest agent
              on earth still can't pay for a cup of coffee without asking you for
              a password. That bothers me more than it probably should.
            </p>
            <p>
              The thing I keep coming back to is that infrastructure only works
              when it disappears. I built stablecoin payment rails before this,
              found an exit, and the biggest lesson wasn't about crypto or
              scale. It was that the moment someone has to think about the
              plumbing, you've already failed. Good pipes are invisible pipes.
            </p>
            <p>
              My path to here: CS in Chennai, a semester at Berkeley that
              rewired how I think about building things, hackathons where the
              best ideas showed up around 3am, and Entrepreneur First, where
              they ask you the uncomfortable question: what would you build if
              nobody was watching? The answer kept pointing the same direction.
              Money. Agents. The strange future where those two things collide.
            </p>
            <p>
              I believe the next decade belongs to intent. Not clicks, not
              commands. You express what you want and an economy of autonomous
              agents figures out the rest. But that world needs rails that don't
              exist yet. Trust frameworks nobody has written. Someone has to
              build the invisible layer underneath all of it.
            </p>
            <p>
              That's what I'm doing.
            </p>
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

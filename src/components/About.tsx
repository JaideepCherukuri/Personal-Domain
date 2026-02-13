import { useEffect, useRef } from "react";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

const aboutImage = "/assets/jaideep-portrait.png";

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
              I like to think my career as a creative director actually started
              when I was about nine years old—when my sister and I launched a
              full-scale (very fake) magazine brand out of the back bedroom at my
              grandparents' house. We sent emails (to each other), managed
              overworked assistants (named Susan, entirely imaginary), and
              produced full photoshoots complete with mood boards, visual
              direction, and magazine articles. Obviously.
            </p>
            <p>
              Fast forward twenty years. Add a degree in Visual Communication,
              some truly wild agency experience on both coasts, and a mix of
              incredible (and some not-so-incredible) brands and clients. What
              you get is a freelance creative who thinks big—strategy,
              storytelling, the full picture—but is also more than happy to open
              up her sketchbook, jump into Adobe Illustrator, and get her hands
              dirty in the details.
            </p>
            <p>
              I've had the very real privilege of working with some of the
              biggest brands in the country across a wide range of industries, as
              well as jumping in on the ground floor to help build brands—small
              and large—with vision, intention, and strategy. The best part of my
              job is finding those ah-ha moments when the whole room
              clicks—whether that room is filled with 20+ marketers, designers,
              and execs, or it's a Zoom call with a founder and a big dream.
            </p>
            <p>
              I've been chasing the next big idea since I was nine—yelling at my
              fake assistant, channeling my inner Miranda Priestly, and refusing
              to slow down. If you're after your next big idea, give me a shout.
              I'd love to be in the room.
            </p>
          </div>

          {/* Two columns: Skills and Clients */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24 mb-10 lg:mb-12">
            {/* Skills */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">SOME THINGS I AM GOOD AT:</p>
              <ul className="lowercase space-y-1">
                <li>conceptual thinking &amp; platform exploration</li>
                <li>untangling knots (literally &amp; figuratively)</li>
                <li>branding &amp; packaging design</li>
                <li>photo/video shoot direction</li>
                <li>strange doodles that sometimes end up in logos</li>
                <li>photography</li>
                <li>videography</li>
                <li>content creation &amp; ugc</li>
                <li>making myself laugh</li>
                <li>video editing</li>
                <li>finding small, lost items on the ground</li>
              </ul>
            </div>

            {/* Clients */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">SOME FOLKS I HAVE WORKED WITH:</p>
              <ul className="lowercase space-y-1">
                <li>traditional medicinals</li>
                <li>crocs</li>
                <li>justin bieber</li>
                <li>universal music group</li>
                <li>the grammys</li>
                <li>fifa</li>
                <li>puma</li>
                <li>togethxr</li>
                <li>deborah pagani</li>
                <li>sciton</li>
                <li>conscious alliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

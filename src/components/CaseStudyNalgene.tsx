import { useEffect, useRef } from "react";
import { TransitionLink } from "./PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Images
const heroImage = "/assets/nalgene-hero.webp";
const collageImage = "/assets/e1143953c0161ecaa8cd32734a35ee9e297d2149.webp";
const retroImage1 = "/assets/dda328a9790a099e49f96775093c5d4b3771c13e.webp";
const retroImage2 = "/assets/d5a8b32ae4a58d8d85f1c6203a4dbdfd651acc96.webp";
const logoSystemImage = "/assets/d1a216112fd4af77686cf9d2c7383e496eb63b50.webp";
const bottleImage1 = "/assets/e25e1a7ea9706d48d6776b892cd64de12f5583bc.webp";
const bottleImage2 = "/assets/c983f2312c1d6bd4b9717774fe0f9a62855dc88f.webp";
const webMockImage = "/assets/c62971392df1e863eabc2483087ec3d6b1d6673f.webp";
const brochureMockImage = "/assets/9962df6ebcd077688c98df27fcdf8b19c8efa9c9.webp";
const starIcon = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";

export default function CaseStudyNalgene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(".hero-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade in animations for sections
      gsap.utils.toArray<HTMLElement>(".fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Large headlines slide in
      gsap.utils.toArray<HTMLElement>(".headline-slide").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Image reveal animations
      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Staggered list items
      gsap.utils.toArray<HTMLElement>(".stagger-list").forEach((list) => {
        const items = list.querySelectorAll("li");
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: list,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Side by side images stagger
      gsap.utils.toArray<HTMLElement>(".image-pair").forEach((pair) => {
        const images = pair.querySelectorAll(".pair-item");
        gsap.fromTo(
          images,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pair,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      // Parallax on section images
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((el) => {
        gsap.to(el, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Star icon spin animation
      gsap.utils.toArray<HTMLElement>(".star-spin").forEach((el) => {
        gsap.set(el, { rotation: 0 });
        gsap.to(el, {
          rotation: 360,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white font-[Helvetica_Neue,Helvetica,Arial,sans-serif]"
    >
      {/* Hero Section */}
      <section className="hero-section relative w-full md:h-[605px] md:overflow-hidden">
        <img
          src={heroImage}
          alt="Nalgene 75th Anniversary"
          className="hero-image md:absolute md:inset-0 w-full md:h-full md:object-cover"
        />
      </section>

      {/* Intro Section */}
      <section className="px-6 md:px-[42px] py-16 md:py-20">
        <p className="fade-in text-[11px] tracking-[0.88px] mb-4">NALGENE</p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <h2 className="headline-slide font-light text-[48px] md:text-[82px] tracking-[-4px] md:tracking-[-6.56px] leading-[1] md:leading-[64px]">
            75th ANNIVERSARY
          </h2>
          <p className="fade-in text-[11px] tracking-[0.88px] leading-[1.5] max-w-[395px]">
            To celebrate Nalgene's 75-year anniversary, I led the creative
            direction for a milestone brand moment honoring the company's
            history while bringing a modern lens to its visual identity. The
            work spanned custom product design, anniversary branding, editorial
            storytelling, and a digital homepage system designed to launch the
            celebration.
          </p>
        </div>

        {/* Main Collage Image */}
        <div className="image-reveal mt-16">
          <img
            src={collageImage}
            alt="A 75-year culture of hydration"
            className="w-full h-auto object-cover" loading="lazy"
          />
        </div>
      </section>

      {/* Role Section */}
      <section className="px-6 md:px-[42px] py-16 flex justify-center">
        <div className="w-full max-w-[848px] flex justify-start">
          <div className="fade-in text-[11px] tracking-[0.88px] leading-[20px] uppercase max-w-[352px]">
            <p className="mb-4">ROLE: Creative Director (Agency Side)</p>
            <ul className="stagger-list list-disc ml-4 space-y-1">
              <li>Creative direction & concept</li>
              <li>Oversight of asset design</li>
            </ul>

            <p className="mt-6 mb-4">COLLABORATORS:</p>
            <ul className="stagger-list list-disc ml-4 space-y-1">
              <li>Ben Rosenthal (Senior Designer & Art Director)</li>
              <li>Saltwater (Product Photography)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Insight, Idea, Execution Section */}
      <section className="px-6 md:px-[37px] py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1 flex flex-col gap-8 w-full lg:w-[304px] lg:shrink-0">
            {/* Insight */}
            <div className="fade-in text-[11px] tracking-[0.88px] leading-[15px]">
              <p className="leading-[21px] mb-4 uppercase">INSIGHT</p>
              <p>
                In order to highlight Nalgene as the original, on-the-go reusable
                water bottle, we wanted to lean into the brand's roots and pay
                homage to some of the OG design styles and systems that the brand
                began with 75 years ago.
              </p>
            </div>

            {/* Idea */}
            <div className="fade-in text-[11px] tracking-[0.88px] leading-[15px]">
              <p className="leading-[21px] mb-4 uppercase">IDEA</p>
              <p>
                Looking toward retro trail maps, logo designs, and archival prints
                and imagery, we designed a logo and motif system that felt
                connected to the past while celebrating the present.
              </p>
            </div>

            {/* Execution */}
            <div className="fade-in text-[11px] tracking-[0.88px] leading-[15px]">
              <p className="leading-[21px] mb-4 uppercase">EXECUTION</p>
              <p>
                The visual library and logo system was created to flex across
                multiple executions, including limited edition bottle designs,
                digital banners and promotional posts, and printed collateral to
                be used in gifting and promotion of the anniversary.
              </p>
            </div>
          </div>

          {/* Right Column - Retro Images */}
          <div className="order-1 lg:order-2 image-pair flex flex-col sm:flex-row gap-4 flex-1 lg:ml-auto">
            <div className="pair-item flex-1 overflow-hidden">
              <img
                src={retroImage2}
                alt="Retro Nalgene design"
                className="w-full h-auto lg:h-[476px] object-cover"
              />
            </div>
            <div className="pair-item flex-1 overflow-hidden">
              <img
                src={retroImage1}
                alt="Retro Nalgene design"
                className="w-full h-auto lg:h-[476px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logo System - Full Width */}
      <section className="py-8">
        <div className="image-reveal">
          <img
            src={logoSystemImage}
            alt="Nalgene 75th Anniversary logo system"
            className="w-full h-auto object-cover" loading="lazy"
          />
        </div>
      </section>

      {/* Product Bottles */}
      <section className="px-6 md:px-[42px] py-16">
        <div className="image-pair grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="pair-item overflow-hidden">
            <img
              src={bottleImage1}
              alt="Nalgene 75th Anniversary bottle"
              className="parallax-image w-full h-auto object-cover"
            />
          </div>
          <div className="pair-item overflow-hidden">
            <img
              src={bottleImage2}
              alt="Nalgene 75th Anniversary bottle"
              className="parallax-image w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Web & Brochure Mocks */}
      <section className="px-6 md:px-[42px] py-16">
        <div className="image-pair grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="pair-item overflow-hidden">
            <img
              src={webMockImage}
              alt="Nalgene website mockup"
              className="w-full h-auto object-cover" loading="lazy"
            />
          </div>
          <div className="pair-item overflow-hidden">
            <img
              src={brochureMockImage}
              alt="Nalgene brochure mockup"
              className="w-full h-auto object-cover" loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-20 flex flex-col items-center justify-center">
        <TransitionLink
          to="/"
          className="flex items-center gap-3 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity"
          style={{ opacity: 1, transform: 'none' }}
        >
          <img src={starIcon} alt="" className="star-spin w-[22px] h-[22px]" />
          <span>BACK TO HOME</span>
        </TransitionLink>
      </section>
    </div>
  );
}

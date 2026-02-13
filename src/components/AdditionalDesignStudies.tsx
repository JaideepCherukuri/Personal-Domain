import { useEffect, useRef } from "react";
import { TransitionLink } from "./PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sofwave section videos (still using Figma paths)
const sofwaveVideo1 = "/assets/videos/sofwave master edit.mp4";
const sofwaveVideo2 = "/assets/videos/Comp 1.mp4";

// Sofwave section images
const sofwaveImg1 = "/assets/26bd70e8b8311f4998c69676c4ab6fd05950c2c1.webp";
const sofwaveImg2 = "/assets/cd6d396b4659742602a9e2aa3acb8ce01df2e2c6.webp";

// Sunmonster section images
const sunmonsterLogo1 = "/assets/882d48dd8139345200346ff7ff79fd2f81b8c08b.webp";
const sunmonsterLogo2 = "/assets/22278e746c7134c5b8bd8434d79d9c27cf035255.webp";
const sunmonster10 = "/assets/e4465e067c8633436c4d9ad1d9d304741d9e6313.webp";
const sunmonster09 = "/assets/f276a46c354e53d35030c861331f36d8064bd896.webp";
const sunmonster08 = "/assets/46e4ebeb2279f5923335c8a7249290525f63ed51.webp";
const sunmonster07 = "/assets/2bd8ad1994dd78018d3666e36205fbb1f8db6d0e.webp";

// Picture Garden section images
const pgScreenshot = "/assets/c2e6df98523aee586fe4764f7d97e61effa77623.webp";
const pgTagMustard = "/assets/34c421303ed05ccb70faf839b459809b4fea7cc2.webp";
const pgBrandBook = "/assets/4921a9d090bff0172805ebff8315190dde190cb1.webp";

// Lagos video
const lagosVideo = "/assets/videos/lagos.mp4"

// Icons
const starVector = "/assets/ffc4032bb4b37f387e4b2903463baae79777353e.svg";

export default function AdditionalDesignStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Animate each project section
      const sections = sectionsRef.current?.querySelectorAll(".project-section");
      sections?.forEach((section) => {
        // Section title/description
        const textContent = section.querySelector(".section-text");
        if (textContent) {
          gsap.fromTo(
            textContent,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Section images/media
        const mediaItems = section.querySelectorAll(".section-media");
        mediaItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 60, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: index * 0.1,
            }
          );
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
    <div ref={containerRef} className="bg-white">
      {/* Title Section */}
      <div ref={titleRef} className="px-6 md:px-10 pt-8 pb-12">
        <p className="text-[11px] tracking-[0.88px] mb-2">DESIGN</p>
        <h1 className="text-[48px] md:text-[82px] font-light tracking-[-4px] md:tracking-[-6.56px] leading-[0.8]">
          GALLERY
        </h1>
      </div>

      {/* Project Sections */}
      <div ref={sectionsRef} className="space-y-24 md:space-y-32">
        {/* Sofwave Section */}
        <section className="project-section mb-4">
          <div className="px-6 md:px-10 space-y-4">
            <div className="section-media aspect-[16/9] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label="Sofwave DFW area rollout campaign promotional video"
                className="w-full h-full object-cover"
              >
                <source src={sofwaveVideo1} />
              </video>
            </div>
            <div className="section-text mb-6">
            <p className="text-[11px] tracking-[0.88px] max-w-[336px]">
              SOFWAVE BY SCITON DFW AREA ROLLOUT CAMPAIGN
            </p>
          </div>
            <div className="section-media aspect-[16/9] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label="Sofwave campaign motion graphics and video assets"
                className="w-full h-full object-cover"
              >
                <source src={sofwaveVideo2} />
              </video>
            </div>
             <div className="section-text px-6 md:px-10 mt-8">
            <div className="text-[9px] tracking-[0.72px] uppercase max-w-[336px] space-y-1 pb-12">
              <p className="leading-[18px]">ROLE: Creative Director (Agency Side)</p>
              <ul className="list-disc ml-4 space-y-0">
                <li className="leading-[18px]">Creative direction & concept</li>
                <li className="leading-[18px]">Photo/video shoot direction & styling</li>
                <li className="leading-[18px]">Video asset creation & design</li>
                <li className="leading-[18px]">Micro-landing page design</li>
              </ul>
            </div>
          </div>
            <div className="section-media aspect-[16/9] overflow-hidden">
              <img
                src={sofwaveImg1}
                alt="Sofwave campaign imagery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sunmonster Section */}
        <section className="project-section">
          <div className="section-text px-6 md:px-10 mb-6">
            <p className="text-[11px] tracking-[0.88px] max-w-[336px]">
              Logo design and visual system for upcoming musical project: SUNMONSTER
            </p>
          </div>
          <div className="px-6 md:px-10 space-y-4">
            {/* Logo variations row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="section-media aspect-[2.4/1] overflow-hidden">
                <img
                  src={sunmonsterLogo1}
                  alt="Sunmonster logo variations"
                  className="w-full h-full" loading="lazy"
                />
              </div>
              <div className="section-media aspect-[2.4/1] overflow-hidden">
                <img
                  src={sunmonsterLogo2}
                  alt="Sunmonster logo variations"
                  className="w-full h-full" loading="lazy"
                />
              </div>
            </div>
            {/* Brand applications grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="section-media aspect-[16/9] overflow-hidden">
                <img
                  src={sunmonster10}
                  alt="Sunmonster brand application"
                  className="w-full h-full" loading="lazy"
                />
              </div>
              <div className="section-media aspect-[16/9] overflow-hidden">
                <img
                  src={sunmonster09}
                  alt="Sunmonster brand application"
                  className="w-full h-full" loading="lazy"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="section-media aspect-[16/9] overflow-hidden">
                <img
                  src={sunmonster08}
                  alt="Sunmonster brand application"
                  className="w-full h-full" loading="lazy"
                />
              </div>
              <div className="section-media aspect-[16/9] overflow-hidden">
                <img
                  src={sunmonster07}
                  alt="Sunmonster brand application"
                  className="w-full h-full" loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Picture Garden  - full width image */}
        <section className="project-section mb-8">
          <div className="px-6 md:px-10">
            <div className="section-media aspect-[16/9] overflow-hidden">
              <img
                src={sofwaveImg2}
                alt="Sofwave campaign lifestyle photography"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Picture Garden Section */}
        <section className="project-section">
          <div className="section-text px-6 md:px-10 mb-6">
            <p className="text-[11px] tracking-[0.88px] max-w-[336px]">
              Logo design & brand book for OKC analog film organization Picture Garden
            </p>
          </div>
          <div className="px-6 md:px-10 space-y-4">
            {/* Top row - screenshot and tag */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="section-media aspect-[4/3] overflow-hidden">
                <img
                  src={pgScreenshot}
                  alt="Picture Garden brand elements"
                  className="w-full h-full" loading="lazy"
                />
              </div>
              <div className="section-media aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img
                  src={pgTagMustard}
                  alt="Picture Garden tag design"
                  className="w-full h-full" loading="lazy"
                />
              </div>
            </div>
            {/* Brand book full width */}
            <div className="section-media aspect-[16/9] overflow-hidden">
              <img
                src={pgBrandBook}
                  alt="Picture Garden brand book spread"
                className="w-full h-full" loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* LAGOS Section */}
        <section className="project-section pb-16">
          <div className="section-media w-full aspect-[16/9] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label="LAGOS Smart Caviar Apple Watch band promotional animation"
                className="w-full h-full object-cover"
              >
                <source src={lagosVideo} />
              </video>
          </div>
          <div className="section-text pt-4 px-6 md:px-10 mb-6">
            <p className="text-[11px] tracking-[0.88px] max-w-[336px]">
              LAGOS paid ad design and motion graphics for launch of Smart Caviar Apple Watch band
            </p>
          </div>
        </section>
      </div>

      {/* Return Home Link */}
      <div className="flex justify-center items-center gap-3 py-16 border-t border-black/10">
        <TransitionLink
          to="/"
          className="flex items-center gap-3 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity"
        >
          <img
            src={starVector}
            alt=""
            className="star-spin w-3 h-3"
          />
          <span>RETURN HOME</span>
        </TransitionLink>
      </div>
    </div>
  );
}

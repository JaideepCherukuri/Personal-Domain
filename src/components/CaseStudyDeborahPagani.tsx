import { useEffect, useRef } from "react";
import { TransitionLink } from "./PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from './VideoPlayer';

gsap.registerPlugin(ScrollTrigger);

// Images
const heroImage = "/assets/DP-hero.webp";
const fragranceGif = "/assets/aa610b929af66f984c888fc120c4fd767ea5cd8e.png";

// Packaging images (masonry grid)
const packagingImg1 = "/assets/1b4100a98ad510efe33cb9e720b366b9ddf913c2.webp"; // Large left
const packagingImg2 = "/assets/ba443e6ccf5c433c57bf12536f0baa507ee4e10a.webp"; // Top middle
const packagingImg3 = "/assets/307290196c8dc2e479913911503abc4d521f659d.webp"; // Middle center
const packagingImg4 = "/assets/06f4418e3859d7ca2f6fb05a03a0461246d6f490.webp"; // Bottom left
const packagingImg5 = "/assets/0d8eaa36c8d18d21af150ac3595e701a39aea8c5.webp"; // Bottom middle
const packagingImg6 = "/assets/7548773976e07f4ad39046debc08a23ad7ad9c15.webp"; // Large right

// Production images (BTS row)
const productionImg1 = "/assets/a463f4f469b0fa87488a705fdce555ffa2067617.webp";
const productionImg2 = "/assets/6b0273449d185053adcc2d963368a2ee3b5625ec.webp";
const productionImg3 = "/assets/90ac020425dd282f28c3b70e24cd45667e04d578.webp";
const productionImg4 = "/assets/d34bcc2db0573576bb16e07d2211498ee3a1972e.webp";
const productionImg5 = "/assets/1aff24f3fdec233fbff678bd4957c483a690f22e.webp";
const productionImg6 = "/assets/3468920b285297f8bf86dc220db3a2a4a1483983.webp";

// Rollout images
const rolloutImg1 = "/assets/10ab78bcdcac204c76b135eccac2e9755c2c3eb0.webp";
const rolloutImg2 = "/assets/a00adf011b8682cb1a20b40f3ccd5186df1ccc02.webp";
const rolloutImg3 = "/assets/bd645f60dc15a8edefaa30f79b1d4514faffadcb.webp";

// Final section images
const finalImg1 = "/assets/f586ed9401841bd798cf0e8e0c8d5f64df442ce4.webp";
const finalImg2 = "/assets/d36b7860aaeea0aded1b7b2bccfabd1177a82078.png";
const finalImg3 = "/assets/ad907cc81db4404bb21216c852fa1f85f2bee151.png";

// Videos (still need to be downloaded separately)
const signUpBannerVideo = "/assets/videos/debpag_micro.mp4";
const launchAdVideo = "/assets/videos/debpag_advibe.mp4";
const websiteScrollVideo = "/assets/videos/debpag_rollout.mp4";
const btsReelVideo = "/assets/videos/debpag_bts.mp4";

const starIcon = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";

export default function CaseStudyDeborahPagani() {
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

      // Grid images stagger
      gsap.utils.toArray<HTMLElement>(".image-grid").forEach((grid) => {
        const images = grid.querySelectorAll(".grid-item");
        gsap.fromTo(
          images,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
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
        gsap.fromTo(
          el,
          { rotation: 0 },
          {
            rotation: 360,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          }
        );
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
      <section className="hero-section relative w-full h-151.25 overflow-hidden">
        <img
          src={heroImage}
          alt="Deborah Pagani Beauty"
          className="hero-image absolute inset-0 w-full h-full object-cover object-center"
        />
      </section>

      {/* Intro Section */}
      <section className="px-6 md:px-9.25 pt-16 md:pt-20 pb-8">
        <p className="fade-in text-[11px] tracking-[0.88px] mb-4">
          DEBORAH PAGANI BEAUTY
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <h2 className="headline-slide font-light text-[48px] md:text-[82px] tracking-[-4px] md:tracking-[-6.56px] leading-noneemd:leading-16]">
            PRODUCT LAUNCH
          </h2>
          <div className="fade-in text-[11px] tracking-[0.88px] leading-normal max-w-[395px] space-y-4">
            <p>
              For the launch of Deborah Pagani Beauty's first two products, I
              led creative direction, strategy, and design across every brand
              touchpoint—building a cohesive visual world that introduced the
              products and established the brand in a new category from day one.
              Rather than anchoring the launch to a single campaign or fixed
              narrative, the goal was to create a flexible system of elements,
              language, and visuals that could evolve over time.
            </p>
            <p>
              Standing out in an already saturated market was the real
              challenge. From packaging and branding to the full visual library,
              I served as creative director throughout the entire process,
              ensuring the products resonated with the right audience and
              visually reflected the same level of detail, craftsmanship, and
              luxury found in the formulas themselves.
            </p>
          </div>
        </div>
      </section>

      {/* Sign Up Banner Video Section */}
      <section className="py-8 px-4 flex justify-center">
        <VideoPlayer
                  src={signUpBannerVideo}
                  autoPlay
                  controls={false}
                  loop
                  muted
                  className="video-reveal w-full max-w-[848px] aspect-auto"
                  ariaLabel="Deborah Pagani Beauty sign-up banner animation"
                />
      </section>

      {/* Role & Collaborators Section */}
      <section className="px-6 py-16 flex justify-center">
        <div className="w-full max-w-[848px] flex justify-start">
          <div className="text-[11px] tracking-[0.88px] leading-[20px] uppercase max-w-[304px]">
            <div className="fade-in">
              <p className="mb-4">ROLE: Creative Director & Designer</p>
              <ul className="stagger-list list-disc ml-4 space-y-1">
                <li>End-to-end creative direction</li>
                <li>Packaging design</li>
                <li>Photography and video production</li>
                <li>Shoot casting & styling</li>
                <li>Shoot direction & prep</li>
                <li>Copywriting & marketing strategy</li>
                <li>Design execution across all launch materials</li>
                <li>Website re-design</li>
              </ul>
            </div>

            <div className="fade-in mt-6">
              <p className="mb-4">COLLABORATORS:</p>
              <ul className="stagger-list list-disc ml-4 space-y-1">
                <li>Lomotion (Videography)</li>
                <li>Teresa Luz (Hair & Makeup)</li>
                <li>Moreen Jones (Hair)</li>
                <li>Renee Cohen (Hair)</li>
                <li>Jacie Woodward (Paid Media Coordinator)</li>
                <li>Chase Durrett (Web Developer)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Sections + Media */}
      <section className="px-6 md:px-[37px] py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start overflow-x-hidden">
          {/* Challenge Text - left column */}
          <div className="order-2 lg:order-1 flex flex-col gap-8 w-full lg:w-[368px] lg:shrink-0">
            {/* Beyond the Campaign Framework */}
            <div className="fade-in text-[10px] tracking-[0.88px] leading-[15px]">
              <p className="leading-[21px] mb-4">BEYOND THE CAMPAIGN FRAMEWORK</p>
              <p>
                Rather than a single campaign, the focus was on creating a
                flexible creative system that could support product storytelling,
                paid acquisition, organic social growth, and long-term brand
                consistency. Every asset and shoot was designed to build a world
                for the brand across email marketing, paid media, social posts,
                and web design.
              </p>
            </div>

            {/* Breaking Through the Noise */}
            <div className="fade-in text-[10px] tracking-[0.88px] leading-[15px]">
              <p className="leading-[21px] mb-4">BREAKING THROUGH THE NOISE</p>
              <p>
                The beauty industry is heavily saturated, so a key challenge for
                this launch was ensuring that the products and visuals told an
                impactful and memorable story. Leaning into the direction of the
                first truly luxury haircare experience allowed us to build a brand
                around the products and marketing to target the luxury and beauty
                obsessed with products that deliver undeniable results.
              </p>
            </div>

            {/* Execution */}
            <div className="fade-in text-[10px] tracking-[0.88px] leading-[18px]">
              <p className="leading-[21px] mb-4">EXECUTION</p>
              <ul className="stagger-list list-disc ml-4 space-y-1 whitespace-nowrap">
                <li>
                  Pre and post-production for two seasonal photo and video shoots
                </li>
                <li>Packaging design</li>
                <li>
                  Logo refresh to thoughtfully extend the brand into the beauty
                  category
                </li>
                <li>
                  Full website redesign reflecting the new, elevated visual
                  direction
                </li>
                <li>
                  Launch messaging, copywriting, and brand voice development
                </li>
                <li>Go-to-market launch strategy</li>
                <li>Social creative across organic and paid channels</li>
                <li>Email marketing campaign concept, design, and execution</li>
              </ul>
            </div>
          </div>

          {/* Media - right columns */}
          <div className="order-1 lg:order-2 flex flex-col sm:flex-row gap-6 flex-1 lg:ml-16">
            {/* Fragrance Image */}
            <div className="image-reveal flex-1">
              <img
                src={fragranceGif}
                alt="Deborah Pagani Beauty fragrance product showcase"
                className="w-full h-auto lg:h-[700px] object-cover"
              />
            </div>

            {/* Launch Ad Video */}
            <div className="image-reveal flex-1">
                 <VideoPlayer
                  src={launchAdVideo}
                  controls={true}
                  className="video-reveal w-[394px] aspect-auto"
                  ariaLabel="Deborah Pagani Beauty product launch advertisement"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 01: Packaging */}
      <section className="py-16 md:py-20">
        <div className="px-6 md:px-[64px]">
          <p className="fade-in text-[11px] tracking-[0.88px] mb-4">PHASE 01:</p>
        </div>
        <div className="px-6 md:px-[59px]">
          <h2 className="headline-slide font-light text-[48px] md:text-[82px] tracking-[-4px] md:tracking-[-6.56px] leading-[1] md:leading-[64px] mb-12">
            PACKAGING
          </h2>
        </div>

        {/* Packaging Images - Masonry Grid */}
        {/* Mobile: 2-column grid | Desktop: Absolute positioned masonry */}
        <div className="image-grid px-4 md:px-0 grid grid-cols-2 gap-2 md:relative md:block md:h-[clamp(600px,50vw,920px)]">
          {/* Large left image */}
          <div className="grid-item overflow-hidden md:absolute md:left-0 md:top-0 md:w-[41%] md:h-[64%]">
            <img
              src={packagingImg1}
              alt="Deborah Pagani Beauty luxury haircare packaging design"
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          {/* Top middle small image */}
          <div className="grid-item overflow-hidden md:absolute md:left-[31%] md:top-[1.5%] md:w-[34%] md:h-[17.5%]">
            <img
              src={packagingImg2}
              alt="Deborah Pagani Beauty luxury haircare packaging design"
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          {/* Middle center image */}
          <div className="grid-item overflow-hidden md:absolute md:left-[42%] md:top-[26%] md:w-[23%] md:h-[48%]">
            <img
              src={packagingImg3}
              alt="Deborah Pagani Beauty luxury haircare packaging design"
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          {/* Bottom left image */}
          <div className="grid-item overflow-hidden md:absolute md:left-[12.5%] md:top-[62%] md:w-[26%] md:h-[44%]">
            <img
              src={packagingImg4}
              alt="Deborah Pagani Beauty luxury haircare packaging design"
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          {/* Bottom middle image */}
          <div className="grid-item overflow-hidden md:absolute md:left-[40%] md:top-[79%] md:w-[27%] md:h-[21%]">
            <img
              src={packagingImg5}
              alt="Deborah Pagani Beauty luxury haircare packaging design"
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          {/* Large right image */}
          <div className="grid-item overflow-hidden md:absolute md:left-[68%] md:top-[21%] md:w-[28%] md:h-[56%]">
            <img
              src={packagingImg6}
              alt="Deborah Pagani Beauty luxury haircare packaging design"
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
        </div>
      </section>

      {/* Phase 02: Production */}
      <section className="px-0 py-16 md:py-20">
        <div className="px-6 md:px-[64px]">
          <p className="fade-in text-[11px] tracking-[0.88px] mb-4">PHASE 02:</p>
          <h2 className="headline-slide font-light text-[48px] md:text-[82px] tracking-[-4px] md:tracking-[-6.56px] leading-[1] md:leading-[64px] mb-12">
            PRODUCTION
          </h2>
        </div>

        {/* Production Images Row - Edge to Edge */}
        <div className="image-grid grid grid-cols-3 md:grid-cols-6 gap-0">
          <div className="grid-item overflow-hidden">
            <img
              src={productionImg1}
              alt="Deborah Pagani Beauty photo shoot behind the scenes"
              className="w-full h-auto md:h-[313px] object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          <div className="grid-item overflow-hidden">
            <img
              src={productionImg2}
              alt="Deborah Pagani Beauty photo shoot behind the scenes"
              className="w-full h-auto md:h-[313px] object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          <div className="grid-item overflow-hidden">
            <img
              src={productionImg3}
              alt="Deborah Pagani Beauty photo shoot behind the scenes"
              className="w-full h-auto md:h-[313px] object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          <div className="grid-item overflow-hidden">
            <img
              src={productionImg4}
              alt="Deborah Pagani Beauty photo shoot behind the scenes"
              className="w-full h-auto md:h-[313px] object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          <div className="grid-item overflow-hidden">
            <img
              src={productionImg5}
              alt="Deborah Pagani Beauty photo shoot behind the scenes"
              className="w-full h-auto md:h-[313px] object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
          <div className="grid-item overflow-hidden">
            <img
              src={productionImg6}
              alt="Deborah Pagani Beauty photo shoot behind the scenes"
              className="w-full h-auto md:h-[313px] object-cover aspect-[3/4] md:aspect-auto"
            />
          </div>
        </div>
      </section>

      {/* Phase 03: Rollout */}
      <section className="py-16 md:py-20">
        <div className="px-6 md:px-[64px]">
          <p className="fade-in text-[11px] tracking-[0.88px] mb-4">PHASE 03:</p>
        </div>
        <div className="px-6 md:px-[59px]">
          <h2 className="headline-slide font-light text-[48px] md:text-[82px] tracking-[-4px] md:tracking-[-6.56px] leading-[1] md:leading-[64px] mb-12">
            ROLLOUT
          </h2>
        </div>

        {/* Website Scroll Video */}
        <div className="px-6 md:px-[38px]">
          <VideoPlayer
            src={websiteScrollVideo}
            controls
            className="image-reveal mb-12 w-full"
            ariaLabel="Deborah Pagani website scroll through"
          />
        </div>

        {/* Rollout Images - Three Column */}
        <div className="px-6 md:px-[43px]">
          <div className="image-grid grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="grid-item overflow-hidden">
              <img
                src={rolloutImg1}
                alt="Deborah Pagani Beauty social media marketing rollout"
                className="w-full h-auto sm:h-[800px] object-cover"
              />
            </div>
            <div className="grid-item overflow-hidden">
              <img
                src={rolloutImg2}
                alt="Deborah Pagani Beauty social media marketing rollout"
                className="w-full h-auto sm:h-[800px] object-cover"
              />
            </div>
            <div className="grid-item overflow-hidden">
              <img
                src={rolloutImg3}
                alt="Deborah Pagani Beauty social media marketing rollout"
                className="w-full h-auto sm:h-[800px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Images Section */}
      <section className="px-6 md:px-[55px] py-16 md:py-20">
        {/* Two side-by-side images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="image-reveal overflow-hidden">
            <img
              src={finalImg1}
              alt="Deborah Pagani Beauty final campaign photography"
              className="parallax-image w-full h-auto md:h-[821px] object-cover"
            />
          </div>
          <div className="image-reveal overflow-hidden">
            <img
              src={finalImg2}
              alt="Deborah Pagani Beauty final campaign photography"
              className="parallax-image w-full h-auto md:h-[821px] object-cover"
            />
          </div>
        </div>

        {/* BTS Reel Video and Before-After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VideoPlayer
            src={btsReelVideo}
            autoPlay
            loop
            muted
            controls={false}
            className="image-reveal w-full h-auto md:h-[1053px]"
            ariaLabel="Deborah Pagani Beauty photo shoot behind the scenes reel"
          />
          <div className="image-reveal overflow-hidden">
            <img
              src={finalImg3}
              alt="Deborah Pagani Beauty product results before and after"
              className="w-full h-auto md:h-[1053px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Next Case Study */}
      <section className="next-case-study-section py-20 flex flex-col items-center justify-center">
        <TransitionLink
          to="/case-study/nalgene"
          className="flex items-center gap-3 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity"
          style={{ opacity: 1 }}
        >
          <img src={starIcon} alt="" className="star-spin w-[22px] h-[22px]" />
          <span>NEXT CASE STUDY</span>
        </TransitionLink>
      </section>
    </div>
  );
}

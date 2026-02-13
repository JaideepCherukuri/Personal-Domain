import { useRef, useEffect, useState } from "react";
import { TransitionLink } from "./PageTransition";
import { useInitialLoader } from "./InitialLoader";
import gsap from "gsap";

// Star SVGs for the drawer menu (using same stars for now)
const starCaseStudies = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";
const starGalleries = "/assets/006837c8e5eb8c58d86b126eb25546896c754a31.svg";
const starAbout = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";
const starResume = "/assets/006837c8e5eb8c58d86b126eb25546896c754a31.svg";

// Desktop dropdown stars
const starLeft = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";
const starRight = "/assets/006837c8e5eb8c58d86b126eb25546896c754a31.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isFeaturedDropdownOpen, setIsFeaturedDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const caseStudiesSubRef = useRef<HTMLDivElement>(null);
  const galleriesSubRef = useRef<HTMLDivElement>(null);
  const featuredDropdownRef = useRef<HTMLDivElement>(null);
  const galleryDropdownRef = useRef<HTMLDivElement>(null);
  const featuredCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const galleryCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFeaturedDropdownEnter = () => {
    if (featuredCloseTimeoutRef.current) {
      clearTimeout(featuredCloseTimeoutRef.current);
      featuredCloseTimeoutRef.current = null;
    }
    setIsFeaturedDropdownOpen(true);
  };

  const handleFeaturedDropdownLeave = () => {
    featuredCloseTimeoutRef.current = setTimeout(() => {
      setIsFeaturedDropdownOpen(false);
      setHoveredLink(null);
    }, 100);
  };

  const handleGalleryDropdownEnter = () => {
    if (galleryCloseTimeoutRef.current) {
      clearTimeout(galleryCloseTimeoutRef.current);
      galleryCloseTimeoutRef.current = null;
    }
    setIsGalleryDropdownOpen(true);
  };

  const handleGalleryDropdownLeave = () => {
    galleryCloseTimeoutRef.current = setTimeout(() => {
      setIsGalleryDropdownOpen(false);
      setHoveredLink(null);
    }, 100);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (featuredCloseTimeoutRef.current) {
        clearTimeout(featuredCloseTimeoutRef.current);
      }
      if (galleryCloseTimeoutRef.current) {
        clearTimeout(galleryCloseTimeoutRef.current);
      }
    };
  }, []);

  // Handle Featured Work dropdown animation
  useEffect(() => {
    const dropdown = featuredDropdownRef.current;
    if (!dropdown) return;

    gsap.killTweensOf(dropdown);

    if (isFeaturedDropdownOpen) {
      gsap.to(dropdown, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdown, {
        opacity: 0,
        y: -8,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }, [isFeaturedDropdownOpen]);

  // Handle Gallery dropdown animation
  useEffect(() => {
    const dropdown = galleryDropdownRef.current;
    if (!dropdown) return;

    gsap.killTweensOf(dropdown);

    if (isGalleryDropdownOpen) {
      gsap.to(dropdown, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdown, {
        opacity: 0,
        y: -8,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }, [isGalleryDropdownOpen]);

  // Handle drawer open/close
  useEffect(() => {
    const drawer = drawerRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;
    const menuItems = menuItemsRef.current;

    if (!drawer || !topLine || !bottomLine || !menuItems) return;

    const menuLinks = menuItems.querySelectorAll(".menu-item");

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(drawer, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(topLine, {
        rotation: 45,
        y: 5.5,
        backgroundColor: "#ffffff",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(bottomLine, {
        rotation: -45,
        y: -5.5,
        backgroundColor: "#ffffff",
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Set initial state then animate
      gsap.set(menuLinks, { opacity: 0, y: 30 });
      gsap.to(menuLinks, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out",
      });
    } else {
      document.body.style.overflow = "";
      setExpandedSection(null);

      gsap.to(drawer, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.4,
        ease: "power3.inOut",
      });

      gsap.to(topLine, {
        rotation: 0,
        y: 0,
        backgroundColor: "#000000",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(bottomLine, {
        rotation: 0,
        y: 0,
        backgroundColor: "#000000",
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.set(menuLinks, { opacity: 0, y: 30 });
    }
  }, [isOpen]);

  // Handle sub-menu expand/collapse
  useEffect(() => {
    const caseStudiesSub = caseStudiesSubRef.current;
    const galleriesSub = galleriesSubRef.current;

    if (!caseStudiesSub || !galleriesSub) return;

    // Kill any running animations
    gsap.killTweensOf([caseStudiesSub, galleriesSub]);

    // Helper to get natural height of element
    const getAutoHeight = (el: HTMLElement) => {
      const currentHeight = el.style.height;
      const currentPaddingTop = el.style.paddingTop;
      const currentPaddingBottom = el.style.paddingBottom;

      el.style.height = "auto";
      el.style.paddingTop = "24px";
      el.style.paddingBottom = "24px";
      const height = el.offsetHeight;

      el.style.height = currentHeight;
      el.style.paddingTop = currentPaddingTop;
      el.style.paddingBottom = currentPaddingBottom;

      return height;
    };

    // Case Studies submenu
    if (expandedSection === "case-studies") {
      const targetHeight = getAutoHeight(caseStudiesSub);
      gsap.to(caseStudiesSub, {
        height: targetHeight,
        paddingTop: 24,
        paddingBottom: 24,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(caseStudiesSub, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    // Galleries submenu
    if (expandedSection === "galleries") {
      const targetHeight = getAutoHeight(galleriesSub);
      gsap.to(galleriesSub, {
        height: targetHeight,
        paddingTop: 24,
        paddingBottom: 24,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(galleriesSub, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [expandedSection]);

  // Set initial states
  useEffect(() => {
    if (drawerRef.current) {
      gsap.set(drawerRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
    }
    if (caseStudiesSubRef.current) {
      gsap.set(caseStudiesSubRef.current, { height: 0, paddingTop: 0, paddingBottom: 0 });
    }
    if (galleriesSubRef.current) {
      gsap.set(galleriesSubRef.current, { height: 0, paddingTop: 0, paddingBottom: 0 });
    }
  }, []);

  // Header entrance animation
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { shouldAnimate, isFirstVisit } = useInitialLoader();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    const hamburger = hamburgerRef.current;

    if (!header || !hamburger) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(hamburger, { opacity: 1, y: 0 });
      return;
    }

    // If not first visit, show immediately
    if (!isFirstVisit) {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(hamburger, { opacity: 1, y: 0 });
      return;
    }

    // Set initial hidden state for first visit
    gsap.set(header, { opacity: 0, yPercent: -100 });
    gsap.set(hamburger, { opacity: 0, y: -30 });
  }, [isFirstVisit]);

  // Run entrance animation when shouldAnimate becomes true
  useEffect(() => {
    const header = headerRef.current;
    const hamburger = hamburgerRef.current;

    if (!header || !hamburger) return;
    if (!shouldAnimate || hasAnimated.current) return;
    if (!isFirstVisit) return;

    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Header slides down from top
    gsap.to(header, {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.1, // First element in sequence
    });

    // Hamburger slides down with slight delay (mobile only, but animation won't hurt)
    gsap.to(hamburger, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });
  }, [shouldAnimate, isFirstVisit]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const caseStudies = [
    { name: "TRADITIONAL MEDICINALS", path: "/case-study/traditional-medicinals" },
    { name: "TOGETHXR", path: "/case-study/togethxr" },
    { name: "DEBORAH PAGANI", path: "/case-study/deborah-pagani" },
    { name: "NALGENE", path: "/case-study/nalgene" },
  ];

  const galleries = [
    { name: "COMMERCIAL PHOTOGRAPHY", path: "/gallery/commercial-photography" },
    { name: "ADDITIONAL DESIGN STUDIES", path: "/gallery/additional-design-studies" },
  ];

  return (
    <>
      {/* Mobile hamburger button - outside header for proper z-index stacking */}
      <button
        ref={hamburgerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed right-[7px] top-[23px] z-[60] w-[41px] h-[20px] flex flex-col items-end justify-between"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <div
          ref={topLineRef}
          className="w-[41px] h-[2px] bg-black origin-center"
        />
        <div
          ref={bottomLineRef}
          className="w-[41px] h-[2px] bg-black origin-center"
        />
      </button>

      <header ref={headerRef} className="relative z-50 flex w-full items-start justify-between bg-white px-[7px] py-[13px] md:px-8 md:py-4 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
        {/* Logo / Name */}
        <TransitionLink to="/" className="flex flex-col">
          {/* Mobile: Stacked name - matches Figma exactly */}
          <h1 className="md:hidden font-light text-[92px] text-black tracking-[-7.36px] leading-[75px]">
            <span className="block">EMILEE</span>
            <span className="block">DURRETT</span>
          </h1>
          {/* Desktop: Single line */}
          <h1 className="hidden md:block font-light text-[92px] text-black tracking-[-7.36px] leading-normal">
            EMILEE DURRETT
          </h1>
          <p className="font-normal text-[9px] md:text-xs text-black tracking-[0.72px] md:tracking-[0.96px] leading-normal mt-4 md:mt-2">
            CREATIVE PORTFOLIO
          </p>
        </TransitionLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 self-end pb-1">
          {/* Featured Work with Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleFeaturedDropdownEnter}
            onMouseLeave={handleFeaturedDropdownLeave}
          >
            <button className="font-normal text-[11px] text-black tracking-[0.88px] leading-normal hover:opacity-70 transition-opacity flex items-center gap-2">
              <img
                src={starLeft}
                alt=""
                className="w-5 h-5 rotate-[64deg]"
              />
              <span>FEATURED WORK</span>
              <img
                src={starRight}
                alt=""
                className="w-5 h-5 -rotate-[10deg]"
              />
            </button>

            {/* Dropdown */}
            <div
              ref={featuredDropdownRef}
              style={{ opacity: 0, transform: "translateY(-8px)" }}
              className={`absolute top-full right-0 pt-4 min-w-[240px] ${
                isFeaturedDropdownOpen ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <div className="bg-white border border-black/10 shadow-lg py-4 px-6">
                <div className="flex flex-col gap-3">
                  {caseStudies.map((study) => (
                    <TransitionLink
                      key={study.path}
                      to={study.path}
                      className="dropdown-link flex items-center gap-2 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity whitespace-nowrap"
                      onMouseEnter={() => setHoveredLink(study.path)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <img
                        src={starLeft}
                        alt=""
                        className={`w-3.5 h-3.5 rotate-[64deg] transition-opacity duration-200 ${
                          hoveredLink === study.path ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span>{study.name}</span>
                      <img
                        src={starRight}
                        alt=""
                        className={`w-3.5 h-3.5 -rotate-[10deg] transition-opacity duration-200 ${
                          hoveredLink === study.path ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </TransitionLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery with Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleGalleryDropdownEnter}
            onMouseLeave={handleGalleryDropdownLeave}
          >
            <button className="font-normal text-[11px] text-black tracking-[0.88px] leading-normal hover:opacity-70 transition-opacity">
              <span>GALLERY</span>
            </button>

            {/* Dropdown */}
            <div
              ref={galleryDropdownRef}
              style={{ opacity: 0, transform: "translateY(-8px)" }}
              className={`absolute top-full right-0 pt-4 min-w-[280px] ${
                isGalleryDropdownOpen ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <div className="bg-white border border-black/10 shadow-lg py-4 px-6">
                <div className="flex flex-col gap-3">
                  {galleries.map((gallery) => (
                    <TransitionLink
                      key={gallery.path}
                      to={gallery.path}
                      className="dropdown-link flex items-center gap-2 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity whitespace-nowrap"
                      onMouseEnter={() => setHoveredLink(gallery.path)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <img
                        src={starLeft}
                        alt=""
                        className={`w-3.5 h-3.5 rotate-[64deg] transition-opacity duration-200 ${
                          hoveredLink === gallery.path ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span>{gallery.name}</span>
                      <img
                        src={starRight}
                        alt=""
                        className={`w-3.5 h-3.5 -rotate-[10deg] transition-opacity duration-200 ${
                          hoveredLink === gallery.path ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </TransitionLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <TransitionLink
            to="/about"
            className="font-normal text-[11px] text-black tracking-[0.88px] leading-normal hover:opacity-70 transition-opacity"
          >
            ABOUT
          </TransitionLink>
        </nav>
      </header>

      {/* Mobile drawer - full screen black */}
      <div
        ref={drawerRef}
        className="md:hidden fixed inset-0 bg-black z-[55] flex flex-col font-[Helvetica_Neue,Helvetica,Arial,sans-serif] overflow-y-auto"
      >
        {/* Menu items */}
        <div ref={menuItemsRef} className="flex-1 flex flex-col justify-center">
          {/* Case Studies - Expandable */}
          <div className="menu-item border-b border-white/20">
            <button
              onClick={() => toggleSection("case-studies")}
              className="w-full flex items-center justify-center gap-4 py-8"
            >
              <img
                src={starCaseStudies}
                alt=""
                className="w-8 h-8 -rotate-30"
              />
              <span className="text-white text-[12px] tracking-[0.96px]">
                CASE STUDIES
              </span>
              <img
                src={starCaseStudies}
                alt=""
                className="w-8 h-8 -rotate-30"
              />
            </button>
            {/* Sub-menu */}
            <div
              ref={caseStudiesSubRef}
              className="overflow-hidden flex flex-col items-center gap-6"
            >
              <TransitionLink
                to="/case-study/traditional-medicinals"
                onClick={handleNavClick}
                className="text-white text-[12px] tracking-[0.96px] underline hover:opacity-70 transition-opacity"
              >
                TRADITIONAL MEDICINALS
              </TransitionLink>
              <TransitionLink
                to="/case-study/togethxr"
                onClick={handleNavClick}
                className="text-white text-[12px] tracking-[0.96px] underline hover:opacity-70 transition-opacity"
              >
                TOGETHXR
              </TransitionLink>
              <TransitionLink
                to="/case-study/deborah-pagani"
                onClick={handleNavClick}
                className="text-white text-[12px] tracking-[0.96px] underline hover:opacity-70 transition-opacity"
              >
                DEBORAH PAGANI
              </TransitionLink>
              <TransitionLink
                to="/case-study/nalgene"
                onClick={handleNavClick}
                className="text-white text-[12px] tracking-[0.96px] underline hover:opacity-70 transition-opacity"
              >
                NALGENE
              </TransitionLink>
            </div>
          </div>

          {/* Galleries - Expandable */}
          <div className="menu-item border-b border-white/20">
            <button
              onClick={() => toggleSection("galleries")}
              className="w-full flex items-center justify-center gap-4 py-8"
            >
              <img
                src={starGalleries}
                alt=""
                className="w-8 h-8 rotate-[-165deg]"
              />
              <span className="text-white text-[12px] tracking-[0.96px]">
                GALLERIES
              </span>
              <img
                src={starGalleries}
                alt=""
                className="w-8 h-8 rotate-[-165deg]"
              />
            </button>
            {/* Sub-menu */}
            <div
              ref={galleriesSubRef}
              className="overflow-hidden flex flex-col items-center gap-6"
            >
              <TransitionLink
                to="/gallery/commercial-photography"
                onClick={handleNavClick}
                className="text-white text-[12px] tracking-[0.96px] underline hover:opacity-70 transition-opacity"
              >
                COMMERCIAL PHOTOGRAPHY
              </TransitionLink>
              <TransitionLink
                to="/gallery/additional-design-studies"
                onClick={handleNavClick}
                className="text-white text-[12px] tracking-[0.96px] underline hover:opacity-70 transition-opacity"
              >
                ADDITIONAL DESIGN STUDIES
              </TransitionLink>
            </div>
          </div>

          {/* About - Direct link */}
          <TransitionLink
            to="/about"
            onClick={handleNavClick}
            className="menu-item flex items-center justify-center gap-4 py-8 border-b border-white/20"
          >
            <img src={starAbout} alt="" className="w-8 h-8" />
            <span className="text-white text-[12px] tracking-[0.96px]">
              ABOUT
            </span>
            <img src={starAbout} alt="" className="w-8 h-8" />
          </TransitionLink>

          {/* Resume - Direct link */}
          <a
            href="/assets/EmileeDurrettResume2026.pdf"
            download
            onClick={handleNavClick}
            className="menu-item flex items-center justify-center gap-4 py-8 border-b border-white/20"
          >
            <img src={starResume} alt="" className="w-8 h-8 rotate-[-35deg]" />
            <span className="text-white text-[12px] tracking-[0.96px]">
              RESUME
            </span>
            <img src={starResume} alt="" className="w-8 h-8 rotate-[-35deg]" />
          </a>
        </div>
      </div>
    </>
  );
}

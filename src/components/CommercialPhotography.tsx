import { useEffect, useRef } from "react";
import { TransitionLink } from "./PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hero image
const heroImage = "/assets/49ec217aae1247374f83b952b66e240cc3adce6b.webp";

// Gallery images - Row 1 (3 images)
const img1 = "/assets/1f1edbe039e606bdc42aef630cc9b05435838b40.webp";
const img2 = "/assets/cf2adbdaf23172fa2939af9bf87a2d8f249f5e16.webp";
const img3 = "/assets/6f8a7d2a5d7a8d0b8b803be64c7388b4264ad88d.webp";

// Row 2 (3 tall images)
const img4 = "/assets/bf855a659812ab8cc28a1b453b53d373fa6e667c.webp";
const img5 = "/assets/e78b539d7697ed6d6e80983c387f444eae440ca2.webp";
const img6 = "/assets/8d8eb95b4a890640d47a7a99ffecd98622ab318e.webp";

// Row 3 (wide + narrow)
const img7 = "/assets/d8d754b8793c5d8efa0475ca45999dd8dd86296e.webp";
const img8 = "/assets/2a99a663827e3722cbe831766d2411c778be7d52.webp";

// Large full width
const img9 = "/assets/56d11c440466248c7918a1281fa0523edfc46d38.webp";

// Row 4 (3 medium tall)
const img10 = "/assets/2ed7ef288bffc57916531817be819854fff7da23.webp";
const img11 = "/assets/1eecea48f9b806dce3bf9bf422eea8a988ab323f.webp";
const img12 = "/assets/8c4fb7340c264c18fe87f158f48b04911cb08ae7.webp";

// Row 5 (2 large)
const img13 = "/assets/98073401ba369600fc97a2c50bdc811821450c60.webp";
const img14 = "/assets/e2be51427788b25ba085f6a2b7d911f1d05d232d.webp";

// Row 6 (3 portrait)
const img15 = "/assets/dff0392b816144e1e88b76885648548436e0e04e.webp";
const img16 = "/assets/da0c7debf2078d818ac2b2a872bc6c745ff992bd.webp";
const img17 = "/assets/2c36156c8f3500120c1bc83013b0808b80d86ed6.webp";

// Large wide
const img18 = "/assets/e6bbd45513fd78e32ed7cd826507289199902046.webp";

// Bottom row
const img19 = "/assets/5f742e5dd8f7a23c0c87feb534dec0bffac33fe2.webp";
const img20 = "/assets/75c78e269c98215da892a78f91b24972f5352b98.webp";

// Arrow
const starVector = "/assets/ffc4032bb4b37f387e4b2903463baae79777353e.svg";

export default function CommercialPhotography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Title section fade in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Gallery images stagger animation
      const images = galleryRef.current?.querySelectorAll(".gallery-image");
      if (images) {
        images.forEach((img, index) => {
          gsap.fromTo(
            img,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: (index % 3) * 0.1, // Stagger within rows
            }
          );
        });
      }

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
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <img
            src={heroImage}
            alt="Commercial Photography Hero"
            className="w-full h-full object-cover" loading="lazy"
          />
        </div>
      </div>

      {/* Title Section */}
      <div
        ref={titleRef}
        className="px-6 md:px-10 py-12 md:py-16"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div>
            <p className="text-[11px] tracking-[0.88px] mb-2">PHOTOGRAPHY</p>
            <h1 className="text-[48px] md:text-[82px] font-light tracking-[-4px] md:tracking-[-6.56px] leading-[0.8]">
              GALLERY
            </h1>
          </div>
          <p className="text-[11px] leading-[1.5] max-w-[395px] tracking-wide">
            Throughout my experience working as both a graphic designer and
            creative director, I have often had the opportunity to also utilize
            my photography skills for various clients, passion projects, and
            studio photoshoots. Although it is not a skill I prioritize as much
            in my work, I love the opportunity to shoot for clients and create
            content for brands.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={galleryRef} className="px-6 md:px-10 pb-20">
        {/* Row 1 - 3 equal images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="gallery-image aspect-[4/3] overflow-hidden">
            <img src={img1} alt="Commercial photography - lifestyle product shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[4/3] overflow-hidden">
            <img src={img2} alt="Commercial photography - brand imagery" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[4/3] overflow-hidden">
            <img src={img3} alt="Commercial photography - studio product shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Row 2 - 3 tall images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img4} alt="Commercial photography - portrait style product photography" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img5} alt="Commercial photography - vertical brand shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img6} alt="Commercial photography - editorial style image" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Row 3 - Wide + Narrow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="gallery-image md:col-span-2 aspect-[16/9] overflow-hidden">
            <img src={img7} alt="Commercial photography - wide format lifestyle shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[2/3] md:aspect-auto overflow-hidden">
            <img src={img8} alt="Commercial photography - detail shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Row 4 - Full width large */}
        <div className="gallery-image mb-4 aspect-[16/10] overflow-hidden">
          <img src={img9} alt="Commercial photography - full width brand campaign image" className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Row 5 - 3 medium images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img10} alt="Commercial photography - product styling shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img11} alt="Commercial photography - brand lifestyle image" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img12} alt="Commercial photography - creative direction shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Row 6 - 2 large images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img13} alt="Commercial photography - studio portrait session" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img14} alt="Commercial photography - editorial brand photography" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Row 7 - 3 portrait images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="gallery-image aspect-[3/4] overflow-hidden">
            <img src={img15} alt="Commercial photography - portrait format product image" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[3/4] overflow-hidden">
            <img src={img16} alt="Commercial photography - branded content shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image aspect-[3/4] overflow-hidden">
            <img src={img17} alt="Commercial photography - campaign photography" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Row 8 - Full width */}
        <div className="gallery-image mb-4 aspect-[16/10] overflow-hidden">
          <img src={img18} alt="Commercial photography - wide panoramic brand shot" className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Row 9 - Final row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="gallery-image aspect-[2/3] overflow-hidden">
            <img src={img19} alt="Commercial photography - vertical composition shot" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="gallery-image md:col-span-2 aspect-[16/10] overflow-hidden">
            <img src={img20} alt="Commercial photography - landscape format brand imagery" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Next Section Link */}
      <div className="flex justify-center items-center gap-3 py-16 border-t border-black/10">
        <TransitionLink
          to="/gallery/additional-design-studies"
          className="flex items-center gap-3 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity"
        >
          <img
            src={starVector}
            alt=""
            className="star-spin w-3 h-3"
          />
          <span>NEXT GALLERY</span>
        </TransitionLink>
      </div>
    </div>
  );
}

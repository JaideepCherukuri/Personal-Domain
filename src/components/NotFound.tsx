import { useEffect } from "react";
import { TransitionLink } from "./PageTransition";

const starIcon = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";
const arrowIcon = "/assets/40dbd6901addc15b20ac3d1de97b753f18c117a6.svg";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Emilee Durrett";
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      {/* Star decoration */}
      <img
        src={starIcon}
        alt=""
        className="w-12 h-12 mb-8 animate-spin-slow"
      />

      {/* 404 Header */}
      <p className="text-[11px] tracking-[0.88px] mb-4">ERROR 404</p>
      <h1 className="font-light text-[64px] md:text-[120px] tracking-[-4px] md:tracking-[-8px] leading-[0.9] mb-6">
        PAGE NOT FOUND
      </h1>

      {/* Description */}
      <p className="text-[11px] tracking-[0.88px] leading-[1.6] text-center max-w-[400px] mb-12">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <TransitionLink
          to="/"
          className="flex items-center gap-3 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity"
        >
          <img src={starIcon} alt="" className="w-[18px] h-[18px]" />
          <span>BACK TO HOME</span>
          <img src={arrowIcon} alt="" className="w-[12px] h-auto" />
        </TransitionLink>

        <TransitionLink
          to="/sitemap"
          className="flex items-center gap-3 text-[11px] tracking-[0.88px] hover:opacity-70 transition-opacity"
        >
          <img src={starIcon} alt="" className="w-[18px] h-[18px]" />
          <span>VIEW SITEMAP</span>
          <img src={arrowIcon} alt="" className="w-[12px] h-auto" />
        </TransitionLink>
      </div>
    </div>
  );
}

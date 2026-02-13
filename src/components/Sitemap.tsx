import { TransitionLink } from "./PageTransition";

const starIcon = "/assets/027e5bddce9a815b7c52f040591889f3a0f50dbe.svg";

interface SitemapSection {
  title: string;
  links: {
    to: string;
    label: string;
    description: string;
  }[];
}

const sitemapData: SitemapSection[] = [
  {
    title: "MAIN",
    links: [
      {
        to: "/",
        label: "Home",
        description: "Portfolio homepage featuring Emilee Durrett",
      },
      {
        to: "/about",
        label: "About",
        description: "Learn more about Emilee's background and expertise",
      },
    ],
  },
  {
    title: "CASE STUDIES",
    links: [
      {
        to: "/case-study/traditional-medicinals",
        label: "Traditional Medicinals",
        description: "Mother's Milk product campaign",
      },
      {
        to: "/case-study/togethxr",
        label: "TOGETHXR",
        description: "Try to Keep Up digital campaign",
      },
      {
        to: "/case-study/deborah-pagani",
        label: "Deborah Pagani",
        description: "Beauty product launch creative direction",
      },
      {
        to: "/case-study/nalgene",
        label: "Nalgene",
        description: "75th Anniversary branding and campaign",
      },
    ],
  },
  {
    title: "GALLERIES",
    links: [
      {
        to: "/gallery/commercial-photography",
        label: "Photography",
        description: "Commercial and brand photography work",
      },
      {
        to: "/gallery/additional-design-studies",
        label: "Design",
        description: "Additional design projects and studies",
      },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-[80vh] px-6 md:px-10 py-16 md:py-20 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[11px] tracking-[0.88px] mb-2">NAVIGATION</p>
        <h1 className="font-light text-[48px] md:text-[82px] tracking-[-4px] md:tracking-[-6.56px] leading-[0.9]">
          SITEMAP
        </h1>
      </div>

      {/* Sitemap Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-[1200px]">
        {sitemapData.map((section) => (
          <div key={section.title}>
            <h2 className="text-[11px] tracking-[0.88px] mb-6 pb-2 border-b border-black/10">
              {section.title}
            </h2>
            <ul className="space-y-6">
              {section.links.map((link) => (
                <li key={link.to}>
                  <TransitionLink
                    to={link.to}
                    className="group block hover:opacity-70 transition-opacity"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={starIcon}
                        alt=""
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="text-[14px] md:text-[16px] tracking-[-0.5px]">
                        {link.label}
                      </span>
                    </div>
                    <p className="text-[10px] tracking-[0.4px] text-black/60 ml-5">
                      {link.description}
                    </p>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-20 pt-8 border-t border-black/10">
        <p className="text-[10px] tracking-[0.4px] text-black/50">
          For search engines: <a href="/sitemap.xml" className="underline hover:opacity-70">sitemap.xml</a>
        </p>
      </div>
    </div>
  );
}

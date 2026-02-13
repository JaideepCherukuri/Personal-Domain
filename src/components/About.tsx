const aboutImage = "/assets/jaideep-portrait.png";
const iconX = "/assets/icon-x.svg";
const iconLinkedIn = "/assets/icon-linkedin.svg";

export default function About() {
  return (
    <section className="w-full bg-black font-[Geist_Sans,sans-serif]">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Portrait image */}
        <div className="w-full lg:w-[43%] lg:shrink-0 bg-black">
          <img
            src={aboutImage}
            alt="Jaideep Cherukuri"
            className="w-full h-auto lg:h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1 px-6 py-10 lg:px-12 lg:py-16 lg:pl-16">
          {/* Header */}
          <p className="text-[11px] tracking-[0.88px] mb-2 text-[#FBFDE2]">A bit about me</p>
          <h2 className="font-light text-[48px] sm:text-[64px] lg:text-[82px] tracking-[-4px] lg:tracking-[-6.56px] leading-[1] mb-8 lg:mb-12 text-[#FBFDE2]">
            Hello there
          </h2>

          {/* Bio paragraphs */}
          <div className="text-[11px] tracking-[0.88px] leading-[1.6] max-w-[562px] space-y-4 mb-10 lg:mb-12 text-[#FBFDE2]">
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
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24 mb-10 lg:mb-12 text-[#FBFDE2]">
            {/* What I think about */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">What I think about</p>
              <ul className="space-y-1">
                <li>What happens when machines become economic actors</li>
                <li>Infrastructure that knows how to disappear</li>
                <li>The gap between how money works and how it should</li>
                <li>Stablecoins &amp; autonomous settlement</li>
                <li>Zero-to-one product building</li>
                <li>Trust in systems without humans in the loop</li>
                <li>Why the best technology feels like it was always there</li>
              </ul>
            </div>

            {/* Where I've been */}
            <div className="text-[11px] tracking-[0.88px] leading-[1.6]">
              <p className="mb-4">Where I've been</p>
              <ul className="space-y-1">
                <li>UC Berkeley, Sutardja Center for Entrepreneurship</li>
                <li>Entrepreneur First</li>
                <li>Stablecoin infrastructure (built it, exited)</li>
                <li>SRM University, Computer Science</li>
                <li>Enough hackathons to know the best ideas come at 3am</li>
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

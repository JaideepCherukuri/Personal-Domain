import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useDocumentTitle("Creative Director & Designer");

  return (
    <div className="w-full bg-white text-black">
      <Hero />

      {/* Anchor targets for nav links */}
      <section id="featured" className="sr-only">
        Featured work
      </section>
      <section id="about" className="sr-only">
        About
      </section>
    </div>
  );
}

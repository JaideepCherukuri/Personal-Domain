import { createFileRoute } from "@tanstack/react-router";
import About from "../components/About";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useDocumentTitle("Jaideep Cherukuri");

  return (
    <div className="w-full bg-white text-black">
      <About />
    </div>
  );
}

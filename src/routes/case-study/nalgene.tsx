import { createFileRoute } from "@tanstack/react-router";
import CaseStudyNalgene from "../../components/CaseStudyNalgene";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/case-study/nalgene")({
  component: NalgenePage,
});

function NalgenePage() {
  useDocumentTitle("Nalgene 75th Anniversary Case Study");

  return (
    <div className="w-full bg-white text-black">
      <CaseStudyNalgene />
    </div>
  );
}

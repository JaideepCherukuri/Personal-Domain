import { createFileRoute } from "@tanstack/react-router";
import CaseStudyTraditionalMedicinals from "../../components/CaseStudyTraditionalMedicinals";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/case-study/traditional-medicinals")({
  component: TraditionalMedicinalsPage,
});

function TraditionalMedicinalsPage() {
  useDocumentTitle("Traditional Medicinals Case Study");

  return (
    <div className="w-full bg-white text-black">
      <CaseStudyTraditionalMedicinals />
    </div>
  );
}

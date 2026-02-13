import { createFileRoute } from "@tanstack/react-router";
import CaseStudyTogethxr from "../../components/CaseStudyTogethxr";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/case-study/togethxr")({
  component: TogethxrPage,
});

function TogethxrPage() {
  useDocumentTitle("TOGETHXR Case Study");

  return (
    <div className="w-full bg-white text-black">
      <CaseStudyTogethxr />
    </div>
  );
}

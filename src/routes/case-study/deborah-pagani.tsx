import { createFileRoute } from "@tanstack/react-router";
import CaseStudyDeborahPagani from "../../components/CaseStudyDeborahPagani";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/case-study/deborah-pagani")({
  component: DeborahPaganiPage,
});

function DeborahPaganiPage() {
  useDocumentTitle("Deborah Pagani Case Study");

  return (
    <div className="w-full bg-white text-black">
      <CaseStudyDeborahPagani />
    </div>
  );
}

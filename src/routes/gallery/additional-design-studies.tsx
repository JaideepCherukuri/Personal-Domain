import { createFileRoute } from "@tanstack/react-router";
import AdditionalDesignStudies from "../../components/AdditionalDesignStudies";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/gallery/additional-design-studies")({
  component: AdditionalDesignStudiesPage,
});

function AdditionalDesignStudiesPage() {
  useDocumentTitle("Design Gallery");

  return <AdditionalDesignStudies />;
}

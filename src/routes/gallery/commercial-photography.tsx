import { createFileRoute } from "@tanstack/react-router";
import CommercialPhotography from "../../components/CommercialPhotography";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/gallery/commercial-photography")({
  component: CommercialPhotographyPage,
});

function CommercialPhotographyPage() {
  useDocumentTitle("Photography Gallery");

  return <CommercialPhotography />;
}

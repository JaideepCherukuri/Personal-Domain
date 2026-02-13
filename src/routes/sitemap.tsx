import { createFileRoute } from "@tanstack/react-router";
import Sitemap from "../components/Sitemap";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Route = createFileRoute("/sitemap")({
  component: SitemapPage,
});

function SitemapPage() {
  useDocumentTitle("Sitemap");

  return <Sitemap />;
}

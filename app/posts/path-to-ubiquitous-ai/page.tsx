import type { Metadata } from "next";
import { SiliconArticle } from "@/components/SiliconArticle";

export const metadata: Metadata = {
  title: "The Path to Ubiquitous AI, Visualized",
  description:
    "A visual breakdown of the path to ubiquitous AI, built with Claude Code.",
  openGraph: {
    title: "The Path to Ubiquitous AI, Visualized",
    description:
      "A visual breakdown of the path to ubiquitous AI, built with Claude Code.",
    type: "article",
    publishedTime: "2026-02-21",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Path to Ubiquitous AI, Visualized",
    description:
      "A visual breakdown of the path to ubiquitous AI, built with Claude Code.",
  },
};

export default function Page() {
  return <SiliconArticle />;
}

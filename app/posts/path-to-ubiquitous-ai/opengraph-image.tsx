import { generateOGImage } from "@/lib/og";

export const alt = "The Path to Ubiquitous AI, Visualized";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "The Path to Ubiquitous AI, Visualized",
    description:
      "A visual breakdown of the path to ubiquitous AI, built with Claude Code.",
  });
}

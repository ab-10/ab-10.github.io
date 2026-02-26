import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "../../../lib/markdown";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
};

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "data", "about.md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  // Fix the image path for the about page
  const fixedContent = content.replace(
    "../armin_on_santis_small.jpg",
    "/armin_on_santis_small.jpg"
  );
  const html = await renderMarkdown(fixedContent);

  return (
    <article>
      <h1 className="mb-6 text-2xl font-bold">About Me</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

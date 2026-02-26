import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "../../../lib/markdown";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookshelf",
};

export default async function BookshelfPage() {
  const filePath = path.join(process.cwd(), "data", "like.md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  const html = await renderMarkdown(content);

  return (
    <article>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

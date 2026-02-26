import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories?: string;
  hidden?: boolean;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/**
 * Jekyll posts use \\[ ... \\] for display math and \\( ... \\) for inline math.
 * remark-math expects $$ ... $$ and $ ... $ respectively.
 * This function normalizes both formats.
 */
function normalizeMathDelimiters(content: string): string {
  // Convert \[ ... \] to $$ ... $$ (display math)
  // In the markdown source, these appear as \\[ and \\]
  content = content.replace(/\\\\\[/g, "$$");
  content = content.replace(/\\\\\]/g, "$$");

  // Convert \( ... \) to $ ... $ (inline math)
  content = content.replace(/\\\\\(/g, "$");
  content = content.replace(/\\\\\)/g, "$");

  return content;
}

/**
 * Normalize image paths from Jekyll conventions to Next.js public/ paths.
 */
function normalizeContent(content: string): string {
  // Fix relative image paths: ../assets/ → /assets/
  content = content.replace(/\.\.\//g, "/");

  return content;
}

function extractSlugFromFilename(filename: string): string {
  // Jekyll filename format: YYYY-MM-DD-slug.md
  const match = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  return match ? match[1] : filename.replace(/\.md$/, "");
}

function extractDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

function parseDate(frontmatterDate: unknown, filename: string): string {
  if (frontmatterDate) {
    // Handle Date objects (gray-matter auto-parses some date formats)
    if (frontmatterDate instanceof Date && !isNaN(frontmatterDate.getTime())) {
      return frontmatterDate.toISOString().split("T")[0];
    }
    // Handle string dates
    if (typeof frontmatterDate === "string") {
      const d = new Date(frontmatterDate);
      if (!isNaN(d.getTime())) {
        return d.toISOString().split("T")[0];
      }
    }
  }
  return extractDateFromFilename(filename);
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      const slug = extractSlugFromFilename(filename);
      const date = parseDate(data.date, filename);

      return {
        slug,
        title: data.title || slug,
        date,
        categories: data.categories,
        hidden: data.hidden || data.draft || false,
      };
    })
    .filter((post) => !post.hidden)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getAllSlugs(): string[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((f) => f.endsWith(".md"))
    .map(extractSlugFromFilename);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filenames = fs.readdirSync(postsDirectory);
  const filename = filenames.find(
    (f) => f.endsWith(".md") && extractSlugFromFilename(f) === slug
  );

  if (!filename) return null;

  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  let normalizedContent = normalizeContent(content);
  normalizedContent = normalizeMathDelimiters(normalizedContent);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(normalizedContent);

  const date = parseDate(data.date, filename);

  return {
    slug,
    title: data.title || slug,
    date,
    categories: data.categories,
    hidden: data.hidden || data.draft || false,
    contentHtml: result.toString(),
  };
}

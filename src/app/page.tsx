import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export default function Home() {
  const posts = getAllPosts();

  // Group posts by year
  const postsByYear: Record<string, typeof posts> = {};
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  }

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-muted">{year}</h2>
          <ul className="space-y-2">
            {postsByYear[year].map((post) => {
              const date = new Date(post.date + "T00:00:00");
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              return (
                <li key={post.slug} className="flex gap-4">
                  <span className="shrink-0 text-sm text-muted tabular-nums">
                    {month}/{day}
                  </span>
                  <Link
                    href={`/${post.slug}`}
                    className="text-foreground hover:text-link"
                  >
                    {post.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

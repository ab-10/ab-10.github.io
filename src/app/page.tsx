import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Link key={post.slug} className="post-item" href={`/${post.slug}`}>
          <span className="post-item-title">{post.title}</span>
        </Link>
      ))}
    </div>
  );
}

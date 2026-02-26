import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://arminbagrat.com";

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// --- RSS Feed ---

const postsDir = path.join(process.cwd(), "posts");
const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

const posts = filenames
  .map((filename) => {
    const { data } = matter(fs.readFileSync(path.join(postsDir, filename), "utf8"));
    const slug = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)?.[1] ?? filename.replace(/\.md$/, "");
    const dateStr = (() => {
      if (data.date instanceof Date && !isNaN(data.date.getTime())) return data.date.toISOString().split("T")[0];
      if (typeof data.date === "string") { const d = new Date(data.date); if (!isNaN(d.getTime())) return d.toISOString().split("T")[0]; }
      return filename.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? "";
    })();
    return { slug, title: data.title || slug, date: dateStr, hidden: data.hidden || data.draft || false };
  })
  .filter((p) => !p.hidden)
  .sort((a, b) => (a.date > b.date ? -1 : 1));

const rssItems = posts
  .map(
    (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/${post.slug}/</link>
      <guid>${SITE_URL}/${post.slug}/</guid>
      <pubDate>${new Date(post.date + "T00:00:00").toUTCString()}</pubDate>
    </item>`
  )
  .join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Armin Bagrat Stepanyan</title>
    <description>Language about language processing</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(path.join(process.cwd(), "out", "feed.xml"), rss);
console.log("Generated feed.xml");

// --- Dedicto Feed ---

const dedictoData = matter.engines.yaml.parse(
  fs.readFileSync(path.join(process.cwd(), "data", "dedicto.yml"), "utf8")
);

const episodes = dedictoData.episodes
  .map(
    (ep) => `
<item>
    <title>${escapeXml(ep.title)}</title>
    <enclosure url="${escapeXml(ep.audio)}"
        type="${escapeXml(dedictoData.type)}" length="${ep.size}"/>
    <guid isPermaLink="false">dedicto${ep.number}</guid>
    <pubDate>${ep.pubdate}</pubDate>
    <description>${escapeXml(ep.description)}</description>
    <itunes:duration>${ep.duration}</itunes:duration>
    <itunes:image href="${escapeXml(ep.image)}" />
    <itunes:episode>${ep.number}</itunes:episode>
    <itunes:explicit>${escapeXml(dedictoData.explicit)}</itunes:explicit>
</item>`
  )
  .join("");

const dedicto = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" version="2.0"
xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>${escapeXml(dedictoData.title)}</title>
<language>en</language>
<copyright>${escapeXml(dedictoData.copyright)}</copyright>
<link>${escapeXml(dedictoData.link)}</link>
<googleplay:author>${escapeXml(dedictoData.author)}</googleplay:author>
<itunes:author>${escapeXml(dedictoData.author)}</itunes:author>
<googleplay:description>${escapeXml(dedictoData.description)}</googleplay:description>
<description>${escapeXml(dedictoData.description)}</description>
<googleplay:email>${escapeXml(dedictoData.email)}</googleplay:email>
<itunes:owner>
<itunes:email>${escapeXml(dedictoData.email)}</itunes:email>
<itunes:name>${escapeXml(dedictoData.author)}</itunes:name>
</itunes:owner>
<googleplay:image href="${escapeXml(dedictoData.image)}" />
<itunes:image href="${escapeXml(dedictoData.image)}" />
<googleplay:category text="${escapeXml(dedictoData.category)}"/>
<itunes:category text="${escapeXml(dedictoData.category)}"/>
<itunes:explicit>${escapeXml(dedictoData.explicit)}</itunes:explicit>
${episodes}
</channel>
</rss>`;

fs.writeFileSync(path.join(process.cwd(), "out", "dedicto.xml"), dedicto);
console.log("Generated dedicto.xml");

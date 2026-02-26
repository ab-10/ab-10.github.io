import fs from "fs";
import path from "path";
import yaml from "gray-matter";

interface Episode {
  title: string;
  image: string;
  audio: string;
  size: number;
  duration: number;
  pubdate: string;
  number: number;
  description: string;
}

interface DedictoData {
  title: string;
  link: string;
  copyright: string;
  author: string;
  description: string;
  email: string;
  category: string;
  image: string;
  type: string;
  explicit: string;
  episodes: Episode[];
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "dedicto.yml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  // gray-matter's yaml engine can parse plain YAML via the underlying js-yaml
  const data = yaml.engines.yaml.parse(fileContents) as DedictoData;

  const episodes = data.episodes
    .map(
      (ep) => `
<item>
    <title>${escapeXml(ep.title)}</title>
    <enclosure url="${escapeXml(ep.audio)}"
        type="${escapeXml(data.type)}" length="${ep.size}"/>
    <guid isPermaLink="false">dedicto${ep.number}</guid>
    <pubDate>${ep.pubdate}</pubDate>
    <description>${escapeXml(ep.description)}</description>
    <itunes:duration>${ep.duration}</itunes:duration>
    <itunes:image href="${escapeXml(ep.image)}" />
    <itunes:episode>${ep.number}</itunes:episode>
    <itunes:explicit>${escapeXml(data.explicit)}</itunes:explicit>
</item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" version="2.0"
xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>${escapeXml(data.title)}</title>
<language>en</language>
<copyright>${escapeXml(data.copyright)}</copyright>
<link>${escapeXml(data.link)}</link>
<googleplay:author>${escapeXml(data.author)}</googleplay:author>
<itunes:author>${escapeXml(data.author)}</itunes:author>
<googleplay:description>${escapeXml(data.description)}</googleplay:description>
<description>${escapeXml(data.description)}</description>
<googleplay:email>${escapeXml(data.email)}</googleplay:email>
<itunes:owner>
<itunes:email>${escapeXml(data.email)}</itunes:email>
<itunes:name>${escapeXml(data.author)}</itunes:name>
</itunes:owner>
<googleplay:image href="${escapeXml(data.image)}" />
<itunes:image href="${escapeXml(data.image)}" />
<googleplay:category text="${escapeXml(data.category)}"/>
<itunes:category text="${escapeXml(data.category)}"/>
<itunes:explicit>${escapeXml(data.explicit)}</itunes:explicit>
${episodes}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

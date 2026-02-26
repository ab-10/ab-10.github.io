import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAnalytics } from "./analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Armin Bagrat Stepanyan",
    template: "%s | Armin Bagrat Stepanyan",
  },
  description: "sketches of the liminal space",
};

function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="site-name">
        Armin Bagrat Stepanyan
      </Link>
      <nav>
        <ul className="site-nav">
          <li>
            <Link href="/me">About</Link>
          </li>
          <li>
            <Link href="/like">Bookshelf</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-cta">
        Click{" "}
        <Link href="/email">
          here
        </Link>{" "}
        to get an email when I write something new. Yes, there&apos;s also an{" "}
        <Link href="/feed.xml">
          RSS
        </Link>{" "}
        feed.
      </p>
      <div className="footer-top">
        <span className="footer-tagline">sketches of the liminal space</span>
        <span className="footer-sep">&middot;</span>
        <a href="https://github.com/ab-10">GitHub</a>
        <span className="footer-sep">&middot;</span>
        <a href="https://bsky.app/profile/arminbagrat.com">Bluesky</a>
        <span className="footer-sep">&middot;</span>
        <a href="https://x.com/arminbagrat/">X</a>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

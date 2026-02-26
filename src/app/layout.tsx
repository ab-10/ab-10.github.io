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
    <header className="border-b border-border py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-foreground">
          Armin Bagrat Stepanyan
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/me" className="text-muted hover:text-foreground">
            About Me
          </Link>
          <Link href="/like" className="text-muted hover:text-foreground">
            Bookshelf
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-6 text-sm text-muted">
      <div className="mx-auto max-w-2xl px-4">
        <p>Armin Bagrat Stepanyan</p>
        <p className="mt-1">
          <a
            href="https://github.com/ab-10"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </p>
        <p className="mt-1">sketches of the liminal space</p>
        <p className="mt-2">
          Click{" "}
          <Link href="/email" className="text-link hover:underline">
            here
          </Link>{" "}
          to get an email when I write something new. Yes, there&apos;s also an{" "}
          <Link href="/feed.xml" className="text-link hover:underline">
            RSS
          </Link>{" "}
          feed.
        </p>
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0C0D12" },
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/Dev2k30abrd"),
  title: {
    default: "Devansh Rai — AI Engineer & Full-Stack Developer",
    template: "%s | Devansh Rai",
  },
  description:
    "Engineering portfolio of Devansh Rai. AI Engineer and Full-Stack Developer specializing in multi-agent systems, LLM/RAG architectures, production backend services, and machine learning research.",
  keywords: [
    "Devansh Rai",
    "AI Engineer",
    "Full-Stack Developer",
    "Machine Learning Engineer",
    "Multi-Agent Systems",
    "LLM",
    "RAG",
    "FastAPI",
    "Python",
    "TypeScript",
    "Software Engineer",
  ],
  authors: [{ name: "Devansh Rai", url: "https://github.com/Dev2k30abrd" }],
  creator: "Devansh Rai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Dev2k30abrd",
    title: "Devansh Rai — AI Engineer & Full-Stack Developer",
    description:
      "Open to opportunities worldwide across AI, Software Engineering and Full-Stack Development. Growth comes first; the rewards will follow.",
    siteName: "Devansh Rai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devansh Rai — AI Engineer & Full-Stack Developer",
    description:
      "Open to opportunities worldwide across AI, Software Engineering and Full-Stack Development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('devansh_theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased selection:bg-indigo-500/25 selection:text-indigo-400 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

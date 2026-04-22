import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://irwan.vercel.app/"),
  title: "Irwan Adinata - Web Developer",
  description:
    "Personal portfolio of Irwan Adinata, a Fullstack Web Developer from Indonesia specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Irwan Adinata",
    "Fullstack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js Developer",
    "Programmer",
    "Portfolio",
    "Frontend",
    "Backend",
  ],
  icons: {
    icon: "/favicon.png",
  },
  authors: [{ name: "Irwan Adinata" }],
  creator: "Irwan Adinata",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://irwan.vercel.app/",
    siteName: "Irwan Adinata Portfolio",
    title: "Irwan Adinata — Fullstack Web Developer",
    description:
      "Personal portfolio of Irwan Adinata, a Fullstack Web Developer specializing in React, Next.js, Node.js, Express.js and MySQL.",
    images: [
      {
        url: "/profile.jpg",
        width: 400,
        height: 400,
        alt: "Irwan Adinata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irwan Adinata — Fullstack Web Developer",
    description:
      "Personal portfolio of Irwan Adinata, a Fullstack Web Developer from Indonesia specializing in React, Next.js, Node.js, Express.js and MySQL.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${firaCode.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                if (t === 'dark') document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

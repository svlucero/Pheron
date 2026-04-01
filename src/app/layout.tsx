import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pheron — Manage AI Agents for Your Dev Workflow",
  description:
    "Pheron lets you manage repositories, GitHub issues, and AI agents to automate your software development workflow. Control costs, use multiple runners, and build custom specialist agents.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K0H94YRCK9"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-K0H94YRCK9');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
        {/* Ant trail background — visible over all sections using multiply blend */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: "url(/camino_hormigas.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "90px",
            mixBlendMode: "multiply",
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      </body>
    </html>
  );
}

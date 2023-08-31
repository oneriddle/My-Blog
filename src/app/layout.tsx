"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import "@/styles/css/styles.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Info from "@/components/info";

import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      <head>
        {/* FavIcon */}
        <link
          rel="shortcut icon"
          href="https://cdn-icons-png.flaticon.com/512/3959/3959542.png"
          type="image"
        />
        <title>Mi Blog</title>
        {/* Meta */}
        <meta
          name="description"
          content="Programmer who loves code and technology, comitted to developing specialized and scalable technology in new projects."
        />
        <meta
          name="keywords"
          content="Developer, web, wordpress, app, ecommerce, SEO, ux,ui, css, JavaScript, Santiago, Morera, dev, Full Stack, Node.js, React.js, Next.js, Nest.js, TypeScript"
        />
        <meta name="copyright" content="© 2006 MDC"></meta>
        {/* OpenGraph */}
        <meta property="og:type" content="Portfolio" />
        <meta property="og:title" content="Web Developer" />
        <meta
          property="og:description"
          content="Full Stack Developer JavaScript/TypeScript"
        />
        <meta property="og:url" content="https://thisissanti.dev" />
        <meta
          property="og:image"
          content="https://i.ibb.co/Fk1d2V3/santi-iztli-github-io-portfolio.png"
        />
      </head>
      <body>
        <Providers>
          <Navigation />
          {children}
          <Analytics />
        </Providers>
        <Footer />
        <ToastContainer />
        <Info />
      </body>
    </html>
  );
}

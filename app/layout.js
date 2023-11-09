"use client";
import React from "react";
import Footer from "../components/UserComponents/Footer";
import Header from "../components/UserComponents/Header";
import { CHProviders } from "./providers";
import { Providers } from "./GlobalRedux/provider";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const metadata = {
  title: "Training System",
  description: "Training System Web App",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <CHProviders>
            {pathname.includes("/admin") ? (
              <>{children}</>
            ) : (
              <>
                <Header />
                <div className="min-height">{children}</div>
                <Footer />
              </>
            )}
          </CHProviders>
        </Providers>
      </body>
    </html>
  );
}

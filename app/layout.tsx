import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YTS",
  description:
    "Building complete web applications through full-stack development, from frontend interfaces to backend APIs and infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body
        className={`${bricolage.variable} ${inter.variable} antialiased bg-black text-white font-inter`}
      >
        <MantineProvider defaultColorScheme="dark">
          <main className="min-h-screen">{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}

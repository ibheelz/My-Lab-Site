import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientScanner from "@/components/GradientScanner";
import ScanLines from "@/components/ScanLines";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-oxanium",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Abiola's Lab",
  description: "it support specialist based in lagos, nigeria.",
  icons: {
    icon: "/icon.png?v=5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oxanium.variable} ${sourceCodePro.variable}`}>
      <body style={{ fontFamily: "var(--font-oxanium)" }}>
        <ScanLines />
        <GradientScanner />
        <Header />
        <main style={{ paddingTop: "55px", paddingBottom: "55px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

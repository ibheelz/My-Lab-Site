import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientScanner from "@/components/GradientScanner";
import ScanLines from "@/components/ScanLines";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Abiola's Lab",
  description: "it support specialist based in lagos, nigeria.",
  icons: {
    icon: "data:,",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <body style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
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

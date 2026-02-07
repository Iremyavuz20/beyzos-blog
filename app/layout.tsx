import "./globals.css";
import {
  Inter,
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
  Allura,
  Alex_Brush,
  Satisfy,
} from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const great = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
const allura = Allura({ weight: "400", subsets: ["latin"], variable: "--font-allura", display: "swap" });
const signature = Alex_Brush({ weight: "400", subsets: ["latin"], variable: "--font-signature", display: "swap" });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"], variable: "--font-satisfy", display: "swap" });
const bodoni = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beyzosca Renkler | Beyza Yavuz",
    template: "%s | Beyzosca Renkler"
  },
  description: "Beyza Yavuz'un kişisel blogu, hayat, renkler ve düşünceler üzerine.",
  metadataBase: new URL("https://beyzoscarenkler.com.tr"),
  openGraph: {
    title: "Beyzosca Renkler",
    description: "Beyza Yavuz'un kişisel blogu.",
    url: "https://beyzoscarenkler.com.tr",
    siteName: "Beyzosca Renkler",
    locale: "tr_TR",
    type: "website",
  },
  icons: {
    icon: "/file.svg", // Using existing svg as placeholder favicon if specific one isn't provided
  },
  verification: {
    google: "KbuV9pd_tgHnr8HN3KyyDGY1NJ2pIzxi-CKdBqLi898",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} ${great.variable} ${bodoni.variable} ${allura.variable} ${signature.variable} ${satisfy.variable}`}
    >
      <head>

      </head>
      <body>
        {children}

      </body>
    </html>
  );
}

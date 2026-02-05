import "./globals.css";
import {
  Inter,
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
  Allura,
} from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const great = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
const allura = Allura({ weight: "400", subsets: ["latin"], variable: "--font-allura", display: "swap" });
const bodoni = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-bodoni",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} ${great.variable} ${bodoni.variable} ${allura.variable}`}
    >
      <head>

      </head>
      <body>
        {children}

      </body>
    </html>
  );
}

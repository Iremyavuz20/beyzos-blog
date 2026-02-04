import "./globals.css";
import {
  Inter,
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
} from "next/font/google";



const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const great = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script" });
const bodoni = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-bodoni",
});


import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} ${great.variable} ${bodoni.variable}`}
    >
      <head>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Script id="netlify-identity-status">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

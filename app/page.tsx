import Shell from "@/components/Shell";
import Link from "next/link";

export default function HomePage() {
  return (
    <Shell hideHeader minimalFooter>
      <section
        className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="relative inline-block mb-8 md:mb-16 mt-12">
            <h1
              className="text-[60px] md:text-[100px] leading-[0.7] tracking-normal text-black font-allura"
              style={{
                fontWeight: 400,
                textShadow: `
                  0 2px 4px rgba(255,255,255,0.35),
                  0 0 18px rgba(255,255,255,0.25)
                `,
              }}
            >
              beyzoscarenkler
            </h1>

            {/* Mobile Signature */}
            <div className="text-[11px] uppercase tracking-wide text-black/60 font-bodoni md:hidden mt-2 self-start w-full text-left">
              BY BEYZA YAVUZ
            </div>

            {/* Desktop Signature */}
            <div
              className="hidden md:block absolute text-[11px] uppercase tracking-wide text-black/60"
              style={{
                fontFamily: "var(--font-bodoni)",
                fontWeight: 400,
                letterSpacing: "0.25em",
                bottom: "-50px",
                right: "15px",     // Sol tarafa yanaştırıldı
                whiteSpace: "nowrap"
              }}
            >
              BY BEYZA YAVUZ
            </div>
          </div>
          <nav className="mt-12 flex items-center justify-center text-[12px] uppercase tracking-[0.4em] font-sans">
            <Link
              href="/about"
              className="hover:opacity-50 transition-opacity"
              style={{ color: "#000", padding: "0 2rem", textDecoration: "none" }}
            >
              HAKKIMDA
            </Link>
            <Link
              href="/blog"
              className="hover:opacity-50 transition-opacity"
              style={{ color: "#000", padding: "0 2rem", textDecoration: "none" }}
            >
              BLOG
            </Link>
          </nav>
        </div>
      </section>
    </Shell>
  );
}

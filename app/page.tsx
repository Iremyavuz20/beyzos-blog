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
          <h1
            className="text-[60px] md:text-[100px] leading-[0.8] tracking-normal text-black mt-12 mb-8 md:mb-16 font-allura"
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


          <div
            className="text-[10px] md:text-[11px] uppercase tracking-wide text-black/60 font-bodoni mb-8 md:absolute"
            style={{
              fontWeight: 250,
              letterSpacing: "0.25em",
              // Mobile: static position (handled by class), Desktop: absolute
              top: 'auto', // Reset for mobile if needed, but rely on media query in style or simple prop usage
            }}
          >
            <span className="md:hidden">BY BEYZA YAVUZ</span>
            <span className="hidden md:block absolute" style={{ top: "65%", left: "75%", whiteSpace: "nowrap", transform: "translate(0, 0)" }}>BY BEYZA YAVUZ</span>
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

import Shell from "@/components/Shell";
import Link from "next/link";

export default function HomePage() {
  return (
    <Shell hideHeader minimalFooter>
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Hero"
            className="h-full w-full object-cover object-center md:object-cover"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/15 z-1" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="relative inline-block mb-4 md:mb-8 mt-12">
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


            <p
              className="-mt-2 md:-mt-1 text-right text-[10px] md:text-[12px] uppercase tracking-[0.25em] text-black/60 font-bodoni font-semibold"
            >
              by Beyza Yavuz
            </p>
          </div>
          <nav className="mt-4 md:mt-6 flex items-center justify-center text-[12px] uppercase tracking-[0.4em] font-sans">
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

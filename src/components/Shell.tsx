import Link from "next/link";

export default function Shell({
  children,
  hideHeader = false,
  minimalFooter = false,
}: {
  children: React.ReactNode;
  hideHeader?: boolean;
  minimalFooter?: boolean;
}) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white w-full overflow-x-hidden">
      {!hideHeader && (
        <header className="w-full bg-white">
          {/* DESKTOP HEADER (Hidden on Mobile) */}
          <div
            className="hidden md:flex max-w-[1400px] mx-auto px-10 items-center justify-between"
            style={{ paddingTop: "80px", paddingBottom: "20px" }}
          >
            {/* Left: Brand */}
            <Link
              href="/"
              className="text-[35px] leading-none text-black no-underline hover:opacity-70 transition-opacity font-allura"
              style={{ fontWeight: 400 }}
            >
              @beyzoscarenkler
            </Link>

            {/* Right: Nav & Socials */}
            <div className="flex items-center gap-10">
              <nav className="text-[19px] tracking-[0.2em] no-underline hover:opacity-60 transition-opacity flex items-center gap-8">
                <Link href="/about" className="hover:text-black transition-colors font-bodoni text-black no-underline">HAKKIMDA</Link>
                <Link href="#" className="hover:text-black transition-colors font-bodoni text-black no-underline">GALERİ</Link>
              </nav>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/beyzoscarenkler/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity text-black"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a
                  href="https://www.youtube.com/@beyzoscarenkler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity text-black"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2c.4-1.69.4-5.58.4-5.58s0-3.89-.4-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>

          {/* MOBILE HEADER (Hidden on Desktop) */}
          <div
            className="flex md:hidden w-full px-6 items-center justify-between"
            style={{ paddingTop: "45px", paddingBottom: "20px" }}
          >
            <Link
              href="/"
              className="text-[24px] leading-none text-black no-underline hover:opacity-70 transition-opacity font-allura"
              style={{ fontWeight: 400 }}
            >
              @beyzoscarenkler
            </Link>

            <nav className="flex items-center gap-4 text-[12px] tracking-[0.2em] no-underline hover:opacity-60 transition-opacity font-bodoni">
              <Link href="/about" className="hover:text-black transition-colors text-black no-underline">HAKKIMDA</Link>
              <Link href="#" className="hover:text-black transition-colors text-black no-underline">GALERİ</Link>
            </nav>
          </div>
        </header>
      )}

      <main className="w-full">{children}</main>

      <footer
        className={`${minimalFooter ? 'w-full' : 'max-w-[1400px] mx-auto'} px-6 md:px-10 ${minimalFooter ? 'py-10' : 'py-16 md:py-20'}`}
        style={{ marginTop: '50px' }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-black/40 leading-relaxed">
            © {new Date().getFullYear()} Beyzoscarenkler • Developed by Irem Yavuz •  All rıghts reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

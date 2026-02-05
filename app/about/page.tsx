import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fff] flex flex-col font-sans text-black">
            {/* Top WordPress-style Bar */}
            <div className="w-full bg-[#f0f0f0] h-[1px]"></div>
            <div className="w-full bg-[#f0f0f0] h-[46px] flex items-center justify-center">
                <div className="flex items-center">
                    <span className="font-sans text-[13px] text-[#2c3338] font-normal tracking-tight">"En uzun yol insanın kendine olan yolculuğudur."</span>
                </div>
            </div>

            {/* Header Bar */}
            <header className="max-w-[1300px] w-full mx-auto px-10 pt-[40px] pb-10 flex items-center justify-between">
                <Link
                    href="/"
                    className="relative top-5 left-5 text-[35px] md:text-[35px] leading-none text-black no-underline hover:opacity-70 transition-opacity font-allura"
                    style={{ fontWeight: 400, color: "black" }}
                >
                    @beyzoscarenkler
                </Link>


                <div className="flex items-center" style={{ gap: "40px" }}>
                    <Link
                        href="/about"
                        className="text-[17px] md:text-[19px] tracking-[0.2em] no-underline hover:opacity-60 transition-opacity font-bodoni"
                        style={{ fontWeight: 300, color: "black" }}
                    >
                        HAKKIMDA
                    </Link>
                    <div className="flex items-center" style={{ gap: "15px" }}>

                        {/* Instagram - Outline */}
                        <a
                            href="https://www.instagram.com/beyzoscarenkler/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-60 transition-opacity"
                            style={{ color: "black" }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        {/* YouTube icon */}
                        <a
                            href="https://www.youtube.com/@beyzoscarenkler"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-60 transition-opacity"
                            style={{ color: "black" }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2c.4-1.69.4-5.58.4-5.58s0-3.89-.4-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start px-8 md:px-32 pt-10 pb-20 text-center max-w-2xl mx-auto">
                <h1
                    className="text-[100px] md:text-[160px] mb-12 text-black tracking-normal leading-none font-allura"
                    style={{ fontWeight: 400 }}
                >
                    Hikayem
                </h1>

                <div className="serif text-[18px] md:text-[20px] leading-[1.8] text-black/90 max-w-lg space-y-10">
                    <div className="space-y-6">
                        <p>
                            Bazı yolculuklar dışarıya değil, içeriye yapılır.
                            Burası, kelimelerle yürüdüğüm bir yol. Yazmak benim için bir varış noktası değil, bir yolculuk.
                        </p>

                        <div className="mx-auto max-w-[1000px] px-6 md:px-1 space-y-30 text-center">
                            <p>
                                Çünkü biliyorum ki nereye gittiğini bilmeyene hiçbir rüzgâr yardım etmez.
                                Hayatın gürültüsünden çok, içimdeki sesi dinlemeyi seçiyorum. Kalabalık cümlelerden ziyade, sade olanı seviyorum. Bazen bir düşünce, bazen bir his, bazen sadece bir durup bakma hâli… Burada paylaştıklarım; gördüklerimden çok, içimde olanlar.
                            </p>
                            <p>
                                Bu sayfa, kendime doğru yürüdüğüm yolun izleri. Çünkü inanıyorum ki en uzun yol, insanın kendine olan yolculuğudur. Bu yolculuk sadece duygusal değil; aynı zamanda üreterek, öğrenerek ve çalışarak ilerleyen bir yol.
                            </p>
                            <p>
                                Eğitim hayatım boyunca iletişim, dijital üretim ve anlatı dili üzerine çalıştım. Bir yandan akademik olarak kendimi beslerken, bir yandan da ajans deneyimleriyle kelimelerin, görsellerin ve fikirlerin gerçek hayatta nasıl karşılık bulduğunu deneyimledim.
                            </p>
                            <p>
                                Bugün burada yazdıklarım; okulda öğrendiklerimle, ajans hayatında deneyimlediklerimle ve hayatın bana öğrettikleriyle yoğrulmuş satırlar.
                            </p>
                            <p>
                                Bu sayfa, sadece hislerimin değil; emekle büyüyen bir bakışın da izi.
                            </p>
                            <p>
                                Eğer sen de yavaşlamaya, düşünmeye ve kendi yolunu hatırlamaya bir an olsun ihtiyaç duyuyorsan, belki bu satırlar sana da eşlik eder.
                            </p>
                            <p>
                                Hoş geldin. Bu yol biraz da senin.
                            </p>
                        </div>
                    </div>

                    <div className="pt-12 pb-4">
                        <h2 className="text-[24px] uppercase tracking-[0.3em] font-medium text-black mb-8 font-bodoni">
                            Benim Yolculuğum
                        </h2>
                    </div>

                    <div className="mx-auto max-w-[1000px] px-6 md:px-1 space-y-30 text-center">
                        <p>
                            Bu yol, önce babamın üretim sanayisinde seramikle toprakla başladı. Sonra bir okulda, sonra bir bilgisayarda, sonra bir atölyede…
                        </p>
                        <p>
                            Güzel Sanatlar Lisesi’nde Grafik Tasarım ile başlayan eğitim yolculuğum akabinde üniversitede de Güzel Sanatlar Fakültesi Grafik Tasarım bölümünden mezun olmamla devam etti. Ardından 2. üniversitede yine lisans Halkla İlişkiler ve Reklamcılık okudum. Şu anda yüksek lisans eğitimime de devam ediyorum.
                        </p>
                        <p>
                            2017 yılında ilk şirketim Beyza Yavuz Tasarım ajansımı kurdum. Kurumsal firmalara tasarım ve iletişim hizmetleri verdim, dijital dünyada var olma yolculuklarında eşlik ettim.
                        </p>
                        <p>
                            2020 yılında ise ikinci yolculuğum başladı. Baba mesleğini, köklerimi ve el emeğini geleceğe taşımak için 2. şirketim Aliento Atelier’i kurdum. Bu yolculuk aynı zamanda kadın istihdamını destekleyen bir üretim alanına dönüştü.
                        </p>
                        <p>
                            2022’de Patara’ya yerleştim. Ajans işlerimi uzaktan yürütürken, Aliento Atelier’ın ilk fiziksel mağazasını burada açtım. Zamanla bu mekân sadece bir dükkân değil, bir deneyim alanına dönüştü. Kendi kahve çekirdeklerimi yurt dışından getirip kavurarak, kendi markamın adıyla satışa sundum. Misafirlerime kendi seramiklerimde, kendi kahvemle, ruhlarına işleyen kendi üretimim oda kokumla bir masa kurdum. Sonra atölyemi büyüttüm. Workshop alanı ekledim. İnsanların sadece alışveriş yaptığı değil, üreterek vakit geçirdiği bir yer olsun istedim.
                        </p>
                        <p>
                            Bugün yaptığım şey; tasarımı, üretimi, kahveyi ve hikâyeyi aynı masada buluşturmak.
                        </p>
                        <p>
                            Bu benim yolum. Ve hâlâ yürüyorum.
                        </p>
                        <p className="italic pt-8 opacity-60">
                            Bu sayfa, yürüdüğüm yolun sessiz bir tanığı; burada gördüklerin, yolun bir parçası.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="pt-[40px] pb-[30px] flex justify-center">
                <Link
                    href="/"
                    className="text-6xl md:text-5xl text-black no-underline hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "var(--font-allura)", color: "black" }}
                >
                    beyzoscarenkler
                </Link>
            </footer>
        </div>
    );
}

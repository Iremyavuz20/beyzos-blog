import Shell from "@/components/Shell";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Shell>
      <div className="w-full py-24 space-y-32 pb-40">
        {posts.map((post) => (
          <section key={post.slug} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mt-16 md:mt-24">
            {/* Left: Image */}
            <Link href={`/blog/${post.slug}`} className="w-full md:w-1/2 max-w-[50%] md:order-1 group" style={{ marginTop: "48px" }}>
              {post.cover ? (
                <div className="aspect-[3/2] w-full overflow-hidden cursor-pointer relative">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="aspect-[3/2] w-full bg-gray-100 flex items-center justify-center text-gray-400 font-sans cursor-pointer">
                  Görsel Yok
                </div>
              )}
            </Link>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center md:pl-8 md:order-2 mt-0 md:-mt-[170px]">
              <Link href={`/blog/${post.slug}`} className="hover:opacity-70 transition-opacity" style={{ textDecoration: "none" }}>
                <h2
                  className="text-[36px] md:text-[48px] leading-tight text-[#1a1a1a] mb-4 font-allura ml-0 md:ml-[850px]"
                  style={{ fontWeight: 400 }}
                >
                  {post.title.toLowerCase()}
                </h2>
              </Link>

              <Link
                href={`/blog/${post.slug}`}
                className="text-[11px] uppercase tracking-[0.3em] text-black font-medium hover:opacity-50 transition-opacity ml-0 md:ml-[850px]"
                style={{ fontFamily: "var(--font-sans)", color: "#000", marginBottom: "72px" }}
              >
                DEVAMINI OKU
              </Link>
            </div>
          </section>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-sans tracking-widest">
            HİÇ YAZI BULUNAMADI.
          </div>
        )}
      </div>
    </Shell>
  );
}

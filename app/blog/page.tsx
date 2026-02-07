import Shell from "@/components/Shell";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Shell>
      <div className="w-full pt-12 pb-24 space-y-32">
        {posts.map((post) => (
          <section key={post.slug} className="flex flex-col md:flex-row items-start w-full">
            {/* Left: Image - Touching the edge */}
            <Link href={`/blog/${post.slug}`} className="w-full md:w-[50%] group">
              {post.cover ? (
                <div className="aspect-[3/2] w-full overflow-hidden cursor-pointer relative shadow-sm">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ) : (
                <div className="aspect-[3/2] w-full bg-gray-50 flex items-center justify-center text-gray-400 font-sans cursor-pointer">
                  Görsel Yok
                </div>
              )}
            </Link>

            {/* Right: Content */}
            <div className="w-full md:w-[50%] flex flex-col items-center md:items-start px-8 md:pl-24 md:pr-12 mt-12 md:mt-[320px]">
              <Link href={`/blog/${post.slug}`} className="hover:opacity-70 transition-opacity text-center md:text-left" style={{ textDecoration: "none" }}>
                <h2
                  className="text-[40px] md:text-[52px] leading-tight text-[#1a1a1a] mb-6 font-allura md:whitespace-nowrap"
                  style={{ fontWeight: 400 }}
                >
                  {post.title.toLowerCase()}
                </h2>
              </Link>

              <Link
                href={`/blog/${post.slug}`}
                className="text-[12px] uppercase tracking-[0.4em] text-black font-medium hover:opacity-50 transition-opacity border-b border-black/10 pb-1"
                style={{ fontFamily: "var(--font-sans)" }}
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

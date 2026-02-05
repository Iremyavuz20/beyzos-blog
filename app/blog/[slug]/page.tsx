import Shell from "@/components/Shell";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const { meta, content } = post;

  return (
    <Shell>
      <article className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        {/* Blog Title at the Top */}
        <h1
          className="text-[40px] md:text-[60px] lg:text-[80px] leading-tight text-black mb-8 md:mb-12 text-center md:text-left font-allura"
          style={{ fontWeight: 400 }}
        >
          {meta.title.toLowerCase()}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch mb-12 md:mb-20">
          {/* Left: Cover Image */}
          <div className="w-full md:flex-1 overflow-hidden flex justify-center">
            {meta.cover ? (
              <img
                src={meta.cover}
                alt={meta.title}
                className="object-cover rounded-lg shadow-lg w-full h-[300px] md:h-[400px]"
              />
            ) : (
              <div className="w-full h-[300px] md:h-[400px] bg-gray-100 rounded-lg" />
            )}
          </div>

          {/* Right: Header Info */}
          <header className="w-full md:flex-1 flex flex-col justify-between items-start text-left py-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-4">
                {new Date(meta.date).toLocaleDateString("tr-TR", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <p className="text-[16px] md:text-[18px] text-black/60 italic leading-relaxed">
              {meta.excerpt}
            </p>
          </header>
        </div>

        {/* Content */}
        <div
          className="prose prose-neutral max-w-2xl mx-auto prose-p:text-black/80 prose-p:leading-[1.8] prose-p:text-[18px] prose-headings:font-normal prose-headings:font-serif font-sans"
        >
          <MDXRemote source={content} />
        </div>


      </article>
    </Shell>
  );
}

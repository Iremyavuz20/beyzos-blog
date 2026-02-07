import Shell from "@/components/Shell";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    };
  }

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      images: post.meta.cover ? [post.meta.cover] : [],
    },
  };
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
      <article className="max-w-[1000px] mx-auto px-6 py-12 md:py-24 flex flex-col items-center">
        {/* Blog Title at the Top */}
        <header className="w-full text-center mb-6 md:mb-10">
          <h1
            className="text-[40px] md:text-[72px] leading-tight text-black font-allura"
            style={{ fontWeight: 400 }}
          >
            {meta.title.toLowerCase()}
          </h1>
        </header>

        {/* Large Image Below Title - Widened and Shortened */}
        <div className="w-full max-w-[1240px] mb-4 overflow-hidden rounded-sm shadow-sm">
          {meta.cover ? (
            <img
              src={meta.cover}
              alt={meta.title}
              className="w-full h-auto object-cover md:max-h-[500px] object-center"
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-50 flex items-center justify-center text-gray-300">
              Görsel Yok
            </div>
          )}
        </div>

        {/* Date Below Image */}
        <div className="w-full text-center mb-10 md:mb-16">
          <p className="text-[12px] uppercase tracking-[0.4em] text-black/40 font-medium">
            {new Date(meta.date).toLocaleDateString("tr-TR", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose prose-neutral w-full max-w-2xl px-6 mx-auto prose-p:text-black/80 prose-p:leading-[1.8] prose-p:text-[18px] prose-headings:font-normal prose-headings:font-serif font-sans whitespace-pre-line"
        >
          <MDXRemote source={content} />
        </div>


      </article>
    </Shell>
  );
}

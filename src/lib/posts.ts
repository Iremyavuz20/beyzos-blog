import { supabase } from "./supabase";

// Veritabanından gelen tip
export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string; // created_at alias or date field
  excerpt: string | null;
  cover: string | null; // cover_image alias
  content: string;
  created_at: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
};

// Next.js Server Componentlerinde kullanacağız, async olmalı
export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, created_at, excerpt, cover_image, published")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.created_at, // created_at'i date olarak kullanıyoruz
    excerpt: post.excerpt || "",
    cover: post.cover_image || undefined,
  }));
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; content: string } | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    meta: {
      slug: data.slug,
      title: data.title,
      date: data.created_at,
      excerpt: data.excerpt || "",
      cover: data.cover_image || undefined,
    },
    content: data.content,
  };
}

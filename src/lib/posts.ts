import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { supabase } from "@/lib/supabase";

export type PostMeta = {
  id: string; // File tabanlılar için slug=id olabilir
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
};

// Hem Dosya Sisteminden Hem Supabase'den Okur
export async function getAllPosts(): Promise<PostMeta[]> {
  const posts: PostMeta[] = [];

  // 1. Dosya Sisteminden Oku (CMS Yazıları)
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");

    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory);

      const filePosts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
          const slug = fileName.replace(/\.mdx$/, "");
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data } = matter(fileContents);

          return {
            id: `file-${slug}`, // Çakışmayı önlemek için prefix
            slug: slug,
            title: data.title || slug,
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            excerpt: data.excerpt || "",
            cover: data.cover || undefined,
          };
        });

      posts.push(...filePosts);
    }
  } catch (err) {
    console.error("File read error:", err);
  }

  // 2. Supabase'den Oku (Eski/DB Yazıları)
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, slug, title, created_at, excerpt, cover_image, published")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const dbPosts = data.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        date: post.created_at,
        excerpt: post.excerpt || "",
        cover: post.cover_image || undefined,
      }));

      // Slug çakışması varsa dosya sistemini (yeni olanı) tercih et veya ikisini de göster?
      // Şimdilik ekliyoruz.
      posts.push(...dbPosts);
    }
  } catch (err) {
    console.error("Supabase read error:", err);
  }

  // Tarihe göre yeniden sırala
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Silme Fonksiyonu (Sadece Supabase için çalışır, dosyalar elle silinmeli veya CMS'den)
export async function deletePost(id: string) {
  // Eğer id 'file-' ile başlıyorsa, bu bir dosyadır. Dosya silme yetkisi vermiyoruz admin/delete sayfasından.
  if (id.startsWith('file-')) {
    throw new Error("Dosya tabanlı yazılar buradan silinemez. Lütfen normal yönetim panelini kullanın.");
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; content: string } | null> {
  // 1. Önce Dosyaya Bak
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        meta: {
          id: `file-${slug}`,
          slug: slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          cover: data.cover,
        },
        content: content,
      };
    }
  } catch (e) { }

  // 2. Yoksa Supabase'e Bak
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
      id: data.id,
      slug: data.slug,
      title: data.title,
      date: data.created_at,
      excerpt: data.excerpt || "",
      cover: data.cover_image || undefined,
    },
    content: data.content,
  };
}

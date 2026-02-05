"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        date: new Date().toISOString().split('T')[0],
        imageUrl: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSlugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const getDashboardUrl = () => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
        const projectId = url.split('//')[1]?.split('.')[0];
        if (projectId) {
            return `https://supabase.com/dashboard/project/${projectId}/storage/buckets`;
        }
        return "https://supabase.com/dashboard";
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            alert("Başlık ve içerik zorunludur.");
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = formData.imageUrl;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                // 'blog-images' bucket'ına yüklüyoruz (izinleri ayarlı olduğu için)
                const { error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    const dashboardLink = getDashboardUrl();
                    if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("row-level security")) {
                        alert("HATA: 'blog-images' klasörüne erişilemedi. Lütfen Supabase'de bu klasörün 'Public' olduğundan ve 'Policies' kısmından yükleme izni verildiğinden emin olun.");
                        window.open(dashboardLink, '_blank');
                        throw new Error("Resim yüklenemedi.");
                    }
                    throw new Error("Resim yükleme hatası: " + uploadError.message);
                }

                const { data: publicUrlData } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrlData.publicUrl;
            }

            const slug = handleSlugify(formData.title);

            const { error: insertError } = await supabase
                .from('posts')
                .insert([
                    {
                        title: formData.title,
                        slug: slug,
                        excerpt: formData.excerpt,
                        content: formData.content,
                        cover_image: finalImageUrl,
                        created_at: new Date(formData.date).toISOString(),
                        published: true,
                    }
                ]);

            if (insertError) throw insertError;

            alert("Yazı başarıyla paylaşıldı!");
            router.push("/admin");

        } catch (error: any) {
            console.error("Error:", error);
            alert("Hata: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Yeni Yazı Ekle</h1>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        İptal
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Başlık</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Yayın Tarihi</label>
                        <input
                            type="date"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Özet (Giriş Yazısı)</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full p-2 border rounded"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <label className="block text-sm font-bold mb-2">Resim Yükle</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">İçerik</label>
                        <textarea
                            required
                            rows={15}
                            className="w-full p-2 border rounded font-mono text-sm"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Paylaşılıyor..." : "Yazıyı Paylaş"}
                    </button>
                </form>
            </div>
        </div>
    );
}

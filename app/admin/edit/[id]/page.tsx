"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        date: "",
        imageUrl: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title,
                    excerpt: data.excerpt || "",
                    content: data.content || "",
                    date: data.created_at ? new Date(data.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    imageUrl: data.cover_image || "",
                });
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            alert("Yazı yüklenirken hata oluştu.");
            router.push("/admin");
        } finally {
            setFetching(false);
        }
    };

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

                const { error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw new Error("Resim yükleme hatası: " + uploadError.message);

                const { data: publicUrlData } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrlData.publicUrl;
            }

            const slug = handleSlugify(formData.title);

            const { error: updateError } = await supabase
                .from('posts')
                .update({
                    title: formData.title,
                    slug: slug,
                    excerpt: formData.excerpt,
                    content: formData.content,
                    cover_image: finalImageUrl,
                    created_at: new Date(formData.date).toISOString(),
                })
                .eq('id', id);

            if (updateError) throw updateError;

            alert("Yazı başarıyla güncellendi!");
            router.push("/admin");

        } catch (error: any) {
            console.error("Error:", error);
            alert("Hata: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Yazıyı Düzenle</h1>
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
                        <label className="block text-sm font-bold mb-2">Resim Değiştir (İsteğe Bağlı)</label>
                        {formData.imageUrl && (
                            <div className="mb-2">
                                <p className="text-xs text-gray-500 mb-1">Mevcut Resim:</p>
                                <img src={formData.imageUrl} alt="Current" className="h-20 w-32 object-cover rounded" />
                            </div>
                        )}
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
                        {loading ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </form>
            </div>
        </div>
    );
}

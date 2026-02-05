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
        date: new Date().toISOString().split('T')[0], // Bugünün tarihi varsayılan
        imageUrl: "", // Manuel URL desteği
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            alert("Başlık ve içerik zorunludur.");
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = formData.imageUrl;

            // 1. Resim Yükleme (Dosya seçildiyse öncelikli)
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                // 'images' bucket'ına yüklüyoruz.
                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    // Bucket hatası ise kullanıcıyı uyar ama devam et (belki URL girmiştir)
                    if (!finalImageUrl) {
                        throw new Error("Resim yüklenemedi (Bucket yok). Lütfen alttaki 'Resim Linki' kutusuna bir link yapıştırın.");
                    }
                } else {
                    const { data: publicUrlData } = supabase.storage
                        .from('images')
                        .getPublicUrl(filePath);
                    finalImageUrl = publicUrlData.publicUrl;
                }
            }

            // 2. Veritabanına Kayıt
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

                    <div className="grid grid-cols-2 gap-4">
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
                        <label className="block text-sm font-bold mb-2">Kapak Resmi</label>

                        <div className="mb-4">
                            <p className="text-xs mb-1">Seçenek 1: Dosya Yükle (Sadece Bucket Varsa Çalışır)</p>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full text-sm"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            />
                        </div>

                        <div className="border-t border-gray-300 my-3"></div>

                        <div>
                            <p className="text-xs mb-1">Seçenek 2: Veya Resim Linki Yapıştır (Önerilen)</p>
                            <input
                                type="url"
                                placeholder="https://..."
                                className="w-full p-2 border rounded text-sm bg-white"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">İçerik</label>
                        <textarea
                            required
                            rows={15}
                            className="w-full p-2 border rounded font-mono text-sm"
                            placeholder="# Başlık&#10;Metin buraya..."
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

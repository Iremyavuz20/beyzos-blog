"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Shell from "@/components/Shell";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        date: new Date().toISOString().split('T')[0],
    });
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Basit bir şifre koruması (Gelişmiş güvenlik için Supabase Auth kullanılabilir)
        if (password === "beyza123") { // Şifreyi buraya koydum
            setIsAuthenticated(true);
        } else {
            alert("Hatalı şifre!");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            let coverUrl = null;

            // 1. Resmi Yükle (Eğer varsa)
            if (coverFile) {
                const fileExt = coverFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("blog-images")
                    .upload(filePath, coverFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("blog-images")
                    .getPublicUrl(filePath);

                coverUrl = publicUrl;
            }

            // 2. Yazıyı Veritabanına Ekle
            const { error: insertError } = await supabase
                .from("posts")
                .insert([
                    {
                        title: formData.title,
                        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
                        excerpt: formData.excerpt,
                        content: formData.content, // Markdown içeriği string olarak saklanır
                        created_at: new Date(formData.date).toISOString(),
                        cover_image: coverUrl,
                        published: true,
                    },
                ]);

            if (insertError) throw insertError;

            setMessage("✅ Yazı başarıyla yayınlandı!");
            setFormData({ title: "", slug: "", excerpt: "", content: "", date: new Date().toISOString().split('T')[0] });
            setCoverFile(null);
        } catch (error: any) {
            console.error(error);
            setMessage(`❌ Hata: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
                    <h2 className="text-xl mb-4 font-bold">Yönetici Girişi</h2>
                    <input
                        type="password"
                        placeholder="Şifre"
                        className="w-full border p-2 mb-4 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
                        Giriş Yap
                    </button>
                </form>
            </div>
        );
    }

    return (
        <Shell>
            <div className="max-w-2xl mx-auto py-20 px-6">
                <h1 className="text-3xl font-bold mb-8">Yeni Yazı Ekle</h1>

                {message && <div className="mb-6 p-4 bg-gray-100 rounded text-center font-medium">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Başlık</label>
                        <input
                            type="text"
                            required
                            className="w-full border p-3 rounded"
                            value={formData.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
                                setFormData({ ...formData, title, slug })
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Slug (URL)</label>
                        <input
                            type="text"
                            required
                            className="w-full border p-3 rounded bg-gray-50"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Tarih</label>
                        <input
                            type="date"
                            required
                            className="w-full border p-3 rounded"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Kapak Resmi</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border p-3 rounded"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Özet (Ana sayfada görünür)</label>
                        <textarea
                            className="w-full border p-3 rounded h-24"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">İçerik (Markdown)</label>
                        <textarea
                            required
                            className="w-full border p-3 rounded h-96 font-mono text-sm"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="# Başlık&#10;&#10;Paragraf..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Markdown formatı desteklenir. Resim eklemek için önce başka yere yükleyip linkini buraya yapıştırın veya HTML img etiketi kullanın.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Yayınlanıyor..." : "Yazıyı Yayınla"}
                    </button>
                </form>
            </div>
        </Shell>
    );
}

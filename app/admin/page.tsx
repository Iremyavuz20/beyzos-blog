"use client";

import { useState, useEffect } from "react";
import { deletePost } from "@/lib/posts";
import { supabase } from "@/lib/supabase";

type Post = {
    id: string;
    title: string;
    created_at: string;
};

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "beyza123") {
            setIsAuthenticated(true);
            fetchPosts();
        } else {
            alert("Hatalı şifre!");
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("posts")
            .select("id, title, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error:", error);
            alert("Yazılar getirilemedi.");
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu yazıyı silmek istediğine emin misin?")) return;

        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPosts(posts.filter((p) => p.id !== id));
            alert("Yazı silindi.");
        } catch (err) {
            console.error(err);
            alert("Silinirken hata oluştu. Yetkiniz olmayabilir.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center">Yönetici Girişi</h1>
                    <input
                        type="password"
                        placeholder="Şifre"
                        className="w-full p-2 border rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-serif">Panel: Yazı Yönetimi</h1>
                    <div className="flex gap-4 items-center">
                        <a href="/admin/new" className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition">
                            + Yeni Yazı Ekle
                        </a>
                        <a href="/" className="text-sm underline hover:text-gray-600">Siteye Dön</a>
                    </div>
                </div>

                {loading ? (
                    <p>Yükleniyor...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-4 font-semibold">Başlık</th>
                                    <th className="p-4 font-semibold">Tarih</th>
                                    <th className="p-4 font-semibold text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{post.title}</td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(post.created_at).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition"
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-gray-400">
                                            Hiç yazı bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

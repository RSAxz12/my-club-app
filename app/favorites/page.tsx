"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export const dynamic = 'force-dynamic';

interface FavoriteItem {
  id: string;
  item_id: string;
  item_name: string;
  item_type: string;
  specialty?: string;
  price?: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب المفضلة الخاصة بالمستخدم المسجل حالياً
  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const supabase = createClient(); // تم نقله إلى داخل الدالة لتجنب أخطاء البناء
        
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("خطأ في جلب المفضلة:", error.message);
        } else if (data) {
          setFavorites(data);
        }
      } catch (err) {
        console.error("خطأ غير متوقع:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  // دالة إزالة عنصر من المفضلة
  const handleRemoveFavorite = async (id: string) => {
    const supabase = createClient(); // تم نقله هنا أيضاً
    const { error } = await supabase.from("favorites").delete().eq("id", id);
    if (!error) {
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("حدث خطأ أثناء الإزالة من المفضلة.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-[#F4EFE2] mb-2">قائمة المفضلة</h1>
          <p className="text-xs md:text-sm text-[#C9C4B4]">النوادي والمدربون المحفوظون في حسابك الشخصي</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#C9C4B4]">جاري تحميل مفضلتك...</div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-[#0F2A1E] text-[#D6AD55] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#2A5642]">
                      {item.item_type === "coach" ? "مدرب" : "نادي"}
                    </span>
                    <button
                      onClick={() => handleRemoveFavorite(item.id)}
                      className="text-red-400 hover:text-red-300 text-xs font-bold transition cursor-pointer"
                    >
                      إزالة ✕
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-[#F4EFE2] mb-1">{item.item_name}</h3>
                  <p className="text-xs text-[#D6AD55] font-semibold mb-2">{item.specialty || "بدون توضيح"}</p>
                </div>

                <div className="pt-3 border-t border-[#2A5642]/60 flex justify-between items-center">
                  <span className="text-xs text-[#D6AD55] font-bold">{item.price || "حسب السعر"}</span>
                  <Link
                    href={item.item_type === "coach" ? "/coaches" : `/clubs/${item.item_id}`}
                    className="bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-4 py-2 rounded-xl text-xs transition"
                  >
                    التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-10 text-center text-[#C9C4B4] max-w-md mx-auto">
            لا توجد عناصر محفوظة في مفضلتك حالياً. يمكنك إضافة أي نادٍ أو مدرب للمفضلة لتظهر هنا!
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/profile"
            className="inline-block text-xs text-[#D6AD55] bg-[#16382A] px-5 py-2.5 rounded-xl border border-[#2A5642] hover:border-[#D6AD55] transition"
          >
            ← العودة للملف الشخصي
          </Link>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export const dynamic = 'force-dynamic';


interface Club {
  id: string;
  name: string;
  category?: string;
  location?: string;
  address?: string;
  image_url?: string;
  price?: string | number;
  rating?: number;
  description?: string;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("clubs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("خطأ في جلب النوادي:", error.message);
        } else if (data) {
          setClubs(data);
        }
      } catch (err) {
        console.error("حدث خطأ غير متوقع:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  const defaultImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#F4EFE2] mb-4">أندية خميس مشيط</h1>
          <p className="text-[#C9C4B4] text-sm md:text-base max-w-2xl mx-auto">
            استكشف أفضل المراكز الرياضية والأندية في خميس مشيط واختاري منها ما يناسب أهدافك واللياقة البدنية.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-[#D6AD55] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#C9C4B4] text-sm">جاري تحميل قائمة النوادي...</p>
          </div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-16 bg-[#16382A] rounded-2xl border border-[#2A5642]">
            <p className="text-[#C9C4B4]">لا توجد نوادي مضافة حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="bg-[#16382A] border border-[#2A5642] rounded-2xl overflow-hidden shadow-lg hover:border-[#D6AD55]/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={club.image_url || defaultImage}
                      alt={club.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    {club.category && (
                      <span className="absolute top-3 right-3 bg-[#0F2A1E]/80 backdrop-blur-md text-[#D6AD55] text-xs font-bold px-3 py-1 rounded-full border border-[#D6AD55]/30">
                        {club.category}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#F4EFE2] line-clamp-1">{club.name}</h3>
                      <span className="text-[#D6AD55] text-sm font-bold flex items-center gap-1">
                        ★ {club.rating || 4.8}
                      </span>
                    </div>

                    <p className="text-xs text-[#C9C4B4] mb-3 flex items-center gap-1">
                      📍 {club.address || club.location || "خميس مشيط"}
                    </p>

                    <p className="text-xs text-[#C9C4B4]/80 line-clamp-2 leading-relaxed mb-4">
                      {club.description || "مركز رياضي مجهز بأحدث المعدات والأجهزة الرياضية."}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#2A5642]/40 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#C9C4B4] block">الاشتراك</span>
                    <span className="text-sm font-bold text-[#D6AD55]">{club.price || "350 ريال / شهرياً"}</span>
                  </div>

                  <Link
                    href={`/clubs/${club.id}`}
                    className="bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
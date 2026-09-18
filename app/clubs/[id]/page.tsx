"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Club {
  id: string;
  name: string;
  category?: string;
  location?: string;
  address?: string;
  google_maps_url?: string;
  image_url?: string;
  price?: string | number;
  rating?: number;
  description?: string;
  working_hours?: string;
  phone?: string;
}

export default function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubDetail() {
      if (!resolvedParams?.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("clubs")
          .select("*")
          .eq("id", resolvedParams.id)
          .maybeSingle();

        if (error) {
          console.error("خطأ في جلب تفاصيل النادي:", error.message);
        } else if (data) {
          setClub(data);
        }
      } catch (err) {
        console.error("حدث خطأ غير متوقع:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClubDetail();
  }, [resolvedParams?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-[#D6AD55] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#C9C4B4] text-sm">جاري تحميل تفاصيل النادي...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#F4EFE2]">لم يتم العثور على النادي</h2>
          <p className="text-[#C9C4B4] mb-6">النادي المطلوب غير موجود أو تم إزالته.</p>
          <Link
            href="/clubs"
            className="bg-[#D6AD55] text-[#0F2A1E] px-6 py-2.5 rounded-xl font-bold hover:bg-[#c29b47] transition text-sm inline-block"
          >
            العودة لقائمة النوادي
          </Link>
        </div>
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop";
  const clubLocation = club.address || club.location || "خميس مشيط";
  const mapsLink = club.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(club.name + " " + clubLocation)}`;

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 text-xs text-[#C9C4B4] hover:text-[#D6AD55] mb-6 transition"
        >
          ← العودة للنوادي
        </Link>

        {/* صورة وبنر النادي */}
        <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden border border-[#2A5642] mb-8 shadow-2xl">
          <img
            src={club.image_url || defaultImage}
            alt={club.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A1E] via-[#0F2A1E]/40 to-transparent flex items-end p-6 md:p-10">
            <div>
              <span className="bg-[#D6AD55] text-[#0F2A1E] text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">
                {club.category || "مركز رياضي متكامل"}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#F4EFE2] mb-2">{club.name}</h1>
              <p className="text-sm text-[#C9C4B4] flex items-center gap-1">
                 {clubLocation}
              </p>
            </div>
          </div>
        </div>

        {/* تفاصيل ومعلومات النادي */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#16382A] border border-[#2A5642] p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-[#D6AD55] mb-4">عن النادي</h2>
              <p className="text-sm text-[#C9C4B4] leading-relaxed">
                {club.description || "مركز رياضي متكامل مجهز بأحدث المعدات والأجهزة الرياضية مع صالات مخصصة لتمارين المقاومة واللياقة الشاملة."}
              </p>
            </div>

            <div className="bg-[#16382A] border border-[#2A5642] p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-[#D6AD55] mb-4">ساعات العمل والخدمات</h2>
              <div className="space-y-3 text-sm text-[#C9C4B4]">
                <div className="flex justify-between border-b border-[#2A5642]/50 pb-2">
                  <span>أوقات العمل:</span>
                  <span className="text-[#F4EFE2] font-semibold">{club.working_hours || "يومياً من 6:00 صباحاً - 12:00 منتصف الليل"}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A5642]/50 pb-2">
                  <span>التقييم العام:</span>
                  <span className="text-[#D6AD55] font-bold">★ {club.rating || 4.8}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#16382A] border border-[#2A5642] p-6 rounded-2xl shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#C9C4B4]">سعر الاشتراك يبدأ من</span>
                <div className="text-2xl font-black text-[#D6AD55] my-2">
                  {club.price || "350 ريال / شهرياً"}
                </div>
                <p className="text-xs text-[#C9C4B4]/80 mb-6">شامل الاستخدام الكامل للمرافق والخدمات.</p>
              </div>

              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
              >
                الموقع على خريطة Google
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
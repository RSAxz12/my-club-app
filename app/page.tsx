"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Club {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  image_url: string;
}

interface Coach {
  id: string;
  name: string;
  specialty: string;
  gender: string;
  rating: number;
  image_url: string;
}

// دالة لتحديد صورة مميزة لكل نادي في حال لم تكن مسجلة في القاعدة
const getClubImage = (name: string, originalUrl: string) => {
  if (originalUrl && originalUrl.trim() !== "") return originalUrl;
  
  const lowName = name.toLowerCase();
  if (lowName.includes("وقت اللياقة") || lowName.includes("fitness time")) {
    return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop";
  } else if (lowName.includes("بودي ماسترز") || lowName.includes("body masters")) {
    return "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop";
  } else if (lowName.includes("وقت") || lowName.includes("رياضي")) {
    return "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop";
  }
  // صورة افتراضية عامة للنوادي الأخرى
  return "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop";
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredClubs, setFeaturedClubs] = useState<Club[]>([]);
  const [featuredCoaches, setFeaturedCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب النوادي والكوتشات المميزة من قاعدة البيانات
  useEffect(() => {
    async function fetchFeaturedData() {
      try {
        setLoading(true);
        const { data: clubs } = await supabase
          .from("clubs")
          .select("*")
          .limit(3);

        const { data: coaches } = await supabase
          .from("coaches")
          .select("*")
          .limit(3);

        if (clubs) setFeaturedClubs(clubs);
        if (coaches) setFeaturedCoaches(coaches);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedData();
  }, []);

  const quickFilters = [
    { name: "نساء", query: "نسائي" },
    { name: "رجال", query: "رجالي" },
    { name: "حديد", query: "حديد" },
    { name: "يوغا", query: "يوغا" },
    { name: "ملاكمة", query: "دفاع عن النفس" },
    { name: "سباحة", query: "سباحة" },
  ];

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      {/* 1. القسم الترحيبي (Hero) ومربع البحث */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-[#16382A] to-[#0F2A1E] border-b border-[#2A5642]">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="bg-[#16382A] text-[#D6AD55] text-xs font-bold px-4 py-1.5 rounded-full border border-[#2A5642]">
            منصة لِياقة - خميس مشيط
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#F4EFE2] leading-tight">
            اكتشف أفضل <span className="text-[#D6AD55]">النوادي</span> و<span className="text-[#D6AD55]">الكوتشات</span> الرياضية
          </h1>
          <p className="text-sm md:text-base text-[#C9C4B4] max-w-2xl mx-auto">
            ابحث عن ناديك المفضل، تصفح المدربين المتخصصين، قارن الأسعار والخدمات، وابدأ رحلتك الرياضية بكل سهولة.
          </p>

          {/* مربع البحث السريع */}
          <div className="max-w-2xl mx-auto bg-[#16382A] border border-[#2A5642] p-2 rounded-2xl shadow-2xl flex items-center gap-2">
            <input
              type="text"
              placeholder="ابحث عن اسم نادي، تخصص، أو رياضة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-xs md:text-sm text-[#F4EFE2] focus:outline-none placeholder-[#C9C4B4]"
            />
            <Link
              href={`/clubs?search=${encodeURIComponent(searchQuery)}`}
              className="bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-6 py-3 rounded-xl text-xs md:text-sm transition"
            >
              بحث سريع
            </Link>
          </div>

          {/* أزرار الفلترة السريعة */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {quickFilters.map((filter, index) => (
              <Link
                key={index}
                href={`/clubs?category=${encodeURIComponent(filter.query)}`}
                className="bg-[#16382A] hover:bg-[#2A5642] border border-[#2A5642] text-[#F4EFE2] text-xs px-4 py-2 rounded-xl transition shadow"
              >
                {filter.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 space-y-16">
        
        {/* 2. قسم أفضل النوادي */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#F4EFE2]">أبرز النوادي الرياضية</h2>
              <p className="text-xs text-[#C9C4B4] mt-1">النوادي الأعلى تقييماً و تجهيزاً في خميس مشيط</p>
            </div>
            <Link href="/clubs" className="text-xs text-[#D6AD55] hover:underline font-bold">
              عرض كل النوادي ←
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredClubs.map((club) => (
              <div key={club.id} className="bg-[#16382A] border border-[#2A5642] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-[#0F2A1E] relative">
                    <img 
                      src={getClubImage(club.name, club.image_url)} 
                      alt={club.name} 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-3 right-3 bg-[#0F2A1E]/80 backdrop-blur text-[#D6AD55] text-[10px] font-bold px-3 py-1 rounded-full border border-[#2A5642]">
                      {club.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#F4EFE2] mb-1">{club.name}</h3>
                    <p className="text-xs text-[#C9C4B4] mb-3"> {club.location}</p>
                    <div className="flex items-center gap-1 text-[#D6AD55] text-xs font-bold">
                      <span>★</span> {club.rating || "4.5"}
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href={`/clubs/${club.id}`}
                    className="block w-full text-center bg-[#0F2A1E] hover:bg-[#2A5642] text-[#F4EFE2] border border-[#2A5642] font-bold py-2.5 rounded-xl text-xs transition"
                  >
                    عرض التفاصيل والاشتراكات
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. قسم أبرز الكوتشات */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#F4EFE2]">أبرز المدربين والكوتشات</h2>
              <p className="text-xs text-[#C9C4B4] mt-1">مدربون معتمدون لمتابعة تدريباتك وتغذيتك</p>
            </div>
            <Link href="/coaches" className="text-xs text-[#D6AD55] hover:underline font-bold">
              عرض كل الكوتشات ←
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCoaches.map((coach) => (
              <div key={coach.id} className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#0F2A1E] border border-[#2A5642] overflow-hidden flex items-center justify-center text-[#D6AD55] font-bold text-lg">
                      {coach.image_url ? (
                        <img src={coach.image_url} alt={coach.name} className="w-full h-full object-cover" />
                      ) : (
                        coach.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F4EFE2]">{coach.name}</h3>
                      <p className="text-xs text-[#D6AD55]">{coach.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#2A5642]/60 flex justify-between items-center">
                  <span className="text-[10px] text-[#C9C4B4]">الجنس: {coach.gender === "female" ? "نسائي" : "رجالي"}</span>
                  <Link
                    href="/coaches"
                    className="bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-4 py-2 rounded-xl text-xs transition"
                  >
                    الملف الشخصي
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. معاينة الخريطة المصغرة */}
        <section className="bg-[#16382A] border border-[#2A5642] rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-right">
            <span className="text-[#D6AD55] text-xs font-bold bg-[#0F2A1E] px-3 py-1 rounded-full border border-[#2A5642]">خريطة النوادي</span>
            <h3 className="text-2xl font-black text-[#F4EFE2]">ابحث عن النوادي القريبة منك في خميس مشيط</h3>
            <p className="text-xs text-[#C9C4B4] max-w-lg leading-relaxed">
              تصفح المواقع الجغرافية للنوادي الرياضية على الخريطة لتحديد الأقرب لموقعك وتسهيل الوصول إليها مباشرة عبر خرائط جوجل.
            </p>
          </div>
          <Link
            href="/clubs"
            className="bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-6 py-3.5 rounded-2xl text-xs transition shadow-lg shrink-0"
          >
            استعراض الخريطة والنوادي 
          </Link>
        </section>

      </main>
    </div>
  );
}
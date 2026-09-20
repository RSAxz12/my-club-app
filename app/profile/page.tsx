"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const dynamic = 'force-dynamic';

interface UserProfile {
  email?: string;
  full_name?: string;
  gender?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient(); // تم النقل هنا لتجنب خطأ البناء
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        setProfile({
          email: user.email,
          full_name: user.user_metadata?.full_name || "المستخدم",
          gender: user.user_metadata?.gender === "female" ? "أنثى" : "ذكر",
        });
      } catch (err) {
        console.error("خطأ في تحميل بيانات المستخدم:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient(); // تم النقل هنا أيضاً
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex items-center justify-center font-[family-name:var(--font-tajawal)] dir-rtl">
        <p className="text-[#C9C4B4] text-sm">جاري جلب بيانات الملف الشخصي...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-[#F4EFE2] mb-2">الملف الشخصي</h1>
          <p className="text-xs md:text-sm text-[#C9C4B4]">إدارة بياناتك والوصول السريع لنشاطاتك في منصة لِياقة</p>
        </div>

        <div className="bg-[#16382A] border border-[#2A5642] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          {/* معلومات المستخدم الأساسية */}
          <div className="flex items-center gap-4 border-b border-[#2A5642]/60 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#D6AD55] text-[#0F2A1E] font-black text-2xl flex items-center justify-center shadow-lg">
              {profile?.full_name?.charAt(0) || "م"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F4EFE2]">{profile?.full_name}</h2>
              <p className="text-xs text-[#C9C4B4] mt-0.5 dir-ltr text-right">{profile?.email}</p>
              <span className="inline-block mt-2 text-[10px] bg-[#0F2A1E] text-[#D6AD55] font-semibold px-2.5 py-0.5 rounded-full border border-[#2A5642]">
                الجنس: {profile?.gender}
              </span>
            </div>
          </div>

          {/* روابط الوصول السريع */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/favorites"
              className="bg-[#0F2A1E] hover:bg-[#2A5642] border border-[#2A5642] p-4 rounded-2xl transition flex items-center justify-between"
            >
              <span className="text-xs font-bold text-[#F4EFE2]"> قـائمة المفضلـة</span>
              <span className="text-[#D6AD55] text-xs">عرض ←</span>
            </Link>

            <Link
              href="/my-reviews"
              className="bg-[#0F2A1E] hover:bg-[#2A5642] border border-[#2A5642] p-4 rounded-2xl transition flex items-center justify-between"
            >
              <span className="text-xs font-bold text-[#F4EFE2]"> تقييمـاتي وملاحظاتـي</span>
              <span className="text-[#D6AD55] text-xs">عرض ←</span>
            </Link>
          </div>

          {/* زر تسجيل الخروج */}
          <div className="pt-4 border-t border-[#2A5642]/60">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-3 rounded-xl border border-red-500/30 transition text-xs cursor-pointer"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
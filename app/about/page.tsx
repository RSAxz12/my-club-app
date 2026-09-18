"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-tajawal)] bg-[#0F2A1E] text-[#F4EFE2] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* العنون الرئيسي */}
        <div className="mb-10">
          <span className="bg-[#16382A] text-[#D6AD55] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#2A5642] mb-4 inline-block">
            عن المنصة
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#F4EFE2] tracking-tight mb-4">
            منصة نادي
          </h1>
          <div className="w-20 h-1 bg-[#D6AD55] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-[#C9C4B4] max-w-2xl leading-relaxed font-normal">
            وجهتك الأولى للوصول إلى أفضل النوادي الرياضية والمدربين المحترفين في منطقة خميس مشيط.
          </p>
        </div>

        {/* بطاقات الرؤية والرسالة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8 text-right">
          <div className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-6 md:p-8 hover:border-[#D6AD55] transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#0F2A1E] border border-[#D6AD55] text-[#D6AD55] flex items-center justify-center text-2xl mb-4">
              🎯
            </div>
            <h2 className="text-xl font-bold text-[#F4EFE2] mb-3">رؤيتنا</h2>
            <p className="text-sm text-[#C9C4B4] leading-relaxed">
              تسهيل وتعزيز نمط الحياة الصحي والرياضي للمجتمع المحلي عبر توفير منصة شمولية تجمع خيارات النوادي والتدريب الشخصي في مكان واحد بكل سهولة وشفافية.
            </p>
          </div>

          <div className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-6 md:p-8 hover:border-[#D6AD55] transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#0F2A1E] border border-[#D6AD55] text-[#D6AD55] flex items-center justify-center text-2xl mb-4">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-[#F4EFE2] mb-3">رسالتنا</h2>
            <p className="text-sm text-[#C9C4B4] leading-relaxed">
              ربط الممارسين والمهتمين بالرياضة بالنوادي الأنسب لاحتياجاتهم وبأفضل المدربين المعتمدين، لمساعدتهم على تحقيق أهدافهم الرياضية والصحية بكفاءة عالية.
            </p>
          </div>
        </div>

        {/* مميزات المنصة */}
        <div className="w-full bg-[#16382A] border border-[#2A5642] rounded-2xl p-8 my-6 text-right shadow-lg">
          <h2 className="text-2xl font-bold text-[#F4EFE2] mb-6 text-center">لماذا منصة نادي؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-3xl mb-3">🏋️‍♂️</span>
              <h3 className="font-bold text-[#F4EFE2] mb-2">مدربون محترفون</h3>
              <p className="text-xs text-[#C9C4B4] leading-relaxed">استعراض سير المدربين وتخصصاتهم وحجز الجلسات بكل يسر.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-3xl mb-3">🏢</span>
              <h3 className="font-bold text-[#F4EFE2] mb-2">دليل النوادي</h3>
              <p className="text-xs text-[#C9C4B4] leading-relaxed">استكشاف النوادي الرياضية في المنطقة والاطلاع على أسعارها ومواقعها.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-3xl mb-3">✨</span>
              <h3 className="font-bold text-[#F4EFE2] mb-2">تجربة سهلة وموحدة</h3>
              <p className="text-xs text-[#C9C4B4] leading-relaxed">تصميم حديث يتجاوب مع كافة الأجهزة لتصفح سلس وسريع.</p>
            </div>
          </div>
        </div>

        {/* زر الدعوة للعمل */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/clubs"
            className="bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-md"
          >
            تصفح النوادي الآن
          </Link>
          <Link
            href="/"
            className="bg-[#16382A] hover:bg-[#1C4433] text-[#C9C4B4] border border-[#2A5642] font-semibold px-8 py-3.5 rounded-xl text-sm transition"
          >
            العودة للرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}
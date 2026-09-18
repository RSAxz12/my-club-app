"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
   { name: "الرئيسية", href: "/" },
    { name: "المدربون", href: "/coaches" },
    { name: "النوادي", href: "/clubs" },
    { name: "من نحن", href: "/about" },
    { name: "الملف الشخصي", href: "/profile" },
  ];

  return (
    <header className="w-full bg-[#0F2A1E] border-b border-[#2A5642] sticky top-0 z-50 font-[family-name:var(--font-tajawal)] dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* الشعار واسم المنصة */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-12 w-auto flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="شعار لِياقة"
              width={48}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#F4EFE2] tracking-wide group-hover:text-[#D6AD55] transition-colors">
              لِياقة
            </span>
            <span className="text-[10px] text-[#C9C4B4]">أنديتها ومدربوها بخميس مشيط</span>
          </div>
        </Link>

        {/* روابط التنقل الرئيسية */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-[#D6AD55] border-b-2 border-[#D6AD55] pb-1"
                    : "text-[#F4EFE2] hover:text-[#D6AD55]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* أزرار الحساب والدخول */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm text-[#F4EFE2] hover:text-[#D6AD55] font-medium px-4 py-2 transition"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-xs sm:text-sm bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-4 py-2 rounded-xl transition shadow-md"
          >
            إنشاء حساب
          </Link>
        </div>

      </div>
    </header>
  );
}
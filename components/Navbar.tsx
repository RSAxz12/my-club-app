"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

        {/* روابط التنقل الرئيسية (للشاشات الكبيرة) */}
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

        {/* أزرار الحساب والدخول (للشاشات الكبيرة) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm text-[#F4EFE2] hover:text-[#D6AD55] font-medium px-4 py-2 transition"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-xs sm:text-sm bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold px-4 py-2 rounded-xl transition shadow-md whitespace-nowrap"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* زر القائمة (الثلاث خطوط) للجوال */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F4EFE2] hover:text-[#D6AD55] p-2 focus:outline-none"
          aria-label="القائمة"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* القائمة المنسدلة الخاصة بالجوال */}
      {isOpen && (
        <div className="md:hidden bg-[#0F2A1E] border-b border-[#2A5642] px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-semibold py-2 border-b border-[#2A5642]/40 transition-colors ${
                  isActive ? "text-[#D6AD55]" : "text-[#F4EFE2] hover:text-[#D6AD55]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs text-[#F4EFE2] hover:bg-[#16382A] py-2.5 rounded-xl border border-[#2A5642] transition"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/sign-up"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] text-xs font-bold py-2.5 rounded-xl transition shadow"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
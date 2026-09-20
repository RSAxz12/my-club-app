"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // يتم إنشاء العميل هنا داخل الحدث فقط لضمان قراءة المفاتيح وقت التنفيذ الفعلي
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        router.push("/");
      }
    } catch (err) {
      setErrorMessage("حدث خطأ أثناء تسجيل الدخول.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#16382A] border border-[#2A5642] rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-[#F4EFE2] mb-2">تسجيل الدخول</h1>
            <p className="text-xs text-[#C9C4B4]">مرحباً بعودتك إلى منصة لِياقة</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-300 text-xs p-3 rounded-xl mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#C9C4B4] mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full bg-[#0F2A1E] border border-[#2A5642] focus:border-[#D6AD55] text-[#F4EFE2] p-3 rounded-xl text-xs outline-none dir-ltr text-right"
              />
            </div>

            <div>
              <label className="block text-xs text-[#C9C4B4] mb-1">كلمة المرور</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0F2A1E] border border-[#2A5642] focus:border-[#D6AD55] text-[#F4EFE2] p-3 rounded-xl text-xs outline-none dir-ltr text-right"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold py-3 rounded-xl transition text-xs shadow-md mt-2"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <p className="text-center text-xs text-[#C9C4B4] mt-6">
            ليس لديك حساب؟{" "}
            <Link href="/auth/sign-up" className="text-[#D6AD55] font-bold hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
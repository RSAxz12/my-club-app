"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // 1. إنشاء الحساب في Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            gender: gender,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "حدث خطأ أثناء إنشاء الحساب");
      } else {
        alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
        router.push("/auth/login");
      }
    } catch (err) {
      setErrorMessage("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.");
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
            <h1 className="text-3xl font-black text-[#F4EFE2] mb-2">إنشاء حساب جديد</h1>
            <p className="text-xs text-[#C9C4B4]">انضم لمنصة لِياقة واستكشف أفضل النوادي والمدربين</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-300 text-xs p-3 rounded-xl mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs text-[#C9C4B4] mb-1">الاسم كامل</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="w-full bg-[#0F2A1E] border border-[#2A5642] focus:border-[#D6AD55] text-[#F4EFE2] p-3 rounded-xl text-xs outline-none"
              />
            </div>

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

            <div>
              <label className="block text-xs text-[#C9C4B4] mb-1">الجنس</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                    gender === "male"
                      ? "bg-[#D6AD55] text-[#0F2A1E] border-[#D6AD55]"
                      : "bg-[#0F2A1E] text-[#C9C4B4] border-[#2A5642]"
                  }`}
                >
                  ذكر 
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                    gender === "female"
                      ? "bg-[#D6AD55] text-[#0F2A1E] border-[#D6AD55]"
                      : "bg-[#0F2A1E] text-[#C9C4B4] border-[#2A5642]"
                  }`}
                >
                  أنثى 
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold py-3 rounded-xl transition text-xs shadow-md mt-2"
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </button>
          </form>

          <p className="text-center text-xs text-[#C9C4B4] mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-[#D6AD55] font-bold hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
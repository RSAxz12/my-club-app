"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Review {
  id: string;
  target_name: string;
  target_type: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchMyReviews() {
      try {
        setLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          setNotLoggedIn(true);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("خطأ في جلب التقييمات:", error.message);
        } else if (data) {
          setReviews(data);
        }
      } catch (err) {
        console.error("خطأ غير متوقع:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMyReviews();
  }, []);

  const handleDeleteReview = async (id: string) => {
    const confirmDelete = confirm("هل أنت متأكد من حذف هذا التقييم؟");
    if (!confirmDelete) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("حدث خطأ أثناء الحذف.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-[#F4EFE2] mb-2">تقييماتي وملاحظاتي</h1>
          <p className="text-xs md:text-sm text-[#C9C4B4]">سجل التقييمات والآراء التي أضفتها للنوادي والمدربين</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#C9C4B4]">جاري تحميل تقييماتك...</div>
        ) : notLoggedIn ? (
          <div className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-8 text-center max-w-md mx-auto space-y-4">
            <p className="text-sm text-[#C9C4B4]">يجب تسجيل الدخول لعرض تقييماتك.</p>
            <Link
              href="/auth/login"
              className="inline-block bg-[#D6AD55] text-[#0F2A1E] font-bold px-6 py-2.5 rounded-xl text-xs transition"
            >
              تسجيل الدخول
            </Link>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="bg-[#0F2A1E] text-[#D6AD55] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#2A5642] ml-2">
                      {review.target_type === "club" ? "نادي" : "مدرب"}
                    </span>
                    <h3 className="text-lg font-bold text-[#F4EFE2] inline-block">{review.target_name}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold transition cursor-pointer"
                  >
                    حذف ✕
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < review.rating ? "text-[#D6AD55]" : "text-[#2A5642]"}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-[#D6AD55] font-bold mr-2">({review.rating}/5)</span>
                </div>

                <p className="text-xs md:text-sm text-[#C9C4B4] bg-[#0F2A1E] p-3.5 rounded-xl border border-[#2A5642] leading-relaxed">
                  &quot;{review.comment}&quot;
                </p>
                <span className="text-[10px] text-[#C9C4B4]/60 mt-3 block text-left">
                  {new Date(review.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-10 text-center text-[#C9C4B4] max-w-md mx-auto">
            لم تقم بإضافة أي تقييمات حتى الآن.
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
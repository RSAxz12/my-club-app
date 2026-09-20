"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";

export const dynamic = 'force-dynamic';

interface Coach {
  id: string;
  name: string;
  specialty?: string;
  experience?: string;
  rating?: number;
  bio?: string;
  phone?: string;
  club_name?: string;
  category?: string;
  gender?: "male" | "female";
}

const DEFAULT_COACHES: Coach[] = [
  {
    id: "c1",
    name: "كابتن عبدالله العسيري",
    specialty: "كمال أجسام وبناء عضلات",
    category: "بناء الأجسام",
    experience: "7 سنوات خبرة",
    rating: 4.9,
    bio: "مدرب معتمد متخصص في تصميم برامج التضخيم والتنشيف وإعداد الرياضيين للبطولات بخميس مشيط.",
    phone: "+966500000001",
    club_name: "وقت اللياقة",
    gender: "male"
  },
  {
    id: "c2",
    name: "كابتن سارة الشهراني",
    specialty: "لياقة بدنية وتخسيس",
    category: "لياقة نسائية",
    experience: "5 سنوات خبرة",
    rating: 4.8,
    bio: "مدربة معتمدة في تدريب المقاومة والكارديو والتغذية الرياضية المخصصة للفتيات.",
    phone: "+966500000002",
    club_name: "IN 2 FITNESS النسائي",
    gender: "female"
  },
  {
    id: "c3",
    name: "كابتن خالد القحطاني",
    specialty: "تايكوندو كاراتيه ودفاع عن النفس",
    category: "دفاع عن النفس",
    experience: "8 سنوات خبرة",
    rating: 4.9,
    bio: "مدرب معتمد متخصص في فنون القتال الفردي والدفاع عن النفس لجميع الفئات.",
    phone: "+966500000003",
    club_name: "أكاديمية ويمار للتدريب",
    gender: "male"
  },
  {
    id: "c4",
    name: "كابتن محمد القحطاني",
    specialty: "رفع أثقال ولياقة شاملة (CrossFit)",
    category: "تدريب شخصي",
    experience: "6 سنوات خبرة",
    rating: 4.7,
    bio: "متخصص في زيادة القوة العضلية والتحمل وتصحيح وضعيات التمارين المركبة.",
    phone: "+966500000004",
    club_name: "G4Fit",
    gender: "male"
  },
  {
    id: "c5",
    name: "كابتن نورة الغامدي",
    specialty: "يوغا وتأمل ومرونة",
    category: "يوغا",
    experience: "4 سنوات خبرة",
    rating: 4.8,
    bio: "مدربة يوغا واستطالة لتقوية مفاصل الجسم وتحسين التنفس واللياقة الذهنية والبدنية.",
    phone: "+966500000005",
    club_name: "نادي يورفت النسائي",
    gender: "female"
  },
  {
    id: "c6",
    name: "كابتن فهد الدوسري",
    specialty: "إعداد لياقي للاعبي كرة القدم",
    category: "كرة قدم",
    experience: "9 سنوات خبرة",
    rating: 4.9,
    bio: "مدرب لياقة متخصص في رفع سرعة اللاعبين والتحمل البدني والوقاية من الإصابات الرياضية.",
    phone: "+966500000006",
    club_name: "تمرين بلس الرياضي",
    gender: "male"
  }
];

const CATEGORIES = [
  "الكل",
  "دفاع عن النفس",
  "بناء الأجسام",
  "لياقة نسائية",
  "تدريب شخصي",
  "كرة قدم",
  "يوغا"
];

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [reviewCoach, setReviewCoach] = useState<Coach | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    async function fetchCoaches() {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase.from("coaches").select("*");

        if (error || !data || data.length === 0) {
          setCoaches(DEFAULT_COACHES);
        } else {
          setCoaches(data);
        }
      } catch (err) {
        console.error("خطأ في جلب المدربين:", err);
        setCoaches(DEFAULT_COACHES);
      } finally {
        setLoading(false);
      }
    }

    fetchCoaches();
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewCoach) return;

    alert(`تم إرسال تقييمك (${newRating} نجوم) للمدرب/ة ${reviewCoach.name} بنجاح!`);
    setReviewCoach(null);
    setReviewComment("");
    setNewRating(5);
  };

  const filteredCoaches = coaches.filter((coach) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      coach.name.toLowerCase().includes(query) ||
      (coach.specialty && coach.specialty.toLowerCase().includes(query)) ||
      (coach.club_name && coach.club_name.toLowerCase().includes(query)) ||
      (coach.bio && coach.bio.toLowerCase().includes(query));

    if (selectedCategory === "الكل") {
      return matchesSearch;
    }

    const normalizeText = (text: string) =>
      text
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .toLowerCase();

    const cleanCategory = normalizeText(selectedCategory);
    const coachSpecialty = normalizeText(coach.specialty || "");
    const coachCategory = normalizeText(coach.category || "");
    const coachBio = normalizeText(coach.bio || "");

    const matchesCategory =
      coachCategory.includes(cleanCategory) ||
      coachSpecialty.includes(cleanCategory) ||
      coachBio.includes(cleanCategory) ||
      (selectedCategory === "دفاع عن النفس" && (coachSpecialty.includes("قتال") || coachSpecialty.includes("تايكوندو") || coachSpecialty.includes("كاراتيه"))) ||
      (selectedCategory === "بناء الأجسام" && (coachSpecialty.includes("كمال اجسام") || coachSpecialty.includes("عضلات"))) ||
      (selectedCategory === "لياقة نسائية" && (coachSpecialty.includes("فتيات") || coachSpecialty.includes("سيدات") || coachSpecialty.includes("نسائي")));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F4EFE2] flex flex-col font-[family-name:var(--font-tajawal)] dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
        <div className="text-center mb-8">
          <span className="bg-[#16382A] text-[#D6AD55] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#2A5642] mb-3 inline-block">
            خميس مشيط
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#F4EFE2] mb-3">
            المدربون
          </h1>
          <p className="text-[#C9C4B4] text-sm md:text-base max-w-2xl mx-auto">
            تعرّف على نخبة من المدربين المحترفين في مختلف التخصصات الرياضية بخميس مشيط.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المدرب أو التخصص..."
            className="w-full bg-[#16382A] border border-[#2A5642] focus:border-[#D6AD55] text-[#F4EFE2] placeholder-[#C9C4B4]/60 px-5 py-3.5 pr-12 rounded-2xl outline-none transition shadow-inner text-sm"
          />
          <svg
            className="w-5 h-5 text-[#C9C4B4] absolute right-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition duration-200 border ${
                  isActive
                    ? "bg-[#D6AD55] text-[#0F2A1E] border-[#D6AD55] shadow-md scale-105"
                    : "bg-[#16382A] text-[#C9C4B4] border-[#2A5642] hover:text-[#F4EFE2] hover:border-[#D6AD55]/50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-[#D6AD55] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#C9C4B4] text-sm">جاري جلب قائمة المدربين...</p>
          </div>
        ) : filteredCoaches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoaches.map((coach) => {
              const isSaved = bookmarkedIds.includes(coach.id);
              const initialLetter = coach.name.replace("كابتن", "").trim().charAt(0) || "م";

              return (
                <div
                  key={coach.id}
                  className="bg-[#16382A] border border-[#2A5642] rounded-3xl p-6 shadow-xl hover:border-[#D6AD55] transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <button
                    onClick={() => toggleBookmark(coach.id)}
                    title={isSaved ? "إزالة من المفضلة" : "حفظ المدرب"}
                    className={`absolute top-5 left-5 p-2.5 rounded-2xl border transition z-10 ${
                      isSaved
                        ? "bg-[#D6AD55] text-[#0F2A1E] border-[#D6AD55]"
                        : "bg-[#0F2A1E]/80 text-[#C9C4B4] border-[#2A5642] hover:text-[#D6AD55]"
                    }`}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  </button>

                  <div>
                    <div className="flex items-center gap-4 mb-6 pt-2">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D6AD55] to-[#997730] text-[#0F2A1E] font-black text-2xl flex items-center justify-center shadow-lg border border-[#D6AD55]/40 shrink-0">
                        {initialLetter}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[#F4EFE2] group-hover:text-[#D6AD55] transition-colors">
                          {coach.name}
                        </h3>
                        <p className="text-xs text-[#D6AD55] font-semibold">
                          {coach.specialty || "تدريب شخصي وللياقة"}
                        </p>
                        {coach.club_name && (
                          <span className="inline-block text-[10px] text-[#C9C4B4] bg-[#0F2A1E] px-2.5 py-0.5 rounded-md border border-[#2A5642]">
                            📍 {coach.club_name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 border-t border-[#2A5642]/50 pt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#C9C4B4]">سنوات الخبرة:</span>
                        <span className="text-[#F4EFE2] font-semibold">{coach.experience || "خبرة معتمدة"}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#C9C4B4]">التقييم:</span>
                        <button
                          onClick={() => setReviewCoach(coach)}
                          className="text-[#D6AD55] font-bold bg-[#0F2A1E] px-2 py-0.5 rounded border border-[#2A5642] hover:border-[#D6AD55] transition"
                        >
                          ★ {coach.rating || 4.8}
                        </button>
                      </div>

                      <p className="text-xs text-[#C9C4B4]/80 leading-relaxed pt-1 line-clamp-3">
                        {coach.bio || "تخصيص برامج تدريبية وتغذوية متكاملة ومتابعة دورية لتطوير الأداء الرياضي."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#2A5642]/40">
                    <button
                      onClick={() => setSelectedCoach(coach)}
                      className="flex-1 bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] text-xs font-bold py-3 rounded-xl transition text-center shadow-md"
                    >
                      حجز جلسة تدريب
                    </button>
                    <button
                      onClick={() => setReviewCoach(coach)}
                      className="bg-[#0F2A1E] hover:bg-[#2A5642] text-[#F4EFE2] text-xs px-3 py-3 rounded-xl border border-[#2A5642] transition"
                    >
                      تقييم
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#16382A] border border-[#2A5642] rounded-2xl p-8 text-center text-[#C9C4B4] max-w-lg mx-auto">
            لا يوجد مدربون يتطابقون مع خيار البحث أو التصنيف المحدد.
          </div>
        )}

        {selectedCoach && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#16382A] border border-[#2A5642] rounded-3xl max-w-md w-full p-6 text-right relative shadow-2xl">
              <button
                onClick={() => setSelectedCoach(null)}
                className="absolute top-4 left-4 text-[#C9C4B4] hover:text-[#F4EFE2] text-lg font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D6AD55] text-[#0F2A1E] font-black flex items-center justify-center text-xl">
                  {selectedCoach.name.replace("كابتن", "").trim().charAt(0) || "م"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F4EFE2]">{selectedCoach.name}</h3>
                  <p className="text-xs text-[#D6AD55]">{selectedCoach.specialty}</p>
                </div>
              </div>

              <p className="text-xs text-[#C9C4B4] mb-6 leading-relaxed">
                يمكنك التواصل مع المدرب/ة مباشرة للاستفسار وحجز الجلسة الخاصة بك عبر البيانات المتاحة:
              </p>

              <div className="space-y-3 mb-6">
                <div className="bg-[#0F2A1E] p-3 rounded-xl border border-[#2A5642] flex justify-between items-center text-xs">
                  <span className="text-[#C9C4B4]">رقم للتواصل والواتساب:</span>
                  <span className="text-[#D6AD55] font-bold dir-ltr">
                    {selectedCoach.phone || "+966 50 123 4567"}
                  </span>
                </div>
                <div className="bg-[#0F2A1E] p-3 rounded-xl border border-[#2A5642] flex justify-between items-center text-xs">
                  <span className="text-[#C9C4B4]">الجهة / النادي:</span>
                  <span className="text-[#F4EFE2] font-semibold">
                    {selectedCoach.club_name || "خميس مشيط"}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${(selectedCoach.phone || "966501234567").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md"
              >
                💬 التواصل المباشر عبر الواتساب
              </a>
            </div>
          </div>
        )}

        {reviewCoach && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#16382A] border border-[#2A5642] rounded-3xl max-w-md w-full p-6 text-right relative shadow-2xl">
              <button
                onClick={() => setReviewCoach(null)}
                className="absolute top-4 left-4 text-[#C9C4B4] hover:text-[#F4EFE2] text-lg font-bold"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold text-[#F4EFE2] mb-1">
                تقييم المدرب/ة: {reviewCoach.name}
              </h3>
              <p className="text-xs text-[#C9C4B4] mb-4">أضيفي تقييمك ورأيك في تجربة التدريب.</p>

              <form onSubmit={handleRatingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#C9C4B4] mb-2">اختر التقييم بالنجوم:</label>
                  <div className="flex gap-2 justify-center bg-[#0F2A1E] p-3 rounded-xl border border-[#2A5642]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`text-2xl transition ${
                          star <= newRating ? "text-[#D6AD55]" : "text-[#2A5642]"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#C9C4B4] mb-2">ملاحظات إضافية (اختياري):</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="اكتبي تجربتك مع التمارين والاستجابة..."
                    className="w-full bg-[#0F2A1E] border border-[#2A5642] focus:border-[#D6AD55] text-[#F4EFE2] p-3 rounded-xl text-xs outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D6AD55] hover:bg-[#c29b47] text-[#0F2A1E] font-bold py-2.5 rounded-xl transition text-xs shadow"
                >
                  إرسال التقييم
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
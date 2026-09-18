import Link from 'next/link';
import CoachAvatar from './CoachAvatar';

export type Coach = {
  id: string;
  name: string;
  specialty: string | null;
  gender: 'men' | 'women' | null;
  bio: string | null;
  rating: number | null;
  club_id: string | null;
  clubs?: {
    id: string;
    name: string;
    neighborhood: string | null;
  }[] | null;
};

type CoachCardProps = {
  coach: Coach;
};

// تحديد لون الفئة حسب التخصص
function getCategoryColor(specialty: string | null): { bg: string; color: string; label: string } {
  if (!specialty) return { bg: 'rgba(214,173,85,0.16)', color: '#D6AD55', label: 'مدرب' };
  
  if (specialty.includes('دفاع')) return { bg: 'rgba(127,174,140,0.15)', color: '#7FAE8C', label: 'دفاع عن النفس' };
  if (specialty.includes('بناء') || specialty.includes('حديد')) return { bg: 'rgba(169,166,199,0.15)', color: '#A9A6C7', label: 'بناء أجسام' };
  if (specialty.includes('نسائ') || specialty.includes('لياقة نسائية')) return { bg: 'rgba(224,166,160,0.15)', color: '#E0A6A0', label: 'لياقة نسائية' };
  if (specialty.includes('سباحة')) return { bg: 'rgba(143,199,194,0.15)', color: '#8FC7C2', label: 'سباحة' };
  if (specialty.includes('كارديو') || specialty.includes('لياقة بدنية')) return { bg: 'rgba(227,195,107,0.15)', color: '#E3C36B', label: 'لياقة بدنية' };
  
  return { bg: 'rgba(214,173,85,0.16)', color: '#D6AD55', label: 'مدرب' };
}

export default function CoachCard({ coach }: CoachCardProps) {
  const cat = getCategoryColor(coach.specialty);
  const club = coach.clubs && coach.clubs.length > 0 ? coach.clubs[0] : null;

  return (
    <Link
      href={`/coaches/${coach.id}`}
      className="group block rounded-2xl p-6 relative transition-all duration-200 hover:-translate-y-1.5"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
      }}
    >
      {/* Tag الفئة */}
      <span
        className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-md"
        style={{ background: cat.bg, color: cat.color }}
      >
        {cat.label}
      </span>

      {/* الأفاتار مع شارة التقييم */}
      <div className="flex justify-center mb-4 relative">
        <div className="relative">
          <CoachAvatar gender={coach.gender} size={84} />
          {coach.rating !== null && coach.rating > 0 && (
            <span
              className="absolute -bottom-1 -left-2 text-xs font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border-2"
              style={{
                background: 'var(--gold)',
                color: 'var(--bg-deep)',
                borderColor: 'var(--surface)',
              }}
            >
              ★ {coach.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* الاسم */}
      <h3
        className="text-center text-lg font-extrabold mb-1.5"
        style={{ color: 'var(--cream)' }}
      >
        {coach.name}
      </h3>

      {/* التخصص */}
      {coach.specialty && (
        <p
          className="text-center text-sm font-medium mb-3.5"
          style={{ color: 'var(--gold)' }}
        >
          {coach.specialty}
        </p>
      )}

      {/* النادي */}
      {club && (
        <div
          className="flex items-center justify-center gap-1.5 text-[12.5px] pt-3.5"
          style={{
            color: 'var(--cream-dim)',
            borderTop: '1px solid var(--line)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-center leading-relaxed">
            {club.neighborhood && <>{club.neighborhood} · </>}
            {club.name}
          </span>
        </div>
      )}
    </Link>
  );
}
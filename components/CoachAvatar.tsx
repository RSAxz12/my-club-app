import Image from 'next/image';

type CoachAvatarProps = {
  gender: 'men' | 'women' | null;
  size?: number;
  className?: string;
};

export default function CoachAvatar({ 
  gender, 
  size = 200,
  className = '' 
}: CoachAvatarProps) {
  const imageSrc = gender === 'women' ? '/avatars/female.png' : '/avatars/male.png';
  const alt = gender === 'women' ? 'مدربة' : 'مدرب';

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}
      style={{
        position: 'relative',         // ← المهم: هذا اللي كان ناقص
        width: size,
        height: size,
        background: 'var(--surface-2)',
        border: `3px solid var(--bg)`,
        boxShadow: `0 0 0 1px var(--line)`,
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
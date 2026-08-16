import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Variant = 'violet' | 'teal' | 'rose' | 'orange' | 'mixed';

const palettes: Record<Variant, string[]> = {
  violet: ['#7C5CFF', '#5B3FD6', '#9D7BFF'],
  teal: ['#00E0C6', '#00B8A3', '#3DDC97'],
  rose: ['#FB7185', '#F43F5E', '#FDA4AF'],
  orange: ['#FB923C', '#F97316', '#FDBA74'],
  mixed: ['#7C5CFF', '#00E0C6', '#3DDC97'],
};

export default function ShaderBackground({
  variant = 'mixed',
  opacity = 0.08,
}: {
  variant?: Variant;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const blobs = el.querySelectorAll('.shader-blob');
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: (i % 2 === 0 ? 1 : -1) * (40 + i * 20),
          y: (i % 2 === 0 ? -1 : 1) * (30 + i * 15),
          duration: 10 + i * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      gsap.to(el, {
        backgroundPositionX: '200%',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const colors = palettes[variant];

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        background: `linear-gradient(120deg, transparent 0%, ${colors[0]}10 30%, ${colors[1]}10 60%, transparent 100%)`,
        backgroundSize: '200% 200%',
        opacity,
      }}
    >
      <div
        className="shader-blob absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          left: '5%',
          top: '10%',
          background: colors[0],
          filter: 'blur(100px)',
          opacity: 0.4,
        }}
      />
      <div
        className="shader-blob absolute rounded-full"
        style={{
          width: '350px',
          height: '350px',
          right: '5%',
          bottom: '10%',
          background: colors[1],
          filter: 'blur(100px)',
          opacity: 0.35,
        }}
      />
      {colors[2] && (
        <div
          className="shader-blob absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            left: '45%',
            top: '50%',
            background: colors[2],
            filter: 'blur(100px)',
            opacity: 0.25,
          }}
        />
      )}
    </div>
  );
}

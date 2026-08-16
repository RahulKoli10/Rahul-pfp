import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    setHidden(false);

    // Center both elements on the cursor point using xPercent/yPercent -50
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [data-cursor]');
      if (interactive) {
        const cursorType = interactive.getAttribute('data-cursor');
        if (cursorType === 'text') {
          setVariant('text');
          setLabel(interactive.getAttribute('data-cursor-label') || '');
        } else {
          setVariant('hover');
          setLabel('');
        }
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div
      className="cursor-container"
      style={{ opacity: hidden ? 0 : 1 }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: variant === 'hover' ? 56 : variant === 'text' ? 80 : 32,
          height: variant === 'hover' ? 56 : variant === 'text' ? 80 : 32,
          borderColor: variant === 'hover' || variant === 'text' ? 'var(--accent-violet)' : 'var(--muted)',
          backgroundColor: variant === 'text' ? 'rgba(124,92,255,0.08)' : 'transparent',
        }}
      >
        {variant === 'text' && label && (
          <span className="cursor-label">{label}</span>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: variant === 'hover' || variant === 'text' ? 0 : 6,
          height: variant === 'hover' || variant === 'text' ? 0 : 6,
        }}
      />
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { experience } from '@/data/content';
import ShaderBackground from '@/components/ShaderBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Timeline line draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      experience.forEach((_, i) => {
        gsap.fromTo(
          `.exp-entry-${i}`,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: `.exp-entry-${i}`, start: 'top 85%', once: true },
          }
        );

        gsap.fromTo(
          `.exp-dot-${i}`,
          { scale: 0 },
          {
            scale: 1, duration: 0.4, ease: 'back.out(2)',
            scrollTrigger: { trigger: `.exp-entry-${i}`, start: 'top 85%', once: true },
          }
        );

        // Bullet stagger
        gsap.fromTo(
          `.exp-bullet-${i}`,
          { opacity: 0, x: -15 },
          {
            opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: `.exp-entry-${i}`, start: 'top 80%', once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32 px-6">
      <ShaderBackground variant="teal" opacity={0.05} />
      <div className="max-w-5xl mx-auto">
        <div className="exp-header mb-16">
          <span className="section-label mb-3 block">// experience</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Where I've shipped
          </h2>
        </div>

        <div className="timeline-container relative pl-8 sm:pl-12">
          {/* Vertical line */}
          <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5 origin-top">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-accent-violet via-accent-teal to-transparent origin-top" />
          </div>

          <div className="space-y-12">
            {experience.map((entry, i) => (
              <div key={i} className={`exp-entry-${i} relative`}>
                {/* Dot */}
                <div className={`exp-dot-${i} absolute -left-[1.45rem] sm:-left-[2.15rem] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-accent-violet to-accent-teal ring-4 ring-[var(--bg)]`} />

                <div className="glass card-glow gradient-border rounded-2xl p-6 sm:p-8 hover:border-accent-violet/40 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-xl text-[var(--text)]">{entry.role}</h3>
                      <p className="text-accent-teal font-medium text-sm mt-0.5">{entry.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-[var(--muted)] block">{entry.period}</span>
                      <span className="text-xs text-[var(--muted)] flex items-center gap-1 justify-end mt-1">
                        <MapPin size={12} />
                        {entry.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {entry.bullets.map((bullet, j) => (
                      <li key={j} className={`exp-bullet-${i} flex gap-3 text-sm text-[var(--muted)] leading-relaxed`}>
                        <span className="text-accent-violet mt-1 shrink-0">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

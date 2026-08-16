import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { Braces, Code2, Database, GripVertical, MousePointer2, Server, Sparkles, Wrench,Container } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import { profile } from '@/data/content';
import ShaderBackground from '@/components/ShaderBackground';

gsap.registerPlugin(ScrollTrigger, Draggable);

type FloatingSkill = {
  label: string;
  icon: LucideIcon;
  className: string;
  delay: string;
  accent: 'violet' | 'teal' | 'green' | 'success' | 'orange' | 'rose';
};

const floatingSkills: FloatingSkill[] = [
  { label: 'React.js', icon: Code2, className: 'skill-float-one', delay: '0s', accent: 'violet' },
  { label: 'Next.js', icon: Braces, className: 'skill-float-two', delay: '1.2s', accent: 'teal' },
  { label: 'Node.js', icon: Server, className: 'skill-float-three', delay: '2.2s', accent: 'success' },
  { label: 'PostgreSQL', icon: Database, className: 'skill-float-four', delay: '0.7s', accent: 'teal' },
  { label: 'Tailwind CSS', icon: Wrench, className: 'skill-float-five', delay: '1.8s', accent: 'violet' },

  { label: 'TypeScript', icon: Braces, className: 'skill-float-six', delay: '2.8s', accent: 'violet' },
  { label: 'Express.js', icon: Server, className: 'skill-float-seven', delay: '1.5s', accent: 'orange' },
  { label: 'Python', icon: Code2, className: 'skill-float-eight', delay: '3.2s', accent: 'orange' },
  { label: 'MongoDB', icon: Database, className: 'skill-float-nine', delay: '2.5s', accent: 'success' },
  { label: 'Redis', icon: Database, className: 'skill-float-ten', delay: '0.9s', accent: 'rose' },
  { label: 'Prisma', icon: Database, className: 'skill-float-eleven', delay: '3.6s', accent: 'teal' },
  { label: 'Docker', icon: Container, className: 'skill-float-twelve', delay: '1.1s', accent: 'violet' },
];

const skillGroups = [
  { title: 'Frontend', detail: 'Interfaces that feel effortless', skills: 'React · Next.js · Tailwind' },
  { title: 'Backend', detail: 'Systems built to scale', skills: 'Node · Express · REST APIs · Python' },
  { title: 'Data & DevOps', detail: 'Reliable from commit to cloud', skills: 'PostgreSQL · Docker · Redis · CI/CD' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragged, setDragged] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-heading', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
      gsap.fromTo('.skills-stage', { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: stageRef.current, start: 'top 80%', once: true } });
      gsap.fromTo('.skill-float', { opacity: 0, scale: 0.7, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: stageRef.current, start: 'top 75%', once: true } });
      gsap.fromTo('.skill-group-row', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.skill-group-list', start: 'top 82%', once: true } });
      gsap.to('.skills-orbit', { rotate: 360, duration: 45, repeat: -1, ease: 'none' });
      gsap.to('.skills-orbit-reverse', { rotate: -360, duration: 32, repeat: -1, ease: 'none' });

      // Make skill pills draggable
      Draggable.create('.skill-float', {
        type: 'x,y',
        bounds: stageRef.current ?? undefined,
        inertia: true,
        edgeResistance: 0.65,
        onPress() {
          gsap.to(this.target, { scale: 1.15, boxShadow: '0 12px 40px -8px rgba(124,92,255,0.5)', zIndex: 100, duration: 0.2 });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, boxShadow: '0 4px 24px -6px rgba(0,0,0,0.4)', zIndex: 20, duration: 0.3 });
          setDragged((prev) => new Set(prev).add(this.target.dataset.label || ''));
        },
        onDragEnd() {
          gsap.to(this.target, {
            x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 2,
          });
        },
      });
    }, sectionRef);

    const stage = stageRef.current;
    if (!stage || window.matchMedia('(pointer: coarse)').matches) return () => ctx.revert();

    const moveStage = (event: MouseEvent) => {
      // Don't tilt if hovering a draggable
      if ((event.target as HTMLElement).closest('.skill-float')) return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.skills-core', { rotateY: x * 7, rotateX: y * -7, duration: 0.7, ease: 'power3.out' });
    };
    const resetStage = () => {
      gsap.to('.skills-core', { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
    };

    stage.addEventListener('mousemove', moveStage);
    stage.addEventListener('mouseleave', resetStage);
    return () => {
      ctx.revert();
      stage.removeEventListener('mousemove', moveStage);
      stage.removeEventListener('mouseleave', resetStage);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden px-6 py-24 sm:py-32">
      <ShaderBackground variant="mixed" opacity={0.07} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="skills-heading mb-12 text-center">
          <span className="section-label mb-3 block">// what I work with</span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">A toolkit in motion.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[var(--muted)]">
            The technologies behind the products I design, build, ship, and keep improving.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1.5 text-xs text-[var(--muted)] backdrop-blur-sm">
            <GripVertical size={14} className="text-accent-violet" />
            <span>Drag the skill pills around</span>
          </div>
        </div>

        <div ref={stageRef} className="skills-stage relative mx-auto mb-20 h-[430px] max-w-4xl sm:h-[510px]" style={{ perspective: '1200px' }}>
          <div className="skills-orbit absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)]/60 sm:h-[390px] sm:w-[390px]" />
          <div className="skills-orbit-reverse absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent-teal/20 sm:h-[300px] sm:w-[300px]" />

          <div className="skills-core absolute left-1/2 top-1/2 z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border-8 border-[var(--surface)] bg-[var(--surface)] shadow-[0_20px_80px_-20px_rgba(124,92,255,0.55)] transition-transform sm:h-64 sm:w-64" style={{ transformStyle: 'preserve-3d' }}>
            <img src={profile.heroImage} alt="Developer workspace" className="h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-teal">Full-stack</p>
                <p className="font-display text-lg font-semibold text-white">Rahul Koli</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm">
                <MousePointer2 size={14} />
              </div>
            </div>
          </div>

          {floatingSkills.map(({ label, icon: Icon, className, delay, accent }) => (
            <div
              key={label}
              data-label={label}
              className={`skill-float skill-pill ${className} skill-pill-${accent} ${dragged.has(label) ? 'skill-pill-dragged' : ''}`}
              style={{ '--float-delay': delay } as CSSProperties}
            >
              <GripVertical size={12} className="opacity-40" />
              <Icon size={16} />
              <span>{label}</span>
            </div>
          ))}

          <div className="skill-spark skill-spark-one"><Sparkles size={18} /></div>
          <div className="skill-spark skill-spark-two"><Sparkles size={13} /></div>
          <div className="skill-spark skill-spark-three"><Sparkles size={15} /></div>
        </div>

        <div className="skill-group-list grid gap-3 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <div key={group.title} className="skill-group-row group rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-violet/50 hover:bg-[var(--surface)]/70">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--muted)]">0{index + 1}</span>
                <span className="h-2 w-2 rounded-full bg-accent-teal shadow-[0_0_12px_rgba(0,224,198,0.8)]" />
              </div>
              <h3 className="font-display text-xl font-semibold">{group.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{group.detail}</p>
              <p className="mt-5 font-mono text-xs text-accent-teal/80">{group.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

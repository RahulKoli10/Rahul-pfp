import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { MapPin, Mail, Phone, Briefcase, GraduationCap, type LucideIcon, Code2, Zap, Users } from 'lucide-react';
import { profile, metrics, education } from '@/data/content';
import ShaderBackground from '@/components/ShaderBackground';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const illuminateRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header — clip reveal
      gsap.fromTo('.about-header', { clipPath: 'inset(0 0 100% 0)', opacity: 0 }, { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });

      // Big number — count up
      gsap.fromTo('.about-big-num', { opacity: 0, scale: 0.5 }, { opacity: 0.08, scale: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.about-big-num', start: 'top 80%', once: true } });

      // Scroll-illuminated paragraph
      if (illuminateRef.current) {
        const split = new SplitType(illuminateRef.current, { types: 'words' });
        gsap.fromTo(split.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: illuminateRef.current, start: 'top 80%', end: 'bottom 60%', scrub: 1 } });
      }

      // Info cards — stagger from left
      gsap.fromTo('.info-card', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.about-info-grid', start: 'top 80%', once: true } });

      // Image reveal — clip from left
      const imageReveal = document.querySelector('.about-image-reveal');
      if (imageReveal) {
        ScrollTrigger.create({ trigger: imageReveal, start: 'top 80%', once: true, onEnter: () => imageReveal.classList.add('revealed') });
      }

      // Metric circular progress
      gsap.utils.toArray<HTMLElement>('.metric-circle').forEach((el, i) => {
        const fill = el.querySelector('.circle-progress-fill');
        const valueEl = el.querySelector('.metric-value');
        const text = valueEl?.textContent || '';
        const hasPlus = text.includes('+');
        const target = parseInt(text.replace(/\D/g, ''), 10);
        const progress = Math.min(target / 100, 1);

        gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: i * 0.1, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });

        if (fill) {
          ScrollTrigger.create({
            trigger: el, start: 'top 85%', once: true,
            onEnter: () => {
              (fill as SVGElement).style.strokeDashoffset = String(283 - 283 * progress);
            },
          });
        }

        if (!isNaN(target) && valueEl) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.5, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => { valueEl.textContent = Math.floor(obj.val).toString() + (hasPlus ? '+' : ''); },
            onComplete: () => { valueEl.textContent = text; },
          });
        }
      });
    }, sectionRef);

    // Card glow mouse tracking
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      const cards = gsap.utils.toArray<HTMLElement>('.card-glow');
      const handlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];
      cards.forEach((el) => {
        const fn = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };
        el.addEventListener('mousemove', fn);
        handlers.push({ el, fn });
      });
      return () => { ctx.revert(); handlers.forEach(({ el, fn }) => el.removeEventListener('mousemove', fn)); };
    }

    return () => ctx.revert();
  }, []);

  const metricIcons: LucideIcon[] = [Briefcase, Code2, Users, Zap];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <ShaderBackground variant="violet" opacity={0.06} />
      {/* Giant background number */}
      <div className="about-big-num absolute -top-10 right-0 font-display font-bold text-[20rem] leading-none pointer-events-none select-none gradient-text-static" style={{ opacity: 0.08 }}>
        01
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="about-header mb-20">
          <span className="section-label mb-3 block">// about</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            The person behind the code
          </h2>
        </div>

        {/* Scroll-illuminated paragraph */}
        <div className="mb-20 max-w-3xl">
          <p ref={illuminateRef} className="text-2xl sm:text-3xl font-display font-medium leading-relaxed text-[var(--text)]">
            {profile.summary}
          </p>
        </div>

        {/* Sticky pair: left info, right image */}
        <div className="sticky-pair mb-16">
          {/* Left: info cards */}
          <div className="about-info-grid sticky-left space-y-5">
            <div className="info-card glass-panel card-glow rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center text-accent-violet">
                  <GraduationCap size={20} />
                </div>
                <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">Education</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{education.degree}</h3>
              <p className="text-sm text-[var(--muted)]">{education.school}</p>
              <p className="text-sm text-[var(--muted)]">{education.location}</p>
              <p className="font-mono text-xs text-accent-teal mt-3">{education.period}</p>
            </div>

            <div className="info-card glass-panel card-glow rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                  <Briefcase size={20} />
                </div>
                <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">Current Focus</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">Multi-tenant SaaS Platforms</h3>
              <p className="text-sm text-[var(--muted)]">
                Building production POS and billing systems with role-based access, REST APIs, and scalable architecture.
              </p>
            </div>

            <div className="info-card glass-panel card-glow rounded-2xl p-7">
              <div className="space-y-3">
                <InfoRow icon={MapPin} label={profile.location} />
                <InfoRow icon={Mail} label={profile.email} href={`mailto:${profile.email}`} />
                <InfoRow icon={Phone} label={profile.phone} href={`tel:${profile.phone}`} />
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="about-image-reveal image-reveal rounded-2xl overflow-hidden h-[500px] glass-panel">
            <img src={profile.aboutImage} alt="Developer workspace" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Metrics — circular progress */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => {
            const Icon = metricIcons[i] || Briefcase;
            const target = parseInt(m.value.replace(/\D/g, ''), 10);
            const progress = Math.min(target / 100, 1);
            return (
              <div key={m.label} className="metric-circle glass-panel card-glow rounded-2xl p-6 flex flex-col items-center text-center group hover:border-accent-violet/40 transition-colors duration-300">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="circle-progress w-full h-full" viewBox="0 0 100 100">
                    <circle className="circle-progress-track" cx="50" cy="50" r="45" />
                    <circle
                      className="circle-progress-fill"
                      cx="50" cy="50" r="45"
                      style={{ stroke: i % 2 === 0 ? '#7C5CFF' : '#00E0C6' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="metric-value font-display font-bold text-2xl gradient-text-static counter-num">{m.value}</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] group-hover:text-accent-violet group-hover:scale-110 transition-all duration-300 mb-2">
                  <Icon size={16} />
                </div>
                <div className="font-semibold text-sm text-[var(--text)]">{m.label}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{m.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
      <Icon size={16} />
      <span>{label}</span>
    </div>
  );
  if (href) return <a href={href} className="block">{content}</a>;
  return content;
}

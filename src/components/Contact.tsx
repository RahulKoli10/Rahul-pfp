import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { profile, socials } from '@/data/content';
import ShaderBackground from '@/components/ShaderBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Big headline char reveal
      const headline = document.querySelector('.contact-headline');
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', message: '' });
      }, 3000);
    }, 800);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-32 px-6">
      <ShaderBackground variant="rose" opacity={0.06} />
      <div className="max-w-5xl mx-auto">
        {/* Big headline */}
        <div className="contact-fade text-center mb-16">
          <span className="section-label mb-3 block">// contact</span>
          <h2 className="contact-headline font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-none mb-6">
            Let's build
            <br />
            <span className="gradient-text">something</span>
          </h2>
          <p className="text-[var(--muted)] max-w-lg mx-auto text-lg">
            Open to full-stack roles, freelance projects, and collaboration.
          </p>
        </div>

        {/* Email link with animated underline */}
        <div className="contact-fade text-center mb-12">
          <a
            href={`mailto:${profile.email}`}
            className="animated-link font-display text-2xl sm:text-3xl font-medium text-[var(--text)] hover:text-accent-violet transition-colors"
          >
            {profile.email}
          </a>
        </div>

        {/* Form */}
        <div className="contact-fade glass card-glow gradient-border rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="Your name" />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder="Tell me about your project or role..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-accent-violet focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-teal text-white font-semibold text-sm shadow-glow hover:shadow-glow-teal transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'idle' && (<><Send size={16} /> Send Message</>)}
              {status === 'sending' && (<><Loader2 size={16} className="animate-spin" /> Sending...</>)}
              {status === 'sent' && (<><CheckCircle2 size={16} /> Opening your email app...</>)}
            </button>
          </form>
        </div>

        {/* Social links */}
        <div className="contact-fade flex flex-wrap items-center justify-center gap-4 mt-8">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-[var(--muted)] hover:text-[var(--text)] hover:border-accent-violet transition-all duration-300 group"
              >
                <Icon size={16} />
                {social.label}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Field({
  label, type, value, onChange, required, placeholder,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--muted)] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-accent-violet focus:outline-none transition-colors"
      />
    </div>
  );
}

import { ArrowUp, Heart } from 'lucide-react';
import { socials, profile } from '@/data/content';
import ShaderBackground from '@/components/ShaderBackground';

const marqueeItems = [
  'Available for work', 'Full-Stack Developer', 'PERN + Next.js',
  'Dehradun, India', 'Open to remote', 'Let\'s build something',
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--border)]">
      <ShaderBackground variant="mixed" opacity={0.04} />
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-[var(--border)] py-6">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display font-bold text-3xl sm:text-5xl text-[var(--muted)] mx-8 flex items-center gap-8 whitespace-nowrap">
              {item}
              <span className="text-accent-violet text-2xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + credit */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-violet to-accent-teal flex items-center justify-center text-white text-sm font-bold">
                RK
              </span>
              <span className="font-display font-semibold">{profile.name}</span>
            </div>
            <p className="text-xs text-[var(--muted)] flex items-center gap-1.5">
              Built with React + GSAP
              <Heart size={11} className="text-accent-violet" />
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:border-accent-violet hover:bg-[var(--surface)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Back to top
            <span className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center group-hover:border-accent-violet transition-colors">
              <ArrowUp size={16} />
            </span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--muted)] font-mono">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

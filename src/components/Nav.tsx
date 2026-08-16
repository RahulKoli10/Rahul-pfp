import { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useMagnetic } from '@/hooks/useMagnetic';

type NavProps = {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
};

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useMagnetic<HTMLAnchorElement>(0.2);
  const themeBtnRef = useMagnetic<HTMLButtonElement>(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-display font-bold text-lg tracking-tight flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-violet to-accent-teal flex items-center justify-center text-white text-sm">
              RK
            </span>
            <span className="hidden sm:inline">Rahul Koli</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--text)] active'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              ref={themeBtnRef}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-accent-violet transition-colors text-[var(--muted)] hover:text-[var(--text)]"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text)]"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 md:hidden glass border-t border-[var(--border)] pt-20 px-6"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-2xl font-display font-semibold py-3 border-b border-[var(--border)] transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

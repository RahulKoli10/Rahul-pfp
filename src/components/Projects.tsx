import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/data/content';
import ShaderBackground from '@/components/ShaderBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      gsap.fromTo(
        '.project-row',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-list', start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    // Image follows cursor
    const imageEl = imageRef.current;
    if (!imageEl) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const xTo = gsap.quickTo(imageEl, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(imageEl, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const handleProjectHover = (index: number | null) => {
    setActiveProject(index);
    if (imageRef.current) {
      if (index !== null) {
        imageRef.current.classList.add('active');
      } else {
        imageRef.current.classList.remove('active');
      }
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32 px-6">
      <ShaderBackground variant="orange" opacity={0.05} />
      {/* Floating image that follows cursor */}
      <div ref={imageRef} className="project-image-follow hidden md:block">
        {activeProject !== null && (
          <img
            key={activeProject}
            src={projects[activeProject].image}
            alt={projects[activeProject].name}
            loading="lazy"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="projects-header mb-16">
          <span className="section-label mb-3 block">// projects</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Things I've built
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-xl">
            Production-grade applications shipped with real users in mind — from multi-vendor SaaS
            to SEO-driven booking platforms.
          </p>
        </div>

        {/* Project list — image follows cursor on hover */}
        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectRow
              key={i}
              project={project}
              index={i}
              onHover={handleProjectHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover: (index: number | null) => void;
}) {
  const accentColors: Record<string, string> = {
    violet: '#7C5CFF',
    teal: '#00E0C6',
    rose: '#FB7185',
    orange: '#FB923C',
  };
  const accentColor = accentColors[project.accent] ?? '#7C5CFF';

  return (
    <div
      className="project-row group cursor-pointer border-t border-[var(--border)] last:border-b"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-8 sm:py-10 px-2 sm:px-6 transition-all duration-500 group-hover:px-6 sm:group-hover:px-10"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Left: number + name */}
          <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
            <span className="font-mono text-sm text-[var(--muted)] hidden sm:inline">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text)] group-hover:text-[var(--text)] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-1">{project.tagline}</p>
            </div>
          </div>

          {/* Middle: tags (desktop) */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap justify-center max-w-xs">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Right: year + arrow */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-sm text-[var(--muted)] hidden sm:inline">{project.year}</span>
            <div
              className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-transparent transition-all duration-300"
              style={{ background: 'transparent' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                style={{ background: accentColor }}
              >
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile tags */}
        <div className="flex flex-wrap gap-2 mt-4 lg:hidden">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Description reveal on hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-out">
          <p className="text-sm text-[var(--muted)] leading-relaxed pt-4 max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-3">
            {project.highlights.map((h, j) => (
              <span key={j} className="text-xs font-mono" style={{ color: accentColor }}>
                ▹ {h}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}

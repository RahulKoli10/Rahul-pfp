import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  ArrowDown,
  FolderGit2,
  Sparkles,
  MousePointer2,
  FileText,
} from "lucide-react";
import { profile } from "@/data/content";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = [
  "web apps",
  "SaaS platforms",
  "REST APIs",
  "UI components",
  "POS systems",
];

const nameChars = profile.name.split("");

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useMagnetic<HTMLButtonElement>(0.4);
  const secondaryBtnRef = useMagnetic<HTMLButtonElement>(0.25);
  const [wordIndex, setWordIndex] = useState(0);
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      if (nameRef.current) nameRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      // Name — per-char reveal with bounce + stagger
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll(".name-char");
        gsap.fromTo(
          chars,
          { yPercent: 120, opacity: 0, rotateZ: 8, scale: 0.8 },
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.04,
            ease: "back.out(1.2)",
            delay: 2.2,
          },
        );
      }

      // Tag pill — scale in
      gsap.fromTo(
        ".hero-tag",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 2.4,
          ease: "back.out(1.6)",
        },
      );

      // Signal bar
      gsap.fromTo(
        ".hero-signal",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 2.5, ease: "power3.out" },
      );

      // Role line — slide up mask
      gsap.fromTo(
        ".hero-role-line .line-inner",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, delay: 2.6, ease: "power4.out" },
      );

      // Rotating text container
      gsap.fromTo(
        ".hero-rotate-wrap",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 2.9, ease: "power3.out" },
      );

      // Subtitle — clip reveal
      gsap.fromTo(
        ".hero-subtitle",
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.8,
          delay: 3.0,
          ease: "power3.out",
        },
      );

      // CTAs
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 3.2, ease: "power3.out" },
      );

      // Marquee
      gsap.fromTo(
        ".hero-marquee",
        { opacity: 0 },
        { opacity: 0.6, duration: 0.8, delay: 3.4, ease: "power3.out" },
      );

      // Scroll indicator
      gsap.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 3.6, ease: "power3.out" },
      );

      // Floating orbs — continuous motion
      gsap.to(orb1Ref.current, {
        x: 80,
        y: -50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        x: -60,
        y: 40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb3Ref.current, {
        x: 40,
        y: -30,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Shader background — slow drift
      gsap.to(shaderRef.current, {
        backgroundPositionX: "200%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax on scroll
      gsap.to(gridRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(orb1Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(orb2Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(orb3Ref.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      // Name parallax — moves up slightly faster than content
      gsap.to(".hero-name-wrap", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Content parallax fade
      gsap.to(".hero-content", {
        yPercent: -15,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  const marqueeItems = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Docker",
    "Redis",
    "CI/CD",
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated grid */}
      <div ref={gridRef} className="absolute inset-0 grid-bg" />

      {/* Shader background — animated gradient sweep */}
      <div
        ref={shaderRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(124,92,255,0.08) 30%, rgba(0,224,198,0.08) 60%, transparent 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Radial mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, var(--bg) 75%)",
        }}
      />

      {/* Mesh gradient blobs */}
      <div
        ref={orb1Ref}
        className="mesh-blob w-[500px] h-[500px] left-[5%] top-[15%]"
        style={{ background: "#7C5CFF", opacity: 0.15 }}
      />
      <div
        ref={orb2Ref}
        className="mesh-blob w-[400px] h-[400px] right-[5%] bottom-[10%]"
        style={{ background: "#00E0C6", opacity: 0.12, animationDelay: "4s" }}
      />
      <div
        ref={orb3Ref}
        className="mesh-blob w-[300px] h-[300px] left-[40%] top-[60%]"
        style={{ background: "#3DDC97", opacity: 0.08, animationDelay: "8s" }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="float-particle absolute w-1.5 h-1.5 rounded-full bg-accent-violet/40"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="hero-tag inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
          <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
          <span className="text-sm font-mono text-[var(--muted)]">
            Available for opportunities
          </span>
        </div>

        {/* <div className="hero-signal mx-auto mb-8 flex max-w-md items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-2 text-xs text-[var(--muted)] backdrop-blur-sm">
          <span className="font-mono uppercase tracking-[0.18em] text-accent-teal">
            01 / 03
          </span>
          <span className="h-3 w-px bg-[var(--border)]" />
           <span>Designing useful things for the web</span> 
        </div> */}

        {/* Shader-style animated name */}
        <div className="hero-name-wrap mb-4 overflow-hidden">
          <h1
            ref={nameRef}
            className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none flex justify-center"
            aria-label={profile.name}
          >
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="name-char inline-block cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredChar(i)}
                onMouseLeave={() => setHoveredChar(null)}
                style={{
                  background:
                    hoveredChar === i
                      ? "linear-gradient(135deg, #7C5CFF, #00E0C6, #3DDC97)"
                      : "linear-gradient(135deg, #7C5CFF 0%, #00E0C6 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  transform:
                    hoveredChar === i ? "translateY(-12px) scale(1.1)" : "none",
                  filter:
                    hoveredChar === i
                      ? "drop-shadow(0 8px 20px rgba(124,92,255,0.4))"
                      : "none",
                  animation: `gradient-shift 4s ease infinite ${i * 0.1}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Underline glow that follows hovered char */}
        <div className="relative h-px mb-6 mx-auto max-w-xs">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-violet to-transparent opacity-30" />
          <div
            className="absolute top-0 h-px bg-gradient-to-r from-accent-violet to-accent-teal transition-all duration-500 ease-out"
            style={{
              width: hoveredChar !== null ? "40px" : "0px",
              left:
                hoveredChar !== null
                  ? `${(hoveredChar / (nameChars.length - 1)) * 100}%`
                  : "50%",
              transform: "translateX(-50%)",
              opacity: hoveredChar !== null ? 1 : 0,
              boxShadow: "0 0 12px rgba(124,92,255,0.6)",
            }}
          />
        </div>

        <div className="hero-role-line line-mask mb-6">
          <div className="line-inner font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[var(--text)]">
            {profile.title}
            <span className="text-[var(--muted)] mx-2">·</span>
            <span className="gradient-text-static">{profile.stack}</span>
          </div>
        </div>

        {/* Rotating text */}
        <div className="hero-rotate-wrap mb-8">
          <p className="text-lg sm:text-xl text-[var(--muted)]">
            I build{" "}
            <span className="rotate-text-container font-display font-semibold text-[var(--text)]">
              {rotatingWords.map((word, i) => (
                <span
                  key={i}
                  className={`rotate-text-item ${i === wordIndex ? "active" : i === (wordIndex - 1 + rotatingWords.length) % rotatingWords.length ? "exit" : ""}`}
                >
                  {word}
                </span>
              ))}
            </span>
          </p>
        </div>

        <p className="hero-subtitle max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)] leading-relaxed mb-10">
          {profile.shortSummary}
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            ref={primaryBtnRef}
            onClick={scrollToProjects}
            data-cursor="text"
            data-cursor-label="View"
            className="magnetic-btn group px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-teal text-white font-semibold text-sm shadow-glow hover:shadow-glow-teal transition-all duration-300 hover:scale-[1.03] flex items-center gap-2"
          >
            <FolderGit2 size={18} />
            View Projects
          </button>{" "}
          <a
            href="/Rahul-Koli-FullStack-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="text"
            data-cursor-label="Resume"
            className="magnetic-btn px-7 py-3.5 rounded-xl border border-[var(--border)] text-[var(--text)] font-semibold text-sm hover:border-accent-violet hover:bg-[var(--surface)] transition-all duration-300 flex items-center gap-2"
          >
            <FileText size={18} />
            View Resume
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="hero-marquee absolute bottom-20 left-0 right-0 overflow-hidden border-y border-[var(--border)] py-3 opacity-60">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm text-[var(--muted)] mx-6 flex items-center gap-3"
            >
              {item}
              <span className="text-accent-violet">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProjects}
        aria-label="Scroll to content"
        className="hero-scroll-indicator absolute bottom-2 left-1/2 -translate-x-1/2 text-[var(--muted)] hover:text-[var(--text)] transition-colors animate-float z-20 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block">
          Scroll
        </span>
        <ArrowDown size={20} />
      </button>
    </section>
  );
}

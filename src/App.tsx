import { useTheme } from '@/hooks/useTheme';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import { Analytics } from '@vercel/analytics/react';
function App() {
  const { theme, toggle } = useTheme();
  useSmoothScroll();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <div className="noise-overlay" />
      <Nav theme={theme} onToggleTheme={toggle} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;

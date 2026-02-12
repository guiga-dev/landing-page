import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { logos } from '../data/mock';

export const ScrollLogoSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate progress: 0 when section enters viewport, 1 when it's fully scrolled through
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      const progress = Math.max(0, Math.min(1, current / total));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 0.3 + scrollProgress * 1.2;
  const opacity = scrollProgress < 0.2 ? scrollProgress * 5 : scrollProgress > 0.8 ? (1 - scrollProgress) * 5 : 1;
  const rotate = (1 - scrollProgress) * 15;
  const blur = scrollProgress < 0.3 ? (1 - scrollProgress / 0.3) * 10 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-[#030B1A]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background radial lines */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-[200%] w-px origin-top"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                background: `linear-gradient(to bottom, transparent, rgba(37,99,235,${0.03 * scrollProgress}), transparent)`,
              }}
            />
          ))}
        </div>

        {/* Concentric circles */}
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-blue-500/5"
            style={{
              width: `${ring * 250 * scale * 0.5}px`,
              height: `${ring * 250 * scale * 0.5}px`,
              opacity: opacity * 0.3,
            }}
          />
        ))}

        {/* Logo */}
        <div
          className="relative z-10"
          style={{
            transform: `scale(${scale}) rotate(${rotate}deg)`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transition: 'filter 0.1s ease-out',
          }}
        >
          <img
            src={logos.blue}
            alt="Movii"
            className="w-64 sm:w-80 lg:w-96 h-auto object-contain"
            style={{ filter: 'brightness(1.2) drop-shadow(0 0 60px rgba(37,99,235,0.3))' }}
          />
        </div>

        {/* Floating text */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: scrollProgress > 0.6 ? (scrollProgress - 0.6) * 2.5 : 0 }}
        >
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase font-light">
            Marketing em movimento
          </p>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { LetterSwapForward } from './ui/letter-swap';
import { useTheme } from '../hooks/useTheme';

const FloatingParticle = ({ delay, x, y, size }) => (
  <motion.div
    className="absolute rounded-full bg-blue-300/15 dark:bg-blue-500/20"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      delay: delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
  }));

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030B1A]"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-100 dark:opacity-30">
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos) => (
          <div key={`h-${pos}`} className="absolute left-0 right-0 h-px bg-slate-200 dark:bg-blue-500/5" style={{ top: `${pos}%` }} />
        ))}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos) => (
          <div key={`v-${pos}`} className="absolute top-0 bottom-0 w-px bg-slate-200 dark:bg-blue-500/5" style={{ left: `${pos}%` }} />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-5 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Secondary glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-3 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.4) 0%, transparent 70%)',
          right: '10%',
          top: '20%',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
            Marketing Digital que Transforma
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight tracking-tight"
        >
          <LetterSwapForward
            label="Sua marca em"
            autoTrigger={true}
            autoTriggerDelay={1500}
            className="text-slate-900 dark:text-white cursor-pointer"
          />
          <br />
          <span className="relative inline-flex flex-col items-center">
            <LetterSwapForward
              label="movimento"
              reverse={false}
              autoTrigger={true}
              autoTriggerDelay={1800}
              staggerFrom="center"
              className="text-blue-600 dark:text-blue-400 cursor-pointer"
            />
            <motion.span
              className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-lg sm:text-xl text-slate-500 dark:text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Estratégias digitais que geram resultados reais. Automações, redes sociais,
          tráfego pago e sites que convertem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1"
          >
            Comece agora
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => document.querySelector('#resultados')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium px-8 py-6 text-lg rounded-full transition-colors duration-300"
          >
            <Play className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-400" />
            Ver resultados
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-slate-300 dark:text-white/30 cursor-pointer"
            onClick={() => document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import { stats } from '../data/mock';

const StatItem = ({ stat, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });
  const count = useCountUp(stat.value, 2500, isVisible);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative text-center group"
    >
      <div className="relative">
        <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          {count}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            {stat.suffix}
          </span>
        </div>
        <div className="text-slate-400 dark:text-white/40 text-sm font-medium tracking-wide uppercase">
          {stat.label}
        </div>
      </div>
      {/* Decorative line */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-500/30 to-transparent"
        initial={{ width: 0 }}
        animate={isVisible ? { width: '80%' } : {}}
        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
      />
    </motion.div>
  );
};

export const StatsSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="relative py-28 bg-slate-50 dark:bg-[#050E21]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

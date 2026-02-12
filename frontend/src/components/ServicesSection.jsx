import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Share2, TrendingUp, Code, ArrowUpRight, ChevronRight } from 'lucide-react';
import { services } from '../data/mock';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap = {
  Zap: Zap,
  Share2: Share2,
  TrendingUp: TrendingUp,
  Code: Code,
};

const ServiceCard = ({ service, index, isActive, onHover }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      className={`group relative rounded-2xl p-8 cursor-pointer transition-all duration-500 ${
        isActive
          ? 'bg-blue-600/10 border-blue-500/30 shadow-xl shadow-blue-500/10'
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
      } border`}
    >
      {/* Glow effect */}
      {isActive && (
        <motion.div
          layoutId="serviceGlow"
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
          isActive
            ? 'bg-blue-600 shadow-lg shadow-blue-500/30'
            : 'bg-white/5 group-hover:bg-blue-600/20'
        }`}>
          <Icon className={`w-6 h-6 transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'
          }`} />
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{service.title}</h3>
          <ArrowUpRight className={`w-5 h-5 transition-all duration-300 ${
            isActive ? 'text-blue-400 translate-x-0 translate-y-0' : 'text-white/20 translate-x-1 translate-y-1'
          }`} />
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 text-sm text-blue-300/80"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);
  const [titleRef, titleVisible] = useScrollReveal();

  return (
    <section id="servicos" className="relative py-32 bg-[#030B1A]">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Nossos Serviços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
          >
            Soluções que
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"> impulsionam</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-white/40 text-lg max-w-xl mx-auto"
          >
            Cada serviço é pensado para levar sua marca ao próximo nível
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === service.id}
              onHover={setActiveService}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

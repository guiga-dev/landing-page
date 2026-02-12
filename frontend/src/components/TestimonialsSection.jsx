import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mock';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Avatar, AvatarFallback } from './ui/avatar';

export const TestimonialsSection = () => {
  const [titleRef, titleVisible] = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="depoimentos" className="relative py-32 bg-slate-50 dark:bg-[#050E21]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-blue-500/20 to-transparent" />

      {/* Background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] opacity-3 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
          >
            O que dizem sobre
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent"> n\u00f3s</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-8 rounded-2xl border transition-colors duration-500 h-full ${
                      activeIndex === index
                        ? 'bg-blue-50 dark:bg-blue-600/5 border-blue-200 dark:border-blue-500/20 shadow-lg shadow-blue-100 dark:shadow-blue-500/5'
                        : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06]'
                    }`}
                  >
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-blue-200 dark:text-blue-500/20 mb-6" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-blue-500 dark:fill-blue-400 text-blue-500 dark:text-blue-400" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-8">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/20">
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 text-sm font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-slate-900 dark:text-white text-sm font-semibold">{testimonial.name}</div>
                        <div className="text-slate-400 dark:text-white/40 text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/50 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'w-6 bg-blue-500'
                      : 'w-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/50 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

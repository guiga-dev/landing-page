import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navLinks, logos } from '../data/mock';
import { Button } from './ui/button';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
      isScrolled ?
      'bg-white/90 dark:bg-[#030B1A]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-lg shadow-slate-200/50 dark:shadow-blue-500/5' :
      'bg-transparent'}`
      }>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {e.preventDefault();scrollToSection('#hero');}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10">

            <div className={`flex items-center rounded-xl overflow-hidden transition-colors duration-300 ${isDark ? '' : 'bg-[#0A1628] px-3 py-1.5'}`}>
              <img
                src={logos.white}
                alt="Movii"
                className="h-30 w-40 object-contain"
                style={{ filter: 'brightness(1.1)' }} />

            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) =>
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => {e.preventDefault();scrollToSection(link.href);}}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group">

                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors duration-300"
              aria-label="Alternar tema">

              <AnimatePresence mode="wait">
                {isDark ?
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>

                    <Sun className="w-4 h-4" />
                  </motion.div> :

                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>

                    <Moon className="w-4 h-4" />
                  </motion.div>
                }
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}>

              <Button
                onClick={() => scrollToSection('#contato')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">

                Fale conosco
              </Button>
            </motion.div>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="relative z-10 p-2 text-slate-500 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Alternar tema">

              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="relative z-10 p-2 text-slate-700 dark:text-white">

              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white/98 dark:bg-[#030B1A]/98 backdrop-blur-xl border-t border-slate-200 dark:border-white/5">

            <nav className="flex flex-col px-6 py-6 gap-2">
              {navLinks.map((link, i) =>
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => {e.preventDefault();scrollToSection(link.href);}}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="px-4 py-3 text-base text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors duration-300">

                  {link.label}
                </motion.a>
            )}
              <Button
              onClick={() => scrollToSection('#contato')}
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-full">

                Fale conosco
              </Button>
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </motion.header>);

};
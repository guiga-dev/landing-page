import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { footerLinks, logos } from '../data/mock';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap = {
  Instagram: Instagram,
  Linkedin: Linkedin,
  Youtube: Youtube,
};

export const Footer = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <footer ref={ref} className="relative bg-slate-900 dark:bg-[#020812] pt-20 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img
              src={logos.white}
              alt="Movii"
              className="h-10 w-auto object-contain mb-6"
              style={{ filter: 'brightness(1.1)' }}
            />
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Transformando marcas atrav\u00e9s do marketing digital. Estrat\u00e9gias que geram resultados reais.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Servi\u00e7os */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Servi\u00e7os</h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-white/40 text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-white/40 text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${footerLinks.contato.email}`} className="flex items-center gap-3 text-white/40 text-sm hover:text-blue-400 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-blue-500/50" />
                  {footerLinks.contato.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footerLinks.contato.phone}`} className="flex items-center gap-3 text-white/40 text-sm hover:text-blue-400 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-blue-500/50" />
                  {footerLinks.contato.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-blue-500/50" />
                {footerLinks.contato.address}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            \u00a9 {new Date().getFullYear()} Movii. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors duration-300">
              Pol\u00edtica de Privacidade
            </a>
            <a href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors duration-300">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

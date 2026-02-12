import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { toast } from 'sonner';

export const CTASection = () => {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contato" className="relative py-32 bg-[#030B1A]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.4) 0%, transparent 70%)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Fale Conosco
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Pronto para
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"> crescer?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mt-6 text-white/40 text-lg leading-relaxed"
            >
              Envie uma mensagem e nossa equipe entrará em contato para entender suas necessidades e criar uma estratégia personalizada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4 text-white/50">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm">Resposta em até 24 horas</span>
              </div>
              <div className="flex items-center gap-4 text-white/50">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Send className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm">Consultoria gratuita incluída</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Nome</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                    required
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 h-12 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">E-mail</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      required
                      className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Telefone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 h-12 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Mensagem</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Conte-nos sobre seu projeto..."
                    required
                    rows={4}
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar mensagem
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

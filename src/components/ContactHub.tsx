import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';

export default function ContactHub() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="contact" className="py-8 md:py-12">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl px-5 py-10 sm:px-12 sm:py-14 text-center transition-colors ${
            isDark
              ? 'bg-[#170f29]/80 border-white/12'
              : 'bg-white/80 border-[#9333ea]/15'
          }`}
          style={{
            boxShadow: isDark
              ? '0 22px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 18px 46px rgba(24,16,36,0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          {/* Ambient sunlit purple & gold glows matching site theme */}
          <div
            className="pointer-events-none absolute -top-20 -left-16 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(147,51,234,0.32) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(147,51,234,0.14) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-12 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(250,204,21,0.14) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(250,204,21,0.18) 0%, rgba(192,132,252,0.10) 45%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* Subtle theme-aware dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)'
                : 'radial-gradient(rgba(147,51,234,0.10) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#facc15] text-[#181024] shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#181024]" />
              {lang === 'id' ? 'Tersedia untuk Freelance & Full-time' : 'Available for Freelance & Full-time'}
            </span>
            <h2
              className={`text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-3 ${
                isDark ? 'text-white' : 'text-[#181024]'
              }`}
            >
              {lang === 'id'
                ? 'Punya ide produk atau campaign yang butuh visual & UX kuat?'
                : 'Have a product or campaign that needs bold visuals & solid UX?'}
            </h2>
            <p className={`text-sm sm:text-base mb-7 ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
              {lang === 'id'
                ? 'Mari diskusi santai — kirim brief atau sapa langsung lewat Email atau LinkedIn'
                : 'Let’s have a quick chat — send over a brief or say hello via Email or LinkedIn'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-extrabold text-xs sm:text-sm shadow-sm transition-colors ${
                  isDark
                    ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                    : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
                }`}
              >
                <span>{lang === 'id' ? 'Kirim Email' : 'Send Email'}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-full border backdrop-blur-md font-extrabold text-xs sm:text-sm transition-colors ${
                  isDark
                    ? 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                    : 'bg-white/85 border-[#9333ea]/20 text-[#181024] hover:border-[#9333ea]/50 hover:text-[#9333ea]'
                }`}
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

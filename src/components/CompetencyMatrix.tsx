import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';

export default function CompetencyMatrix() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';

  const skills = [
    'Figma & Design Systems',
    'User Research & Wireframing',
    'System Analysis (UML / BPMN)',
    'Visual Storytelling & Branding',
    'Astro / HTML / CSS / React',
  ];

  return (
    <section id="about" className="py-8 md:py-10">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <span className="inline-block text-xs font-extrabold tracking-widest text-purple-accent mb-2">
            {lang === 'id' ? 'TENTANG SAYA' : 'ABOUT ME'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: 'var(--text)' }}>
            {lang === 'id'
              ? 'Memadukan Visual Kuat & Logika Sistem'
              : 'Blending Bold Visuals & System Logic'}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            {lang === 'id'
              ? 'Lulusan S1 Pendidikan Teknik Informatika dan Komputer UNNES (IPK 3,85/4,00) dengan sertifikasi Analis Sistem (BNSP), terbiasa menerjemahkan kebutuhan bisnis yang kompleks menjadi antarmuka yang intuitif dan visual campaign yang langsung menangkap perhatian audiens'
              : 'B.Ed. in Informatics & Computer Engineering from UNNES (GPA 3.85/4.00) and certified System Analyst (BNSP), turning complex business requirements into intuitive interfaces and expressive campaign visuals that grab attention immediately'}
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md cursor-default ${
                  isDark
                    ? 'bg-white/8 border-white/12 text-white/90 hover:border-[#facc15]/40'
                    : 'bg-white/80 border-[#9333ea]/15 text-[#181024] hover:border-[#9333ea]/40'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <motion.a
              href={profile.cvUrl}
              download
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full text-xs font-extrabold shadow-sm transition-colors ${
                isDark
                  ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                  : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
              }`}
            >
              <span>Download Resume (PDF)</span>
              <ArrowDown size={13} strokeWidth={2.5} />
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full text-xs font-extrabold border backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                  : 'bg-white/85 border-[#9333ea]/20 text-[#181024] hover:border-[#9333ea]/50 hover:text-[#9333ea]'
              }`}
            >
              <span>{lang === 'id' ? 'Profil Lengkap' : 'Full Profile'}</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </motion.a>
          </div>
        </motion.div>

        <div className="lg:col-span-6 grid gap-3.5">
          {profile.experiences.slice(0, 3).map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`rounded-2xl border backdrop-blur-xl p-5 transition-colors ${
                isDark
                  ? 'bg-[#170f29]/75 border-white/12 hover:border-[#facc15]/35'
                  : 'bg-white/80 border-[#9333ea]/15 hover:border-[#9333ea]/35'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 14px 34px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)'
                  : '0 12px 30px rgba(24,16,36,0.05), inset 0 1px 0 rgba(255,255,255,0.75)',
              }}
            >
              <span
                className={`inline-block text-xs font-extrabold mb-1 ${
                  isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                }`}
              >
                {lang === 'id' ? exp.periodId : exp.periodEn}
              </span>
              <h3 className={`text-base font-extrabold mb-1 ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                {exp.role} — {exp.company}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                {exp.location} · {lang === 'id' ? exp.descId : exp.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

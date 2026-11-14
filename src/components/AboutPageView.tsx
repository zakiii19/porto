import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Award, Briefcase, GraduationCap, MapPin, Users } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';

type ExpFilter = 'all' | 'work' | 'org';
type CertFilter = 'all' | 'achievement' | 'tech' | 'design' | 'language';

export default function AboutPageView() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [expFilter, setExpFilter] = useState<ExpFilter>('all');
  const [certFilter, setCertFilter] = useState<CertFilter>('all');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  const frameX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const frameY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const portraitX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const portraitY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const cardX = useTransform(smoothX, [-1, 1], [10, -10]);
  const cardY = useTransform(smoothY, [-1, 1], [8, -8]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const workExperiences = profile.experiences;
  const orgExperiences = profile.organizationalExperiences ?? [];
  const totalExperiences = workExperiences.length + orgExperiences.length;

  const filteredCerts =
    certFilter === 'all'
      ? profile.certifications
      : profile.certifications.filter((cert) => cert.category === certFilter);

  const pillClass = (active: boolean) =>
    active
      ? isDark
        ? 'bg-[#facc15] text-[#181024] border-[#facc15]'
        : 'bg-[#181024] text-white border-[#181024]'
      : isDark
      ? 'bg-white/5 text-white/75 border-white/15 hover:bg-white/10 hover:text-white'
      : 'bg-white/80 text-[#5b516a] border-[#9333ea]/15 hover:border-[#9333ea]/40 hover:text-[#181024]';

  const glassCardStyle: React.CSSProperties = {
    boxShadow: isDark
      ? '0 14px 34px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)'
      : '0 12px 30px rgba(24,16,36,0.05), inset 0 1px 0 rgba(255,255,255,0.75)',
  };

  const glassCardClass = isDark
    ? 'bg-[#170f29]/75 border-white/12'
    : 'bg-white/80 border-[#9333ea]/15';

  return (
    <>
      {/* Sunlit Hero */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className={`hero-sunlit-canvas relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14 ${
          isDark ? 'text-white' : 'text-[#181024]'
        }`}
      >
        <div
          className={`dot-grid-overlay absolute inset-0 pointer-events-none ${
            isDark ? 'opacity-35' : 'opacity-25'
          }`}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-10"
          style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg) 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-20 max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border mb-4 ${
                isDark
                  ? 'bg-[#facc15]/15 border-[#facc15]/30 text-[#facc15]'
                  : 'bg-[#f3e8ff]/85 border-[#9333ea]/20 text-[#6b21a8]'
              }`}
            >
              {lang === 'id' ? 'UI/UX Designer · Analis Sistem (BNSP)' : 'UI/UX Designer · System Analyst (BNSP)'}
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {lang === 'id' ? (
                <>
                  Tentang{' '}
                  <em
                    className={`font-serif-accent font-normal text-[1.08em] ${
                      isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                    }`}
                  >
                    Qolbul Muzaki
                  </em>
                </>
              ) : (
                <>
                  About{' '}
                  <em
                    className={`font-serif-accent font-normal text-[1.08em] ${
                      isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                    }`}
                  >
                    Qolbul Muzaki
                  </em>
                </>
              )}
            </h1>

            <p
              className={`text-sm sm:text-base leading-relaxed mb-6 max-w-2xl ${
                isDark ? 'text-white/80' : 'text-[#5b516a]'
              }`}
            >
              {lang === 'id'
                ? `Lulusan ${profile.education.degreeId} — ${profile.education.institution} (${profile.education.period}, IPK ${profile.education.gpa}) yang memadukan riset pengalaman pengguna, analisis sistem tersertifikasi BNSP, dan visual storytelling yang kuat`
                : `Graduate in ${profile.education.degreeEn} — ${profile.education.institution} (${profile.education.period}, GPA ${profile.education.gpa}), combining user experience research, BNSP-certified system analysis, and expressive visual storytelling`}
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <motion.a
                href={profile.cvUrl}
                download
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-extrabold shadow-sm transition-colors ${
                  isDark
                    ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                    : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
                }`}
              >
                <span>Download Resume (PDF)</span>
                <ArrowDown size={14} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full border backdrop-blur-md text-xs sm:text-sm font-extrabold transition-colors ${
                  isDark
                    ? 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                    : 'bg-white/85 border-[#9333ea]/20 text-[#181024] hover:border-[#9333ea]/50 hover:text-[#9333ea]'
                }`}
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Home-style Studio Spotlight + Figma Selection Frame + About.svg + Education Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-end overflow-visible">
            {/* Fixed-Proportion Portrait Anchor Stage matching HeroSection */}
            <div className="relative w-[290px] sm:w-[390px] h-[335px] sm:h-[445px] mx-auto flex items-end justify-center overflow-visible">
            {/* Studio Spotlight Directly Behind Portrait */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] w-[290px] sm:w-[360px] h-[290px] sm:h-[360px] rounded-full pointer-events-none blur-2xl"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, rgba(250,204,21,0.28) 0%, rgba(232,121,249,0.3) 42%, transparent 72%)'
                  : 'radial-gradient(circle, rgba(147,51,234,0.14) 0%, rgba(250,204,21,0.16) 45%, transparent 72%)',
              }}
              aria-hidden="true"
            />

            {/* Subtle Figma Selection Frame */}
            <motion.div
              style={{ x: frameX, y: frameY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute left-1/2 -translate-x-1/2 top-5 sm:top-auto sm:bottom-3 w-[225px] h-[285px] sm:w-[290px] sm:h-[365px] border pointer-events-none z-0 ${
                isDark ? 'border-[#facc15]/45' : 'border-[#9333ea]/35'
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border rounded-[2px] ${
                  isDark ? 'border-[#facc15]' : 'border-[#9333ea]'
                }`}
              />
              <span
                className={`absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border rounded-[2px] ${
                  isDark ? 'border-[#facc15]' : 'border-[#9333ea]'
                }`}
              />
              <span
                className={`absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border rounded-[2px] ${
                  isDark ? 'border-[#facc15]' : 'border-[#9333ea]'
                }`}
              />
              <span
                className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border rounded-[2px] ${
                  isDark ? 'border-[#facc15]' : 'border-[#9333ea]'
                }`}
              />
              <div
                className={`absolute inset-x-0 top-1/3 border-t border-dashed ${
                  isDark ? 'border-[#facc15]/20' : 'border-[#9333ea]/15'
                }`}
              />
              <div
                className={`absolute inset-x-0 top-2/3 border-t border-dashed ${
                  isDark ? 'border-[#facc15]/20' : 'border-[#9333ea]/15'
                }`}
              />
              <div
                className={`absolute inset-y-0 left-1/3 border-l border-dashed ${
                  isDark ? 'border-[#facc15]/20' : 'border-[#9333ea]/15'
                }`}
              />
              <div
                className={`absolute inset-y-0 left-2/3 border-l border-dashed ${
                  isDark ? 'border-[#facc15]/20' : 'border-[#9333ea]/15'
                }`}
              />
              <span
                className={`absolute -top-5 left-0 text-[10px] font-mono font-semibold ${
                  isDark ? 'text-[#facc15]/80' : 'text-[#9333ea]/80'
                }`}
              >
                ❖ About.svg
              </span>
            </motion.div>

            {/* Central Cutout Portrait */}
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="portrait-fade-mask relative z-20 shrink-0 w-[260px] sm:w-[340px] h-[320px] sm:h-[420px] flex items-end justify-center"
            >
              <img
                src="/About.svg"
                alt={profile.name}
                loading="eager"
                decoding="sync"
                className={`w-full h-full object-contain object-bottom ${
                  isDark
                    ? 'drop-shadow-[0_24px_45px_rgba(24,16,36,0.45)]'
                    : 'drop-shadow-[0_20px_38px_rgba(147,51,234,0.16)]'
                }`}
              />
            </motion.div>

            {/* Floating Location Pill (Top Right) */}
            <motion.div
              style={{ x: cardX, y: cardY }}
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.48, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block absolute top-8 right-2 lg:-right-2 z-30"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-sm ${
                  isDark
                    ? 'bg-[#170f29]/85 border-white/15 text-white'
                    : 'bg-white/90 border-[#9333ea]/20 text-[#181024]'
                }`}
              >
                <MapPin size={12} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                <span>{profile.location}</span>
              </motion.div>
            </motion.div>

            {/* Floating Education Snapshot Card (Desktop & Tablet Locked to Portrait) */}
            <motion.div
              style={{ x: cardX, y: cardY }}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block absolute bottom-3 -left-4 lg:-left-8 z-30 w-[260px]"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`rounded-2xl border backdrop-blur-xl p-3.5 ${glassCardClass}`}
                style={glassCardStyle}
              >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={14} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                    }`}
                  >
                    {lang === 'id' ? 'Pendidikan' : 'Education'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#facc15] text-[#181024]">
                  {lang === 'id' ? `IPK ${profile.education.gpa}` : `GPA ${profile.education.gpa}`}
                </span>
              </div>
              <strong className={`block text-xs font-extrabold ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                {profile.education.institution}
              </strong>
              <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                {lang === 'id' ? profile.education.degreeId : profile.education.degreeEn} · {profile.education.period}
              </p>
              </motion.div>
            </motion.div>
            </div>

            {/* Mobile Compact Education + Location Card (Visible < sm) */}
            <div className={`sm:hidden w-full mt-3 rounded-2xl border backdrop-blur-xl p-3.5 ${glassCardClass}`} style={glassCardStyle}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={14} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                    }`}
                  >
                    {lang === 'id' ? 'Pendidikan' : 'Education'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#facc15] text-[#181024]">
                  {lang === 'id' ? `IPK ${profile.education.gpa}` : `GPA ${profile.education.gpa}`}
                </span>
              </div>
              <strong className={`block text-xs font-extrabold ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                {profile.education.institution}
              </strong>
              <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                {lang === 'id' ? profile.education.degreeId : profile.education.degreeEn} · {profile.education.period}
              </p>
              <div className={`mt-2 pt-2 border-t flex items-center gap-1.5 text-[11px] font-bold ${isDark ? 'border-white/10 text-white/80' : 'border-[#9333ea]/12 text-[#5b516a]'}`}>
                <MapPin size={12} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Certifications */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <span
              className={`inline-block text-xs font-extrabold tracking-widest mb-2 ${
                isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
              }`}
            >
              {lang === 'id' ? 'PENGALAMAN LENGKAP' : 'FULL EXPERIENCE'}
            </span>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 ${
                isDark ? 'text-white' : 'text-[#181024]'
              }`}
            >
              {lang === 'id' ? 'Riwayat Karier, Organisasi & Program' : 'Career, Organization & Program History'}
            </h2>

            <div className="flex flex-nowrap overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() => setExpFilter('all')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${pillClass(
                  expFilter === 'all'
                )}`}
              >
                {lang === 'id' ? `Semua (${totalExperiences})` : `All (${totalExperiences})`}
              </button>
              <button
                type="button"
                onClick={() => setExpFilter('work')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${pillClass(
                  expFilter === 'work'
                )}`}
              >
                {lang === 'id'
                  ? `Kerja & Freelance (${workExperiences.length})`
                  : `Work & Freelance (${workExperiences.length})`}
              </button>
              <button
                type="button"
                onClick={() => setExpFilter('org')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${pillClass(
                  expFilter === 'org'
                )}`}
              >
                {lang === 'id'
                  ? `Organisasi & Program (${orgExperiences.length})`
                  : `Organizations & Programs (${orgExperiences.length})`}
              </button>
            </div>

            <div className="space-y-6">
              {(expFilter === 'all' || expFilter === 'work') && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={15} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                    <h3
                      className={`text-xs font-extrabold uppercase tracking-wider ${
                        isDark ? 'text-white/80' : 'text-[#5b516a]'
                      }`}
                    >
                      {lang === 'id' ? 'Pengalaman Kerja & Freelance' : 'Work & Freelance Experience'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                    {workExperiences.map((exp, idx) => (
                      <div
                        key={`work-${idx}`}
                        className={`rounded-2xl border backdrop-blur-xl p-4 sm:p-5 transition-all ${glassCardClass}`}
                        style={glassCardStyle}
                      >
                        <span
                          className={`inline-block text-xs font-extrabold mb-1 ${
                            isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                          }`}
                        >
                          {lang === 'id' ? exp.periodId : exp.periodEn}
                        </span>
                        <h4 className={`text-base font-extrabold mb-1 ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                          {exp.role} — {exp.company}
                        </h4>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                          {exp.location} · {lang === 'id' ? exp.descId : exp.descEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(expFilter === 'all' || expFilter === 'org') && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={15} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                    <h3
                      className={`text-xs font-extrabold uppercase tracking-wider ${
                        isDark ? 'text-white/80' : 'text-[#5b516a]'
                      }`}
                    >
                      {lang === 'id'
                        ? 'Organisasi, Mentoring & Studi Independen'
                        : 'Organizations, Mentoring & Independent Study'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                    {orgExperiences.map((exp, idx) => (
                      <div
                        key={`org-${idx}`}
                        className={`rounded-2xl border backdrop-blur-xl p-4 sm:p-5 transition-all ${glassCardClass}`}
                        style={glassCardStyle}
                      >
                        <span
                          className={`inline-block text-xs font-extrabold mb-1 ${
                            isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                          }`}
                        >
                          {lang === 'id' ? exp.periodId : exp.periodEn}
                        </span>
                        <h4 className={`text-base font-extrabold mb-1 ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                          {exp.role} — {exp.company}
                        </h4>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                          {exp.location} · {lang === 'id' ? exp.descId : exp.descEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <span
              className={`inline-block text-xs font-extrabold tracking-widest mb-2 ${
                isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
              }`}
            >
              {lang === 'id' ? 'PENCAPAIAN & SERTIFIKAT' : 'ACHIEVEMENTS & CERTIFICATES'}
            </span>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 ${
                isDark ? 'text-white' : 'text-[#181024]'
              }`}
            >
              {lang === 'id' ? 'Sertifikasi & Penghargaan' : 'Certifications & Awards'}
            </h2>

            <div className="flex flex-nowrap overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 mb-6">
              {(
                [
                  { id: 'all', labelId: `Semua (${profile.certifications.length})`, labelEn: `All (${profile.certifications.length})` },
                  { id: 'achievement', labelId: 'Prestasi', labelEn: 'Awards' },
                  { id: 'tech', labelId: 'IT & Sistem', labelEn: 'IT & System' },
                  { id: 'design', labelId: 'Desain', labelEn: 'Design' },
                  { id: 'language', labelId: 'Bahasa', labelEn: 'Language' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCertFilter(tab.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${pillClass(
                    certFilter === tab.id
                  )}`}
                >
                  {lang === 'id' ? tab.labelId : tab.labelEn}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {filteredCerts.map((cert, idx) => (
                <div
                  key={`${cert.title}-${idx}`}
                  className={`rounded-2xl border backdrop-blur-xl p-4 flex items-start justify-between gap-3 ${glassCardClass}`}
                  style={glassCardStyle}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl grid place-items-center shrink-0 mt-0.5 ${
                        isDark ? 'bg-[#facc15]/15 text-[#facc15]' : 'bg-[#f3e8ff] text-[#9333ea]'
                      }`}
                    >
                      <Award size={15} />
                    </span>
                    <div>
                      <strong className={`block text-sm font-extrabold mb-0.5 ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                        {cert.title}
                      </strong>
                      <span className={`text-xs ${isDark ? 'text-white/70' : 'text-[#5b516a]'}`}>
                        {cert.issuer} · {cert.year}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shrink-0 ${
                      isDark ? 'bg-white/10 text-[#facc15]' : 'bg-[#f3e8ff] text-[#7e22ce]'
                    }`}
                  >
                    {cert.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

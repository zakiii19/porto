import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, ShieldCheck, Trophy } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';

const HIGHLIGHT_META = [
  { icon: Briefcase, tagId: 'KARIR', tagEn: 'CAREER' },
  { icon: Trophy, tagId: 'PRESTASI', tagEn: 'ACHIEVEMENT' },
  { icon: Award, tagId: 'STUDI INDEPENDEN', tagEn: 'BOOTCAMP' },
  { icon: ShieldCheck, tagId: 'SERTIFIKASI', tagEn: 'CERTIFICATION' },
];

const CLOUD_LAYOUT: Record<
  string,
  { pos: string; rot: string; blur: string; opacity: string; imgClass: string; float: string; tooltipBottom?: boolean }
> = {
  // Inner Ring — Square / Compact Logos near center text
  'LJH Realty Semarang Kota': {
    pos: 'top-[14%] left-[25%]',
    rot: '-rotate-6',
    blur: 'blur-[1px]',
    opacity: 'opacity-90',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[90px]',
    float: 'animate-float-a',
  },
  SchoolTechId: {
    pos: 'top-[12%] right-[25%]',
    rot: 'rotate-6',
    blur: 'blur-[1px]',
    opacity: 'opacity-90',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[90px]',
    float: 'animate-float-b',
  },
  Custompedia: {
    pos: 'top-[43%] left-[20%]',
    rot: '-rotate-3',
    blur: 'blur-[0.8px]',
    opacity: 'opacity-95',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[90px]',
    float: 'animate-float-b',
  },
  'CKJ Management': {
    pos: 'top-[42%] right-[20%]',
    rot: 'rotate-6',
    blur: 'blur-[0.8px]',
    opacity: 'opacity-95',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[90px]',
    float: 'animate-float-a',
  },
  'Gudha Pranahara Indonesia': {
    pos: 'bottom-[15%] left-[26%]',
    rot: 'rotate-3',
    blur: 'blur-[1.2px]',
    opacity: 'opacity-85',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[100px]',
    float: 'animate-float-a',
  },
  'AMJD.Shoot': {
    pos: 'bottom-[11%] left-[47%] -translate-x-1/2',
    rot: '-rotate-3',
    blur: 'blur-[1px]',
    opacity: 'opacity-90',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[90px]',
    float: 'animate-float-b',
  },
  'Photo Instax Semarang': {
    pos: 'bottom-[15%] right-[26%]',
    rot: '-rotate-6',
    blur: 'blur-[1.2px]',
    opacity: 'opacity-85',
    imgClass: 'h-10 lg:h-11 w-auto max-w-[90px]',
    float: 'animate-float-a',
  },

  // Outer Ring — Wide / Rectangular / Lettering Logos
  'Viula Studio': {
    pos: 'top-[7%] left-[8%]',
    rot: '-rotate-6',
    blur: 'blur-[2.2px]',
    opacity: 'opacity-75',
    imgClass: 'h-8 lg:h-9 w-auto max-w-[130px]',
    float: 'animate-float-b',
    tooltipBottom: true,
  },
  'Bank Jateng': {
    pos: 'top-[5%] left-[48%] -translate-x-1/2',
    rot: 'rotate-2',
    blur: 'blur-[2px]',
    opacity: 'opacity-80',
    imgClass: 'h-8 lg:h-9 w-auto max-w-[135px]',
    float: 'animate-float-a',
    tooltipBottom: true,
  },
  'Inago Design': {
    pos: 'top-[7%] right-[8%]',
    rot: 'rotate-6',
    blur: 'blur-[2.2px]',
    opacity: 'opacity-75',
    imgClass: 'h-8 lg:h-9 w-auto max-w-[130px]',
    float: 'animate-float-a',
    tooltipBottom: true,
  },
  Kolavit: {
    pos: 'top-[32%] left-[4%]',
    rot: 'rotate-3',
    blur: 'blur-[2.8px]',
    opacity: 'opacity-70',
    imgClass: 'h-8 lg:h-9 w-auto max-w-[135px]',
    float: 'animate-float-a',
  },
  'Prasada Fusion': {
    pos: 'top-[32%] right-[4%]',
    rot: '-rotate-3',
    blur: 'blur-[2.8px]',
    opacity: 'opacity-70',
    imgClass: 'h-7 lg:h-8 w-auto max-w-[145px]',
    float: 'animate-float-b',
  },
  Gangliofid: {
    pos: 'bottom-[26%] left-[5%]',
    rot: '-rotate-6',
    blur: 'blur-[2.6px]',
    opacity: 'opacity-70',
    imgClass: 'h-6 lg:h-7 w-auto max-w-[145px]',
    float: 'animate-float-b',
  },
  Megacodify: {
    pos: 'bottom-[26%] right-[5%]',
    rot: 'rotate-6',
    blur: 'blur-[2.6px]',
    opacity: 'opacity-70',
    imgClass: 'h-6 lg:h-7 w-auto max-w-[145px]',
    float: 'animate-float-a',
  },
  Platinum: {
    pos: 'bottom-[5%] left-[12%]',
    rot: 'rotate-3',
    blur: 'blur-[2.4px]',
    opacity: 'opacity-75',
    imgClass: 'h-6 lg:h-7 w-auto max-w-[135px]',
    float: 'animate-float-a',
  },
};

export default function CareerSnapshot() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';

  const nodeCardClass = isDark
    ? 'bg-[#170f29]/95 border-white/12 text-white shadow-[0_14px_34px_rgba(0,0,0,0.4)] hover:border-[#facc15]/45'
    : 'bg-white border-[#9333ea]/12 text-[#181024] shadow-[0_12px_32px_rgba(24,16,36,0.06)] hover:border-[#9333ea]/30 hover:shadow-[0_16px_38px_rgba(147,51,234,0.1)]';

  const strokeColor = isDark ? 'rgba(250, 204, 21, 0.42)' : 'rgba(147, 51, 234, 0.34)';
  const dotBg = isDark ? '#170f29' : '#ffffff';
  const dotBorder = isDark ? '#facc15' : '#9333ea';

  return (
    <section id="highlights" className="relative z-20 -mt-4 pt-0 pb-4">
      <div className="max-w-[1180px] mx-auto px-6 space-y-4">
        {/* Horizontal Node-Flow Highlights Diagram */}
        <div className="relative py-2">
          {/* Subtle Faint Dot-Grid Backdrop */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-45"
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)'
                : 'radial-gradient(rgba(147,51,234,0.13) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
            }}
            aria-hidden="true"
          />

          {/* Horizontal Connected Nodes (Desktop) + Clean Stack (Mobile) */}
          <div className="relative z-10">
            {/* Horizontal Connector Line Behind Cards on Desktop */}
            <div
              className="hidden lg:block absolute left-10 right-10 top-1/2 -translate-y-1/2 h-px pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(to right, ${strokeColor} 0 6px, transparent 6px 12px)`,
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
              {profile.highlights.map((item, idx) => {
                const meta = HIGHLIGHT_META[idx] || HIGHLIGHT_META[0];
                const Icon = meta.icon;
                const isFirst = idx === 0;
                const isLast = idx === profile.highlights.length - 1;

                const nodeCardClass = isDark
    ? 'bg-[#170f29]/95 border-white/12 text-white shadow-[0_14px_34px_rgba(0,0,0,0.4)] hover:border-[#facc15]/45'
    : 'bg-white border-[#9333ea]/12 text-[#181024] shadow-[0_12px_32px_rgba(24,16,36,0.06)] hover:border-[#9333ea]/30 hover:shadow-[0_16px_38px_rgba(147,51,234,0.1)]';

  const pillNodeClass = isDark
    ? 'bg-[#1b1230]/95 border-white/15 text-white/85 shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
    : 'bg-white border-[#9333ea]/14 text-[#181024] shadow-[0_8px_24px_rgba(24,16,36,0.05)]';

  const strokeColor = isDark ? 'rgba(250, 204, 21, 0.42)' : 'rgba(147, 51, 234, 0.34)';
  const dotBg = isDark ? '#170f29' : '#ffffff';
  const dotBorder = isDark ? '#facc15' : '#9333ea';

  return (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-stretch"
                  >
                    {/* Left Anchor Dot (Desktop) */}
                    {!isFirst && (
                      <span
                        className="hidden lg:block absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-[1.75px] z-20"
                        style={{ backgroundColor: dotBg, borderColor: dotBorder }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Node Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                      className={`w-full rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-colors duration-200 relative z-10 ${nodeCardClass}`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg grid place-items-center ${
                              isDark ? 'bg-[#facc15]/15 text-[#facc15]' : 'bg-[#f3e8ff] text-[#7e22ce]'
                            }`}
                          >
                            <Icon size={14} />
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">
                            {lang === 'id' ? meta.tagId : meta.tagEn}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                            isDark ? 'bg-white/10 text-white/80' : 'bg-[#faf7fe] text-[#7e22ce]'
                          }`}
                        >
                          {item.num}
                        </span>
                      </div>

                      <div>
                        <strong className="block text-sm font-extrabold leading-snug mb-1">
                          {lang === 'id' ? item.titleId : item.titleEn}
                        </strong>
                        <small className={`block text-xs leading-relaxed ${isDark ? 'text-white/65' : 'text-[#5b516a]'}`}>
                          {lang === 'id' ? item.subId : item.subEn}
                        </small>
                      </div>
                    </motion.div>

                    {/* Right Anchor Dot (Desktop) */}
                    {!isLast && (
                      <span
                        className="hidden lg:block absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-[1.75px] z-20"
                        style={{ backgroundColor: dotBg, borderColor: dotBorder }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Spatial Depth-of-Field Brand Cloud with Clean Ambient Studio Glow */}
        <div className="relative overflow-visible py-2 md:py-3">
          {/* Desktop Spatial Floating Cloud */}
          <div className="hidden md:flex relative max-w-[960px] mx-auto h-[360px] lg:h-[385px] items-center justify-center">
            {/* Soft Diffused Radial Studio Glow (Clean & Uncluttered) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[300px] rounded-full blur-[90px]"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at center, rgba(147,51,234,0.28) 0%, rgba(250,204,21,0.08) 48%, transparent 75%)'
                  : 'radial-gradient(ellipse at center, rgba(147,51,234,0.12) 0%, rgba(250,204,21,0.09) 48%, transparent 75%)',
              }}
              aria-hidden="true"
            />

            {/* Center Focal Typography & Pill */}
            <div className="relative z-20 max-w-md text-center px-6">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-extrabold mb-4 ${
                  isDark
                    ? 'bg-white/10 border-white/15 text-[#facc15]'
                    : 'bg-white border-[#9333ea]/15 text-[#7e22ce] shadow-sm'
                }`}
              >
                <span>
                  ✦ {profile.clients.length}+{' '}
                  {lang === 'id' ? 'Brand, Agensi & Institusi' : 'Brands, Agencies & Institutions'}
                </span>
              </div>

              <h3
                className={`text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug mb-4 ${
                  isDark ? 'text-white' : 'text-[#181024]'
                }`}
              >
                {lang === 'id' ? (
                  <>
                    Dipercaya oleh berbagai{' '}
                    <em
                      className={`font-serif-accent font-normal text-[1.15em] ${
                        isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                      }`}
                    >
                      brand &amp; tim hebat
                    </em>
                  </>
                ) : (
                  <>
                    Trusted by{' '}
                    <em
                      className={`font-serif-accent font-normal text-[1.15em] ${
                        isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                      }`}
                    >
                      great brands &amp; teams
                    </em>
                  </>
                )}
              </h3>

              <a
                href="#work"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-lg transition-transform hover:-translate-y-0.5 ${
                  isDark ? 'bg-white text-[#181024]' : 'bg-[#181024] text-white'
                }`}
              >
                {lang === 'id' ? 'Lihat Studi Kasus ↓' : 'Explore Case Studies ↓'}
              </a>
            </div>

            {/* 15 Floating Blurred Logos -> Crisp Focus on Hover */}
            {profile.clients.map((c) => {
              const slot = CLOUD_LAYOUT[c.name] || CLOUD_LAYOUT['LJH Realty Semarang Kota'];
              const isBottomTip = Boolean(slot.tooltipBottom);
              return (
                <div
                  key={c.name}
                  className={`group absolute ${slot.pos} ${slot.float} z-10 hover:z-40 cursor-pointer`}
                >
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-[#181024] shadow-lg opacity-0 transition-all duration-150 z-50 ${
                      isBottomTip
                        ? '-bottom-9 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                        : '-top-9 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                    }`}
                  >
                    {c.name}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#181024] ${
                        isBottomTip ? '-top-1' : '-bottom-1'
                      }`}
                    />
                  </span>

                  <div
                    className={`flex items-center justify-center transition-all duration-300 ease-out ${slot.rot} ${slot.blur} ${slot.opacity} group-hover:blur-none group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-115`}
                  >
                    <img
                      src={c.logo}
                      alt={c.name}
                      className={`${slot.imgClass} object-contain ${
                        isDark
                          ? 'drop-shadow-[0_4px_14px_rgba(255,255,255,0.22)]'
                          : 'drop-shadow-[0_8px_18px_rgba(24,16,36,0.1)]'
                      }`}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Clean Brand Grid (Crisp on Touchscreens) */}
          <div className="md:hidden space-y-4 py-2">
            <div className="text-center space-y-2">
              <span
                className={`inline-block text-[11px] font-extrabold tracking-widest uppercase ${
                  isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                }`}
              >
                ✦ {profile.clients.length}+{' '}
                {lang === 'id' ? 'Brand, Agensi & Institusi' : 'Brands, Agencies & Institutions'}
              </span>
              <h3 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                {lang === 'id' ? (
                  <>
                    Dipercaya oleh berbagai{' '}
                    <em className={`font-serif-accent font-normal text-[1.12em] ${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'}`}>
                      brand &amp; tim hebat
                    </em>
                  </>
                ) : (
                  <>
                    Trusted by{' '}
                    <em className={`font-serif-accent font-normal text-[1.12em] ${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'}`}>
                      great brands &amp; teams
                    </em>
                  </>
                )}
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 px-2">
              {profile.clients.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-center opacity-90 transition-transform duration-200 active:scale-105"
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    className={`h-7 w-auto max-w-[105px] object-contain ${
                      isDark ? 'drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

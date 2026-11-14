import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, MousePointer2, Palette, PenTool, Ruler } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';
import { PROJECT_SUMMARY_ID } from '../lib/projectSummaries';

export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  date: string;
  summary: string;
  thumbnail?: string;
  role: string;
  tools: string[];
}

interface Props {
  projects: ProjectItem[];
}

export default function FeaturedProjects({ projects }: Props) {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const filtered = projects.slice(0, 6);

  const total = filtered.length;
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [total, isPaused]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    didDrag.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 42) {
      didDrag.current = true;
      dragStartX.current = null;
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handlePointerUp = () => {
    dragStartX.current = null;
  };

  const getOrbitStyle = (idx: number): React.CSSProperties & { isFront: boolean } => {
    if (total === 0) return { isFront: false };
    let rel = idx - activeIndex;
    if (rel > total / 2) rel -= total;
    if (rel < -total / 2) rel += total;

    // 0: Foreground Right (like "her" card)
    if (rel === 0) {
      return {
        isFront: true,
        transform: 'translate3d(205px, 64px, 60px) scale(1) rotateY(-8deg)',
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px)',
      };
    }
    // -1: Foreground Left (like "CRAFTING THE LOOK" card)
    if (rel === -1) {
      return {
        isFront: true,
        transform: 'translate3d(-225px, 52px, 35px) scale(0.88) rotateY(10deg)',
        zIndex: 28,
        opacity: 0.96,
        filter: 'blur(0px)',
      };
    }
    // +1: Back-Right Orbit (behind shoulder)
    if (rel === 1) {
      return {
        isFront: false,
        transform: 'translate3d(325px, -110px, -40px) scale(0.62) rotateY(-16deg)',
        zIndex: 10,
        opacity: 0.82,
        filter: 'blur(0.8px)',
      };
    }
    // -2: Back-Left Orbit (behind shoulder)
    if (rel === -2) {
      return {
        isFront: false,
        transform: 'translate3d(-325px, -118px, -50px) scale(0.58) rotateY(16deg)',
        zIndex: 9,
        opacity: 0.72,
        filter: 'blur(1.2px)',
      };
    }
    // +2: Upper-Right Far Orbit
    if (rel === 2) {
      return {
        isFront: false,
        transform: 'translate3d(170px, -175px, -80px) scale(0.48) rotateY(-12deg)',
        zIndex: 6,
        opacity: 0.55,
        filter: 'blur(1.8px)',
      };
    }
    // Remaining: Upper-Left Far Orbit
    return {
      isFront: false,
      transform: 'translate3d(-175px, -178px, -90px) scale(0.46) rotateY(12deg)',
      zIndex: 5,
      opacity: 0.5,
      filter: 'blur(2px)',
    };
  };

  return (
    <section id="work" className="py-8 md:py-10">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-2"
        >
          <span className="inline-block text-xs font-extrabold tracking-widest text-purple-accent mb-2">
            {lang === 'id' ? 'PROYEK TERBAIK' : 'FEATURED WORK'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text)' }}>
            {lang === 'id'
              ? 'Eksplorasi Produk Digital & Visual Brand'
              : 'Exploring Digital Products & Visual Brands'}
          </h2>
        </motion.div>

        {/* Desktop 3D Orbital Project Carousel Around SVG Portrait */}
        <div
          onPointerDown={(e) => {
            setIsPaused(true);
            handlePointerDown(e);
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={() => {
            setIsPaused(false);
            handlePointerUp();
          }}
          onPointerCancel={() => {
            setIsPaused(false);
            handlePointerUp();
          }}
          className="hidden md:flex relative h-[540px] lg:h-[560px] items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Wireframe Orbital Mesh Strictly Behind All Cards (z-index 0 & translateZ -140px) */}
          <svg
            viewBox="0 0 900 600"
            fill="none"
            className="pointer-events-none absolute inset-0 w-full h-full z-0"
            style={{ transform: 'translate3d(0, 0, -140px)' }}
            aria-hidden="true"
          >
            <g stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(107,33,168,0.1)'} strokeWidth="1">
              <ellipse cx="450" cy="270" rx="340" ry="170" transform="rotate(-8 450 270)" />
              <ellipse cx="450" cy="270" rx="290" ry="145" transform="rotate(11 450 270)" />
              <ellipse cx="450" cy="270" rx="215" ry="115" strokeDasharray="4 6" />
            </g>
            {/* Subtle Bezier Pen-Tool Curve Accent */}
            <path
              d="M 105 110 C 165 45, 225 145, 275 85"
              stroke={isDark ? 'rgba(250,204,21,0.35)' : 'rgba(147,51,234,0.3)'}
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <rect x="101" y="106" width="8" height="8" rx="1.5" fill={isDark ? '#181024' : '#ffffff'} stroke={isDark ? '#facc15' : '#9333ea'} strokeWidth="1.5" />
            <circle cx="165" cy="45" r="3" fill={isDark ? '#facc15' : '#9333ea'} />
            <rect x="271" y="81" width="8" height="8" rx="1.5" fill={isDark ? '#181024' : '#ffffff'} stroke={isDark ? '#facc15' : '#9333ea'} strokeWidth="1.5" />
          </svg>

          {/* Decorative Design-Tool Badges (Subtle Background Layer) */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ transform: 'translate3d(0, 0, -100px)' }}
            aria-hidden="true"
          >
            {/* Top-Left: Color Tokens Swatch Pill */}
            <div
              className={`animate-float-a absolute top-4 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] font-mono font-bold ${
                isDark
                  ? 'bg-[#1b1130]/75 border-white/15 text-white/80'
                  : 'bg-white/80 border-[#9333ea]/15 text-[#5b516a] shadow-sm'
              }`}
            >
              <Palette size={12} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9333ea]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#c026d3]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" />
              </span>
              <span>Tokens</span>
            </div>

            {/* Top-Right: Figma Multiplayer Cursor + Pen Tool */}
            <div className="animate-float-b absolute top-6 right-10 flex items-center gap-3">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-md text-[10px] font-mono font-bold ${
                  isDark
                    ? 'bg-[#1b1130]/75 border-white/15 text-white/80'
                    : 'bg-white/80 border-[#9333ea]/15 text-[#5b516a] shadow-sm'
                }`}
              >
                <PenTool size={11} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
                <span>Vector 3D</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <MousePointer2
                  size={15}
                  className="-rotate-12 text-[#9333ea] fill-[#9333ea] drop-shadow-sm"
                />
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#9333ea] text-white shadow-sm">
                  Qolbul
                </span>
              </div>
            </div>

            {/* Bottom-Left: Auto Layout Ruler Pill */}
            <div
              className={`animate-float-b absolute bottom-8 left-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md text-[10px] font-mono font-semibold ${
                isDark
                  ? 'bg-[#1b1130]/70 border-white/12 text-white/70'
                  : 'bg-white/75 border-[#9333ea]/12 text-[#5b516a] shadow-sm'
              }`}
            >
              <Ruler size={11} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
              <span>Auto Layout · 1280px</span>
            </div>

            {/* Bottom-Right: Prototype Tag */}
            <div
              className={`animate-float-a absolute bottom-10 right-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md text-[10px] font-mono font-semibold ${
                isDark
                  ? 'bg-[#1b1130]/70 border-white/12 text-white/70'
                  : 'bg-white/75 border-[#9333ea]/12 text-[#5b516a] shadow-sm'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Interactive Prototype</span>
            </div>
          </div>

          {/* Center SVG Portrait (z-20) */}
          <div className="pointer-events-none relative z-20 h-[490px] lg:h-[520px] flex items-start justify-center -mt-6 lg:-mt-8">
            <img
              src="/project-character.svg"
              alt="Qolbul Muzaki"
              className="portrait-fade-mask h-full w-auto object-contain object-top drop-shadow-[0_22px_40px_rgba(24,16,36,0.2)]"
              loading="lazy"
            />
          </div>

          {/* 3D Orbiting Project Cards (Keep Progressive-Blur Card Style) */}
          {filtered.map((p, idx) => {
            const { isFront, ...orbitStyle } = getOrbitStyle(idx);
            return (
              <a
                key={p.slug}
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={(e) => {
                  if (didDrag.current) {
                    e.preventDefault();
                    return;
                  }
                  if (!isFront) {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  ...orbitStyle,
                  boxShadow: isDark
                    ? 'inset 0 1px 1px rgba(255,255,255,0.16), 0 20px 44px rgba(0,0,0,0.45)'
                    : 'inset 0 1.5px 1px rgba(255,255,255,0.95), 0 18px 40px rgba(24,16,36,0.08)',
                }}
                className={`group absolute w-[190px] lg:w-[205px] h-[250px] rounded-2xl overflow-hidden border transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDark
                    ? 'bg-[#170f29] border-white/15'
                    : 'bg-white border-[#9333ea]/12'
                } ${isFront ? 'hover:scale-[1.03]' : 'hover:opacity-95'}`}
              >
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6b21a8] via-[#9333ea] to-[#c026d3]" />
                )}

                {/* Top Subtle Header + Category (Left) & Date (Right) */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-14"
                  style={{
                    background: isDark
                      ? 'linear-gradient(180deg, rgba(23,15,41,0.62) 0%, transparent 100%)'
                      : 'linear-gradient(180deg, rgba(24,16,36,0.48) 0%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex items-center justify-between gap-2 px-3.5 pt-3 text-[9px] text-white">
                  <span className="font-extrabold tracking-wide uppercase truncate drop-shadow-xs">
                    {p.category}
                  </span>
                  <span className="font-medium text-white/90 shrink-0 drop-shadow-xs">{p.date}</span>
                </div>

                {/* Bottom Atmospheric Liquid-Glass Mist Fade */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] backdrop-blur-md"
                  style={{
                    maskImage: 'linear-gradient(to top, black 45%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 45%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%]"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to top, rgba(23,15,41,0.96) 0%, rgba(23,15,41,0.78) 48%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.78) 48%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Bottom Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 flex flex-col gap-2">
                  <div>
                    <h3
                      className={`text-[14px] font-extrabold tracking-tight leading-snug truncate ${
                        isDark ? 'text-white' : 'text-[#181024]'
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`text-[10px] leading-snug line-clamp-2 mt-0.5 ${
                        isDark ? 'text-white/75' : 'text-[#5b516a]'
                      }`}
                    >
                      {lang === 'id' ? PROJECT_SUMMARY_ID[p.slug] || p.summary : p.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-end">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold transition-all shadow-sm group-hover:scale-105 ${
                        isDark
                          ? 'bg-[#facc15] text-[#181024] group-hover:bg-[#fde047]'
                          : 'bg-[#181024] text-white group-hover:bg-[#2d1e46]'
                      }`}
                    >
                      <span>{lang === 'id' ? 'Detail' : 'Learn more'}</span>
                      <ArrowUpRight size={10} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}

          {/* Side Left & Right Arrow Buttons */}
          {total > 1 && (
            <>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={goPrev}
                aria-label="Previous project"
                className={`absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border backdrop-blur-md grid place-items-center cursor-pointer transition-all hover:-translate-x-0.5 ${
                  isDark
                    ? 'bg-[#1b1130]/80 border-white/15 text-white hover:bg-white/20 shadow-lg'
                    : 'bg-white/90 border-[#9333ea]/15 text-[#181024] hover:border-[#9333ea]/40 shadow-md'
                }`}
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={goNext}
                aria-label="Next project"
                className={`absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border backdrop-blur-md grid place-items-center cursor-pointer transition-all hover:translate-x-0.5 ${
                  isDark
                    ? 'bg-[#1b1130]/80 border-white/15 text-white hover:bg-white/20 shadow-lg'
                    : 'bg-white/90 border-[#9333ea]/15 text-[#181024] hover:border-[#9333ea]/40 shadow-md'
                }`}
              >
                <ArrowRight size={17} />
              </button>
            </>
          )}
        </div>

        {/* Desktop Pagination Dots */}
        {total > 1 && (
          <div className="hidden md:flex items-center justify-center gap-2 mt-4">
            {filtered.map((p, idx) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select ${p.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? isDark
                      ? 'w-6 bg-[#facc15]'
                      : 'w-6 bg-[#9333ea]'
                    : isDark
                    ? 'w-2 bg-white/25 hover:bg-white/45'
                    : 'w-2 bg-[#9333ea]/25 hover:bg-[#9333ea]/45'
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile Horizontal Swipeable Cards */}
        <div className="md:hidden mt-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
          {filtered.map((p) => (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`group snap-center shrink-0 relative w-[80vw] max-w-[300px] h-[340px] rounded-2xl overflow-hidden border ${
                isDark
                  ? 'bg-[#170f29] border-white/15 shadow-[0_18px_42px_rgba(0,0,0,0.45)]'
                  : 'bg-white border-[#9333ea]/12 shadow-[0_18px_40px_rgba(24,16,36,0.08)]'
              }`}
            >
              {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#6b21a8] via-[#9333ea] to-[#c026d3]" />
              )}

              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-14"
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(23,15,41,0.62) 0%, transparent 100%)'
                    : 'linear-gradient(180deg, rgba(24,16,36,0.48) 0%, transparent 100%)',
                }}
              />
              <div className="relative z-10 flex items-center justify-between gap-2 px-4 pt-3.5 text-[10px] text-white">
                <span className="font-extrabold tracking-wide uppercase truncate">{p.category}</span>
                <span className="font-medium text-white/90 shrink-0">{p.date}</span>
              </div>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] backdrop-blur-md"
                style={{
                  maskImage: 'linear-gradient(to top, black 45%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 45%, transparent 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%]"
                style={{
                  background: isDark
                    ? 'linear-gradient(to top, rgba(23,15,41,0.96) 0%, rgba(23,15,41,0.78) 48%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.78) 48%, transparent 100%)',
                }}
              />

              <div className="absolute inset-x-0 bottom-0 z-10 p-4 flex flex-col gap-3">
                <div>
                  <h3 className={`text-[16px] font-extrabold tracking-tight truncate ${isDark ? 'text-white' : 'text-[#181024]'}`}>
                    {p.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 mt-0.5 ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                    {lang === 'id' ? PROJECT_SUMMARY_ID[p.slug] || p.summary : p.summary}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm ${
                      isDark
                        ? 'bg-[#facc15] text-[#181024]'
                        : 'bg-[#181024] text-white'
                    }`}
                  >
                    <span>{lang === 'id' ? 'Detail' : 'Learn more'}</span>
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold border transition-colors hover:border-[#9333ea] hover:text-[#9333ea]"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
          >
            {lang === 'id' ? `Lihat Semua ${projects.length} Proyek →` : `View All ${projects.length} Projects →`}
          </a>
        </div>

        {/* Medium & Pinterest Redirect Banner */}
        <div
          className={`relative mt-8 rounded-2xl border backdrop-blur-xl overflow-hidden p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${
            isDark
              ? 'bg-[#170f29]/75 border-white/12 shadow-[0_18px_42px_rgba(0,0,0,0.4)]'
              : 'bg-white/80 border-[#9333ea]/15 shadow-[0_14px_38px_rgba(24,16,36,0.06)]'
          }`}
          style={{
            boxShadow: isDark
              ? '0 18px 42px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 14px 38px rgba(24,16,36,0.06), inset 0 1px 0 rgba(255,255,255,0.75)',
          }}
        >
          {/* Subtle ambient radial glow matching section theme */}
          <div
            className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full blur-3xl opacity-50"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(147,51,234,0.28) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, rgba(250,204,21,0.08) 45%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <span
              className={`inline-block text-[10px] font-extrabold tracking-[0.16em] uppercase mb-1.5 ${
                isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
              }`}
            >
              {lang === 'id' ? 'Arsip Karya & Tulisan' : 'Work & Writing Archive'}
            </span>
            <h3
              className={`text-base sm:text-lg font-extrabold tracking-tight mb-1 ${
                isDark ? 'text-white' : 'text-[#181024]'
              }`}
            >
              {lang === 'id'
                ? 'Masih penasaran dengan proses di balik layar?'
                : 'Curious about the process behind the scenes?'}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-[#5b516a]'}`}>
              {lang === 'id'
                ? 'Catatan riset & studi kasus UI/UX saya tulis di Medium, sementara arsip desain grafis tersimpan di Pinterest'
                : 'I document UI/UX research & case studies on Medium, while my graphic design archive lives on Pinterest'}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
            <motion.a
              href={profile.medium}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-sm transition-colors ${
                isDark
                  ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                  : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
              }`}
            >
              <span>{lang === 'id' ? 'Baca di Medium' : 'Read on Medium'}</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </motion.a>
            <motion.a
              href={profile.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold border backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                  : 'bg-white/85 text-[#181024] border-[#9333ea]/20 hover:border-[#9333ea]/50 hover:text-[#9333ea]'
              }`}
            >
              <span>{lang === 'id' ? 'Galeri Pinterest' : 'Pinterest Gallery'}</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

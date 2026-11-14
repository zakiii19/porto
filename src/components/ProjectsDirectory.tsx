import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderSearch, RotateCcw, Search } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';
import { PROJECT_SUMMARY_ID } from '../lib/projectSummaries';
import type { ProjectItem } from './FeaturedProjects';

interface Props {
  projects: ProjectItem[];
}

export default function ProjectsDirectory({ projects }: Props) {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [projects, category, query]);

  return (
    <section className="relative overflow-hidden pt-22 pb-10 md:pt-28 md:pb-16">
      {/* Subtle Sunlit Top Wash matching Home */}
      <div className="hero-sunlit-canvas pointer-events-none absolute inset-x-0 top-0 h-[360px]" aria-hidden="true">
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg) 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <span className="inline-block text-xs font-extrabold tracking-widest text-purple-accent mb-2">
            {lang === 'id' ? 'SEMUA KARYA' : 'ALL WORKS'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
            {lang === 'id' ? (
              <>
                Arsip <em className="font-serif-accent text-purple-accent font-normal">Proyek &amp; Eksplorasi</em>
              </>
            ) : (
              <>
                Project &amp; <em className="font-serif-accent text-purple-accent font-normal">Exploration Archive</em>
              </>
            )}
          </h1>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            {lang === 'id'
              ? 'Kumpulan studi kasus UI/UX, analisis sistem, dan karya desain visual — pembahasan lengkap tersedia di Medium & Pinterest'
              : 'Collection of UI/UX case studies, system analysis, and visual design works — full write-ups live on Medium & Pinterest'}
          </p>
        </motion.div>

        {/* Search & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'id' ? 'Cari proyek, role, atau tools...' : 'Search projects, roles, or tools...'}
              className={`w-full pl-11 pr-4 py-2.5 rounded-full border backdrop-blur-xl text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-[#170f29]/75 border-white/15 text-white placeholder:text-white/45 focus:border-[#facc15]'
                  : 'bg-white/85 border-[#9333ea]/15 text-[#181024] placeholder:text-[#5b516a]/60 focus:border-[#9333ea]'
              }`}
            />
          </div>

          <div className="flex flex-nowrap overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-extrabold border backdrop-blur-md cursor-pointer transition-colors ${
                    active
                      ? isDark
                        ? 'bg-[#facc15] border-[#facc15] text-[#181024] shadow-sm'
                        : 'bg-[#181024] border-[#181024] text-white shadow-sm'
                      : isDark
                      ? 'bg-[#170f29]/70 border-white/12 text-white/75 hover:bg-white/10'
                      : 'bg-white/80 border-[#9333ea]/15 text-[#5b516a] hover:border-[#9333ea]/40 hover:text-[#181024]'
                  }`}
                >
                  {cat === 'all' ? (lang === 'id' ? 'Semua' : 'All') : cat}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {filtered.length > 0 && (
          <div className="flex items-center justify-between mb-4 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            <span>
              {lang === 'id'
                ? `Menampilkan ${filtered.length} dari ${projects.length} karya`
                : `Showing ${filtered.length} of ${projects.length} projects`}
            </span>
          </div>
        )}

        {filtered.length === 0 ? (
          <div
            className={`rounded-2xl border backdrop-blur-xl px-6 py-14 text-center ${
              isDark
                ? 'bg-[#170f29]/75 border-white/12 text-white'
                : 'bg-white/80 border-[#9333ea]/15 text-[#181024]'
            }`}
          >
            <div
              className={`w-14 h-14 mx-auto mb-4 rounded-2xl grid place-items-center ${
                isDark ? 'bg-white/10 text-[#facc15]' : 'bg-[#f3e8ff] text-[#9333ea]'
              }`}
            >
              <FolderSearch size={24} />
            </div>
            <h3 className="text-lg font-extrabold tracking-tight mb-1.5">
              {lang === 'id' ? 'Belum ada karya yang cocok' : 'No matching projects found'}
            </h3>
            <p className={`text-xs sm:text-sm max-w-md mx-auto mb-6 ${isDark ? 'text-white/70' : 'text-[#5b516a]'}`}>
              {lang === 'id'
                ? 'Coba ubah kata kunci pencarian atau reset filter kategori untuk menampilkan semua karya'
                : 'Try adjusting your search keywords or reset the category filter to view all projects'}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold cursor-pointer transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                  : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
              }`}
            >
              <RotateCcw size={13} strokeWidth={2.5} />
              <span>{lang === 'id' ? 'Reset Filter' : 'Reset Filter'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {filtered.map((p, idx) => (
            <motion.a
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.38, delay: Math.min(idx * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              href={`/projects/${p.slug}`}
              className={`group relative h-[235px] sm:h-[310px] lg:h-[340px] rounded-2xl overflow-hidden border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#170f29] border-white/15 hover:border-[#facc15]/50'
                  : 'bg-white border-[#9333ea]/15 hover:border-[#9333ea]/40'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 18px 42px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)'
                  : '0 16px 38px rgba(24,16,36,0.08), inset 0 1px 0 rgba(255,255,255,0.85)',
              }}
            >
              {/* Full-Bleed Thumbnail */}
              {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-[#581c87]" />
              )}

              {/* Subtle Top Scrim for Category & Date */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20"
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(23,15,41,0.72) 0%, transparent 100%)'
                    : 'linear-gradient(180deg, rgba(24,16,36,0.58) 0%, transparent 100%)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-center justify-between gap-1.5 px-2.5 pt-2.5 sm:px-4 sm:pt-4 text-[9px] sm:text-[10px] text-white">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#181024]/55 backdrop-blur-md border border-white/15 font-extrabold tracking-wide uppercase truncate">
                  {p.category}
                </span>
                <span className="font-semibold text-white/90 shrink-0">{p.date}</span>
              </div>

              {/* Liquid Glass Bottom Frost + Theme-Matched Gradient */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] backdrop-blur-md"
                style={{
                  maskImage: 'linear-gradient(to top, black 48%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 48%, transparent 100%)',
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[66%]"
                style={{
                  background: isDark
                    ? 'linear-gradient(to top, rgba(23,15,41,0.97) 0%, rgba(23,15,41,0.82) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.82) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Bottom Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5 flex flex-col gap-2 sm:gap-3">
                <div>
                  <h2
                    className={`text-[13px] sm:text-[17px] font-extrabold tracking-tight leading-snug line-clamp-1 transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-[#facc15]'
                        : 'text-[#181024] group-hover:text-[#9333ea]'
                    }`}
                  >
                    {p.title}
                  </h2>
                  <p className={`text-[11px] sm:text-xs leading-snug sm:leading-relaxed line-clamp-2 mt-0.5 sm:mt-1 ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                    {lang === 'id' ? PROJECT_SUMMARY_ID[p.slug] || p.summary : p.summary}
                  </p>
                </div>

                <div
                  className={`pt-2 sm:pt-2.5 border-t flex items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-xs ${
                    isDark ? 'border-white/12' : 'border-[#9333ea]/15'
                  }`}
                >
                  <span className={`font-semibold truncate ${isDark ? 'text-white/70' : 'text-[#5b516a]'}`}>
                    {p.role}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-extrabold shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                    }`}
                  >
                    <span>{lang === 'id' ? 'Detail' : 'Learn more'}</span>
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
          </div>
        )}

        {/* External Platforms (Consistent Liquid Glass Banner) */}
        <div
          className={`relative mt-10 rounded-2xl border backdrop-blur-xl overflow-hidden p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${
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

          <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            <a
              href={profile.medium}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-sm transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                  : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
              }`}
            >
              <span>{lang === 'id' ? 'Baca di Medium' : 'Read on Medium'}</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
            <a
              href={profile.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold border backdrop-blur-md transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                  : 'bg-white/85 text-[#181024] border-[#9333ea]/20 hover:border-[#9333ea]/50 hover:text-[#9333ea]'
              }`}
            >
              <span>{lang === 'id' ? 'Galeri Pinterest' : 'Pinterest Gallery'}</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

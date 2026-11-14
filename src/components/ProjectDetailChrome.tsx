import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';
import { PROJECT_SUMMARY_ID } from '../lib/projectSummaries';

export interface ProjectDetailProps {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  thumbnail?: string;
  role: string;
  tools: string[];
  deliverables: string[];
  liveUrl?: string;
  figmaUrl?: string;
}

export interface ProjectLinkItem {
  slug: string;
  title: string;
  category: string;
}

export function ProjectDetailHeader(props: ProjectDetailProps) {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';

  const localizedSummary = lang === 'id' ? PROJECT_SUMMARY_ID[props.slug] || props.summary : props.summary;

  return (
    <>
      <a
        href="/projects"
        className={`inline-flex items-center gap-1.5 text-xs font-extrabold mb-6 transition-colors ${
          isDark ? 'text-[#facc15] hover:text-[#fde047]' : 'text-[#9333ea] hover:text-[#7e22ce]'
        }`}
      >
        <ArrowLeft size={14} strokeWidth={2.5} />
        <span>{lang === 'id' ? 'Kembali ke Semua Proyek' : 'Back to All Projects'}</span>
      </a>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
              isDark ? 'bg-[#facc15] text-[#181024]' : 'bg-[#181024] text-white'
            }`}
          >
            {props.category}
          </span>
          <span className={`text-xs font-bold ${isDark ? 'text-white/70' : 'text-[#5b516a]'}`}>
            {props.date}
          </span>
        </div>

        <h1
          className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3 ${
            isDark ? 'text-white' : 'text-[#181024]'
          }`}
        >
          {props.title}
        </h1>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
          {localizedSummary}
        </p>
      </div>

      {props.thumbnail && (
        <div
          className={`rounded-2xl overflow-hidden border mb-8 ${
            isDark ? 'border-white/15 bg-[#170f29]' : 'border-[#9333ea]/15 bg-white'
          }`}
          style={{
            boxShadow: isDark
              ? '0 22px 48px rgba(0,0,0,0.45)'
              : '0 18px 42px rgba(24,16,36,0.08)',
          }}
        >
          <img src={props.thumbnail} alt={props.title} className="w-full max-h-[460px] object-cover" />
        </div>
      )}

      {/* Concise Liquid Glass Meta Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 gap-5 rounded-2xl border backdrop-blur-xl p-5 mb-6 ${
          isDark
            ? 'bg-[#170f29]/75 border-white/12'
            : 'bg-white/80 border-[#9333ea]/15'
        }`}
        style={{
          boxShadow: isDark
            ? '0 14px 34px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 12px 30px rgba(24,16,36,0.05), inset 0 1px 0 rgba(255,255,255,0.75)',
        }}
      >
        <div>
          <span
            className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
              isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
            }`}
          >
            {lang === 'id' ? 'Peran' : 'Role'}
          </span>
          <strong className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#181024]'}`}>
            {props.role}
          </strong>
        </div>

        <div>
          <span
            className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
            }`}
          >
            Tools
          </span>
          <div className="flex flex-wrap gap-1.5">
            {props.tools.map((t) => (
              <span
                key={t}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  isDark
                    ? 'bg-white/8 border-white/12 text-white/90'
                    : 'bg-[#f3e8ff]/70 border-[#9333ea]/15 text-[#181024]'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span
            className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
              isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
            }`}
          >
            {lang === 'id' ? 'Deliverables' : 'Deliverables'}
          </span>
          <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
            {props.deliverables.join(' · ')}
          </p>
        </div>
      </div>

      {/* External Deep-Dive Liquid Glass Banner */}
      <div
        className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark
            ? 'bg-[#170f29]/75 border-white/12'
            : 'bg-white/80 border-[#9333ea]/15'
        }`}
        style={{
          boxShadow: isDark
            ? '0 14px 34px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 12px 30px rgba(24,16,36,0.05), inset 0 1px 0 rgba(255,255,255,0.75)',
        }}
      >
        <div>
          <span
            className={`inline-block text-[10px] font-extrabold tracking-[0.16em] uppercase mb-1 ${
              isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
            }`}
          >
            {lang === 'id' ? 'Dokumentasi & Tautan' : 'Links & Archive'}
          </span>
          <strong className={`block text-sm sm:text-base font-extrabold ${isDark ? 'text-white' : 'text-[#181024]'}`}>
            {lang === 'id' ? 'Studi Kasus Lengkap & Aset Visual' : 'Full Case Study & Visual Assets'}
          </strong>
          <span className={`text-xs ${isDark ? 'text-white/70' : 'text-[#5b516a]'}`}>
            {lang === 'id'
              ? 'Lihat catatan riset di Medium atau eksplorasi visual di Pinterest'
              : 'Read research notes on Medium or explore visual assets on Pinterest'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href={profile.medium}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-extrabold transition-all hover:-translate-y-0.5 ${
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
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-extrabold border backdrop-blur-md transition-all hover:-translate-y-0.5 ${
              isDark
                ? 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                : 'bg-white/85 text-[#181024] border-[#9333ea]/20 hover:border-[#9333ea]/50 hover:text-[#9333ea]'
            }`}
          >
            <span>{lang === 'id' ? 'Galeri Pinterest' : 'Pinterest'}</span>
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
          {props.figmaUrl && (
            <a
              href={props.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-extrabold border backdrop-blur-md transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                  : 'bg-white/85 text-[#181024] border-[#9333ea]/20 hover:border-[#9333ea]/50 hover:text-[#9333ea]'
              }`}
            >
              <span>Figma</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          )}
          {props.liveUrl && (
            <a
              href={props.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-extrabold border backdrop-blur-md transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                  : 'bg-white/85 text-[#181024] border-[#9333ea]/20 hover:border-[#9333ea]/50 hover:text-[#9333ea]'
              }`}
            >
              <span>Live Demo</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export function ProjectDetailNav({
  prev,
  next,
}: {
  prev: ProjectLinkItem;
  next: ProjectLinkItem;
}) {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';

  const cardClass = isDark
    ? 'bg-[#170f29]/75 border-white/12 hover:border-[#facc15]/45'
    : 'bg-white/80 border-[#9333ea]/15 hover:border-[#9333ea]/40';

  return (
    <nav
      aria-label="Project navigation"
      className={`mt-12 pt-8 border-t grid grid-cols-1 sm:grid-cols-2 gap-4 ${
        isDark ? 'border-white/12' : 'border-[#9333ea]/15'
      }`}
    >
      <a
        href={`/projects/${prev.slug}`}
        className={`group rounded-2xl border backdrop-blur-xl p-4 sm:p-5 transition-all hover:-translate-y-0.5 ${cardClass}`}
      >
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
            isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
          }`}
        >
          <ArrowLeft size={12} strokeWidth={2.5} />
          <span>{lang === 'id' ? 'Proyek Sebelumnya' : 'Previous Project'}</span>
        </span>
        <strong
          className={`block text-sm sm:text-base font-extrabold truncate transition-colors ${
            isDark ? 'text-white group-hover:text-[#facc15]' : 'text-[#181024] group-hover:text-[#9333ea]'
          }`}
        >
          {prev.title}
        </strong>
        <span className={`text-xs ${isDark ? 'text-white/60' : 'text-[#5b516a]'}`}>
          {prev.category}
        </span>
      </a>

      <a
        href={`/projects/${next.slug}`}
        className={`group rounded-2xl border backdrop-blur-xl p-4 sm:p-5 text-left sm:text-right transition-all hover:-translate-y-0.5 ${cardClass}`}
      >
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
            isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
          }`}
        >
          <span>{lang === 'id' ? 'Proyek Berikutnya' : 'Next Project'}</span>
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
        <strong
          className={`block text-sm sm:text-base font-extrabold truncate transition-colors ${
            isDark ? 'text-white group-hover:text-[#facc15]' : 'text-[#181024] group-hover:text-[#9333ea]'
          }`}
        >
          {next.title}
        </strong>
        <span className={`text-xs ${isDark ? 'text-white/60' : 'text-[#5b516a]'}`}>
          {next.category}
        </span>
      </a>
    </nav>
  );
}

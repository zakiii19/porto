import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLang, useTheme } from '../lib/prefs';

export default function NotFoundView() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="hero-sunlit-canvas relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 flex-1 flex items-center">
      <div
        className={`dot-grid-overlay absolute inset-0 pointer-events-none ${
          isDark ? 'opacity-35' : 'opacity-25'
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[760px] w-full mx-auto px-6">
        <div
          className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl px-6 py-12 sm:px-12 sm:py-14 text-center transition-all ${
            isDark
              ? 'bg-[#170f29]/80 border-white/12 text-white'
              : 'bg-white/80 border-[#9333ea]/15 text-[#181024]'
          }`}
          style={{
            boxShadow: isDark
              ? '0 22px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 18px 46px rgba(24,16,36,0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(147,51,234,0.14) 0%, rgba(250,204,21,0.12) 45%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-5">
              <div
                className={`w-20 h-20 rounded-full overflow-hidden border grid place-items-center shadow-sm ${
                  isDark
                    ? 'bg-white/10 border-white/20'
                    : 'bg-[#f3e8ff]/80 border-[#9333ea]/20'
                }`}
              >
                <img src="/my-icon.png" alt="Qolbul Muzaki" className="w-16 h-16 object-contain" />
              </div>
              <span className="absolute -bottom-2 -right-3 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-extrabold bg-[#facc15] text-[#181024] shadow-sm">
                404
              </span>
            </div>

            <span
              className={`inline-block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-2 ${
                isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
              }`}
            >
              {lang === 'id' ? 'Error 404' : 'Error 404'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              {lang === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}
            </h1>

            <p className={`text-sm sm:text-base max-w-md mb-7 leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
              {lang === 'id'
                ? 'Tautan yang Anda buka mungkin sudah dipindahkan, dihapus, atau alamat URL-nya keliru'
                : 'The link you followed may have been moved, removed, or the URL is incorrect'}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-extrabold text-xs sm:text-sm shadow-sm hover:-translate-y-0.5 transition-all ${
                  isDark
                    ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                    : 'bg-[#181024] text-white hover:bg-[#2a1d3d]'
                }`}
              >
                <ArrowLeft size={14} strokeWidth={2.5} />
                <span>{lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
              </a>
              <a
                href="/projects"
                className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-full border backdrop-blur-md font-extrabold text-xs sm:text-sm hover:-translate-y-0.5 transition-all ${
                  isDark
                    ? 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                    : 'bg-white/85 border-[#9333ea]/20 text-[#181024] hover:border-[#9333ea]/50 hover:text-[#9333ea]'
                }`}
              >
                <span>{lang === 'id' ? 'Lihat Semua Karya' : 'Browse All Work'}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

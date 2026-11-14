import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { toggleLang, toggleTheme, useLang, useTheme } from '../lib/prefs';

export default function Navbar() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [pathname, setPathname] = useState('/');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setPathname(window.location.pathname || '/');
  }, []);

  const navItems = [
    { href: '/', label: lang === 'id' ? 'Beranda' : 'Home', match: (p: string) => p === '/' },
    {
      href: '/projects',
      label: lang === 'id' ? 'Karya' : 'Projects',
      match: (p: string) => p.startsWith('/projects'),
    },
    {
      href: '/about',
      label: lang === 'id' ? 'Tentang' : 'About',
      match: (p: string) => p.startsWith('/about'),
    },
  ];

  const liquidGlassStyle: React.CSSProperties = isDark
    ? {
        background:
          'linear-gradient(135deg, rgba(30, 18, 56, 0.56) 0%, rgba(18, 10, 34, 0.38) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow:
          'inset 0 1px 1px rgba(255, 255, 255, 0.24), inset 0 -1px 1px rgba(255, 255, 255, 0.06), 0 14px 38px rgba(0, 0, 0, 0.38)',
      }
    : {
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.32) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.72)',
        boxShadow:
          'inset 0 1.5px 1px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(147, 51, 234, 0.06), 0 12px 34px rgba(24, 16, 36, 0.08)',
      };

  const controlClass = isDark
    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
    : 'bg-white/55 border-white/80 text-[#181024] hover:bg-white/85 shadow-xs';

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div
        style={liquidGlassStyle}
        className="pointer-events-auto max-w-[1180px] mx-auto px-3.5 sm:px-6 h-[58px] sm:h-[60px] rounded-full backdrop-blur-2xl backdrop-saturate-150 border transition-all flex items-center justify-between gap-2 sm:gap-4"
      >
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 sm:gap-2.5 no-underline shrink-0 group min-w-0">
          <span
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border grid place-items-center transition-transform group-hover:scale-105 shadow-sm shrink-0 ${
              isDark
                ? 'bg-white/10 border-white/20'
                : 'bg-[#f3e8ff]/80 border-[#9333ea]/20'
            }`}
          >
            <img
              src="/my-icon.png"
              alt="Qolbul Muzaki"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
          </span>
          <span
            className={`font-extrabold tracking-tight text-[13px] sm:text-[15px] truncate ${
              isDark ? 'text-white' : 'text-[#181024]'
            }`}
          >
            Qolbul Muzaki
          </span>
        </a>

        {/* Center Text-Only Navigation (Desktop) */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = item.match(pathname);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  active
                    ? isDark
                      ? 'font-extrabold text-[#facc15]'
                      : 'font-extrabold text-[#9333ea]'
                    : isDark
                    ? 'font-semibold text-white/80 hover:text-white'
                    : 'font-semibold text-[#473f56] hover:text-[#181024]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle Language"
            className={`h-8 px-3 rounded-full text-[11px] font-bold border cursor-pointer transition-colors ${controlClass}`}
          >
            <span className={lang === 'id' ? `${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} font-extrabold` : 'opacity-60'}>ID</span>
            <span className="mx-1 opacity-35">/</span>
            <span className={lang === 'en' ? `${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} font-extrabold` : 'opacity-60'}>EN</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className={`w-8 h-8 rounded-full border grid place-items-center cursor-pointer transition-colors ${controlClass}`}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <a
            href="/#contact"
            className={`hidden sm:inline-flex items-center px-4 py-2 rounded-full text-xs font-extrabold transition-all hover:-translate-y-0.5 shadow-md ${
              isDark
                ? 'bg-[#facc15] text-[#181024] hover:bg-[#fde047]'
                : 'bg-[#181024] text-white hover:bg-[#2d1e46]'
            }`}
          >
            {lang === 'id' ? 'Kontak' : 'Contact'}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
            className={`md:hidden w-8 h-8 rounded-full border grid place-items-center cursor-pointer transition-colors ${controlClass}`}
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          style={liquidGlassStyle}
          className="pointer-events-auto md:hidden max-w-[1180px] mx-auto mt-2 p-3 rounded-3xl backdrop-blur-2xl backdrop-saturate-150 border flex flex-col gap-1"
        >
          {navItems.map((item) => {
            const active = item.match(pathname);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                  active
                    ? isDark
                      ? 'bg-white/15 text-white'
                      : 'bg-[#f3e8ff] text-[#6b21a8]'
                    : isDark
                    ? 'text-white/80 hover:bg-white/10'
                    : 'text-[#5b516a] hover:bg-[#faf5ff]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className={`mt-1 px-4 py-2.5 rounded-full text-sm font-extrabold text-center ${
              isDark ? 'bg-[#facc15] text-[#181024]' : 'bg-[#181024] text-white'
            }`}
          >
            {lang === 'id' ? 'Kontak' : 'Contact'}
          </a>
        </div>
      )}
    </header>
  );
}

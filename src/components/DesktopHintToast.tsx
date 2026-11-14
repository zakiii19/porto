import React, { useEffect, useState } from 'react';
import { Monitor, X } from 'lucide-react';
import { useLang, useTheme } from '../lib/prefs';

export default function DesktopHintToast() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('qm_hide_desktop_hint') !== '1') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('qm_hide_desktop_hint', '1');
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex justify-center">
      <div
        className={`pointer-events-auto w-full max-w-md rounded-2xl border backdrop-blur-2xl px-3.5 py-2.5 flex items-center gap-3 shadow-lg ${
          isDark
            ? 'bg-[#170f29]/88 border-white/15 text-white'
            : 'bg-white/90 border-[#9333ea]/20 text-[#181024]'
        }`}
        style={{
          boxShadow: isDark
            ? '0 14px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 12px 30px rgba(24,16,36,0.10), inset 0 1px 0 rgba(255,255,255,0.85)',
        }}
      >
        <span
          className={`w-8 h-8 rounded-xl grid place-items-center shrink-0 ${
            isDark ? 'bg-[#facc15]/15 text-[#facc15]' : 'bg-[#f3e8ff] text-[#9333ea]'
          }`}
        >
          <Monitor size={15} />
        </span>

        <p className={`text-[11px] leading-snug font-semibold flex-1 ${isDark ? 'text-white/85' : 'text-[#473f56]'}`}>
          {lang === 'id'
            ? 'Aktifkan mode Desktop di browser untuk pengalaman interaktif 3D Orbit yang maksimal'
            : 'Switch to Desktop mode in your browser for the full interactive 3D Orbit experience'}
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label={lang === 'id' ? 'Tutup saran' : 'Dismiss'}
          className={`w-7 h-7 rounded-full grid place-items-center shrink-0 cursor-pointer transition-colors ${
            isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-[#f3e8ff] text-[#5b516a]'
          }`}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

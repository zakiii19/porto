import React, { useRef, useState } from 'react';
import { Calendar, Heart, MapPin, Menu, MoreHorizontal, Pause, Play, Search, Settings, SlidersHorizontal } from 'lucide-react';
import { useLang, useTheme } from '../lib/prefs';

export default function SpatialShowcaseCard() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, active: false });
  const [personSrc, setPersonSrc] = useState('/portrait-spatial.svg');
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setOffset({
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0, active: false });
  };

  const layerTransform = (depth: number) => ({
    transform: `translate3d(${offset.x * depth}px, ${offset.y * depth}px, 0)`,
    transition: offset.active ? 'transform 120ms ease-out' : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
  });

  const glassBack = isDark
    ? 'bg-[#1b1130]/75 border-white/15 text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)]'
    : 'bg-white/75 border-white/80 text-[#181024] shadow-[0_12px_30px_rgba(24,16,36,0.09)]';

  const glassFront = isDark
    ? 'bg-gradient-to-br from-[#23163d]/72 via-[#180f2c]/62 to-[#2a1746]/70 border-white/20 text-white shadow-[0_24px_50px_rgba(0,0,0,0.5)]'
    : 'bg-gradient-to-br from-white/75 via-white/55 to-[#f5eeff]/70 border-white/85 text-[#181024] shadow-[0_24px_50px_rgba(24,16,36,0.12)]';

  return (
    <div className="mb-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
      {/* Interactive 4-Layer 3D Spatial Card */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative w-full max-w-[440px] h-[540px] sm:h-[580px] rounded-[32px] border overflow-hidden select-none cursor-grab active:cursor-grabbing shrink-0 ${
          isDark
            ? 'bg-gradient-to-b from-[#1a1030] to-[#110a20] border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.55)]'
            : 'bg-gradient-to-b from-[#f4effa] via-[#ede6f7] to-[#e6ddf4] border-[#9333ea]/15 shadow-[0_24px_60px_rgba(24,16,36,0.1)]'
        }`}
        style={{
          transform: `perspective(1100px) rotateX(${-offset.y * 4}deg) rotateY(${offset.x * 5}deg)`,
          transition: offset.active ? 'transform 120ms ease-out' : 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* LAYER 0 (z-0): Fine Wireframe Orbital Mesh */}
        <svg
          viewBox="0 0 440 580"
          fill="none"
          className="pointer-events-none absolute inset-0 w-full h-full z-0"
          style={layerTransform(-6)}
          aria-hidden="true"
        >
          <g stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(107,33,168,0.12)'} strokeWidth="0.9">
            <ellipse cx="220" cy="240" rx="175" ry="130" transform="rotate(-14 220 240)" />
            <ellipse cx="220" cy="240" rx="155" ry="110" transform="rotate(18 220 240)" />
            <ellipse cx="220" cy="240" rx="195" ry="90" transform="rotate(4 220 240)" />
            <circle cx="220" cy="230" r="145" strokeDasharray="3 4" />
          </g>
        </svg>

        {/* LAYER 1 (z-10): Back Floating Widgets */}
        <div className="pointer-events-none absolute inset-0 z-10" style={layerTransform(12)}>
          {/* Top Pill Header */}
          <div
            className={`absolute top-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-xl border text-[11px] font-extrabold tracking-wider ${glassBack}`}
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9333ea] to-[#c026d3] text-white grid place-items-center text-[9px]">
              [ ]
            </span>
            <span>QOLBUL_DESIGN</span>
          </div>

          {/* Top-Left Mini Map Widget */}
          <div
            className={`absolute top-16 left-5 w-[86px] h-[86px] rounded-2xl backdrop-blur-md border p-2 -rotate-6 ${glassBack}`}
          >
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#f3e8ff] to-[#fde68a]/40 relative overflow-hidden grid place-items-center">
              <div className="w-full h-px bg-[#9333ea]/25 rotate-12 absolute" />
              <div className="h-full w-px bg-[#9333ea]/25 -rotate-12 absolute" />
              <MapPin size={18} className="text-[#9333ea] relative z-10" />
            </div>
          </div>

          {/* Mid-Left Mini Card */}
          <div
            className={`absolute top-[168px] left-3 w-[104px] rounded-2xl backdrop-blur-md border p-2 -rotate-3 ${glassBack}`}
          >
            <div className="text-[8px] font-extrabold uppercase tracking-wider opacity-60 mb-1">
              System Spec
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-14 rounded-full bg-[#9333ea]/40" />
              <div className="h-1.5 w-10 rounded-full bg-current opacity-20" />
            </div>
          </div>

          {/* Top-Right Mini Media Player */}
          <div
            className={`absolute top-16 right-4 w-[104px] rounded-2xl backdrop-blur-md border p-2.5 rotate-6 ${
              isDark
                ? 'bg-[#251340]/90 border-white/20 text-white'
                : 'bg-[#2a1547]/90 border-white/30 text-white shadow-xl'
            }`}
          >
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="text-[9px] opacity-70">◀◀</span>
              <Play size={13} fill="currentColor" />
              <span className="text-[9px] opacity-70">▶▶</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-2/3 bg-[#facc15] rounded-full" />
            </div>
          </div>

          {/* Mid-Right Mini Calendar */}
          <div
            className={`absolute top-[152px] right-11 w-[74px] rounded-xl backdrop-blur-md border p-2 rotate-3 ${glassBack}`}
          >
            <div className="flex items-center justify-between text-[8px] font-extrabold mb-1">
              <span>Nov</span>
              <Calendar size={9} />
            </div>
            <div className="grid grid-cols-4 gap-1 text-[7px] font-bold opacity-70 text-center">
              <span>12</span>
              <span>13</span>
              <span className="rounded bg-[#9333ea] text-white">14</span>
              <span>15</span>
            </div>
          </div>
        </div>

        {/* LAYER 2 (z-20): Person SVG Cutout */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-10 z-20 flex items-end justify-center"
          style={layerTransform(20)}
        >
          <img
            src={personSrc}
            alt="Qolbul Muzaki Spatial Portrait"
            onError={() => {
              if (personSrc !== '/portrait-cutout.svg') setPersonSrc('/portrait-cutout.svg');
            }}
            className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_18px_36px_rgba(24,16,36,0.22)]"
            loading="lazy"
          />
        </div>

        {/* LAYER 3 (z-30): Foreground Frosted Glass UI Panels */}
        <div className="absolute inset-0 z-30 pointer-events-none" style={layerTransform(32)}>
          {/* Left Foreground Panel: CRAFTING THE LOOK */}
          <div
            className={`pointer-events-auto absolute bottom-10 left-3.5 sm:left-4 w-[142px] rounded-2xl backdrop-blur-xl border p-3 -rotate-2 ${glassFront}`}
          >
            <div className="flex items-center justify-between mb-2 opacity-75">
              <Menu size={12} />
              <Settings size={12} />
            </div>
            <div className="text-[9px] font-extrabold tracking-wider uppercase mb-2">
              CRAFTING THE LOOK
            </div>
            <div className="flex items-center justify-between gap-1 mb-2.5">
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold opacity-75">
                <SlidersHorizontal size={10} /> UI
              </span>
              <button
                type="button"
                onClick={() => setToggleA((v) => !v)}
                aria-label="Toggle UI mode"
                className={`w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${
                  toggleA ? 'bg-[#9333ea]' : 'bg-black/20'
                }`}
              >
                <span
                  className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                    toggleA ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between gap-1 mb-3">
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold opacity-75">
                <Heart size={10} /> UX
              </span>
              <button
                type="button"
                onClick={() => setToggleB((v) => !v)}
                aria-label="Toggle UX mode"
                className={`w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${
                  toggleB ? 'bg-[#facc15]' : 'bg-black/20'
                }`}
              >
                <span
                  className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                    toggleB ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-11 rounded-lg bg-gradient-to-br from-[#9333ea]/70 to-[#c026d3]/60" />
              <div className="h-11 rounded-lg bg-gradient-to-br from-[#facc15]/80 to-[#f59e0b]/60" />
            </div>
          </div>

          {/* Right Foreground Panel: Showcase Grid */}
          <div
            className={`pointer-events-auto absolute bottom-6 right-3.5 sm:right-4 w-[228px] sm:w-[244px] rounded-2xl backdrop-blur-xl border p-3.5 rotate-1 ${glassFront}`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-extrabold tracking-tight">qolbul.ui</span>
              <div className="flex items-center gap-2 opacity-70">
                <Search size={12} />
                <MoreHorizontal size={12} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-2.5">
              <div className="h-12 rounded-lg bg-gradient-to-br from-[#6b21a8] to-[#9333ea]" />
              <div className="h-12 rounded-lg bg-gradient-to-br from-[#c026d3] to-[#f472b6]" />
              <div className="h-12 rounded-lg bg-gradient-to-br from-[#181024] to-[#4c1d95]" />
              <div className="h-12 rounded-lg bg-gradient-to-br from-[#facc15] to-[#eab308]" />
              <div className="h-12 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#6366f1]" />
              <div className="h-12 rounded-lg bg-gradient-to-br from-[#3b0764] to-[#9333ea]" />
            </div>

            <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-wider opacity-70 mb-1">
              <span>DESIGN &amp; SYSTEM</span>
              <span>92%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-current/15 overflow-hidden mb-2.5">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#9333ea] to-[#facc15]" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[8px] opacity-75">
              <div>
                <div className="opacity-65">Projects</div>
                <div className="font-extrabold">50+ Works</div>
              </div>
              <div>
                <div className="opacity-65">Role</div>
                <div className="font-extrabold">UI/UX</div>
              </div>
              <div>
                <div className="opacity-65">Cert</div>
                <div className="font-extrabold">BNSP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Editorial Explanation */}
      <div className="flex-1 text-left max-w-xl">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider mb-3 border ${
            isDark
              ? 'bg-white/10 border-white/15 text-[#facc15]'
              : 'bg-[#f3e8ff] border-[#9333ea]/20 text-[#7e22ce]'
          }`}
        >
          ✦ INTERACTIVE 3D SPATIAL CARD
        </span>
        <h3
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-3 ${
            isDark ? 'text-white' : 'text-[#181024]'
          }`}
        >
          {lang === 'id' ? (
            <>
              Eksplorasi UI Berlapis dengan{' '}
              <em className={`font-serif-accent font-normal text-[1.15em] ${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'}`}>
                Parallax 3D
              </em>
            </>
          ) : (
            <>
              Layered UI Exploration with{' '}
              <em className={`font-serif-accent font-normal text-[1.15em] ${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'}`}>
                3D Parallax
              </em>
            </>
          )}
        </h3>
        <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
          {lang === 'id'
            ? 'Arahkan atau geser kursor di atas kartu untuk melihat pergerakan 4 lapisan kedalaman—mulai dari wireframe latar, widget mini, cutout SVG, hingga panel kaca transparan di depan.'
            : 'Move or drag your cursor across the card to experience 4 depth layers in motion—from the wireframe backdrop and floating widgets to the SVG cutout and frosted glass foreground panels.'}
        </p>
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono ${
            isDark
              ? 'bg-white/5 border-white/10 text-white/75'
              : 'bg-[#faf7fe] border-[#9333ea]/12 text-[#5b516a]'
          }`}
        >
          <span>SVG slot:</span>
          <strong className={isDark ? 'text-[#facc15]' : 'text-[#7e22ce]'}>public/portrait-spatial.svg</strong>
        </div>
      </div>
    </div>
  );
}

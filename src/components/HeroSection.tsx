import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PenTool, Play } from 'lucide-react';
import profile from '../data/profile.json';
import { useLang, useTheme } from '../lib/prefs';

export default function HeroSection() {
  const lang = useLang();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [imgSrc, setImgSrc] = useState<'svg' | 'cutout' | 'portrait' | 'none'>('svg');
  const [hasHoverImg, setHasHoverImg] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mediumTitle, setMediumTitle] = useState<string | null>(null);
  const [mediumUrl, setMediumUrl] = useState<string>(profile.medium);
  const [githubRepos, setGithubRepos] = useState<number | null>(null);

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
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const resolvedSrc =
    imgSrc === 'svg'
      ? '/portrait-cutout.svg'
      : imgSrc === 'cutout'
      ? '/portrait-cutout.png'
      : imgSrc === 'portrait'
      ? '/portrait.jpg'
      : null;

  const handleImgError = () => {
    if (imgSrc === 'svg') setImgSrc('cutout');
    else if (imgSrc === 'cutout') setImgSrc('portrait');
    else setImgSrc('none');
  };

  useEffect(() => {
    let active = true;

    try {
      const cachedMedium = sessionStorage.getItem('qm_medium_cache');
      if (cachedMedium) {
        const parsed = JSON.parse(cachedMedium);
        if (parsed?.title) setMediumTitle(parsed.title);
        if (parsed?.link) setMediumUrl(parsed.link);
      } else {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@qolbulmuzaki')
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (!active || !data?.items?.length) return;
            const latest = data.items[0];
            if (latest?.title) setMediumTitle(latest.title);
            if (latest?.link) setMediumUrl(latest.link);
            try {
              sessionStorage.setItem(
                'qm_medium_cache',
                JSON.stringify({ title: latest?.title, link: latest?.link })
              );
            } catch {}
          })
          .catch(() => {});
      }
    } catch {}

    try {
      const cachedGh = sessionStorage.getItem('qm_github_repos');
      if (cachedGh && !Number.isNaN(Number(cachedGh))) {
        setGithubRepos(Number(cachedGh));
      } else {
        fetch('https://api.github.com/users/zakiii19')
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (!active || typeof data?.public_repos !== 'number') return;
            setGithubRepos(data.public_repos);
            try {
              sessionStorage.setItem('qm_github_repos', String(data.public_repos));
            } catch {}
          })
          .catch(() => {});
      }
    } catch {}

    return () => {
      active = false;
    };
  }, []);

  const fallbackMedium =
    lang === 'id' ? profile.socialStats.latestMediumTitleId : profile.socialStats.latestMediumTitleEn;

  const cardClass = isDark
    ? 'bg-white/12 backdrop-blur-md border border-white/25 text-white shadow-xl hover:bg-white/20'
    : 'bg-white/85 backdrop-blur-md border border-[#9333ea]/15 text-[#181024] shadow-[0_14px_34px_rgba(24,16,36,0.08)] hover:bg-white';

  const portraitShadowClass = isDark
    ? 'drop-shadow-[0_22px_38px_rgba(88,28,135,0.45)]'
    : 'drop-shadow-[0_18px_32px_rgba(107,33,168,0.14)]';

  return (
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
        className="absolute -top-24 right-[10%] w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: isDark ? 'rgba(250, 204, 21, 0.14)' : 'rgba(147, 51, 234, 0.1)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: isDark ? 'rgba(192, 38, 211, 0.24)' : 'rgba(250, 204, 21, 0.14)',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 z-10"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, var(--bg) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-[1180px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-2 items-center">
        {/* Left Column (70%): Badges, Headline, Bio & CTAs */}
        <motion.div
          className="lg:col-span-7 text-left"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="flex flex-wrap items-center gap-2 mb-5"
          >
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold backdrop-blur-md border ${
                isDark
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/90 border-[#9333ea]/20 text-[#181024] shadow-xs'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to Work</span>
            </span>
            <span
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border ${
                isDark
                  ? 'bg-[#facc15]/15 border-[#facc15]/30 text-[#facc15]'
                  : 'bg-[#f3e8ff]/85 border-[#9333ea]/20 text-[#6b21a8]'
              }`}
            >
              {lang === 'id' ? 'UI/UX Designer · Analis Sistem (BNSP)' : 'UI/UX Designer · System Analyst (BNSP)'}
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="text-[2.1rem] sm:text-4xl lg:text-[3.2rem] font-extrabold leading-[1.08] tracking-tight mb-4 max-w-[700px]"
          >
            {lang === 'id' ? (
              <>
                Desain yang{' '}
                <em
                  className={`font-serif-accent text-[1.12em] ${
                    isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                  }`}
                >
                  punya arah,
                </em>{' '}
                rapi secara sistem, &amp; nyaman dipakai
              </>
            ) : (
              <>
                Design with{' '}
                <em
                  className={`font-serif-accent text-[1.12em] ${
                    isDark ? 'text-[#facc15]' : 'text-[#9333ea]'
                  }`}
                >
                  clear direction,
                </em>{' '}
                solid systems, &amp; effortless flow
              </>
            )}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            className={`text-sm sm:text-base max-w-[640px] mb-6 leading-relaxed ${
              isDark ? 'text-white/90' : 'text-[#5b516a]'
            }`}
          >
            {lang === 'id' ? (
              <>
                Saya <strong className={isDark ? 'text-white' : 'text-[#181024]'}>Qolbul Muzaki</strong>, UI/UX &amp; Visual Designer bersertifikat Analis Sistem (BNSP) yang terbiasa mengubah kebutuhan bisnis kompleks menjadi pengalaman digital yang jernih dan berkarakter
              </>
            ) : (
              <>
                I’m <strong className={isDark ? 'text-white' : 'text-[#181024]'}>Qolbul Muzaki</strong>, a UI/UX &amp; Visual Designer certified as a System Analyst (BNSP), turning complex business needs into clear and distinctive digital experiences
              </>
            )}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href="#work"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className={`px-5 py-3 rounded-full font-extrabold text-xs sm:text-sm shadow-xl transition-colors ${
                isDark ? 'bg-white text-[#581c87]' : 'bg-[#181024] text-white'
              }`}
            >
              {lang === 'id' ? 'Lihat Karya Pilihan ↓' : 'Explore Selected Work ↓'}
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className={`px-5 py-3 rounded-full border backdrop-blur-sm font-bold text-xs sm:text-sm transition-colors ${
                isDark
                  ? 'bg-white/10 border-white/40 text-white hover:bg-white/20'
                  : 'bg-white/85 border-[#9333ea]/20 text-[#181024] hover:bg-white shadow-sm'
              }`}
            >
              {lang === 'id' ? 'Tentang & Resume PDF' : 'About & Resume PDF'}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column (30%): Portrait Focal Point + Compact Figma Canvas + Floating Cards */}
        <div className="lg:col-span-3 lg:-ml-4 relative min-h-[340px] sm:min-h-[450px] flex flex-col sm:flex-row items-center sm:items-end justify-center overflow-visible">
          {/* Strong Studio Spotlight Directly Behind Portrait */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] rounded-full pointer-events-none blur-2xl"
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
            animate={{ opacity: 1, scale: isHovered ? 1.025 : 1 }}
            transition={{
              opacity: { duration: 0.55, delay: 0.25 },
              scale: { type: 'spring', stiffness: 260, damping: 20 },
            }}
            className={`hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-3 w-[290px] h-[365px] border pointer-events-none z-0 ${
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
              className={`absolute -top-5 left-0 text-[10px] font-mono font-semibold transition-colors ${
                isDark ? 'text-[#facc15]/80' : 'text-[#9333ea]/80'
              }`}
            >
              {isHovered && hasHoverImg ? '❖ Qolbul_Pose2.svg' : '❖ Qolbul_Portrait.svg'}
            </span>
          </motion.div>

          {/* HERO FOCAL POINT: Central Cutout Portrait */}
          <motion.div
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
            className="portrait-fade-mask relative z-20 shrink-0 w-[270px] sm:w-[390px] h-[330px] sm:h-[445px] flex items-end justify-center cursor-pointer"
          >
            {resolvedSrc ? (
              <div
                className={`relative w-full h-full transition-transform duration-300 ease-out origin-center ${
                  isHovered ? 'scale-[1.02]' : 'scale-100'
                }`}
              >
                <img
                  src={resolvedSrc}
                  alt="Qolbul Muzaki"
                  loading="eager"
                  decoding="sync"
                  onError={handleImgError}
                  className={`w-full h-full object-contain object-bottom ${portraitShadowClass} ${
                    isHovered && hasHoverImg ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {hasHoverImg && (
                  <img
                    src="/portrait-cutout-hover.svg"
                    alt="Qolbul Muzaki Pose 2"
                    loading="eager"
                    decoding="sync"
                    onError={() => setHasHoverImg(false)}
                    className={`absolute inset-0 w-full h-full object-contain object-bottom ${portraitShadowClass} ${
                      isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-full rounded-[32px] border-2 border-dashed border-white/40 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-85 mb-2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="font-extrabold text-sm">
                  {lang === 'id' ? 'Foto Cutout PNG/SVG Anda' : 'Your Cutout Portrait'}
                </span>
                <small className="text-[11px] text-white/75 mt-1">
                  public/portrait-cutout.svg
                </small>
              </div>
            )}
          </motion.div>

          {/* Subtle Hover Cue Right Below Portrait */}
          <div
            className={`hidden sm:inline-flex items-center gap-1.5 absolute bottom-1 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-semibold ${
              isDark
                ? 'bg-white/12 border-white/20 text-white/90'
                : 'bg-white/85 border-[#9333ea]/20 text-[#181024] shadow-sm'
            }`}
          >
            <Play size={10} fill="currentColor" className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
            <span>{lang === 'id' ? 'Arahkan kursor ke foto' : 'Hover portrait'}</span>
          </div>

          {/* Card 1: Top-Left Asymmetrical (Live Medium Latest Article via RSS) */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute top-6 -left-14 z-30 w-[165px]"
          >
            <motion.a
              href={mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`block -rotate-2 rounded-2xl p-3 transition-colors ${cardClass}`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[9px] font-bold tracking-widest uppercase ${
                    isDark ? 'text-white/75' : 'text-[#5b516a]'
                  }`}
                >
                  {lang === 'id' ? 'Artikel Medium' : 'Medium Article'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Live RSS" />
              </div>
              <p className="text-[11px] font-bold leading-snug line-clamp-2">
                {mediumTitle || fallbackMedium}
              </p>
            </motion.a>
          </motion.div>

          {/* Small Design Tool Element: Top-Right */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute top-28 -right-4 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full rotate-2 transition-colors ${cardClass}`}
            >
              <PenTool size={12} className={isDark ? 'text-[#facc15]' : 'text-[#9333ea]'} />
              <span className="text-[10px] font-extrabold tracking-tight">Figma</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#9333ea]" />
                <span className="w-2 h-2 rounded-full bg-[#facc15]" />
              </span>
            </motion.div>
          </motion.div>

          {/* Card 2: Bottom-Left (GitHub Live) */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute bottom-16 -left-10 z-30 w-[155px]"
          >
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              whileHover={{ y: -5, scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`block rotate-1 rounded-2xl p-3 transition-colors text-left ${cardClass}`}
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[10px] font-extrabold">GitHub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Live API" />
              </div>
              <div className={`text-[11px] font-bold ${isDark ? 'text-white/90' : 'text-[#5b516a]'}`}>
                <strong className={`text-base font-extrabold ${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'}`}>
                  {githubRepos !== null ? githubRepos : '10+'}
                </strong>{' '}
                {lang === 'id' ? 'Repositori' : 'Public Repos'}
              </div>
            </motion.a>
          </motion.div>

          {/* Card 3: Bottom-Right Asymmetrical (Karya & Desain 50+ in Foreground z-30) */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute bottom-12 -right-4 z-30 w-[160px]"
          >
            <motion.a
              href={profile.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              whileHover={{ y: -5, scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`block -rotate-2 rounded-2xl p-3 transition-colors ${cardClass}`}
            >
              <span className={`block text-[10px] font-semibold mb-0.5 ${isDark ? 'text-white/80' : 'text-[#5b516a]'}`}>
                {lang === 'id' ? 'Karya & Desain' : 'Design Works'}
              </span>
              <div className="text-xl font-extrabold tracking-tight mb-1.5">
                50+
              </div>
              <div className="flex items-end gap-1 h-5">
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.45, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                  className={`flex-1 h-2 rounded-sm ${isDark ? 'bg-[#e9d5ff]/70' : 'bg-[#e9d5ff]'}`}
                />
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.45, delay: 0.93, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                  className={`flex-1 h-3.5 rounded-sm ${isDark ? 'bg-[#e9d5ff]/85' : 'bg-[#d8b4fe]'}`}
                />
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.45, delay: 1.01, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                  className={`flex-1 h-2.5 rounded-sm ${isDark ? 'bg-[#e9d5ff]/70' : 'bg-[#e9d5ff]'}`}
                />
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.45, delay: 1.09, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                  className={`flex-1 h-5 rounded-sm ${isDark ? 'bg-[#facc15]' : 'bg-[#9333ea]'}`}
                />
              </div>
            </motion.a>
          </motion.div>

          {/* Mobile Compact Live Cards Row (Visible < sm) */}
          <div className="sm:hidden grid grid-cols-2 gap-2.5 w-full mt-3 relative z-30">
            <a
              href={mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl p-3 transition-all ${cardClass}`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-[9px] font-bold tracking-wider uppercase ${isDark ? 'text-white/75' : 'text-[#5b516a]'}`}>
                  {lang === 'id' ? 'Artikel Medium' : 'Medium Article'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] font-bold leading-snug line-clamp-2">
                {mediumTitle || fallbackMedium}
              </p>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl p-3 transition-all flex flex-col justify-between ${cardClass}`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-extrabold">GitHub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className={`text-[11px] font-bold ${isDark ? 'text-white/90' : 'text-[#5b516a]'}`}>
                <strong className={`text-base font-extrabold ${isDark ? 'text-[#facc15]' : 'text-[#9333ea]'}`}>
                  {githubRepos !== null ? githubRepos : '10+'}
                </strong>{' '}
                {lang === 'id' ? 'Repositori' : 'Public Repos'}
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

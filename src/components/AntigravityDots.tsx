import React, { useEffect, useRef } from 'react';

interface Props {
  isDark: boolean;
}

interface Particle {
  baseAngle: number;
  radius: number;
  size: number;
  speed: number;
  color: string;
  alpha: number;
}

export default function AntigravityDots({ isDark }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette = isDark
      ? ['#c084fc', '#facc15', '#e879f9', '#818cf8']
      : ['#9333ea', '#c026d3', '#a855f7', '#eab308'];

    let width = 0;
    let height = 0;
    let rafId = 0;
    const particles: Particle[] = [];

    const buildParticles = () => {
      particles.length = 0;
      const maxR = Math.min(width, height) * 0.56;
      const ringCount = 11;

      for (let rIdx = 1; rIdx <= ringCount; rIdx++) {
        const progress = rIdx / ringCount;
        const radius = 58 + progress * maxR;
        const count = Math.floor(14 + rIdx * 6);

        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + rIdx * 0.22;
          const fadeOut = 1 - progress * 0.65;
          particles.push({
            baseAngle: angle,
            radius,
            size: 1.3 + (1 - progress) * 1.4 + ((i % 3 === 0) ? 0.5 : 0),
            speed: (rIdx % 2 === 0 ? 1 : -1) * (0.00018 + (1 - progress) * 0.00014),
            color: palette[(i + rIdx) % palette.length],
            alpha: (isDark ? 0.55 : 0.42) * fadeOut,
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', onMove);
    parent?.addEventListener('mouseleave', onLeave);

    const start = performance.now();

    const render = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = p.baseAngle + elapsed * p.speed;
        const breathe = Math.sin(elapsed * 0.0014 + p.radius * 0.03) * 3;
        let x = cx + Math.cos(angle) * (p.radius + breathe);
        let y = cy + Math.sin(angle) * (p.radius * 0.72 + breathe);

        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const influence = 95;
          if (dist > 0 && dist < influence) {
            const push = ((influence - dist) / influence) * 14;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      parent?.removeEventListener('mousemove', onMove);
      parent?.removeEventListener('mouseleave', onLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

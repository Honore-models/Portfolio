"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const PARTICLE_COUNT = 220;
const LINK_DIST = 95;
const MOUSE_DIST = 150;
const MOUSE_FORCE = 0.04;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;
// Links are batched into a few alpha buckets so we stroke once per bucket
// instead of once per line.
const ALPHA_BUCKETS = 6;
const SPRITE_SIZE = 32;

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = false;
    let resizeRaf = 0;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pre-render the particle glow once; drawImage is far cheaper than
    // building a radial gradient for every particle on every frame.
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE_SIZE;
    sprite.height = SPRITE_SIZE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const c = SPRITE_SIZE / 2;
      const glow = sctx.createRadialGradient(c, c, 0, c, c, c);
      glow.addColorStop(0, "rgba(160, 210, 235, 0.55)");
      glow.addColorStop(0.4, "rgba(80, 150, 200, 0.18)");
      glow.addColorStop(1, "rgba(80, 150, 200, 0)");
      sctx.fillStyle = glow;
      sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      sctx.beginPath();
      sctx.fillStyle = "rgba(170, 210, 235, 0.75)";
      sctx.arc(c, c, c / 3.2, 0, Math.PI * 2);
      sctx.fill();
    }

    const buckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      const baseCount = isMobile ? 70 : PARTICLE_COUNT;
      const count = Math.round(
        baseCount * Math.min(1.15, Math.max(0.75, (width * height) / (1400 * 900)))
      );

      if (particles.length === 0) {
        particles = Array.from({ length: count }, () => createParticle(width, height));
      } else {
        // Keep existing particles in bounds when resizing
        for (const p of particles) {
          p.x = Math.min(width, Math.max(0, p.x));
          p.y = Math.min(height, Math.max(0, p.y));
        }
        while (particles.length < count) {
          particles.push(createParticle(width, height));
        }
        while (particles.length > count) particles.pop();
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const onLeave = () => {
      mouse.current.active = false;
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouse.current.x = e.touches[0].clientX;
      mouse.current.y = e.touches[0].clientY;
      mouse.current.active = true;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mouseOn = mouse.current.active;

      for (const p of particles) {
        // Gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // Pull toward cursor
        if (mouseOn) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST && dist > 0.1) {
            const force = (1 - dist / MOUSE_DIST) * MOUSE_FORCE;
            p.vx += dx * force * 0.08;
            p.vy += dy * force * 0.08;
          }
        }

        // Soft damping + speed clamp
        p.vx *= 0.98;
        p.vy *= 0.98;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 1.6) {
          p.vx = (p.vx / speed) * 1.6;
          p.vy = (p.vy / speed) * 1.6;
        }

        // Bounce at edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.min(width, Math.max(0, p.x));
        p.y = Math.min(height, Math.max(0, p.y));
      }

      // Links between particles (squared distances, batched strokes)
      for (const b of buckets) b.length = 0;
      const n = particles.length;
      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          if (dx > LINK_DIST || dx < -LINK_DIST) continue;
          const dy = a.y - b.y;
          if (dy > LINK_DIST || dy < -LINK_DIST) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const t = 1 - Math.sqrt(d2) / LINK_DIST;
            const k = Math.min(ALPHA_BUCKETS - 1, Math.floor(t * ALPHA_BUCKETS));
            buckets[k].push(a.x, a.y, b.x, b.y);
          }
        }
      }
      ctx.lineWidth = 0.7;
      for (let k = 0; k < ALPHA_BUCKETS; k++) {
        const lines = buckets[k];
        if (lines.length === 0) continue;
        const alpha = ((k + 0.5) / ALPHA_BUCKETS) * 0.28;
        ctx.strokeStyle = `rgba(100, 180, 220, ${alpha})`;
        ctx.beginPath();
        for (let m = 0; m < lines.length; m += 4) {
          ctx.moveTo(lines[m], lines[m + 1]);
          ctx.lineTo(lines[m + 2], lines[m + 3]);
        }
        ctx.stroke();
      }

      // Links from cursor to nearby particles
      if (mouseOn) {
        ctx.lineWidth = 0.85;
        for (const p of particles) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST_SQ) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.45;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(56, 160, 210, ${alpha})`;
            ctx.stroke();
          }
        }

        // Cursor node
        ctx.drawImage(sprite, mx - 12, my - 12, 24, 24);
      }

      // Particle nodes
      for (const p of particles) {
        const size = p.r * 6.4;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }

      if (!running) return;
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    // Don't burn CPU/GPU while the tab is in the background.
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        if (!running) draw();
      });
    };

    resize();
    draw();
    start();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#02060f]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(8, 35, 75, 0.35), transparent 55%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 0.55 + Math.random() * 0.7,
  };
}

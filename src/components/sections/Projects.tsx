"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Eye,
  Github,
  Layers,
  MessageSquare,
  TrendingUp,
  AudioLines,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/content";
import BackToTop from "@/components/ui/BackToTop";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Computer Vision": Eye,
  NLP: MessageSquare,
  "Speech AI": AudioLines,
  MLOps: Workflow,
  Recommendation: TrendingUp,
  Forecasting: Layers,
  "AI Agent": Crosshair,
};

const metricIcons = [Crosshair, Layers, TrendingUp];

/* Map every tech name to its logo file in /public/logos/ */
const techLogoMap: Record<string, string> = {
  Python:         "/logos/python.svg",
  TypeScript:     "/logos/typescript.svg",
  "Next.js":      "/logos/nextjs.svg",
  Django:         "/logos/django.svg",
  "Tailwind CSS": "/logos/tailwindcss.svg",
  OpenAI:         "/logos/openai.svg",
  Qwen:           "/logos/qwen.svg",
  PyTorch:        "/logos/pytorch.svg",
  TensorFlow:     "/logos/tensorflow.svg",
  "scikit-learn": "/logos/scikit-learn.svg",
  Docker:         "/logos/docker.svg",
  FastAPI:        "/logos/fastapi.svg",
  OpenCV:         "/logos/opencv.svg",
};

function TechBadge({ name }: { name: string }) {
  const logo = techLogoMap[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
      {logo ? (
        <span className="relative w-4 h-4 shrink-0">
          <Image src={logo} alt={name} fill className="object-contain" unoptimized />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
      )}
      {name}
    </span>
  );
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const CatIcon = categoryIcons[project.category] ?? Eye;

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold tracking-[0.15em] text-white mb-12 md:mb-16"
        >
          PROJECTS
        </motion.h2>

        <div className="relative flex items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-xl border border-white/20 text-white/80 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-400/5 transition-all"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hud-frame rounded-2xl p-4 sm:p-5 md:p-8 relative overflow-hidden"
              >
                {/* Corner accents */}
                <div className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-l-2 border-t-2 border-cyan-400/60" />
                <div className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-r-2 border-t-2 border-cyan-400/60" />
                <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-l-2 border-b-2 border-cyan-400/60" />
                <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-r-2 border-b-2 border-cyan-400/60" />

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* ── Left: info ── */}
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-xs font-mono text-cyan-400/80">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
                        <CatIcon size={12} />
                        {project.category}
                      </span>
                      {project.status && (
                        <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                          project.status === "Production"
                            ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                            : "border border-amber-400/30 bg-amber-400/10 text-amber-300"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Production" ? "bg-emerald-400" : "bg-amber-400"
                          }`} />
                          {project.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech badges with real logos */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <TechBadge key={t} name={t} />
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                      {project.metrics.map((m, i) => {
                        const Icon = metricIcons[i % metricIcons.length];
                        return (
                          <div key={m.label} className="text-center sm:text-left min-w-0">
                            <Icon size={14} className="mx-auto sm:mx-0 text-cyan-400 mb-1" />
                            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{m.value}</p>
                            <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 leading-tight">{m.label}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          className="gradient-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                        >
                          View Project
                          <ArrowRight size={14} />
                        </a>
                      )}
                      {project.sourceUrl && project.sourceUrl !== "#" && (
                        <a
                          href={project.sourceUrl}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:border-cyan-400/40 hover:bg-white/5 transition-all"
                        >
                          <Github size={14} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── Right: project image ── */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer wrapper — constrain max size */}
                    <div className="w-full max-w-[320px] mx-auto">
                      <div
                        className="relative rounded-xl border border-cyan-400/30 bg-[#070e1b] overflow-hidden"
                        style={{ aspectRatio: "4/3" }}
                      >
                        {/* Ambient blur background */}
                        {project.image && (
                          <Image
                            src={project.image}
                            alt=""
                            fill
                            className="object-cover opacity-20 blur-2xl scale-110 pointer-events-none"
                            unoptimized
                          />
                        )}

                        {/* Main screenshot — fills the window */}
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                            unoptimized
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-5">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                      : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-xl border border-white/20 text-white/80 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-400/5 transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden justify-center gap-3 mt-4">
          <button type="button" onClick={() => go(-1)}
            className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/20 text-white">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => go(1)}
            className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/20 text-white">
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {projects.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`text-left rounded-xl border transition-all overflow-hidden ${
                  active
                    ? "border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 opacity-70 hover:opacity-100"
                }`}
              >
                {/* Thumbnail image */}
                <div className="relative w-full h-24 bg-[#070e1b]">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover opacity-70"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/80 to-transparent" />
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 bg-[#040814]/60 px-1.5 py-0.5 rounded">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-white truncate">{p.title}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{p.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        <BackToTop />
      </div>
    </section>
  );
}

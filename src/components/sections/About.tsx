"use client";

import { motion } from "motion/react";
import {
  ChevronDown,
  GripVertical,
  Info,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { about } from "@/data/content";
import SvgLoader from "@/components/ui/SvgLoader";

/* Real logos mapped to each skill */
const skillLogos: Record<string, string> = {
  "Python":           "/logos/python.svg",
  "Machine Learning": "/logos/scikit-learn.svg",
  "Deep Learning":    "/logos/pytorch.svg",
  "Data Engineering": "/logos/kafka.svg",
  "NLP":              "/logos/huggingface.svg",
  "MLOps":            "/logos/mlops.svg",
};

const toolLogos = [
  { name: "PyTorch",      src: "/logos/pytorch.svg"      },
  { name: "TensorFlow",   src: "/logos/tensorflow.svg"   },
  { name: "scikit-learn", src: "/logos/scikit-learn.svg" },
  { name: "Docker",       src: "/logos/docker.svg"       },
];

/*
  Connector overlay SVG — spans the full grid width (100%) and full grid height.
  Uses a 1000×800 viewBox (aspect-ratio preserved via xMidYMid meet).

  Left column occupies 0–420 (≈42%), center gap 420–580, right col 580–1000.
  
  Top curve:   amber dot  at (420, 210)  →  white dot at (580, 90)
               S-shape: exit right, then arrive from above
               Cubic bezier: C(580,210) (420,90)
               
  Bottom curve: white dot at (580, 540)  →  cyan dot at (420, 660)
               S-shape: exit left, then arrive from below  
               Cubic bezier: C(420,540) (580,660)
*/
function Connector() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow-c" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* amber → near-white */}
        <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* near-white → cyan (path goes right→left so flip gradient) */}
        <linearGradient id="cg2" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%"   stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* ── Top curve: ABOUT_ME right → SKILLS card left (~top third) ── */}
      <path
        d="M420,210 C505,210 505,155 575,155"
        fill="none"
        stroke="url(#cg1)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow-c)"
      />
      <circle cx="420" cy="210" r="7" fill="#fbbf24" filter="url(#dot-glow)" />
      <circle cx="420" cy="210" r="4" fill="#fde68a" />
      <circle cx="575" cy="155" r="5" fill="#cbd5e1" opacity="0.9" />

      {/* ── Bottom curve: SKILLS card left (bottom) → PROFILE right ── */}
      <path
        d="M575,490 C505,490 505,610 420,610"
        fill="none"
        stroke="url(#cg2)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow-c)"
      />
      <circle cx="575" cy="490" r="5" fill="#cbd5e1" opacity="0.9" />
      <circle cx="420" cy="610" r="7" fill="#22d3ee" filter="url(#dot-glow)" />
      <circle cx="420" cy="610" r="4" fill="#67e8f9" />
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
            A systems-minded ML engineer focused on turning research into reliable production AI.
          </p>
        </motion.div>

        {/*
          Grid:  [left col]  [60px gap]  [right col]
          position:relative so the connector SVG can overlay the full grid.
        */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] items-start">

          {/* Full-grid connector overlay (desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
            <Connector />
          </div>

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="flex flex-col gap-5">

            {/* ABOUT_ME card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl p-6"
              style={{
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(125,211,252,0.18)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase font-mono">
                  ABOUT_ME
                </span>
                <Info size={14} className="text-slate-600" />
              </div>

              <p className="text-slate-300 leading-[1.9] text-sm font-mono">
                {about.bio}
                <span className="typing-cursor" aria-hidden />
              </p>

              <div className="flex gap-1.5 mt-5">
                {[0,1,2].map(i => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                ))}
              </div>
            </motion.div>

            {/* PROFILE card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(125,211,252,0.18)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Corner accent glows */}
              <div className="pointer-events-none absolute top-0 left-0 w-20 h-20 rounded-tl-2xl"
                style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.22) 0%, transparent 65%)" }} />
              <div className="pointer-events-none absolute bottom-0 right-0 w-20 h-20 rounded-br-2xl"
                style={{ background: "linear-gradient(315deg, rgba(168,85,247,0.22) 0%, transparent 65%)" }} />

              <div className="flex items-center gap-2 mb-4 relative z-10">
                <span className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase font-mono">
                  PROFILE
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>

              <div
                className="relative rounded-xl overflow-hidden flex items-center justify-center"
                style={{
                  background: "rgba(5,11,26,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  minHeight: "260px",
                }}
              >
                <SvgLoader />
              </div>

              <div className="flex gap-1.5 mt-4">
                {[0,1,2].map(i => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══ CENTER COLUMN (spacer only on desktop) ═══ */}
          <div className="hidden lg:block" />

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="flex flex-col gap-0 lg:gap-0 lg:mt-8 lg:pl-3">

            {/* SKILLS card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-2xl p-6"
              style={{
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(125,211,252,0.18)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase font-outfit">
                  SKILLS
                </span>
                <Plus size={14} className="text-slate-500" />
              </div>

              <ul className="space-y-2">
                {about.skills.map((skill, i) => {
                  const logo = skillLogos[skill.name];
                  return (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04] cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        borderRight: "1px solid rgba(255,255,255,0.06)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        borderLeft: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Skill logo */}
                      <span className="relative w-5 h-5 shrink-0">
                        {logo ? (
                          <Image
                            src={logo}
                            alt={skill.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <span
                            className="block w-4 h-4 rounded-full"
                            style={{ background: skill.color }}
                          />
                        )}
                      </span>
                      <span className="flex-1 text-sm font-medium text-white font-mono">
                        {skill.name}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded border border-white/10 font-mono"
                        style={{ color: skill.color }}
                      >
                        {skill.level}
                      </span>
                      <ChevronDown size={13} className="text-slate-600" />
                      <GripVertical size={14} className="text-slate-700" />
                    </motion.li>
                  );
                })}
              </ul>

              <div className="flex gap-1.5 mt-5">
                {[0,1,2].map(i => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                ))}
              </div>
            </motion.div>

            {/* + node connector between SKILLS and TOOLS */}
            <div className="flex flex-col items-center py-1">
              <div className="h-5 w-px" style={{ background: "linear-gradient(to bottom, rgba(148,163,184,0.4), rgba(148,163,184,0.7))" }} />
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-500/60 text-slate-400"
                style={{ background: "rgba(10,22,40,0.95)" }}
              >
                <Plus size={13} />
              </div>
              <div className="h-5 w-px" style={{ background: "linear-gradient(to bottom, rgba(148,163,184,0.7), rgba(148,163,184,0.4))" }} />
            </div>

            {/* TOOLS & FRAMEWORKS card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl p-6"
              style={{
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(125,211,252,0.18)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase font-mono">
                  TOOLS &amp; FRAMEWORKS
                </span>
                <Plus size={14} className="text-slate-500" />
              </div>

              <div className="flex flex-wrap justify-around gap-6">
                {toolLogos.map(({ name, src }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={src}
                        alt={name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

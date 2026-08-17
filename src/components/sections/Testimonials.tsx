"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const n = testimonials.length;

  const prev = () => setIndex((i) => (i - 1 + n) % n);
  const next = () => setIndex((i) => (i + 1) % n);

  const left = testimonials[(index - 1 + n) % n];
  const center = testimonials[index];
  const right = testimonials[(index + 1) % n];

  const fan = isMobile
    ? [{ item: center, rotate: 0, x: 0, z: 10, scale: 1, opacity: 1 }]
    : [
        { item: left, rotate: -14, x: -110, z: 0, scale: 0.88, opacity: 0.55 },
        { item: center, rotate: 0, x: 0, z: 10, scale: 1, opacity: 1 },
        { item: right, rotate: 14, x: 110, z: 0, scale: 0.88, opacity: 0.55 },
      ];

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Testimonials
        </motion.h2>
        <p className="text-center text-slate-400 text-xs sm:text-sm mb-10 sm:mb-14 max-w-md mx-auto px-2">
          What collaborators say about working together on production AI systems.
        </p>

        <div className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="z-20 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#0a1628]/80 text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={22} className="hidden sm:block" />
          </button>

          <div className="relative h-[300px] sm:h-[320px] md:h-[340px] w-full max-w-[min(100%,20rem)] sm:max-w-xl flex items-center justify-center">
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-3 rounded-full bg-black/50 blur-md" />

            <AnimatePresence mode="popLayout">
              {fan.map(({ item, rotate, x, z, scale, opacity }, i) => (
                <motion.div
                  key={`${item.id}-${index}-${i}`}
                  initial={{ opacity: 0, scale: 0.85, rotate: rotate * 1.2, x }}
                  animate={{ opacity, scale, rotate, x, zIndex: z }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="absolute w-[min(100%,18rem)] sm:w-[260px] md:w-[300px] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl"
                  style={{
                    background: `linear-gradient(145deg, ${item.color}33 0%, #0a1628ee 45%, #0a1628 100%)`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${item.color}22`,
                  }}
                >
                  <Quote size={20} style={{ color: item.color }} className="mb-3 opacity-80 sm:hidden" />
                  <Quote size={22} style={{ color: item.color }} className="mb-3 opacity-80 hidden sm:block" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5 min-h-[80px] sm:min-h-[96px]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: item.color }}>
                      {item.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="z-20 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#0a1628]/80 text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={22} className="hidden sm:block" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8 sm:mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-cyan-400" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { stackBottom, stackTop } from "@/data/content";

/* Map stack item names → logo paths in /public/logos/ */
const logoMap: Record<string, string> = {
  MLOps: "/logos/mlops.svg",
  Python: "/logos/python.svg",
  TypeScript: "/logos/typescript.svg",
  "Next.js": "/logos/nextjs.svg",
  PyTorch: "/logos/pytorch.svg",
  TensorFlow: "/logos/tensorflow.svg",
  "Hugging Face": "/logos/huggingface.svg",
  Transformers: "/logos/transformers.svg",
  "Scikit-Learn": "/logos/scikit-learn.svg",
  SQL: "/logos/sql.svg",
  FastAPI: "/logos/fastapi.svg",
  "Express JS": "/logos/express.svg",
  Django: "/logos/django.svg",
  Docker: "/logos/docker.svg",
};

function StackPill({ name, accent }: { name: string; accent: string }) {
  const logo = logoMap[name];
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-[#0c1a30]/90 px-3 py-2 sm:px-5 sm:py-3 shadow-[0_0_20px_rgba(0,0,0,0.25)]">
      {logo ? (
        <span className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            unoptimized
          />
        </span>
      ) : (
        <span
          className="h-3 w-3 sm:h-4 sm:w-4 rounded-full shrink-0"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
      )}
      <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
        {name}
      </span>
      <span
        className="ml-0.5 sm:ml-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full shrink-0"
        style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
      />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: { name: string; accent: string }[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div
        className={`flex w-max gap-4 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {doubled.map((item, i) => (
          <StackPill
            key={`${item.name}-${i}`}
            name={item.name}
            accent={item.accent}
          />
        ))}
      </div>
    </div>
  );
}

export default function EngineeringStack() {
  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Engineering Stack
          </h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            The tools and frameworks powering production-grade AI and software
            systems.
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={stackTop} direction="left" />
        <MarqueeRow items={stackBottom} direction="right" />
      </div>
    </section>
  );
}

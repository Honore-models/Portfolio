"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export default function BackToTop() {
  return (
    <div className="flex justify-center mt-10 sm:mt-14">
      <motion.a
        href="#home"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-400 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-400/5 transition-all"
      >
        <ArrowUp size={16} />
        Back to Top
      </motion.a>
    </div>
  );
}

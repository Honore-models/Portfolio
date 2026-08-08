"use client";

import { motion } from "motion/react";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Experience
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            My academic journey and independent project development in AI/ML.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-violet-500/40 to-transparent md:-translate-x-px" />

          <ul className="space-y-10">
            {experience.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className={`relative md:flex ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:items-start md:gap-10`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-1.5 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] z-10" />
                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"
                  }`}
                >
                  <div className="glass-panel rounded-2xl p-5 inline-block text-left w-full">
                    <p className="text-xs font-medium text-cyan-400 mb-1">{job.period}</p>
                    <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                    <p className="text-sm text-violet-300 mb-3">{job.company}</p>
                    <ul className="space-y-2">
                      {job.points.map((p) => (
                        <li key={p} className="text-sm text-slate-400 leading-relaxed">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

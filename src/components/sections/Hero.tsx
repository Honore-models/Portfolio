"use client";

import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { site } from "@/data/content";
import FancyButton from "@/components/ui/FancyButton";
import SvgLoader from "@/components/ui/SvgLoader";



export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-24 md:pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              Machine Learning Engineer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-6">
              Exploring the Boundary Between Data and Intelligence.
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              I experiment, engineer, and deploy machine learning systems that transform patterns hidden in data into useful intelligence.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <FancyButton href="#projects" icon>
                Explore My Research &amp; Projects
              </FancyButton>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={site.social.email}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right visual — interactive SVG orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center h-[360px] sm:h-[420px] lg:h-[480px]"
          >
            <SvgLoader />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

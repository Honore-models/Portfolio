"use client";

import { Mail, MapPin } from "lucide-react";
import SocialTooltip from "@/components/ui/SocialTooltip";
import Logo from "@/components/ui/Logo";
import { navLinks, services, site } from "@/data/content";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="w-12 h-12 mb-4" />
            <p className="text-base font-bold text-white">{site.name}</p>
            <p className="text-sm text-slate-400 mt-0.5">{site.title}</p>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-[220px]">
              {site.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Focus Areas</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-slate-600" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Let&apos;s Connect</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Open to discussing ML systems, research collaborations, and new opportunities.
            </p>
            <a
              href={site.social.email}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 mb-2 transition-colors"
            >
              <Mail size={14} className="text-cyan-400" />
              {site.email}
            </a>
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={14} className="text-violet-400" />
              {site.location}
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-6">Follow Me</h3>
            <SocialTooltip />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            Copyright {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">Built with Next.js - Three.js - Motion</p>
        </div>
      </div>
    </footer>
  );
}

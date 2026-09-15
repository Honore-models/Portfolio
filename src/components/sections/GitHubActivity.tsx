"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, LoaderCircle } from "lucide-react";
import { site } from "@/data/content";

type Contribution = { date: string; count: number; level: number };
type Activity = { username: string; total: number; contributions: Contribution[] };

const levelClasses = [
  "bg-cyan-950/70",
  "bg-cyan-900/80",
  "bg-cyan-700/90",
  "bg-cyan-500",
  "bg-cyan-300",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github-contributions", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Activity request failed");
        return response.json();
      })
      .then((data: Activity) => setActivity(data))
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== "AbortError") setError(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="activity" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            LIVE FROM GITHUB
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Contribution Activity
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">
            A live view of my open-source work over the last year.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel mx-auto max-w-6xl rounded-2xl p-5 sm:p-7"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <Github size={21} />
              </div>
              <div>
                <p className="font-semibold text-white">{activity ? `@${activity.username}` : "GitHub activity"}</p>
                <p className="text-sm text-slate-400">{activity ? `${activity.total.toLocaleString()} contributions in the last year` : "Fetching latest contributions…"}</p>
              </div>
            </div>
            <a href={site.social.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-100">
              View profile ↗
            </a>
          </div>

          {activity ? (
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[720px]">
                <div className="mb-2 ml-8 flex justify-between text-[11px] text-slate-500">
                  <span>Less</span><span>More</span>
                </div>
                <div className="flex gap-2">
                  <div className="grid grid-rows-7 gap-1 pt-0.5 text-[10px] text-slate-500">
                    <span /><span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span />
                  </div>
                  <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {activity.contributions.map((day) => (
                      <div
                        key={day.date}
                        title={`${formatDate(day.date)}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                        aria-label={`${formatDate(day.date)}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                        className={`h-3 w-3 rounded-[3px] transition-transform hover:scale-125 ${levelClasses[day.level] ?? levelClasses[0]}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-950/20 text-sm text-slate-400">
              {error ? "Unable to load GitHub activity right now. Please try again shortly." : <><LoaderCircle className="mr-2 animate-spin text-cyan-400" size={18} /> Loading activity</>}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

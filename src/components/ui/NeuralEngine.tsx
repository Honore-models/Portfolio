"use client";

export default function NeuralEngine() {
  return (
    <>
      <style>{`
        /* ── Trace background rails ── */
        .ne-rail {
          stroke: #1e3048;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: square;
        }
        /* ── Animated data-flow packets ── */
        .ne-flow {
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 48 500;
          stroke-dashoffset: 546;
          animation: ne-flow 3.2s cubic-bezier(0.48, 0, 0.82, 1) infinite;
        }
        .ne-flow.slow   { animation-duration: 5s;   }
        .ne-flow.medium { animation-duration: 3.6s; }
        .ne-flow.fast   { animation-duration: 2.5s; }

        .ne-cyan   { stroke: #22d3ee; filter: drop-shadow(0 0 5px #22d3eeaa); }
        .ne-violet { stroke: #a78bfa; filter: drop-shadow(0 0 5px #a78bfaaa); }
        .ne-green  { stroke: #4ade80; filter: drop-shadow(0 0 5px #4ade80aa); }
        .ne-amber  { stroke: #fbbf24; filter: drop-shadow(0 0 5px #fbbf24aa); }
        .ne-red    { stroke: #f87171; filter: drop-shadow(0 0 4px #f8717188); }

        @keyframes ne-flow { to { stroke-dashoffset: 0; } }

        /* ── Endpoint node pulse ── */
        .ne-pulse {
          animation: ne-node-pulse 2.6s ease-in-out infinite;
        }
        @keyframes ne-node-pulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1;   }
        }

        /* ── Core ambient breathe ── */
        .ne-breathe { animation: ne-breathe 3.4s ease-in-out infinite; }
        @keyframes ne-breathe {
          0%,100% { opacity: 0.12; }
          50%      { opacity: 0.28; }
        }

        /* ── Status LED blink ── */
        .ne-led { animation: ne-led 1.4s step-end infinite; }
        @keyframes ne-led {
          0%,100% { opacity: 1;   }
          50%      { opacity: 0.1; }
        }

        /* ── Weight shimmer ── */
        .ne-w { animation: ne-shimmer 2s ease-in-out infinite alternate; }
        @keyframes ne-shimmer {
          from { opacity: 0.08; }
          to   { opacity: 0.42; }
        }

        /* ── Corner tick marks on core ── */
        .ne-tick { stroke: #334155; stroke-width: 1.2; fill: none; }
      `}</style>

      <svg
        viewBox="0 0 800 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="ML Neural Engine"
      >
        <defs>
          {/* ── Core gradients ── */}
          <linearGradient id="cg-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1c2d45"/>
            <stop offset="40%"  stopColor="#111e30"/>
            <stop offset="100%" stopColor="#080d18"/>
          </linearGradient>
          <linearGradient id="cg-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.07"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="cg-border" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3b5270" stopOpacity="1"/>
            <stop offset="50%"  stopColor="#1e3048" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#0d1a2a" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="cg-pin-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#0d1a2a"/>
            <stop offset="60%"  stopColor="#1e3048"/>
            <stop offset="100%" stopColor="#3b5270"/>
          </linearGradient>
          <linearGradient id="cg-pin-r" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%"   stopColor="#0d1a2a"/>
            <stop offset="60%"  stopColor="#1e3048"/>
            <stop offset="100%" stopColor="#3b5270"/>
          </linearGradient>
          <linearGradient id="cg-inner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f1e30"/>
            <stop offset="100%" stopColor="#060c16"/>
          </linearGradient>
          <linearGradient id="cg-cyan-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0"/>
            <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
          </linearGradient>

          {/* ── Label fades ── */}
          <linearGradient id="lg-lbl-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.75"/>
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lg-lbl-r" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.75"/>
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
          </linearGradient>

          {/* ── Filters ── */}
          <filter id="f-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-blur-xl">
            <feGaussianBlur stdDeviation="28"/>
          </filter>
          <filter id="f-blur-md">
            <feGaussianBlur stdDeviation="10"/>
          </filter>
          <filter id="f-core-shadow">
            <feDropShadow dx="0" dy="6"  stdDeviation="18" floodColor="#000" floodOpacity="0.8"/>
            <feDropShadow dx="0" dy="0"  stdDeviation="6"  floodColor="#22d3ee" floodOpacity="0.12"/>
            <feDropShadow dx="0" dy="-2" stdDeviation="4"  floodColor="#a78bfa" floodOpacity="0.08"/>
          </filter>
        </defs>

        {/* ══════════════════════════════════════════
            AMBIENT GLOW BEHIND CORE (no background)
        ══════════════════════════════════════════ */}
        <ellipse cx="400" cy="240" rx="190" ry="130"
          fill="#22d3ee" opacity="0.06" filter="url(#f-blur-xl)" className="ne-breathe"/>
        <ellipse cx="400" cy="240" rx="120" ry="80"
          fill="#a78bfa" opacity="0.05" filter="url(#f-blur-xl)" className="ne-breathe"
          style={{animationDelay:"1.2s"}}/>

        {/* ══════════════════════════════════════════
            LEFT INPUT TRACES
        ══════════════════════════════════════════ */}

        {/* 1 · RAW DATA · violet */}
        <path d="M72 100 H182 V208 H318" className="ne-rail"/>
        <path d="M72 100 H182 V208 H318" className="ne-flow ne-violet slow"/>
        <text x="74" y="92" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-l)" letterSpacing="2">RAW DATA</text>
        <circle cx="72" cy="100" r="5" fill="#0d1a2a" stroke="#a78bfa" strokeWidth="1.5"/>
        <circle cx="72" cy="100" r="3" fill="#a78bfa" className="ne-pulse" filter="url(#f-glow-sm)"/>

        {/* 2 · FEATURES · cyan */}
        <path d="M48 178 H162 V226 H318" className="ne-rail"/>
        <path d="M48 178 H162 V226 H318" className="ne-flow ne-cyan medium"/>
        <text x="50" y="170" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-l)" letterSpacing="2">FEATURES</text>
        <circle cx="48" cy="178" r="5" fill="#0d1a2a" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="48" cy="178" r="3" fill="#22d3ee" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"0.7s"}}/>

        {/* 3 · EMBEDDINGS · amber */}
        <path d="M36 248 H140 V244 H318" className="ne-rail"/>
        <path d="M36 248 H140 V244 H318" className="ne-flow ne-amber fast"/>
        <text x="38" y="240" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-l)" letterSpacing="2">EMBEDDINGS</text>
        <circle cx="36" cy="248" r="5" fill="#0d1a2a" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="36" cy="248" r="3" fill="#fbbf24" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"1.2s"}}/>

        {/* 4 · TEXT / IMAGE · green */}
        <path d="M72 336 H182 V262 H318" className="ne-rail"/>
        <path d="M72 336 H182 V262 H318" className="ne-flow ne-green medium"/>
        <text x="74" y="328" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-l)" letterSpacing="2">TEXT · IMAGE</text>
        <circle cx="72" cy="336" r="5" fill="#0d1a2a" stroke="#4ade80" strokeWidth="1.5"/>
        <circle cx="72" cy="336" r="3" fill="#4ade80" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"0.4s"}}/>

        {/* ══════════════════════════════════════════
            RIGHT OUTPUT TRACES
        ══════════════════════════════════════════ */}

        {/* 5 · INFERENCE · cyan */}
        <path d="M728 86 H578 V208 H482" className="ne-rail"/>
        <path d="M728 86 H578 V208 H482" className="ne-flow ne-cyan slow"/>
        <text x="624" y="78" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-r)" letterSpacing="2">INFERENCE</text>
        <circle cx="728" cy="86" r="5" fill="#0d1a2a" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="728" cy="86" r="3" fill="#22d3ee" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"0.9s"}}/>

        {/* 6 · PREDICTION · green */}
        <path d="M752 162 H598 V226 H482" className="ne-rail"/>
        <path d="M752 162 H598 V226 H482" className="ne-flow ne-green fast"/>
        <text x="638" y="154" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-r)" letterSpacing="2">PREDICTION</text>
        <circle cx="752" cy="162" r="5" fill="#0d1a2a" stroke="#4ade80" strokeWidth="1.5"/>
        <circle cx="752" cy="162" r="3" fill="#4ade80" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"1.5s"}}/>

        {/* 7 · CLASSIFICATION · red */}
        <path d="M736 248 H610 V244 H482" className="ne-rail"/>
        <path d="M736 248 H610 V244 H482" className="ne-flow ne-red medium"/>
        <text x="618" y="240" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-r)" letterSpacing="2">CLASSIFY</text>
        <circle cx="736" cy="248" r="5" fill="#0d1a2a" stroke="#f87171" strokeWidth="1.5"/>
        <circle cx="736" cy="248" r="3" fill="#f87171" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"0.3s"}}/>

        {/* 8 · EVALUATION · amber */}
        <path d="M700 334 H580 V262 H482" className="ne-rail"/>
        <path d="M700 334 H580 V262 H482" className="ne-flow ne-amber slow"/>
        <text x="594" y="326" fontFamily="'Courier New',monospace" fontSize="9"
          fill="url(#lg-lbl-r)" letterSpacing="2">EVALUATION</text>
        <circle cx="700" cy="334" r="5" fill="#0d1a2a" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="700" cy="334" r="3" fill="#fbbf24" className="ne-pulse" filter="url(#f-glow-sm)"
          style={{animationDelay:"1.1s"}}/>

        {/* ══════════════════════════════════════════
            CENTRAL CHIP — professional IC package
            Body: x=318 y=176  w=164 h=128  (centre 400,240)
        ══════════════════════════════════════════ */}

        {/* Deep shadow layer */}
        <rect x="320" y="180" width="160" height="124" rx="22"
          fill="#000" opacity="0.6" filter="url(#f-blur-md)"/>

        {/* Outer body */}
        <rect x="318" y="176" width="164" height="128" rx="22"
          fill="url(#cg-body)" filter="url(#f-core-shadow)"/>

        {/* Border */}
        <rect x="318" y="176" width="164" height="128" rx="22"
          fill="none" stroke="url(#cg-border)" strokeWidth="1.5"/>

        {/* Top sheen (glass highlight) */}
        <rect x="320" y="178" width="160" height="38" rx="20"
          fill="url(#cg-sheen)"/>

        {/* Inner recessed die area */}
        <rect x="338" y="196" width="124" height="88" rx="10"
          fill="url(#cg-inner)" stroke="#1a2d45" strokeWidth="1"/>

        {/* Inner die top sheen */}
        <rect x="340" y="198" width="120" height="16" rx="8"
          fill="#ffffff" opacity="0.025"/>

        {/* Cyan accent line top edge of die */}
        <rect x="338" y="196" width="124" height="1.5" rx="1"
          fill="url(#cg-cyan-h)" opacity="0.7"/>

        {/* Corner ticks (PCB pads) */}
        <path d="M322 184 L318 184 L318 188" className="ne-tick"/>
        <path d="M478 184 L482 184 L482 188" className="ne-tick"/>
        <path d="M322 296 L318 296 L318 292" className="ne-tick"/>
        <path d="M478 296 L482 296 L482 292" className="ne-tick"/>

        {/* ── Left pins (5) ── */}
        {[200,216,232,248,264].map((y,i) => (
          <g key={`lp${i}`}>
            <rect x="306" y={y} width="12" height="10" rx="2"
              fill="url(#cg-pin-l)" stroke="#1e3048" strokeWidth="0.8"/>
            {/* pin connector line to body */}
            <line x1="318" y1={y+5} x2="338" y2={y+5}
              stroke="#1e3048" strokeWidth="0.6" opacity="0.8"/>
          </g>
        ))}

        {/* ── Right pins (5) ── */}
        {[200,216,232,248,264].map((y,i) => (
          <g key={`rp${i}`}>
            <rect x="482" y={y} width="12" height="10" rx="2"
              fill="url(#cg-pin-r)" stroke="#1e3048" strokeWidth="0.8"/>
            <line x1="462" y1={y+5} x2="482" y2={y+5}
              stroke="#1e3048" strokeWidth="0.6" opacity="0.8"/>
          </g>
        ))}

        {/* ══ Neural network inside die ══ */}
        {/* L1 – violet nodes */}
        {[214,230,246,262,278].map((y,i) => (
          <g key={`n1${i}`}>
            <circle cx="366" cy={y} r="6" fill="#0d1620" stroke="#a78bfa" strokeWidth="1.2" filter="url(#f-glow-sm)"/>
            <circle cx="366" cy={y} r="2.5" fill="#a78bfa" opacity="0.7"/>
          </g>
        ))}
        {/* L2 – cyan nodes (hidden layer) */}
        {[208,224,240,256,272].map((y,i) => (
          <g key={`n2${i}`}>
            <circle cx="400" cy={y} r="7" fill="#0d1620" stroke="#22d3ee" strokeWidth="1.4" filter="url(#f-glow-sm)"/>
            <circle cx="400" cy={y} r="3" fill="#22d3ee" opacity="0.75"/>
          </g>
        ))}
        {/* L3 – green nodes */}
        {[214,230,246,262,278].map((y,i) => (
          <g key={`n3${i}`}>
            <circle cx="434" cy={y} r="6" fill="#0d1620" stroke="#4ade80" strokeWidth="1.2" filter="url(#f-glow-sm)"/>
            <circle cx="434" cy={y} r="2.5" fill="#4ade80" opacity="0.7"/>
          </g>
        ))}

        {/* Weight connections L1→L2 */}
        {[214,230,246,262,278].flatMap(y1 =>
          [208,224,240,256,272].map(y2 => (
            <line key={`w1-${y1}-${y2}`}
              x1="372" y1={y1} x2="393" y2={y2}
              stroke="#a78bfa" strokeWidth="0.6" className="ne-w"
              style={{animationDelay:`${((y1*3+y2)%9)*0.12}s`}}/>
          ))
        )}
        {/* Weight connections L2→L3 */}
        {[208,224,240,256,272].flatMap(y1 =>
          [214,230,246,262,278].map(y2 => (
            <line key={`w2-${y1}-${y2}`}
              x1="407" y1={y1} x2="428" y2={y2}
              stroke="#22d3ee" strokeWidth="0.6" className="ne-w"
              style={{animationDelay:`${((y1*2+y2)%7)*0.14}s`}}/>
          ))
        )}

        {/* ── Core labels ── */}
        {/* Chip name top */}
        <text x="400" y="211" fontFamily="'Courier New',monospace" fontSize="7.5"
          fill="#64748b" textAnchor="middle" letterSpacing="3" opacity="0.8">
          NEURAL ENGINE
        </text>

        {/* Thin divider below header */}
        <line x1="348" y1="214" x2="452" y2="214"
          stroke="#1e3a55" strokeWidth="0.8" opacity="0.9"/>

        {/* Bottom status bar inside die */}
        <rect x="340" y="277" width="120" height="0.8"
          fill="#1e3048" opacity="0.9"/>

        {/* LED + status */}
        <circle cx="350" cy="286" r="3" fill="#4ade80" className="ne-led" filter="url(#f-glow-sm)"/>
        <text x="358" y="289.5" fontFamily="'Courier New',monospace" fontSize="7"
          fill="#4ade80" letterSpacing="1.8" opacity="0.9">
          MODEL ACTIVE
        </text>
        {/* Latency */}
        <text x="458" y="289.5" fontFamily="'Courier New',monospace" fontSize="6.5"
          fill="#475569" textAnchor="end" letterSpacing="1" opacity="0.8">
          42ms
        </text>

        {/* ── Part number etched on body ── */}
        <text x="400" y="300" fontFamily="'Courier New',monospace" fontSize="5.5"
          fill="#1e3a55" textAnchor="middle" letterSpacing="1.5" opacity="0.9">
          NH-AI-001 · REV 3.1
        </text>

        {/* ── Very faint secondary ghost traces ── */}
        <path d="M108 136 H205 V214 H318" stroke="#0f2035" strokeWidth="1.2" fill="none" opacity="0.55"/>
        <path d="M108 306 H200 V270 H318" stroke="#0f2035" strokeWidth="1.2" fill="none" opacity="0.55"/>
        <path d="M692 134 H590 V214 H482" stroke="#0f2035" strokeWidth="1.2" fill="none" opacity="0.55"/>
        <path d="M662 306 H572 V270 H482" stroke="#0f2035" strokeWidth="1.2" fill="none" opacity="0.55"/>
      </svg>
    </>
  );
}

"use client";

import React from "react";

const POINTS = Array.from({ length: 10 });

const pointStyles: React.CSSProperties[] = [
  { left: "10%", opacity: 1,   animationDuration: "2.35s", animationDelay: "0.2s"  },
  { left: "30%", opacity: 0.7, animationDuration: "2.5s",  animationDelay: "0.5s"  },
  { left: "25%", opacity: 0.8, animationDuration: "2.2s",  animationDelay: "0.1s"  },
  { left: "44%", opacity: 0.6, animationDuration: "2.05s", animationDelay: "0s"    },
  { left: "50%", opacity: 1,   animationDuration: "1.9s",  animationDelay: "0s"    },
  { left: "75%", opacity: 0.5, animationDuration: "1.5s",  animationDelay: "1.5s"  },
  { left: "88%", opacity: 0.9, animationDuration: "2.2s",  animationDelay: "0.2s"  },
  { left: "58%", opacity: 0.8, animationDuration: "2.25s", animationDelay: "0.2s"  },
  { left: "98%", opacity: 0.6, animationDuration: "2.6s",  animationDelay: "0.1s"  },
  { left: "65%", opacity: 1,   animationDuration: "2.5s",  animationDelay: "0.2s"  },
];

interface FancyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
  "aria-label"?: string;
}

export default function FancyButton({
  children,
  href,
  onClick,
  type = "button",
  icon,
  target,
  rel,
  className = "",
  "aria-label": ariaLabel,
}: FancyButtonProps) {
  const inner = (
    <>
      <style>{`
        .fb-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          background:
            radial-gradient(65.28% 65.28% at 50% 100%, rgba(223,113,255,0.8) 0%, rgba(223,113,255,0) 100%),
            linear-gradient(0deg, #7a5af8, #7a5af8);
          border-radius: 0.75rem;
          border: none;
          outline: none;
          padding: 11px 20px;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .fb-btn::before, .fb-btn::after {
          content: "";
          position: absolute;
          transition: all 0.5s ease-in-out;
          border-radius: calc(0.75rem - var(--space));
          z-index: 0;
        }
        .fb-btn::before {
          --space: 1px;
          inset: 1px;
          background: linear-gradient(177.95deg, rgba(255,255,255,0.19) 0%, rgba(255,255,255,0) 100%);
        }
        .fb-btn::after {
          --space: 2px;
          inset: 2px;
          background:
            radial-gradient(65.28% 65.28% at 50% 100%, rgba(223,113,255,0.8) 0%, rgba(223,113,255,0) 100%),
            linear-gradient(0deg, #7a5af8, #7a5af8);
        }
        .fb-btn:active { transform: scale(0.95); }

        .fb-fold {
          z-index: 1;
          position: absolute;
          top: 0; right: 0;
          height: 1rem; width: 1rem;
          display: inline-block;
          transition: all 0.5s ease-in-out;
          background: radial-gradient(100% 75% at 55%, rgba(223,113,255,0.8) 0%, rgba(223,113,255,0) 100%);
          box-shadow: 0 0 3px black;
          border-bottom-left-radius: 0.5rem;
          border-top-right-radius: 0.75rem;
        }
        .fb-fold::after {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 150%; height: 150%;
          transform: rotate(45deg) translateX(0%) translateY(-18px);
          background-color: #e8e8e8;
          pointer-events: none;
        }
        .fb-btn:hover .fb-fold {
          margin-top: -1rem;
          margin-right: -1rem;
        }

        .fb-points {
          overflow: hidden;
          width: 100%; height: 100%;
          pointer-events: none;
          position: absolute;
          z-index: 1;
        }
        .fb-point {
          bottom: -10px;
          position: absolute;
          animation: fb-float infinite ease-in-out;
          pointer-events: none;
          width: 2px; height: 2px;
          background-color: #fff;
          border-radius: 9999px;
        }
        @keyframes fb-float {
          0%   { transform: translateY(0); }
          85%  { opacity: 0; }
          100% { transform: translateY(-55px); opacity: 0; }
        }

        .fb-inner {
          z-index: 2;
          gap: 7px;
          position: relative;
          width: 100%;
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          transition: color 0.2s ease-in-out;
          white-space: nowrap;
        }
        .fb-inner svg.fb-icon {
          width: 16px; height: 16px;
          transition: fill 0.1s linear;
          flex-shrink: 0;
        }
        .fb-btn:focus svg.fb-icon { fill: white; }
        .fb-btn:hover svg.fb-icon {
          fill: transparent;
          animation: fb-dash 1s linear forwards, fb-fill 0.1s linear forwards 0.95s;
        }
        @keyframes fb-dash {
          from { stroke-dasharray: 0 0 0 0; }
          to   { stroke-dasharray: 68 68 0 0; }
        }
        @keyframes fb-fill { to { fill: white; } }
      `}</style>

      <span className="fb-fold" />
      <div className="fb-points">
        {POINTS.map((_, i) => (
          <i key={i} className="fb-point" style={pointStyles[i]} />
        ))}
      </div>
      <span className="fb-inner">
        {icon && (
          <svg
            className="fb-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          >
            {/* lightning bolt default icon */}
            <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
          </svg>
        )}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`fb-btn ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`fb-btn ${className}`}
    >
      {inner}
    </button>
  );
}

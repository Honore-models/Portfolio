"use client";

import { site } from "@/data/content";

export default function SocialTooltip() {
  return (
    <>
      <style>{`
        .st-container {
          position: relative;
          display: inline-block;
          font-family: Arial, sans-serif;
          overflow: visible;
        }

        /* ── Button ── */
        .st-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          color: white;
          padding: 14px 28px;
          border-radius: 50px;
          cursor: pointer;
          border: none;
          outline: none;
          position: relative;
          z-index: 10;
          overflow: hidden;
          box-shadow: 0 8px 15px rgba(0,0,0,0.15);
          animation: st-pulse 3s infinite;
          transition: background 0.4s cubic-bezier(0.25,0.8,0.25,1),
                      transform 0.3s ease,
                      box-shadow 0.4s ease;
        }
        .st-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg,rgba(110,142,251,0.4),rgba(167,119,227,0.4));
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
        }
        .st-btn::after {
          content: "";
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          transform: scale(0);
          transition: transform 0.6s ease-out;
          z-index: -1;
        }
        .st-container:hover .st-btn::before { opacity: 1; }
        .st-container:hover .st-btn::after  { transform: scale(1); }
        .st-container:hover .st-btn {
          background: linear-gradient(135deg, #a777e3, #6e8efb);
          box-shadow: 0 12px 24px rgba(0,0,0,0.2);
          transform: translateY(-4px) scale(1.03);
        }
        .st-btn:active {
          transform: translateY(-2px) scale(0.98);
          box-shadow: 0 5px 10px rgba(0,0,0,0.15);
        }

        @keyframes st-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(110,142,251,0.45); }
          70%  { box-shadow: 0 0 0 18px rgba(110,142,251,0); }
          100% { box-shadow: 0 0 0 0 rgba(110,142,251,0); }
        }

        .st-label {
          font-size: 17px;
          font-weight: 600;
          margin-right: 12px;
          white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transition: letter-spacing 0.3s ease;
        }
        .st-container:hover .st-label { letter-spacing: 1px; }

        .st-share-icon {
          fill: white;
          transition: transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55), fill 0.3s ease;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        }
        .st-container:hover .st-share-icon {
          transform: rotate(180deg) scale(1.1);
        }

        /* ── Tooltip ── */
        .st-tooltip {
          position: absolute;
          top: 108%;
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          z-index: 100;
          backdrop-filter: blur(12px);
          background: rgba(15,25,45,0.95);
          border: 1px solid rgba(255,255,255,0.08);
          transition:
            opacity 0.45s cubic-bezier(0.68,-0.55,0.265,1.55),
            transform 0.45s cubic-bezier(0.68,-0.55,0.265,1.55),
            visibility 0.45s ease;
          white-space: nowrap;
        }
        .st-tooltip::before {
          content: "";
          position: absolute;
          top: -9px; left: 50%;
          transform: translateX(-50%);
          border-width: 0 9px 9px 9px;
          border-style: solid;
          border-color: transparent transparent rgba(15,25,45,0.95) transparent;
        }
        .st-container:hover .st-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) scale(1);
          pointer-events: auto;
        }

        /* ── Social icons inside tooltip ── */
        .st-icons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .st-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          transition:
            transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),
            background 0.3s ease,
            box-shadow 0.4s ease;
        }
        .st-icon::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .st-icon:hover::before { opacity: 1; }
        .st-icon svg {
          width: 22px; height: 22px;
          fill: #94a3b8;
          transition: transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55), fill 0.3s ease;
          position: relative; z-index: 1;
        }
        .st-icon:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.25);
        }
        .st-icon:hover svg { transform: scale(1.2); fill: white; }
        .st-icon:active {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 5px 10px rgba(0,0,0,0.15);
        }

        .st-icon.github:hover  { background: linear-gradient(135deg,#333,#111); }
        .st-icon.linkedin:hover{ background: linear-gradient(135deg,#0077b5,#005e94); }
        .st-icon.email:hover   { background: linear-gradient(135deg,#a855f7,#7c3aed); }
        .st-icon.twitter:hover { background: linear-gradient(135deg,#1da1f2,#1a91da); }
      `}</style>

      <div className="st-container">
        {/* Trigger button */}
        <div className="st-btn" role="button" tabIndex={0} aria-label="Follow me on social media">
          <span className="st-label">Follow Me</span>
          {/* Share icon */}
          <svg className="st-share-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          </svg>
        </div>

        {/* Dropdown tooltip */}
        <div className="st-tooltip">
          <div className="st-icons">
            {/* GitHub */}
            <a href={site.social.github} target="_blank" rel="noopener noreferrer"
              className="st-icon github" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="st-icon linkedin" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Email */}
            <a href={`mailto:${site.social.email}`}
              className="st-icon email" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a href={site.social.twitter} target="_blank" rel="noopener noreferrer"
              className="st-icon twitter" aria-label="X / Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

type Curve = {
  key: string;
  label: string;
  range: string;
  color: string;
  d: string;
  end: [number, number];
  sentence: string;
};

// Log-scaled plot area: x 64→560, y 48 (3M) → 320 (baseline).
const curves: Curve[] = [
  {
    key: "roblox",
    label: "Roblox",
    range: "few hundred → 3M+",
    color: "#C97B12",
    d: "M64,291 C 260,288 380,120 560,48",
    end: [560, 48],
    sentence:
      "Founding DevRel hire. A few hundred creators to 3M+, plus the live events system that drove 500M+ plays.",
  },
  {
    key: "fortnite",
    label: "Fortnite Creative",
    range: "10K → 100K",
    color: "#3F7A5B",
    d: "M64,199 C 240,196 380,150 560,138",
    end: [560, 138],
    sentence:
      "Founded the DevRel org for what became UEFN. 10K to 100K creators, with Disney, Nike, and NBA integrations on time.",
  },
  {
    key: "horizon",
    label: "Meta Horizon",
    range: "2K → 20K",
    color: "#5B6675",
    d: "M64,241 C 240,238 380,196 560,180",
    end: [560, 180],
    sentence:
      "10x program growth as Horizon went from a closed platform to an open one.",
  },
];

const gridlines = [
  { y: 48, label: "3M" },
  { y: 138, label: "100K" },
  { y: 180, label: "20K" },
];

export default function GrowthCurves() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-label="Three creator-ecosystem growth curves: Roblox from a few hundred to 3M+, Fortnite Creative from 10K to 100K, and Meta Horizon from 2K to 20K, on a log scale."
        className="w-full"
        onMouseLeave={() => setActive(null)}
      >
        {/* axes */}
        <line x1="64" y1="40" x2="64" y2="320" stroke="#B8B2A2" strokeWidth="1" />
        <line x1="64" y1="320" x2="590" y2="320" stroke="#B8B2A2" strokeWidth="1" />
        <path d="M590,320 l-7,-4 l0,8 z" fill="#B8B2A2" />

        {/* gridlines + y labels */}
        {gridlines.map((g) => (
          <g key={g.label}>
            <line
              x1="64"
              y1={g.y}
              x2="560"
              y2={g.y}
              stroke="#DAD5C8"
              strokeWidth="1"
              strokeDasharray="2 5"
            />
            <text
              x="56"
              y={g.y + 4}
              textAnchor="end"
              className="font-mono"
              fontSize="11"
              letterSpacing="0.06em"
              fill="#1B1E24"
              fillOpacity="0.55"
            >
              {g.label}
            </text>
          </g>
        ))}

        {/* axis captions */}
        <text
          x="64"
          y="30"
          className="font-mono"
          fontSize="11"
          letterSpacing="0.12em"
          fill="#1B1E24"
          fillOpacity="0.55"
        >
          CREATORS
        </text>
        <text
          x="592"
          y="324"
          className="font-mono"
          fontSize="11"
          letterSpacing="0.12em"
          fill="#1B1E24"
          fillOpacity="0.55"
        >
          TIME
        </text>

        {/* curves */}
        {curves.map((c, i) => {
          const dimmed = active !== null && active !== i;
          return (
            <g
              key={c.key}
              style={{ opacity: dimmed ? 0.18 : 1, transition: "opacity 0.2s ease" }}
              onMouseEnter={() => setActive(i)}
            >
              <path
                d={c.d}
                fill="none"
                stroke={c.color}
                strokeWidth={active === i ? 3.5 : 2.5}
                strokeLinecap="round"
                pathLength={1}
                className="curve-path"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
              <circle cx={c.end[0]} cy={c.end[1]} r="4" fill={c.color} />
              {/* right-hand labels */}
              <text
                x={c.end[0] + 12}
                y={c.end[1] - 1}
                className="font-mono"
                fontSize="12"
                letterSpacing="0.08em"
                fill={c.color}
              >
                {c.label.toUpperCase()}
              </text>
              <text
                x={c.end[0] + 12}
                y={c.end[1] + 15}
                className="font-mono"
                fontSize="11"
                letterSpacing="0.04em"
                fill="#1B1E24"
                fillOpacity="0.55"
              >
                {c.range}
              </text>
              {/* invisible fat hit-area for easier hover */}
              <path
                d={c.d}
                fill="none"
                stroke="transparent"
                strokeWidth="18"
                tabIndex={0}
                role="button"
                aria-label={`${c.label}: ${c.sentence}`}
                onFocus={() => setActive(i)}
                style={{ cursor: "pointer", outline: "none" }}
              />
            </g>
          );
        })}
      </svg>

      {/* caption that reacts to hover */}
      <p className="mt-4 min-h-[3rem] max-w-xl font-body text-base text-paper/70">
        {active === null ? (
          <span className="text-paper/50">
            Same shape, three times, on purpose. Hover a line to see what I
            built.
          </span>
        ) : (
          <span>
            <span
              className="font-mono text-label uppercase tracking-[0.1em]"
              style={{ color: curves[active].color }}
            >
              {curves[active].label}
            </span>
            {"  "}
            {curves[active].sentence}
          </span>
        )}
      </p>
    </div>
  );
}

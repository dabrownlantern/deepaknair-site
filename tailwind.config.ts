import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Studio Build palette
        ink: "#12151C", // deep slate, near-black with a blue cast (base)
        surface: "#1A1F29", // raised panels, cards
        paper: "#F2EFE9", // warm off-white
        signal: "#E8A33D", // amber. Accent, CTAs, growth curves
        growth: "#6FA88C", // muted sage. Data viz secondary, success
        rule: "#2E3541", // hairlines, dividers, borders
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // desktop scale: 72 / 48 / 32 / 24 / 18 / 16 / 13
        display: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.2" }],
        lead: ["1.125rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.6" }],
        label: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        lg: "4px",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;

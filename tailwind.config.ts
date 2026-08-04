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
        // Studio Build palette — light. Token names kept from the dark
        // version so component classes didn't need to change: `ink` is
        // still the base background, `paper` is still the primary text
        // color, they've just swapped which end of the scale they sit on.
        ink: "#FFFFFF", // base background, pure white
        surface: "#F6F4EE", // raised panels, cards — warm off-white
        paper: "#1B1E24", // primary text, near-black with a blue cast
        signal: "#9C5D0A", // amber, darkened for AA contrast as text on white
        "signal-bright": "#E8A33D", // original bright amber — button fills only (dark text on top)
        growth: "#3F7A5B", // muted sage, darkened for visibility on white
        rule: "#E4E0D6", // hairlines, dividers, borders — warm light gray
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

import type { Config } from "tailwindcss";

// Design tokens — TRENZHOME
// ink: true black, used the way a sportswear brand uses black — as a block, not a tint
// paper: pure white ground
// fog: barely-off-white, for section backgrounds that need to sit apart from paper
// steel: neutral gray for secondary text/borders
// flare: the one loud accent — CTAs, sale tags, price highlights, active states
// brass: legacy material accent, kept for swatch gradients only
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        paper: "#FFFFFF",
        fog: "#F1F1EF",
        steel: "#6B6B6B",
        "steel-light": "#DDDDD9",
        flare: "#FF4D1C",
        brass: "#A9835A",
        // legacy aliases so existing linen/stone classes keep working during the redesign
        linen: "#FFFFFF",
        stone: "#6B6B6B",
        "stone-light": "#DDDDD9",
        moss: "#00A651",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

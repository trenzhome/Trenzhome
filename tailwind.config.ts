import type { Config } from "tailwindcss";

// Design tokens — TRENZHOME, ultra-premium revision
// ink: warm near-black charcoal, used as the anchor tone instead of a flat sportswear black
// paper: soft warm white ground, never stark
// fog: barely-off-white section background
// sand / sand-dark: the beige register — the palette's warmth
// steel: neutral warm gray for secondary text/borders
// flare: the one restrained accent — brushed brass/gold, used sparingly (CTAs, price, active states)
// brass: alias of flare, kept for swatch gradients and material-detail copy
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#161512",
        charcoal: "#2B2823",
        paper: "#FBF9F5",
        fog: "#F3EFE7",
        sand: "#E9E1CE",
        "sand-dark": "#CBBB94",
        steel: "#847D6E",
        "steel-light": "#DED6C2",
        flare: "#A9835A",
        brass: "#A9835A",
        clearance: "#B3452B",
        // legacy aliases so existing linen/stone classes keep working during the redesign
        linen: "#FBF9F5",
        stone: "#847D6E",
        "stone-light": "#DED6C2",
        moss: "#00A651",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      borderRadius: {
        none: "0px",
        sm: "8px",
        DEFAULT: "12px",
        lg: "20px",
        xl: "28px",
        "2xl": "36px",
        "3xl": "44px",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(22, 21, 18, 0.12)",
        luxury: "0 30px 80px -20px rgba(22, 21, 18, 0.28)",
        glass: "0 8px 32px -4px rgba(22, 21, 18, 0.18)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;

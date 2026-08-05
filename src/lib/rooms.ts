export interface RoomPalette {
  name: string;
  hex: string;
}

export interface Room {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  palette: RoomPalette[];
  styleTips: string[];
  categories: string[]; // matches Product["category"], case-insensitive
  heroSwatch: string;
}

export const rooms: Room[] = [
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "The room that has to do everything",
    description:
      "A living room absorbs more use than any other space in the house — hosting, working, unwinding. Build it around one or two anchor pieces in a material that ages well, then keep the rest quiet.",
    palette: [
      { name: "Warm Oat", hex: "#D9CBB5" },
      { name: "Charcoal", hex: "#3A3833" },
      { name: "Travertine", hex: "#E5DFD3" },
      { name: "Brushed Brass", hex: "#A9835A" },
    ],
    styleTips: [
      "Anchor the room with one substantial piece — a sofa or sectional — before layering in smaller furniture.",
      "Keep a 90cm clearance for walking paths between furniture groupings.",
      "Mix matte textiles (linen, bouclé) with one warm metal accent to avoid a flat, single-texture room.",
      "Layer three light sources — ambient, task, accent — rather than relying on one overhead fixture.",
    ],
    categories: ["Living", "Lighting"],
    heroSwatch: "linear-gradient(135deg, #D9CBB5, #B8A582)",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Built for recovery, not photographs",
    description:
      "The bedroom is the one room where comfort should always outrank style. Start with the bedding fibre and thread quality, then let the rest of the room stay calm and low-contrast.",
    palette: [
      { name: "Clay", hex: "#DCCFB4" },
      { name: "Sage", hex: "#A8B79A" },
      { name: "Soft Ivory", hex: "#F1EADC" },
      { name: "Charcoal", hex: "#3A3833" },
    ],
    styleTips: [
      "Natural fibres (organic cotton, linen) breathe better and soften with washing rather than pilling.",
      "Keep wall colour a shade lighter than your bedding for a restful, low-contrast palette.",
      "Blackout the room to at least 90% before investing in anything else — it matters more than thread count.",
      "Layer a lightweight duvet under a heavier throw so temperature is adjustable through the night.",
    ],
    categories: ["Bedding"],
    heroSwatch: "linear-gradient(135deg, #F1EADC, #DCCFB4)",
  },
  {
    slug: "dining-room",
    name: "Dining Room",
    tagline: "Scaled for the dinners you actually host",
    description:
      "Dining rooms get over-furnished for a party that happens twice a year. Size the table to your weekday reality first, and treat extension leaves or a second small table as the answer for the twice-a-year version.",
    palette: [
      { name: "Honed Stone", hex: "#E5DFD3" },
      { name: "Blackened Steel", hex: "#26241F" },
      { name: "Brass", hex: "#A9835A" },
      { name: "Warm White", hex: "#FBF9F5" },
    ],
    styleTips: [
      "Allow 90cm of clearance behind every chair for someone to pull out and stand.",
      "A pendant should hang 75–90cm above the tabletop — measure before you order.",
      "One material statement (a stone or live-edge top) is enough; keep chairs simple so the table stays the focal point.",
      "Choose a stain- and heat-resistant top if the table will double as a workspace.",
    ],
    categories: ["Dining", "Lighting"],
    heroSwatch: "linear-gradient(135deg, #E5DFD3, #C7BBA6)",
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    tagline: "Where materials earn their keep",
    description:
      "Nothing in a kitchen gets a grace period — every surface and piece is judged on how it performs under daily use. Prioritise dishwasher-safe, heat-tolerant materials over anything precious.",
    palette: [
      { name: "Charcoal Glaze", hex: "#4A4842" },
      { name: "Soot", hex: "#26241F" },
      { name: "Warm White", hex: "#FBF9F5" },
      { name: "Brushed Brass", hex: "#A9835A" },
    ],
    styleTips: [
      "Stoneware and reactive glazes hide the daily wear that porcelain shows immediately.",
      "Keep open shelving to pieces you use weekly — anything less gets dusty, not decorative.",
      "Match dinnerware tone to your countertop, not your cabinetry, since that's the pairing you'll see most.",
      "Buy one size up on serving pieces; kitchens rarely regret extra capacity.",
    ],
    categories: ["Kitchen & Dining"],
    heroSwatch: "linear-gradient(135deg, #4A4842, #26241F)",
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    tagline: "Small room, high humidity, no shortcuts",
    description:
      "Bathrooms punish cheap materials fast — humidity finds every weak seam and untreated surface. We're still building out this category; in the meantime, the same material principles from our other rooms apply.",
    palette: [
      { name: "Warm White", hex: "#FBF9F5" },
      { name: "Travertine", hex: "#E5DFD3" },
      { name: "Charcoal", hex: "#3A3833" },
      { name: "Sage", hex: "#A8B79A" },
    ],
    styleTips: [
      "Choose water-resistant finishes (sealed stone, powder-coated metal) over raw or untreated materials.",
      "Ventilate before you decorate — no material survives a bathroom with poor airflow.",
      "Keep textiles to a plush, quick-dry weave to avoid mildew between washes.",
      "Warm metal fixtures read less clinical than chrome in a small, tiled room.",
    ],
    categories: [],
    heroSwatch: "linear-gradient(135deg, #EFE9DD, #C7BBA6)",
  },
  {
    slug: "office",
    name: "Office",
    tagline: "Comfort has to survive an 8-hour day",
    description:
      "A home office is furnished for looks and then abandoned within a month if the chair and desk height aren't right. We're still building out this category; the ergonomic principles below hold regardless.",
    palette: [
      { name: "Charcoal", hex: "#3A3833" },
      { name: "Warm White", hex: "#FBF9F5" },
      { name: "Brass", hex: "#A9835A" },
      { name: "Oat", hex: "#D9CBB5" },
    ],
    styleTips: [
      "Elbow height, not desk height, should set your chair — the desk should meet your forearms, not the reverse.",
      "Put your best light source to the side of your monitor, never behind it.",
      "Closed storage beats open shelving for keeping a small office looking calm during a workday.",
      "A rug under the desk chair protects flooring and quiets the room more than most people expect.",
    ],
    categories: [],
    heroSwatch: "linear-gradient(135deg, #DDDDD9, #6B6B6B)",
  },
  {
    slug: "guest-room",
    name: "Guest Room",
    tagline: "Hotel-simple, not house-cluttered",
    description:
      "A guest room is used a handful of nights a year, so it should feel effortless for you to prep and comfortable for someone with zero familiarity with your home. Bedding does most of the work here.",
    palette: [
      { name: "Soft Ivory", hex: "#F1EADC" },
      { name: "Clay", hex: "#DCCFB4" },
      { name: "Charcoal", hex: "#3A3833" },
      { name: "Warm White", hex: "#FBF9F5" },
    ],
    styleTips: [
      "Stick to one universally comfortable bedding weight rather than seasonal swaps nobody will manage.",
      "Leave visible, obvious storage — an empty guest doesn't know where your closets are.",
      "A bedside lamp with an accessible switch matters more in a guest room than anywhere else in the house.",
      "Keep decor minimal so the room can double as storage or a second workspace when it's not hosting.",
    ],
    categories: ["Bedding"],
    heroSwatch: "linear-gradient(135deg, #F1EADC, #C7BBA6)",
  },
  {
    slug: "kids-room",
    name: "Kids Room",
    tagline: "Durable first, decorative second",
    description:
      "Kids' rooms need to survive furniture climbing, spilled everything, and a design sense that changes every eighteen months. We're still building out this category — for now, durability principles apply broadly.",
    palette: [
      { name: "Soft Ivory", hex: "#F1EADC" },
      { name: "Sage", hex: "#A8B79A" },
      { name: "Warm White", hex: "#FBF9F5" },
      { name: "Charcoal", hex: "#3A3833" },
    ],
    styleTips: [
      "Machine-washable textiles beat dry-clean-only every time in a kids' room — no exceptions.",
      "Anchor tall furniture to the wall regardless of how sturdy it looks.",
      "Choose a neutral base layer (walls, flooring, large furniture) so decor can change cheaply as tastes do.",
      "Rounded edges on low furniture aren't just aesthetic — they're the practical choice at toddler height.",
    ],
    categories: [],
    heroSwatch: "linear-gradient(135deg, #EFE9DD, #A8B79A)",
  },
  {
    slug: "outdoor-living",
    name: "Outdoor Living",
    tagline: "Furniture that expects weather",
    description:
      "Outdoor furniture fails when it's chosen like indoor furniture. Every material needs to be rated for UV, moisture, and temperature swings, not just aesthetically similar to what's inside. We're still building out this category.",
    palette: [
      { name: "Charcoal", hex: "#3A3833" },
      { name: "Travertine", hex: "#E5DFD3" },
      { name: "Sage", hex: "#A8B79A" },
      { name: "Blackened Steel", hex: "#26241F" },
    ],
    styleTips: [
      "Powder-coated aluminium and teak both outperform painted wood over multiple seasons outdoors.",
      "Solution-dyed outdoor fabrics resist fading far longer than indoor textiles moved outside.",
      "Store or cover cushions in off-season months even with weather-rated fabric — it extends life significantly.",
      "Leave shade in the plan before furniture; an unshaded seating area gets used far less in peak summer.",
    ],
    categories: [],
    heroSwatch: "linear-gradient(135deg, #C7BBA6, #6B6B6B)",
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((r) => r.slug === slug);
}

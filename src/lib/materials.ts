export interface Material {
  slug: string;
  name: string;
  tagline: string;
  benefits: string[];
  manufacturing: string;
  sustainability: string;
  care: string;
  swatch: string;
  productMatch?: string; // substring matched case-insensitively against product.material
}

export const materials: Material[] = [
  {
    slug: "cotton",
    name: "Cotton",
    tagline: "The everyday fibre, done properly",
    benefits: [
      "Breathable and moisture-wicking, so it stays comfortable across seasons",
      "Softens with washing instead of pilling or thinning",
      "Naturally hypoallergenic and easy to launder at home",
    ],
    manufacturing:
      "Raw cotton fibres are combed and spun into yarn, then woven into sheeting, sateen, or twill depending on the finish you want. Sateen weaves (fewer, thicker threads with a looser weave) drape and shine more than plain-weave percale.",
    sustainability:
      "Conventional cotton is water- and pesticide-intensive; look for certified organic or better-cotton-initiative sourcing to reduce both. Cotton is fully biodegradable at end of life, unlike most synthetic blends.",
    care: "Machine wash cold, tumble dry low. Avoid fabric softener, which coats the fibres and reduces breathability over time.",
    swatch: "linear-gradient(135deg, #F1EADC, #DCCFB4)",
    productMatch: "cotton",
  },
  {
    slug: "organic-cotton",
    name: "Organic Cotton",
    tagline: "Cotton, grown without the chemical shortcuts",
    benefits: [
      "Grown without synthetic pesticides or fertilisers",
      "Typically hand- or low-impact machine-picked, preserving longer fibre staples for a softer hand-feel",
      "GOTS certification tracks the fibre from farm through to finished product",
    ],
    manufacturing:
      "Organic cotton is grown from non-GMO seed under certified organic farming practices, then processed with restricted, lower-impact dyes and finishes to maintain certification through the supply chain.",
    sustainability:
      "Organic farming methods use significantly less water and no synthetic pesticide runoff compared to conventional cotton, though yields per acre are typically lower — the tradeoff for the reduced chemical footprint.",
    care: "Machine wash cold, tumble dry low. Stonewashing before sale (as we do) softens the hand-feel from the very first night.",
    swatch: "linear-gradient(135deg, #F1EADC, #DCCFB4)",
    productMatch: "organic cotton",
  },
  {
    slug: "egyptian-cotton",
    name: "Egyptian Cotton",
    tagline: "Longer staple, smoother finish",
    benefits: [
      "Extra-long staple fibres produce a smoother, less prone-to-pilling weave",
      "Higher tensile strength than short-staple cotton, so it holds up to repeated washing",
      "Takes a lustrous sateen finish especially well",
    ],
    manufacturing:
      "Grown primarily in the Nile River Basin, the long-staple fibres are spun into finer, stronger yarn than standard upland cotton, allowing for higher, denser thread counts without the fabric feeling heavy.",
    sustainability:
      "Water demands are comparable to other cotton varieties; sourcing from certified suppliers matters more than the varietal itself for verifying labour and environmental standards.",
    care: "Machine wash cold on a gentle cycle to protect the long-staple fibres; line dry when possible to preserve the sateen sheen.",
    swatch: "linear-gradient(135deg, #F3EEDF, #DCC9A0)",
  },
  {
    slug: "linen",
    name: "Linen",
    tagline: "The material that gets better with age",
    benefits: [
      "Naturally temperature-regulating — cool in summer, insulating in winter",
      "Gets softer with every wash rather than wearing out",
      "Highly durable; linen fibres are stronger than cotton when wet",
    ],
    manufacturing:
      "Woven from flax fibre, which is harvested by pulling (not cutting) the plant to keep fibres intact, then retted, spun, and woven. Pre-washing before cutting — what we do with our Belgian linen — softens the characteristic crispness into a relaxed drape.",
    sustainability:
      "Flax requires substantially less water and fewer pesticides than cotton, and can grow on marginal land unsuitable for food crops. Nearly the entire flax plant can be used, minimising processing waste.",
    care: "Vacuum weekly for upholstery; spot-clean with cold water. A professional clean once a year keeps colour and texture consistent.",
    swatch: "linear-gradient(135deg, #D9CBB5, #B8A582)",
    productMatch: "linen",
  },
  {
    slug: "silk",
    name: "Silk",
    tagline: "Unmatched sheen, needs the most care",
    benefits: [
      "Natural sheen and drape unmatched by synthetic alternatives",
      "Temperature-regulating and naturally hypoallergenic",
      "Exceptionally strong for its light weight",
    ],
    manufacturing:
      "Produced from the cocoon filament of the silkworm, unwound in a single continuous thread and woven into charmeuse, dupioni, or other finishes depending on weave tightness and thread count.",
    sustainability:
      "Traditional silk production is labour-intensive with a smaller environmental footprint than synthetic fibres, though animal welfare varies by production method — look for Ahimsa (\"peace silk\") if that matters to you.",
    care: "Dry clean or hand wash cold with a pH-neutral detergent. Always avoid direct sunlight for extended periods, which weakens and discolours the fibre.",
    swatch: "linear-gradient(135deg, #EFE4D0, #C9A876)",
  },
  {
    slug: "velvet",
    name: "Velvet",
    tagline: "Depth and texture that reads as luxury",
    benefits: [
      "Dense pile gives visual depth that flat weaves can't replicate",
      "Excellent insulating properties for upholstery",
      "Available in natural (cotton, silk) and performance (polyester blend) weaves for different use cases",
    ],
    manufacturing:
      "Woven on a special loom that creates two layers of fabric simultaneously, joined by connecting threads that are then cut to create the signature pile. Fibre choice (cotton, silk, synthetic) determines sheen and durability.",
    sustainability:
      "Natural-fibre velvets biodegrade at end of life; performance velvets last longer under heavy use but don't break down as readily — the right tradeoff depends on how the piece will be used.",
    care: "Vacuum with an upholstery brush in the direction of the pile. Blot spills immediately; never rub, which crushes the pile permanently.",
    swatch: "linear-gradient(135deg, #4A4842, #26241F)",
  },
  {
    slug: "wool",
    name: "Wool",
    tagline: "Naturally resilient, naturally warm",
    benefits: [
      "Naturally flame-resistant without chemical treatment",
      "Resists wrinkling and holds shape exceptionally well",
      "Insulates even when damp, unlike most plant fibres",
    ],
    manufacturing:
      "Sheared from sheep (or other fibre animals for specialty wools), cleaned, carded to align fibres, then spun and woven or felted depending on the intended use — upholstery weaves differ significantly from knitwear yarn.",
    sustainability:
      "Wool is renewable and biodegradable, and well-managed grazing can support soil health, though land and water use vary widely by farming practice — look for responsible wool standard (RWS) certification.",
    care: "Spot-clean when possible; wool self-cleans between uses better than most fibres. When washing is necessary, use a wool-specific detergent and lay flat to dry.",
    swatch: "linear-gradient(135deg, #E8E1D3, #C9BEA0)",
  },
  {
    slug: "bamboo",
    name: "Bamboo",
    tagline: "Fast-growing, naturally soft",
    benefits: [
      "Naturally moisture-wicking and breathable",
      "Has natural antimicrobial properties before processing",
      "Silky hand-feel similar to a cotton-silk blend",
    ],
    manufacturing:
      "Most bamboo textile is processed into viscose/rayon — bamboo pulp dissolved chemically and re-spun into fibre. Mechanically processed \"bamboo linen\" exists but is coarser and less common due to higher processing cost.",
    sustainability:
      "Bamboo itself grows extremely fast with minimal water or pesticide input, but the standard viscose process uses chemically intensive processing — look for closed-loop (lyocell-style) processing for the lower-impact version.",
    care: "Machine wash cold on a gentle cycle; avoid high heat when drying, which can weaken the regenerated fibre over time.",
    swatch: "linear-gradient(135deg, #EAE6D8, #B9C9A8)",
  },
  {
    slug: "microfiber",
    name: "Microfiber",
    tagline: "Engineered for durability and easy care",
    benefits: [
      "Highly stain- and wrinkle-resistant compared to natural fibres",
      "Budget-friendly relative to natural-fibre equivalents",
      "Fast-drying and colourfast through repeated washing",
    ],
    manufacturing:
      "Synthetic fibres — typically polyester, sometimes blended with nylon — are extruded far finer than natural fibres and woven densely, which is what gives microfiber its soft hand and stain resistance.",
    sustainability:
      "As a petroleum-derived synthetic, microfiber doesn't biodegrade and can shed microplastics when laundered; a wash bag reduces (but doesn't eliminate) fibre shedding into wastewater.",
    care: "Machine washable and highly durable — one of the few fabrics safe on a warmer cycle without much shrinkage risk. Avoid fabric softener, which can reduce absorbency over time.",
    swatch: "linear-gradient(135deg, #E3E3DF, #B8B8B2)",
  },
];

export function getMaterialBySlug(slug: string) {
  return materials.find((m) => m.slug === slug);
}

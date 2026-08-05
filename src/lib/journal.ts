export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string; // ISO date
  swatch: string;
  content: string[];
}

// All categories from the brief's Journal taxonomy — filterable even where
// we don't have a published post yet, same honest-empty-state pattern as
// the room and material pages.
export const JOURNAL_CATEGORIES = [
  "Interior Design",
  "Bedroom Inspiration",
  "Bathroom Inspiration",
  "Living Room Ideas",
  "Decor Trends",
  "Luxury Living",
  "Buying Guides",
  "Care Guides",
  "Seasonal Trends",
  "Designer Interviews",
  "Home Styling",
  "Product Education",
];

export const journalPosts: JournalPost[] = [
  {
    slug: "buying-fewer-better-pieces",
    title: "The Case for Buying Fewer, Better Pieces",
    excerpt:
      "Furnishing a home in one trip is a myth sold by flat-pack retailers. Here's why the slower, more expensive route usually costs less over ten years.",
    category: "Luxury Living",
    readTime: "5 min read",
    publishedAt: "2026-06-02",
    swatch: "linear-gradient(135deg, #D9CBB5, #B8A582)",
    content: [
      "The average flat-pack sofa is designed to last through one apartment, maybe two. It's not a moral failing of the furniture — it's the business model. Lower price points require cheaper joinery, thinner foam, and fabric that pills within a year of normal use. You're not buying a worse sofa; you're buying a sofa built to a different, shorter timeline.",
      "The alternative isn't simply 'spend more.' It's spending on the right things. A solid hardwood frame with mortise-and-tenon joinery will outlast three generations of veneer-over-particleboard equivalents. A cushion core that's down-and-foam rather than all-foam will keep its shape for a decade instead of two years. These are the decisions that determine whether a piece is furniture or a placeholder.",
      "The math is straightforward once you run it. A $600 sofa replaced every three years costs $2,000 over a decade, plus the hassle of three separate deliveries, three separate disposals, and three separate rounds of 'does this even go with anything else in the room.' A $3,000 sofa that lasts the full decade is, in the most literal sense, the cheaper option — and it's the one that actually looks better in year eight.",
      "None of this means every purchase needs to be a heirloom. A cheap side table you'll replace when your taste changes is a reasonable call. The distinction that matters is between things you'll live with daily for years (sofas, mattresses, dining tables) and things that are genuinely disposable by design (seasonal decor, trend pieces). Spend deliberately on the first category and you'll spend less, not more, over time.",
    ],
  },
  {
    slug: "measure-a-room-before-buying-furniture",
    title: "How to Actually Measure a Room Before You Buy Furniture",
    excerpt:
      "Most furniture returns aren't about taste — they're about a tape measure nobody used. A five-minute habit that saves a two-week wait for a refund.",
    category: "Buying Guides",
    readTime: "4 min read",
    publishedAt: "2026-05-14",
    swatch: "linear-gradient(135deg, #E5DFD3, #C7BBA6)",
    content: [
      "Measure the room, then measure the path the furniture has to travel to get into it. This is the single most skipped step in furniture buying, and it's responsible for more returns than any question of style or color. A sofa that fits your living room perfectly can still be unreturnable if it can't make the turn from your stairwell into the hallway.",
      "Start with the doorway width and height, then the narrowest point of any hallway or stairwell it has to pass through, then the room itself. For stairs with a turn, measure the diagonal at the tightest point of the turn — that number, not the straight width, is what actually constrains delivery.",
      "In the room itself, don't just check that a piece fits against a wall. Mark out 90cm of clearance for any path someone needs to walk — around a dining table, past a sofa, into a closet. A piece that technically fits but leaves no room to move past it will feel cramped regardless of how good it looks in a photo.",
      "Finally, measure your existing furniture you're keeping, not just the gap you're filling. A new sofa that's 8cm deeper than your old one can throw off the whole room's proportions in ways that are hard to picture from a product listing. Five minutes with a tape measure against your actual walls beats any amount of eyeballing a screen.",
    ],
  },
  {
    slug: "textiles-that-improve-with-age",
    title: "Linen, Bouclé, and the Art of Textiles That Improve With Age",
    excerpt:
      "Some fabrics look their best on day one and worse every day after. A few — if you choose right — do the opposite.",
    category: "Product Education",
    readTime: "6 min read",
    publishedAt: "2026-04-22",
    swatch: "linear-gradient(135deg, #EFE9DD, #D2C6AE)",
    content: [
      "Most upholstery fabric is designed to look its best the day it's unwrapped. Linen is the rare exception — it starts slightly stiff and crisp, and every wash and every year of use softens it further, without the fibre breaking down the way cotton eventually does. It's why we pre-wash our linen before it's ever cut into a cushion cover: it skips the awkward first six months and starts where most linen ends up after a year.",
      "Bouclé works differently. Its looped, textured pile is inherently forgiving of light wear because there's no flat surface to show scuffing the way a smooth weave would. What it needs instead is protection from crushing — regular vacuuming with an upholstery attachment keeps the loops standing rather than matting down into a flatter, duller texture.",
      "The fabrics that age badly tend to share one trait: a flat, tightly woven surface with no texture to hide wear. Cheap polyester blends and unfinished cotton canvas both show every mark and every sun-fade line clearly, because there's nothing in the weave to diffuse it. If a fabric looks perfect in the showroom and slightly duller in every photo after, that's usually the mechanism at work.",
      "The practical takeaway: when you're choosing upholstery for something that gets daily use, texture is doing more work than color. A textured, natural-fibre weave in a mid-tone will look better in year three than a flawless, flat weave in the 'perfect' shade — because the flat weave has nowhere to hide the inevitable evidence of a life being lived on it.",
    ],
  },
  {
    slug: "small-living-room-layout-guide",
    title: "Small Space, No Compromise: A Living Room Layout Guide",
    excerpt:
      "You don't need a bigger room. You need to stop treating a small one like a smaller version of a big one.",
    category: "Living Room Ideas",
    readTime: "5 min read",
    publishedAt: "2026-03-30",
    swatch: "linear-gradient(135deg, #D9CBB5, #B8A582)",
    content: [
      "The instinct in a small living room is to buy smaller versions of everything — a loveseat instead of a sofa, a narrow coffee table, undersized rugs. This usually backfires. A room full of small furniture reads as cluttered, because you've multiplied the number of objects and edges the eye has to process, without actually saving that much floor space.",
      "The better move is fewer, appropriately-scaled pieces. One well-sized sofa against the longest wall, one substantial coffee table, one chair if there's room — rather than a sofa, two armchairs, a side table, and an ottoman all competing for the same 12 square metres.",
      "Rugs are where small rooms lose the most visual ground. A rug that's too small, floating in the middle of the room with furniture legs planted outside its edges, makes the whole space feel like it's shrinking around a stamp-sized island. Size up: at minimum, get the front legs of your seating onto the rug, and if the budget allows, get all four.",
      "Vertical space is the small room's secret asset. Tall, narrow bookshelves or wall-mounted lighting draw the eye up and make a room feel taller without taking up floor area. It's a far better trade than the low, wide furniture that's supposed to make a room feel 'bigger' but mostly just makes it feel low-ceilinged.",
    ],
  },
  {
    slug: "what-gsm-means",
    title: "What GSM Actually Means for Your Towels and Sheets",
    excerpt:
      "GSM gets thrown around as a quality shorthand, but higher isn't always better — and the number alone won't tell you what you need to know.",
    category: "Product Education",
    readTime: "4 min read",
    publishedAt: "2026-03-08",
    swatch: "linear-gradient(135deg, #F1EADC, #DCCFB4)",
    content: [
      "GSM (grams per square metre) measures how densely a fabric is woven or how heavy its pile is — not directly its quality. For towels, a higher GSM (500-700) generally means a plusher, more absorbent towel, but it also means longer drying times and a heavier wash load. A 400-500 GSM towel dries faster and works better in humid climates, without being noticeably 'worse.'",
      "For bedsheets, GSM is a much weaker signal than it is for towels. Sheet quality is driven more by fibre length and weave than by weight — a lower-GSM, long-staple cotton sateen will often feel and perform better than a heavier, short-staple percale. Retailers lean on GSM because it's a single number that's easy to market, not because it's the most meaningful spec.",
      "What actually matters for sheets is thread count within a sane range (300-600 is the useful window; anything claiming 1000+ is almost always achieved through multi-ply yarn tricks, not genuinely finer weaving) plus the fibre itself. Organic cotton, Egyptian cotton, and linen all perform differently at the same thread count.",
      "The practical rule: use GSM as a rough guide for towels, where it correlates fairly well with plushness, and treat it as one input among several for sheets, where fibre and weave tell you more than the weight does.",
    ],
  },
  {
    slug: "care-mistakes-that-shorten-furniture-life",
    title: "Five Care Mistakes That Shorten Furniture's Life",
    excerpt:
      "None of these are dramatic. That's exactly why they're so common — and why they quietly cost you years of use.",
    category: "Care Guides",
    readTime: "5 min read",
    publishedAt: "2026-02-18",
    swatch: "linear-gradient(135deg, #C8A876, #8F6F41)",
    content: [
      "Rubbing spills instead of blotting them. It feels like the natural response, but rubbing pushes the stain deeper into the fibre and, on textured weaves like bouclé or velvet, crushes the pile in the process. Blot from the outside of the stain in, with a clean cloth, and let the fabric do the rest.",
      "Skipping the yearly deep clean because nothing looks dirty. Upholstery and rugs accumulate dust and oils long before it's visible, and that buildup is what accelerates fibre breakdown. A once-a-year professional clean (or a thorough at-home clean for machine-washable pieces) does more for longevity than any daily precaution.",
      "Placing furniture in direct, sustained sunlight. UV exposure fades and weakens fibres steadily, and by the time the fading is visible it's already well advanced. If a piece sits in a sunny spot, rotating cushions periodically and using UV-filtering window film will meaningfully extend its life.",
      "Using the wrong cleaning product because it was already under the sink. Most fabric and wood damage from 'cleaning' comes from using an all-purpose product on a surface it wasn't designed for. Check the care tag or product page before reaching for anything — the five extra seconds saves a much longer repair.",
      "Ignoring hardware until it fails. Loose screws in a chair frame or a dragging drawer glide are cheap, five-minute fixes when caught early and expensive structural problems when ignored for a year. A quick check every few months catches almost all of it before it matters.",
    ],
  },
  {
    slug: "reading-the-room-color-palettes",
    title: "Reading the Room: A Practical Guide to Color Palettes",
    excerpt:
      "You don't need a color wheel and a design degree. You need three rules and the discipline to stop at three colors.",
    category: "Decor Trends",
    readTime: "5 min read",
    publishedAt: "2026-01-25",
    swatch: "linear-gradient(135deg, #A8B79A, #6B7B5C)",
    content: [
      "The 60-30-10 rule is the fastest way to a palette that reads as intentional rather than accidental: 60% dominant neutral (walls, large furniture), 30% secondary tone (rugs, curtains, upholstery), 10% accent (art, cushions, small objects). Most rooms that feel 'off' violate this ratio — too many competing tones fighting for equal attention.",
      "Pull your palette from the room's fixed, unchangeable elements first — flooring, any built-in stone or wood, window frames — rather than starting from a Pinterest board. A palette that fights your existing floor will always feel slightly wrong no matter how good it looks in isolation.",
      "Warm and cool neutrals don't mix as easily as people assume. A warm oat sofa against cool grey walls will read as slightly mismatched even if both are technically 'neutral.' Pick a temperature — warm or cool — and stay consistent across your large surfaces, then use accent colors to introduce contrast instead.",
      "The 10% accent category is where you can afford to take risks, because it's cheap and easy to change. A bold cushion or a saturated piece of art lets you experiment with color trends without committing a $3,000 sofa to a palette you might tire of in two years.",
    ],
  },
  {
    slug: "why-we-dont-chase-trend-cycles",
    title: "Why We Don't Chase Trend Cycles",
    excerpt:
      "A short note on why our collections change slowly, and why we think that's a feature, not a limitation.",
    category: "Luxury Living",
    readTime: "3 min read",
    publishedAt: "2025-12-10",
    swatch: "linear-gradient(135deg, #3A3833, #16140F)",
    content: [
      "Interior trends move fast — a color, a silhouette, or a material has maybe eighteen months before it starts to feel dated. Furniture, unlike a throw pillow, is a poor vehicle for that pace. A trend-driven sofa is either replaced early, at real cost, or kept past its stylistic expiration date, sitting in a room that otherwise moved on.",
      "Our approach is to build around material and construction quality that doesn't have a trend cycle at all. Solid oak, honed stone, and pre-washed linen looked good a decade ago and will look good a decade from now, not because they're deliberately old-fashioned, but because they were never chasing a moment in the first place.",
      "This is also why our catalog changes slowly and deliberately. We'd rather add one well-considered piece a season than chase every micro-trend that shows up in a feed. It means we sometimes look a little less 'of the moment' than faster-moving competitors — and that's the tradeoff we're making on purpose.",
    ],
  },
];

export function getJournalPostBySlug(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: JournalPost, limit = 3) {
  return journalPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, limit);
}

import { Star, BadgeCheck } from "lucide-react";
import { Reveal } from "./reveal";

const REVIEWS = [
  {
    name: "M. Alden",
    initials: "MA",
    quote:
      "The linen sofa held up through two dogs and a toddler and still looks better than the last three we owned.",
    rating: 5,
  },
  {
    name: "J. Okoye",
    initials: "JO",
    quote:
      "Ordered the travertine table expecting something delicate. It's the heaviest, most solid piece in the house — in a good way.",
    rating: 5,
  },
  {
    name: "R. Fischer",
    initials: "RF",
    quote:
      "The duvet set is the first bedding I've bought that actually feels different from a hotel's. Worth the price.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1800px] px-6 py-[2rem] md:py-[2.5rem]">
      <Reveal>
        <p className="eyebrow mb-2 text-center">In Their Words</p>
        <h2 className="font-display text-[1.125rem] md:text-[1.375rem] mb-8 text-center">
          Trusted by rooms that get lived in
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-4">
        {REVIEWS.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.08}>
            <div className="card-luxury p-6 h-full flex flex-col">
              <div className="flex gap-0.5 mb-3 text-flare">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    fill={idx < review.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="text-ink text-sm leading-relaxed mb-6 flex-1">&ldquo;{review.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand text-ink text-xs font-bold font-mono">
                  {review.initials}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{review.name}</span>
                  <BadgeCheck size={15} className="text-flare" strokeWidth={2} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

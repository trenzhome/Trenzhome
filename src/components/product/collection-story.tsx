"use client";

import { motion } from "framer-motion";
import { CollectionStory as CollectionStoryType } from "@/types";

export function CollectionStory({ story }: { story: CollectionStoryType }) {
  return (
    <motion.section
      className="mt-12 bg-ink text-paper px-6 py-8 md:py-10 text-center"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-flare mb-3">
        Collection Story
      </p>
      <h2 className="font-display text-2xl md:text-3xl mb-3">{story.title}</h2>
      <p className="text-paper/70 max-w-xl mx-auto">{story.copy}</p>
    </motion.section>
  );
}

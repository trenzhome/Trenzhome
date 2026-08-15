import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getProducts } from "@/lib/products";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-5";
const CATALOG_TTL_MS = 5 * 60 * 1000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

let catalogCache: { text: string; expires: number } | null = null;

async function buildCatalogSection(): Promise<string> {
  const now = Date.now();
  if (catalogCache && catalogCache.expires > now) return catalogCache.text;

  const products = await getProducts();
  const text = products
    .map((p) => `- ${p.title} | ${p.category} | $${p.basePrice} AUD | ${p.material || "—"} | /product/${p.slug}`)
    .join("\n");

  catalogCache = { text, expires: now + CATALOG_TTL_MS };
  return text;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("The shopping assistant isn't set up yet — ask the site owner to add an Anthropic API key.", {
      status: 503,
    });
  }

  const body = await req.json();
  const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
  if (messages.length === 0) {
    return new Response("No messages provided.", { status: 400 });
  }

  const catalog = await buildCatalogSection();

  const systemPrompt = `You are the shopping assistant for TrenzHome, an Australian furniture and home goods store at trenzhome.com. All prices are in AUD. Shipping is complimentary on orders over $150, and every order includes a 30-day trial.

Help visitors find the right pieces from the real catalog below. When you recommend a product, name it exactly and include a markdown link in the form [Product Title](/product/slug) so it renders as a clickable link on the site — never invent a product, price, or slug that isn't in this list.

Be warm, concise, and specific — mention material, price, and category where useful. Ask a clarifying question if the request is vague (e.g. "what room?" or "what's your style?"). If asked something unrelated to TrenzHome or its products, politely steer the conversation back to how you can help them shop.

Catalog:
${catalog}`;

  const anthropic = new Anthropic({ apiKey });

  let stream;
  try {
    stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
  } catch (err) {
    console.error("Chat: failed to start stream", err);
    return new Response("Sorry, something went wrong starting that response.", { status: 502 });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.enqueue(encoder.encode("\n\nSorry, something went wrong. Please try again."));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.controller.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

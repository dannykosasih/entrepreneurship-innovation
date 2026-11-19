// Shared Gemini chat logic. The API key is only ever read on the server.
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const DEFAULT_MODEL = 'gemini-2.5-flash';

const MODE_GUIDE = {
  learn: {
    en: 'Mode: LEARN A TOPIC. Explain step by step in plain language, use one concrete example (Indonesian business examples are welcome), then end with one short check-your-understanding question.',
    id: 'Mode: BELAJAR TOPIK. Jelaskan bertahap dengan bahasa sederhana, beri satu contoh nyata (contoh bisnis Indonesia diutamakan), lalu tutup dengan satu pertanyaan singkat untuk menguji pemahaman.',
  },
  test: {
    en: "Mode: TEST MY IDEA. Act as a sharp but supportive mentor. Identify the riskiest assumption in the user's idea, then suggest one cheap experiment (customer interview, landing page, concierge MVP) with a clear success metric. Ask at most two clarifying questions first if the idea is vague.",
    id: 'Mode: UJI IDE SAYA. Bertindaklah sebagai mentor yang tajam namun suportif. Tentukan asumsi paling berisiko dari ide pengguna, lalu sarankan satu eksperimen murah (wawancara pelanggan, landing page, concierge MVP) dengan metrik keberhasilan yang jelas. Ajukan maksimal dua pertanyaan klarifikasi jika ide masih kabur.',
  },
  quiz: {
    en: 'Mode: QUIZ ME. Ask ONE multiple-choice question at a time about the topic, wait for the answer, then explain whether it was right and why before asking the next.',
    id: 'Mode: KUIS SAYA. Ajukan SATU pertanyaan pilihan ganda per giliran tentang topiknya, tunggu jawaban, lalu jelaskan benar/salahnya sebelum pertanyaan berikutnya.',
  },
};

export function buildSystemPrompt({ lang = 'id', mode = 'learn', context = {} } = {}) {
  const l = lang === 'en' ? 'en' : 'id';
  const guide = (MODE_GUIDE[mode] || MODE_GUIDE.learn)[l];
  const where = [context.tab && `Current page: ${String(context.tab).slice(0, 60)}`, context.chapter && `Current chapter: ${String(context.chapter).slice(0, 120)}`]
    .filter(Boolean)
    .join('. ');
  return [
    'You are "DeKa", the AI learning assistant of DDK Academy (Dharma Korporasi), an Entrepreneurship & Innovation course led by Danny Kosasih.',
    'Course topics: entrepreneurial mindset, customer discovery (Steve Blank), design thinking, Business Model Canvas, Value Proposition Design, unit economics (CAC/CLV), MVP and validation, AI in business, and the Kopi AJIB retail case.',
    'Stay on entrepreneurship, innovation, business and learning topics; politely decline unrelated requests.',
    'Be concise (under 220 words unless asked for more). Use short paragraphs and simple lists. Do not invent statistics or sources; say so when unsure.',
    l === 'en' ? 'Reply in English.' : 'Balas dalam Bahasa Indonesia.',
    guide,
    where,
  ]
    .filter(Boolean)
    .join('\n');
}

export function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text.slice(0, MAX_CHARS) }] }));
}

export async function handleChat(body, { apiKey, model = DEFAULT_MODEL, fetchImpl = fetch } = {}) {
  if (!apiKey) return { status: 503, json: { error: 'not_configured' } };
  const contents = sanitizeMessages(body?.messages);
  if (!contents.length || contents[contents.length - 1].role !== 'user') {
    return { status: 400, json: { error: 'invalid_request' } };
  }
  try {
    const res = await fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(body) }] },
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 900 },
      }),
    });
    if (!res.ok) return { status: 502, json: { error: 'upstream_error', code: res.status } };
    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
    if (!reply) return { status: 502, json: { error: 'empty_reply' } };
    return { status: 200, json: { reply } };
  } catch {
    return { status: 502, json: { error: 'network_error' } };
  }
}

// Tiny in-memory per-IP limiter (best effort; resets on instance restart).
export function createRateLimiter(limit = 20, windowMs = 60_000) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return true;
  };
}

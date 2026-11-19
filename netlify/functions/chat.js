import { handleChat } from '../../server/chatHandler.js';

export default async (request) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers });
  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: 'invalid_request' }), { status: 400, headers }); }
  const { status, json } = await handleChat(body, { apiKey: process.env.GEMINI_API_KEY, model: process.env.GEMINI_MODEL || undefined });
  return new Response(JSON.stringify(json), { status, headers });
};

export const config = { path: '/api/chat' };

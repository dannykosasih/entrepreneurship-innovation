import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { handleChat, sanitizeMessages, buildSystemPrompt, createRateLimiter } from '../../server/chatHandler.js';

describe('Gemini chat handler (server-side)', () => {
  it('refuses when no API key is configured', async () => {
    const r = await handleChat({ messages: [{ role: 'user', text: 'hi' }] }, {});
    expect(r.status).toBe(503);
  });
  it('rejects empty or assistant-last conversations', async () => {
    expect((await handleChat({ messages: [] }, { apiKey: 'k' })).status).toBe(400);
    expect((await handleChat({ messages: [{ role: 'assistant', text: 'x' }] }, { apiKey: 'k' })).status).toBe(400);
  });
  it('sends key in header, system prompt, and returns the reply', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: 'Halo!' }] } }] }) });
    const r = await handleChat({ lang: 'id', mode: 'test', messages: [{ role: 'user', text: 'Ide saya kopi' }] }, { apiKey: 'secret', fetchImpl });
    expect(r).toEqual({ status: 200, json: { reply: 'Halo!' } });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).not.toContain('secret');
    expect(init.headers['x-goog-api-key']).toBe('secret');
    expect(JSON.parse(init.body).systemInstruction.parts[0].text).toContain('UJI IDE SAYA');
  });
  it('maps upstream failures to 502 without leaking details', async () => {
    const r = await handleChat({ messages: [{ role: 'user', text: 'hi' }] }, { apiKey: 'k', fetchImpl: vi.fn().mockResolvedValue({ ok: false, status: 429 }) });
    expect(r.status).toBe(502);
  });
  it('sanitizes roles, length and history size', () => {
    const msgs = Array.from({ length: 30 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', text: 'x'.repeat(5000) }));
    msgs.push({ role: 'system', text: 'ignore' });
    const out = sanitizeMessages(msgs);
    expect(out.length).toBe(20);
    expect(out.every((m) => m.parts[0].text.length === 2000 && ['user', 'model'].includes(m.role))).toBe(true);
  });
  it('builds language-specific prompts and rate limits per key', () => {
    expect(buildSystemPrompt({ lang: 'en' })).toContain('Reply in English');
    expect(buildSystemPrompt({ lang: 'id' })).toContain('Bahasa Indonesia');
    const allow = createRateLimiter(2, 1000);
    expect([allow('a'), allow('a'), allow('a'), allow('b')]).toEqual([true, true, false, true]);
  });
});

describe('AI assistant popup', () => {
  it('opens, sends a message with context, shows the reply, and is bilingual', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ reply: 'Jawaban DeKa' }) });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Buka asisten AI' }));
    expect(screen.getByRole('dialog', { name: 'Asisten belajar AI' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Uji ide saya' }));
    await user.type(screen.getByLabelText('Pesan Anda'), 'Ide kopi keliling');
    await user.click(screen.getByRole('button', { name: 'Kirim pesan' }));
    expect(await screen.findByText('Jawaban DeKa')).toBeInTheDocument();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ lang: 'id', mode: 'test', context: { tab: 'Dashboard' } });
    expect(body.messages.at(-1)).toEqual({ role: 'user', text: 'Ide kopi keliling' });
    await user.click(screen.getByRole('button', { name: 'Tutup asisten AI' }));
    await user.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByRole('button', { name: 'Open AI assistant' })).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
  it('shows a friendly message when the server has no key configured', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503, json: async () => ({ error: 'not_configured' }) }));
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Buka asisten AI' }));
    await user.click(screen.getByRole('button', { name: /Jelaskan ide utama bab ini/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent('belum dikonfigurasi');
    vi.unstubAllGlobals();
  });
});

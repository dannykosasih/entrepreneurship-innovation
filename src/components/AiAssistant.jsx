import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Lightbulb, FlaskConical, HelpCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCourses } from '../data/coursesData';

const TAB_LABELS = {
  dashboard: 'Dashboard', courses: 'Course material', quizzes: 'Quizzes', grades: 'Grades',
  'case-studies': 'Case studies', simulator: 'Startup simulator', 'bmc-builder': 'Business Model Canvas',
  'vpd-builder': 'Value Proposition Design', 'knowledge-hub': 'Knowledge wiki', sources: 'Resources & syllabus',
};

export function AiAssistant({ activeTab, selectedCourseId }) {
  const { lang, isEn } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('learn');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef(null);

  const t = (en, id) => (isEn ? en : id);
  const modes = [
    { id: 'learn', icon: Lightbulb, label: t('Learn a topic', 'Belajar topik'), hint: t('e.g. Explain CAC vs CLV simply', 'mis. Jelaskan CAC vs CLV dengan sederhana'), starter: t('Explain this chapter’s key idea simply', 'Jelaskan ide utama bab ini dengan sederhana') },
    { id: 'test', icon: FlaskConical, label: t('Test my idea', 'Uji ide saya'), hint: t('Describe your business idea…', 'Ceritakan ide bisnis Anda…'), starter: t('Help me test my business idea', 'Bantu saya menguji ide bisnis saya') },
    { id: 'quiz', icon: HelpCircle, label: t('Quiz me', 'Kuis saya'), hint: t('Name a topic to be quizzed on', 'Sebutkan topik untuk dikuis'), starter: t('Quiz me on this chapter', 'Kuis saya tentang bab ini') },
  ];
  const activeMode = modes.find((m) => m.id === mode);

  useEffect(() => { endRef.current?.scrollIntoView?.({ block: 'end' }); }, [messages, loading, open]);

  const send = async (text) => {
    const clean = text.trim();
    if (!clean || loading) return;
    const next = [...messages, { role: 'user', text: clean }];
    setMessages(next);
    setInput('');
    setError('');
    setLoading(true);
    const chapter = activeTab === 'courses' ? getCourses(lang).find((c) => c.id === selectedCourseId)?.title : undefined;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang, mode, context: { tab: TAB_LABELS[activeTab], chapter } }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        setError(
          res.status === 503 ? t('The AI assistant is not set up yet. Please try again later.', 'Asisten AI belum dikonfigurasi. Silakan coba lagi nanti.')
          : res.status === 429 ? t('Too many questions. Please wait a minute.', 'Terlalu banyak pertanyaan. Mohon tunggu semenit.')
          : t('Sorry, something went wrong. Please try again.', 'Maaf, terjadi kesalahan. Silakan coba lagi.'),
        );
      } else {
        setMessages([...next, { role: 'assistant', text: data.reply }]);
      }
    } catch {
      setError(t('Network error. Please check your connection.', 'Kesalahan jaringan. Periksa koneksi Anda.'));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setMessages([]); setError(''); setInput(''); };

  if (!open) {
    return (
      <button type="button" className="ai-fab" onClick={() => setOpen(true)} aria-label={t('Open AI assistant', 'Buka asisten AI')}>
        <Sparkles size={20} aria-hidden="true" />
        <span>{t('Ask DeKa AI', 'Tanya DeKa AI')}</span>
      </button>
    );
  }

  return (
    <section className="ai-panel" role="dialog" aria-label={t('AI learning assistant', 'Asisten belajar AI')}>
      <header className="ai-head">
        <div><Sparkles size={17} aria-hidden="true" /> <strong>DeKa AI</strong><small>{t('Learning assistant', 'Asisten belajar')}</small></div>
        <div>
          <button type="button" onClick={reset} aria-label={t('Clear conversation', 'Hapus percakapan')}><RotateCcw size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => setOpen(false)} aria-label={t('Close AI assistant', 'Tutup asisten AI')}><X size={18} aria-hidden="true" /></button>
        </div>
      </header>
      <div className="ai-modes" role="group" aria-label={t('Assistant mode', 'Mode asisten')}>
        {modes.map((m) => (
          <button key={m.id} type="button" className={mode === m.id ? 'is-active' : ''} aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
            <m.icon size={14} aria-hidden="true" /> {m.label}
          </button>
        ))}
      </div>
      <div className="ai-log" aria-live="polite">
        {messages.length === 0 && (
          <div className="ai-empty">
            <p>{t('Hi! I can help you learn a topic, stress-test a business idea, or quiz you. Pick a mode and ask away.', 'Halo! Saya bisa membantu Anda memahami topik, menguji ide bisnis, atau mengkuis Anda. Pilih mode lalu bertanya.')}</p>
            <button type="button" onClick={() => send(activeMode.starter)}>{activeMode.starter}</button>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`ai-msg ${m.role}`}>{m.text}</div>
        ))}
        {loading && <div className="ai-msg assistant ai-typing">{t('Thinking…', 'Berpikir…')}</div>}
        {error && <div className="ai-error" role="alert">{error}</div>}
        <div ref={endRef} />
      </div>
      <form className="ai-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          placeholder={activeMode.hint}
          aria-label={t('Your message', 'Pesan Anda')}
          rows={2}
          maxLength={2000}
        />
        <button type="submit" disabled={loading || !input.trim()} aria-label={t('Send message', 'Kirim pesan')}><Send size={17} aria-hidden="true" /></button>
      </form>
      <small className="ai-note">{t('AI can make mistakes. Verify important facts.', 'AI bisa keliru. Periksa kembali fakta penting.')}</small>
    </section>
  );
}

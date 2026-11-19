import React, { useState } from 'react';
import { getSources } from '../data/sourcesData';
import { useLanguage } from '../context/LanguageContext';
import { Copy, Check } from 'lucide-react';

export function SourcesReading() {
  const { lang, isEn } = useLanguage();
  const sources = getSources(lang);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCitation = (id, citation) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
          {isEn ? 'Academic Bibliography & Syllabus' : 'Daftar Pustaka Akademik & Silabus'}
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {isEn ? 'Curated Literature & Faculty References' : 'Literatur Pilihan & Referensi Pengajar'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          {isEn
            ? 'Official textbooks, seminal academic papers, and faculty lecture archives referenced throughout the curriculum.'
            : 'Buku teks resmi, makalah akademik rujukan, dan arsip kuliah pengajar yang digunakan di seluruh kurikulum.'}
        </p>
      </div>

      {/* Sources Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {sources.map(src => {
          const isCopied = copiedId === src.id;
          return (
            <div key={src.id} className="card" style={{ background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                      {src.type}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {isEn ? 'Publisher:' : 'Penerbit:'} {src.publisher}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {src.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                    {isEn ? 'Author(s):' : 'Penulis:'} {src.authors}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {src.focus}
                  </p>

                  {/* Key Chapters */}
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      {isEn ? 'Key Syllabi Chapters & Modules:' : 'Bab & Modul Silabus Kunci:'}
                    </div>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {src.keyChapters.map((ch, i) => (
                        <li key={i}>{ch}</li>
                      ))}
                    </ul>
                  </div>

                  {/* APA Citation Quote */}
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-primary)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {src.citation}
                  </div>
                </div>

                {/* Copy Citation Button */}
                <button
                  onClick={() => handleCopyCitation(src.id, src.citation)}
                  className="btn btn-outline"
                  style={{ fontSize: '0.8rem', flexShrink: 0 }}
                >
                  {isCopied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                  {isCopied
                    ? (isEn ? 'Citation Copied' : 'Sitasi Disalin')
                    : (isEn ? 'Copy APA Citation' : 'Salin Sitasi APA')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

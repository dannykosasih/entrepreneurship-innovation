import React, { useState } from 'react';
import { KNOWLEDGE_BASE } from '../data/knowledgeBaseData';
import { 
  Search, 
  BookOpen, 
  Lightbulb, 
  Filter, 
  Calculator, 
  Sparkles 
} from 'lucide-react';

export function KnowledgeHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Foundations', 'Mindset', 'Methodologies', 'Finance & Metrics', 'Strategy'];

  const filteredItems = KNOWLEDGE_BASE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.example.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search & Header */}
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-primary-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              DDK Knowledge Base
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--ddk-dark)' }}>
              Core Frameworks & Concepts Wiki
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
              Kumpulan teori fundamental, model ekonomi, rumus unit economics, dan keunggulan kompetitif.
            </p>
          </div>

          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--ddk-light-gray)',
            padding: '0.55rem 0.95rem',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border-subtle)',
            minWidth: '280px'
          }}>
            <Search size={16} color="var(--ddk-primary-blue)" />
            <input
              type="text"
              placeholder="Cari konsep, rumus, nama ahli..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.875rem',
                color: 'var(--ddk-dark)',
                width: '100%',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600
              }}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                border: '1.5px solid',
                borderColor: selectedCategory === cat ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                background: selectedCategory === cat ? 'var(--ddk-dark)' : 'var(--ddk-white)',
                color: selectedCategory === cat ? 'white' : 'var(--ddk-dark)',
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font-heading)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Knowledge Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="card" 
            style={{ 
              background: 'var(--ddk-white)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              borderLeft: '4px solid var(--ddk-primary-blue)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.625rem' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--ddk-primary-blue)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {item.author}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {item.term}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                {item.definition}
              </p>

              {item.formulaOrStructure && (
                <div style={{
                  background: 'var(--ddk-light-gray)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.65rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--ddk-dark)',
                  fontWeight: 600,
                  marginBottom: '0.85rem'
                }}>
                  {item.formulaOrStructure}
                </div>
              )}
            </div>

            <div>
              <div style={{
                background: 'var(--ddk-blue-subtle)',
                border: '1px solid rgba(15, 95, 168, 0.2)',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                color: 'var(--ddk-dark)',
                marginBottom: '0.5rem'
              }}>
                <strong style={{ fontFamily: 'var(--font-heading)' }}>Contoh Riil Indonesia:</strong> {item.example}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <strong>Dampak Strategis:</strong> {item.importance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

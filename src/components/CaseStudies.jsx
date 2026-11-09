import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { 
  Building2, 
  TrendingUp, 
  Cpu, 
  ShieldAlert, 
  MessageSquare, 
  CheckCircle, 
  Eye, 
  DollarSign, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export function CaseStudies({ onMarkCaseComplete, completedCases }) {
  const [selectedCaseId, setSelectedCaseId] = useState(CASE_STUDIES[0].id);
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedGuidance, setRevealedGuidance] = useState({});

  const currentCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];
  const isDone = completedCases.includes(currentCase.id);

  const handleAnswerChange = (idx, text) => {
    setUserAnswers(prev => ({ ...prev, [`${currentCase.id}-${idx}`]: text }));
  };

  const toggleGuidance = (idx) => {
    setRevealedGuidance(prev => ({
      ...prev,
      [`${currentCase.id}-${idx}`]: !prev[`${currentCase.id}-${idx}`]
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Case Header Card */}
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gold">{currentCase.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={14} color="var(--ddk-primary-blue)" /> {currentCase.readingTime}
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.25rem' }}>
              {currentCase.title}
            </h1>
            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              {currentCase.subtitle}
            </div>
          </div>

          <button
            onClick={() => onMarkCaseComplete(currentCase.id)}
            className={`btn ${isDone ? 'btn-outline' : 'btn-primary'}`}
            style={{ flexShrink: 0 }}
          >
            <CheckCircle size={16} />
            {isDone ? 'Case Study Completed ✓' : 'Mark Case as Completed'}
          </button>
        </div>

        {/* Case Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          {CASE_STUDIES.map(cs => (
            <button
              key={cs.id}
              onClick={() => setSelectedCaseId(cs.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid',
                borderColor: selectedCaseId === cs.id ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                background: selectedCaseId === cs.id ? 'var(--ddk-blue-subtle)' : 'var(--ddk-white)',
                color: selectedCaseId === cs.id ? 'var(--ddk-dark)' : 'var(--text-secondary)',
                fontWeight: selectedCaseId === cs.id ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)'
              }}
            >
              {cs.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Case Context Cards */}
      {selectedCaseId === 'case-kopi-ajib' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--ddk-primary-blue)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>FOUNDED</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{currentCase.context.founded}</div>
          </div>
          <div className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--ddk-gold)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>NATIONAL SCALE</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{currentCase.context.outlets}</div>
          </div>
          <div className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--ddk-soft-blue)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>TOTAL EMPLOYEES</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{currentCase.context.employees}</div>
          </div>
          <div className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--ddk-primary-blue)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>PARADIGM</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ddk-primary-blue)', fontFamily: 'var(--font-heading)' }}>App-First New Retail + AI</div>
          </div>
        </div>
      )}

      {/* Deep-dive sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {currentCase.sections.map((sec, sIdx) => (
          <div key={sIdx} className="card" style={{ background: 'var(--ddk-white)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--ddk-dark)' }}>
              {sec.title}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-body)', whiteSpace: 'pre-line', marginBottom: '1.25rem' }}>
              {sec.body}
            </p>

            {/* Financial Turnaround Table with DDK Navy Headers */}
            {sec.financialTable && (
              <div style={{ overflowX: 'auto', marginTop: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--ddk-dark)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                      <th style={{ padding: '0.85rem', textAlign: 'left', fontWeight: 700 }}>Financial Metric (IDR)</th>
                      <th style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>2021</th>
                      <th style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>2022</th>
                      <th style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>2023</th>
                      <th style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 800, color: 'var(--ddk-gold)' }}>2024</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.financialTable.map((row, rIdx) => (
                      <tr 
                        key={rIdx} 
                        style={{ 
                          borderBottom: '1px solid var(--border-subtle)',
                          background: row.metric.includes('Operating Income') ? 'var(--ddk-gold-subtle)' : rIdx % 2 === 1 ? 'var(--ddk-light-gray)' : 'white',
                          fontWeight: row.metric.includes('Operating Income') || row.metric.includes('Gross Profit') ? 700 : 400
                        }}
                      >
                        <td style={{ padding: '0.75rem 0.85rem' }}>{row.metric}</td>
                        <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>{row.y2021}</td>
                        <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>{row.y2022}</td>
                        <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>{row.y2023}</td>
                        <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right', color: row.metric.includes('Operating Income') ? 'var(--ddk-dark)' : 'inherit', fontWeight: 800 }}>
                          {row.y2024}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Metrics Comparison Grid */}
            {sec.metricsComparison && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                {sec.metricsComparison.map((m, mIdx) => (
                  <div key={mIdx} style={{
                    background: 'var(--ddk-light-gray)',
                    border: '1.5px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{m.label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.35rem 0' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{m.y2024}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(was {m.y2022})</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ddk-primary-blue)', fontFamily: 'var(--font-heading)' }}>{m.change}</div>
                  </div>
                ))}
              </div>
            )}

            {/* AI Supply Chain Metrics */}
            {sec.supplyChainMetrics && (
              <div style={{ overflowX: 'auto', marginTop: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--ddk-primary-blue)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                      <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700 }}>Operational KPI</th>
                      <th style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 700 }}>Before AI (Manual)</th>
                      <th style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 700, color: 'var(--ddk-gold)' }}>After AI Model</th>
                      <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: 700 }}>Commercial & Financial Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.supplyChainMetrics.map((sc, scIdx) => (
                      <tr key={scIdx} style={{ borderBottom: '1px solid var(--border-subtle)', background: scIdx % 2 === 1 ? 'var(--ddk-light-gray)' : 'white' }}>
                        <td style={{ padding: '0.75rem 0.8rem', fontWeight: 600 }}>{sc.metric}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center', color: '#BE123C', fontWeight: 700 }}>{sc.beforeAI}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center', color: 'var(--ddk-dark)', fontWeight: 800 }}>{sc.afterAI}</td>
                        <td style={{ padding: '0.75rem 0.8rem', color: 'var(--text-secondary)' }}>{sc.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {/* Discussion Questions & Faculty Evaluation Guide */}
        <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MessageSquare size={20} color="var(--ddk-dark)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>
              DDK Class Discussion & Faculty Prompts
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
            Tuliskan analisis strategis Anda di bawah ini, kemudian klik tombol untuk melihat panduan evaluasi resmi dari tim fasilitator.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentCase.discussionQuestions.map((dq, qIdx) => {
              const answerKey = `${currentCase.id}-${qIdx}`;
              const isRevealed = revealedGuidance[answerKey];

              return (
                <div key={qIdx} style={{
                  background: 'var(--ddk-light-gray)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--ddk-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                    Q{qIdx + 1}: {dq.q}
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Tuliskan analisis kritis Anda di sini..."
                    value={userAnswers[answerKey] || ''}
                    onChange={(e) => handleAnswerChange(qIdx, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'white',
                      color: 'var(--text-body)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      resize: 'vertical',
                      marginBottom: '0.75rem'
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => toggleGuidance(qIdx)}
                      className="btn btn-outline"
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                    >
                      <Eye size={14} color="var(--ddk-primary-blue)" /> {isRevealed ? 'Tutup Panduan DDK' : 'Buka Kunci Panduan Solusi DDK'}
                    </button>
                  </div>

                  {isRevealed && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.9rem 1.25rem',
                      background: 'var(--ddk-blue-subtle)',
                      borderLeft: '4px solid var(--ddk-primary-blue)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      color: 'var(--ddk-dark)'
                    }}>
                      <div style={{ fontWeight: 800, marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>
                        Panduan Evaluasi Fasilitator (Danny Kosasih & Tim):
                      </div>
                      <div>{dq.guidance}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

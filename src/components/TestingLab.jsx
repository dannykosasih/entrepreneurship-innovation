import React, { useEffect, useMemo, useState } from 'react';
import { FlaskConical, Quote, RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import {
  CLASSIFICATION_NOTE,
  DECISIONS,
  EXPERIMENT_GROUPS,
  EXPERIMENT_TYPES,
  FIT_CHECKS,
  LEARNING_CARD_FIELDS,
  TEST_CARD_FIELDS,
  TEST_STATUSES,
  TESTING_CHECKLIST,
  TESTING_ETHICS,
  TESTING_INTRO,
  TESTING_LENSES,
  TESTING_REFERENCES,
  TESTING_STEPS,
  TESTING_WORKFLOW,
} from '../data/testingLabData';
import {
  exampleLab,
  extractHypothesesFromBmc,
  extractHypothesesFromVpd,
  loadLab,
  normalizeLab,
  rankAssumptions,
  removeById,
  riskLabel,
  riskScore,
  saveLab,
  upsertById,
} from '../lib/testingLab';
import { createItemId } from '../lib/vpdFit';
import '../vpc-canvas.css';

const EMPTY_TEST = {
  name: '',
  lens: 'desirability',
  hypothesis: '',
  experiment: '',
  metric: '',
  criteria: '',
  cost: '',
  duration: '',
  owner: '',
  status: 'planned',
};

const EMPTY_LEARNING = {
  name: '',
  testCardId: '',
  believed: '',
  observed: '',
  learned: '',
  decision: 'iterate',
  decisionNote: '',
};

function FieldGrid({ fields, values, onChange }) {
  return (
    <div className="testing-form">
      {fields.map((field) => (
        <label key={field.key}>
          {field.label}
          {field.hint && <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}> — {field.hint}</span>}
          <textarea
            value={values[field.key] || ''}
            onChange={(event) => onChange(field.key, event.target.value)}
            aria-label={field.label}
          />
        </label>
      ))}
    </div>
  );
}

export function TestingLab({ scope = 'vpd', canvas = null, bmcData = null }) {
  const [lab, setLab] = useState(() => loadLab(scope));
  const [testDraft, setTestDraft] = useState(EMPTY_TEST);
  const [learningDraft, setLearningDraft] = useState(EMPTY_LEARNING);
  const [openExperiment, setOpenExperiment] = useState('interview');

  useEffect(() => {
    saveLab(scope, lab);
  }, [scope, lab]);

  const ranked = useMemo(() => rankAssumptions(lab.assumptions), [lab.assumptions]);

  const setTestField = (key, value) => setTestDraft((prev) => ({ ...prev, [key]: value }));
  const setLearningField = (key, value) => setLearningDraft((prev) => ({ ...prev, [key]: value }));

  const handleSaveTest = () => {
    if (!testDraft.hypothesis.trim()) return;
    const card = {
      ...testDraft,
      id: testDraft.id || createItemId('test'),
      name: testDraft.name.trim() || 'Kartu tes tanpa judul',
    };
    setLab((prev) => ({ ...prev, testCards: upsertById(prev.testCards, card) }));
    setTestDraft(EMPTY_TEST);
  };

  const handleSaveLearning = () => {
    if (!learningDraft.observed.trim() && !learningDraft.learned.trim()) return;
    const card = {
      ...learningDraft,
      id: learningDraft.id || createItemId('learn'),
      name: learningDraft.name.trim() || 'Kartu belajar tanpa judul',
    };
    setLab((prev) => ({ ...prev, learningCards: upsertById(prev.learningCards, card) }));
    setLearningDraft(EMPTY_LEARNING);
  };

  const handleLoadExample = () => {
    setLab(exampleLab(scope));
    setTestDraft(EMPTY_TEST);
    setLearningDraft(EMPTY_LEARNING);
  };

  const handleReset = () => {
    setLab(normalizeLab(null));
    setTestDraft(EMPTY_TEST);
    setLearningDraft(EMPTY_LEARNING);
  };

  const handleExtract = () => {
    const extracted = scope === 'bmc'
      ? extractHypothesesFromBmc(bmcData)
      : extractHypothesesFromVpd(canvas);
    if (!extracted.length) return;
    setLab((prev) => {
      const existingText = new Set(prev.assumptions.map((item) => item.text));
      const next = extracted.filter((item) => !existingText.has(item.text));
      return { ...prev, assumptions: [...prev.assumptions, ...next] };
    });
  };

  const checkedCount = TESTING_CHECKLIST.filter((item) => lab.checklist[item.id]).length;

  return (
    <div className="testing-lab">
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
          {scope === 'bmc' ? 'Menguji Business Model Canvas' : 'Menguji Value Proposition Design'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <FlaskConical size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ddk-dark)', margin: 0 }}>{TESTING_INTRO.title}</h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{TESTING_INTRO.lede}</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.65rem' }}>
          {TESTING_WORKFLOW}
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button type="button" className="btn btn-primary" onClick={handleLoadExample} style={{ fontSize: '0.8rem' }}>
            <Sparkles size={14} /> Muat contoh ilustrasi Kartu Tes Kopi AJIB
          </button>
          <button type="button" className="btn btn-outline" onClick={handleExtract} style={{ fontSize: '0.8rem' }}>
            Turunkan hipotesis dari kanvas
          </button>
          <button type="button" className="btn btn-outline" onClick={handleReset} style={{ fontSize: '0.8rem' }}>
            <RotateCcw size={14} /> Reset catatan tes
          </button>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.55rem' }}>
          Angka ambang, durasi, dan contoh Kopi AJIB di bagian ini adalah ilustrasi perencanaan, bukan patokan buku. Progres tersimpan otomatis di peramban ini.
        </p>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.75rem' }}>Tiga jenis hipotesis</h3>
        <div className="testing-grid-3">
          {TESTING_LENSES.map((lens) => (
            <article key={lens.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
              <strong style={{ display: 'block', color: 'var(--ddk-dark)' }}>{lens.label}</strong>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.4rem' }}>{lens.idLabel}</span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{lens.question}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: '0.4rem' }}>{lens.hint}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: '0.4rem' }}>{lens.example}</p>
            </article>
          ))}
        </div>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          {TESTING_STEPS.map((step) => (
            <div key={step.id}>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--ddk-dark)' }}>{step.title}</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.25rem' }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.4rem' }}>Asumsi paling berisiko</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          Urutan di bawah memakai kepentingan × (6 − bukti): yang penting tetapi buktinya lemah muncul lebih dulu. Skala 1–5 adalah penilaian Anda, bukan skor resmi buku.
        </p>
        {ranked.length === 0 ? (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Belum ada asumsi. Muat contoh atau turunkan hipotesis dari kanvas.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="testing-risk-table">
              <thead>
                <tr>
                  <th>Asumsi</th>
                  <th>Lensa</th>
                  <th>Kepentingan</th>
                  <th>Bukti</th>
                  <th>Risiko</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((item) => {
                  const score = riskScore(item.importance, item.evidence);
                  return (
                    <tr key={item.id}>
                      <td>
                        <div>{item.text}</div>
                        {item.source && <small style={{ color: 'var(--text-muted)' }}>{item.source}</small>}
                      </td>
                      <td>{TESTING_LENSES.find((lens) => lens.id === item.lens)?.label}</td>
                      <td>
                        <select
                          aria-label={`Kepentingan: ${item.text}`}
                          value={item.importance}
                          onChange={(event) => setLab((prev) => ({
                            ...prev,
                            assumptions: upsertById(prev.assumptions, { ...item, importance: Number(event.target.value) }),
                          }))}
                        >
                          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </td>
                      <td>
                        <select
                          aria-label={`Bukti: ${item.text}`}
                          value={item.evidence}
                          onChange={(event) => setLab((prev) => ({
                            ...prev,
                            assumptions: upsertById(prev.assumptions, { ...item, evidence: Number(event.target.value) }),
                          }))}
                        >
                          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </td>
                      <td>
                        <strong>{score}</strong>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{riskLabel(score)}</div>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setLab((prev) => ({ ...prev, assumptions: removeById(prev.assumptions, item.id) }))}
                          style={{ background: 'none', border: 0, color: 'var(--text-muted)', cursor: 'pointer' }}
                          aria-label={`Hapus asumsi ${item.text}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.4rem' }}>Kartu Tes</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          Empat kolom resmi Strategyzer diisi sebelum eksperimen. Status akhirnya adalah didukung, tidak didukung, atau belum konklusif — bukan “terbukti selamanya”.
        </p>
        <div className="testing-form" style={{ marginBottom: '0.75rem' }}>
          <label>
            Judul kartu
            <input value={testDraft.name} onChange={(event) => setTestField('name', event.target.value)} aria-label="Judul kartu tes" />
          </label>
        </div>
        <div className="testing-grid-2" style={{ marginBottom: '0.75rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
            Lensa
            <select value={testDraft.lens} onChange={(event) => setTestField('lens', event.target.value)} aria-label="Lensa kartu tes" style={{ marginTop: '0.25rem', width: '100%', padding: '0.45rem 0.55rem' }}>
              {TESTING_LENSES.map((lens) => <option key={lens.id} value={lens.id}>{lens.label}</option>)}
            </select>
          </label>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
            Status
            <select value={testDraft.status} onChange={(event) => setTestField('status', event.target.value)} aria-label="Status kartu tes" style={{ marginTop: '0.25rem', width: '100%', padding: '0.45rem 0.55rem' }}>
              {TEST_STATUSES.map((status) => <option key={status.id} value={status.id}>{status.label}</option>)}
            </select>
          </label>
        </div>
        <FieldGrid fields={TEST_CARD_FIELDS} values={testDraft} onChange={setTestField} />
        <div className="testing-grid-3" style={{ margin: '0.75rem 0' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
            Perkiraan biaya
            <input value={testDraft.cost} onChange={(event) => setTestField('cost', event.target.value)} aria-label="Perkiraan biaya tes" />
          </label>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
            Durasi
            <input value={testDraft.duration} onChange={(event) => setTestField('duration', event.target.value)} aria-label="Durasi tes" />
          </label>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
            Penanggung jawab
            <input value={testDraft.owner} onChange={(event) => setTestField('owner', event.target.value)} aria-label="Penanggung jawab tes" />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSaveTest} style={{ fontSize: '0.8rem' }}>
          Simpan Kartu Tes
        </button>
        <div className="testing-card-list" style={{ marginTop: '1rem' }}>
          {lab.testCards.map((card) => (
            <article key={card.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                <strong style={{ color: 'var(--ddk-dark)' }}>{card.name}</strong>
                <span className="badge badge-soft">{TEST_STATUSES.find((status) => status.id === card.status)?.label} · {TESTING_LENSES.find((lens) => lens.id === card.lens)?.label}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.45rem' }}><strong>Hipotesis.</strong> {card.hypothesis}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.3rem' }}><strong>Tes.</strong> {card.experiment}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.3rem' }}><strong>Metrik.</strong> {card.metric}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.3rem' }}><strong>Kriteria.</strong> {card.criteria}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.55rem' }}>
                <button type="button" className="btn btn-outline" style={{ fontSize: '0.72rem' }} onClick={() => setTestDraft(card)}>Ubah</button>
                <button type="button" className="btn btn-outline" style={{ fontSize: '0.72rem' }} onClick={() => setLab((prev) => ({ ...prev, testCards: removeById(prev.testCards, card.id) }))}>Hapus</button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.4rem' }}>Jenis eksperimen</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          Kekuatan bukti, biaya, durasi, dan ambang di bawah adalah ilustrasi perencanaan, bukan rating resmi buku. Wawancara misalnya bisa kuat untuk memahami konteks, tetapi lemah untuk membuktikan pembelian.
        </p>
        {EXPERIMENT_GROUPS.map((group) => (
          <div key={group.id} style={{ marginBottom: '0.85rem' }}>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--ddk-dark)', marginBottom: '0.25rem' }}>{group.title}</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '0.45rem' }}>{group.intro}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {EXPERIMENT_TYPES.filter((item) => item.group === group.id).map((item) => {
                const open = openExperiment === item.id;
                return (
                  <div key={item.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenExperiment(open ? null : item.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.7rem 0.85rem',
                        background: open ? 'var(--ddk-light-gray)' : 'var(--ddk-white)',
                        border: 0,
                        cursor: 'pointer',
                        fontWeight: 800,
                        color: 'var(--ddk-dark)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                      }}
                    >
                      {item.title}
                    </button>
                    {open && (
                      <div style={{ padding: '0 0.85rem 0.85rem', background: 'var(--ddk-light-gray)', fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                        <p>{item.body}</p>
                        <p style={{ marginTop: '0.4rem' }}><strong>Risiko yang diuji.</strong> {item.risk}</p>
                        <p style={{ marginTop: '0.3rem' }}><strong>Kekuatan bukti.</strong> {item.evidence}</p>
                        <p style={{ marginTop: '0.3rem' }}><strong>Biaya dan waktu.</strong> {item.costTime}</p>
                        <p style={{ marginTop: '0.3rem' }}><strong>Metrik.</strong> {item.metric}</p>
                        <p style={{ marginTop: '0.3rem', color: 'var(--text-secondary)' }}><strong>Sumber.</strong> {item.source}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{CLASSIFICATION_NOTE}</p>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.4rem' }}>Kartu Belajar</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          Isi setelah eksperimen. Simpan juga hasil yang tidak mendukung ide, termasuk batas pengamatan.
        </p>
        <div className="testing-form" style={{ marginBottom: '0.75rem' }}>
          <label>
            Judul kartu
            <input value={learningDraft.name} onChange={(event) => setLearningField('name', event.target.value)} aria-label="Judul kartu belajar" />
          </label>
          <label>
            Tertaut ke Kartu Tes
            <select value={learningDraft.testCardId} onChange={(event) => setLearningField('testCardId', event.target.value)} aria-label="Tautan kartu tes">
              <option value="">Tidak ditautkan</option>
              {lab.testCards.map((card) => <option key={card.id} value={card.id}>{card.name}</option>)}
            </select>
          </label>
        </div>
        <FieldGrid fields={LEARNING_CARD_FIELDS} values={learningDraft} onChange={setLearningField} />
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--ddk-dark)', margin: '0.75rem 0' }}>
          Keputusan
          <select value={learningDraft.decision} onChange={(event) => setLearningField('decision', event.target.value)} aria-label="Keputusan kartu belajar">
            {DECISIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <button type="button" className="btn btn-primary" onClick={handleSaveLearning} style={{ fontSize: '0.8rem' }}>
          Simpan Kartu Belajar
        </button>
        <div className="testing-card-list" style={{ marginTop: '1rem' }}>
          {lab.learningCards.map((card) => (
            <article key={card.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                <strong style={{ color: 'var(--ddk-dark)' }}>{card.name}</strong>
                <span className="badge badge-soft">{DECISIONS.find((item) => item.id === card.decision)?.label}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.45rem' }}><strong>Dugaan.</strong> {card.believed}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.3rem' }}><strong>Pengamatan.</strong> {card.observed}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.3rem' }}><strong>Pelajaran.</strong> {card.learned}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55, marginTop: '0.3rem' }}><strong>Tindakan.</strong> {card.decisionNote}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.55rem' }}>
                <button type="button" className="btn btn-outline" style={{ fontSize: '0.72rem' }} onClick={() => setLearningDraft(card)}>Ubah</button>
                <button type="button" className="btn btn-outline" style={{ fontSize: '0.72rem' }} onClick={() => setLab((prev) => ({ ...prev, learningCards: removeById(prev.learningCards, card.id) }))}>Hapus</button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.75rem' }}>Cek tiga tingkat kecocokan</h3>
        <div className="testing-grid-3">
          {FIT_CHECKS.map((item) => (
            <article key={item.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
              <span className="badge badge-soft" style={{ marginBottom: '0.35rem' }}>{item.idLabel}</span>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--ddk-dark)' }}>{item.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.4rem' }}>{item.how}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.35rem' }}>Daftar periksa</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>{checkedCount} dari {TESTING_CHECKLIST.length} butir ditandai.</p>
        <ul className="testing-checklist">
          {TESTING_CHECKLIST.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(lab.checklist[item.id])}
                  onChange={() => setLab((prev) => ({
                    ...prev,
                    checklist: { ...prev.checklist, [item.id]: !prev.checklist[item.id] },
                  }))}
                  aria-label={item.text}
                />
                <span>{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: '0.9rem' }}>{TESTING_ETHICS}</p>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Quote size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', margin: 0 }}>Referensi pengujian</h3>
        </div>
        <ul style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {TESTING_REFERENCES.map((ref) => (
            <li key={ref.citation} style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>{ref.citation}</span>
              <span style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{ref.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  BookOpen,
  Quote,
  Link2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  EMPTY_VPD_CANVAS,
  EXAMPLE_VPD_CANVAS,
  FIT_LEVELS,
  JOB_KINDS,
  VPD_BLOCKS,
  VPD_BMC_RELATION,
  VPD_REFERENCES,
  VPD_SIDES,
  VPD_STORAGE_KEY,
} from '../data/vpdCanvasData';
import {
  computeProblemSolutionFit,
  createItemId,
  normalizeVpdCanvas,
  removeItemFromCanvas,
  toggleLink,
} from '../lib/vpdFit';

const CUSTOMER_FIELDS = [
  { key: 'jobs', kind: 'job-product', placeholder: 'Contoh: mendapatkan kopi cepat sebelum rapat...' },
  { key: 'pains', kind: 'pain-reliever', placeholder: 'Contoh: antre panjang di jam berangkat kerja...' },
  { key: 'gains', kind: 'gain-creator', placeholder: 'Contoh: pesanan sudah siap saat tiba di gerai...' },
];

const VALUE_FIELDS = [
  { key: 'products', kind: 'job-product', targetKey: 'jobs', targetLabel: 'pekerjaan yang dibantu', placeholder: 'Contoh: aplikasi pesan-ambil...' },
  { key: 'painRelievers', kind: 'pain-reliever', targetKey: 'pains', targetLabel: 'nyeri yang diredakan', placeholder: 'Contoh: pesan duluan agar tidak antre...' },
  { key: 'gainCreators', kind: 'gain-creator', targetKey: 'gains', targetLabel: 'manfaat yang diciptakan', placeholder: 'Contoh: lokasi gerai di jalur commuting...' },
];

function loadStoredCanvas() {
  try {
    const saved = localStorage.getItem(VPD_STORAGE_KEY);
    return saved ? normalizeVpdCanvas(JSON.parse(saved)) : normalizeVpdCanvas(EMPTY_VPD_CANVAS);
  } catch {
    return normalizeVpdCanvas(EMPTY_VPD_CANVAS);
  }
}

function FitMeter({ fit }) {
  const tone = !fit.hasCustomerItems ? 'var(--text-muted)' : fit.score >= 80 ? 'var(--ddk-primary-blue)' : fit.score >= 50 ? '#D97706' : '#B42318';
  const label = !fit.hasCustomerItems
    ? 'Isi profil pelanggan terlebih dahulu'
    : fit.score >= 80
      ? 'Kecocokan di atas kertas sudah rapat'
      : fit.score >= 50
        ? 'Sebagian jobs, nyeri, atau manfaat masih terbuka'
        : 'Banyak butir pelanggan belum berpasangan';

  return (
    <div className="card" style={{ background: 'var(--bg-surface)', borderTop: '4px solid var(--ddk-primary-blue)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Problem-Solution Fit</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Skor kecocokan di kanvas</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '36rem', lineHeight: 1.6 }}>
            Skor merata-ratakan persentase pekerjaan, nyeri, dan manfaat yang sudah tertaut ke item di peta nilai. Ini menguji kecocokan masalah–solusi di atas kertas, bukan product-market fit di lapangan.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: tone, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{fit.score}%</div>
          <div className="badge badge-soft" style={{ marginTop: '0.45rem' }}>{label}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
        {[
          ['Pekerjaan tertangani', fit.categories.jobs],
          ['Nyeri diredakan', fit.categories.pains],
          ['Manfaat diciptakan', fit.categories.gains],
        ].map(([title, category]) => (
          <div key={title} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.75rem', background: 'var(--ddk-light-gray)' }}>
            <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--ddk-dark)' }}>{title}</strong>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-primary-blue)' }}>
              {category.covered}/{category.total || 0}
            </span>
          </div>
        ))}
      </div>
      {fit.totals.unaddressed > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem' }}>
            <AlertTriangle size={15} color="#B42318" aria-hidden="true" />
            <strong style={{ fontSize: '0.85rem', color: 'var(--ddk-dark)' }}>Belum tertangani</strong>
          </div>
          <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-body)' }}>
            {fit.categories.jobs.unaddressed.map((item) => <li key={item.id}>Pekerjaan: {item.text}</li>)}
            {fit.categories.pains.unaddressed.map((item) => <li key={item.id}>Nyeri: {item.text}</li>)}
            {fit.categories.gains.unaddressed.map((item) => <li key={item.id}>Manfaat: {item.text}</li>)}
          </ul>
        </div>
      )}
      {fit.totals.unusedValue > 0 && (
        <div style={{ marginTop: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem' }}>
            <Link2 size={15} color="var(--ddk-primary-blue)" aria-hidden="true" />
            <strong style={{ fontSize: '0.85rem', color: 'var(--ddk-dark)' }}>Item peta nilai yang belum tertaut</strong>
          </div>
          <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {fit.unused.products.map((item) => <li key={item.id}>Produk & layanan: {item.text}</li>)}
            {fit.unused.painRelievers.map((item) => <li key={item.id}>Pereda nyeri: {item.text}</li>)}
            {fit.unused.gainCreators.map((item) => <li key={item.id}>Pencipta manfaat: {item.text}</li>)}
          </ul>
        </div>
      )}
      {fit.hasCustomerItems && fit.totals.unaddressed === 0 && fit.hasLinks && (
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.9rem', fontSize: '0.85rem', color: 'var(--ddk-primary-blue)' }}>
          <CheckCircle2 size={16} aria-hidden="true" /> Semua jobs, nyeri, dan manfaat pada profil ini sudah memiliki pasangan di peta nilai.
        </p>
      )}
    </div>
  );
}

function ItemComposer({ label, placeholder, onAdd, extra = null }) {
  const [text, setText] = useState('');
  const [extraValue, setExtraValue] = useState(extra ? extra.defaultValue : '');

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value, extraValue);
    setText('');
  };

  return (
    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem', flexWrap: 'wrap' }}>
      {extra && (
        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {extra.label}
          <select
            value={extraValue}
            onChange={(e) => setExtraValue(e.target.value)}
            aria-label={extra.label}
            style={{ padding: '0.35rem 0.45rem', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-subtle)' }}
          >
            {extra.options.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        aria-label={label}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        style={{
          flex: 1,
          minWidth: '140px',
          padding: '0.4rem 0.55rem',
          fontSize: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1.5px solid var(--border-subtle)',
          fontFamily: 'var(--font-body)',
        }}
      />
      <button
        type="button"
        onClick={submit}
        className="btn btn-primary"
        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
        aria-label={`Tambah ${label}`}
      >
        <Plus size={14} /> Tambah
      </button>
    </div>
  );
}

function LinkedChecklist({ item, targets, kind, links, onToggle, targetLabel }) {
  if (!targets.length) {
    return <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Tambah {targetLabel} di sisi profil pelanggan untuk mulai mencocokkan.</p>;
  }
  return (
    <fieldset style={{ border: 0, marginTop: '0.4rem', padding: 0 }}>
      <legend style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
        Cocokkan ke {targetLabel}
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {targets.map((target) => {
          const checked = links.some((link) => link.kind === kind && link.valueId === item.id && link.customerId === target.id);
          return (
            <label key={target.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-body)', lineHeight: 1.4 }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(kind, target.id, item.id)}
                aria-label={`Tautkan ${item.text} ke ${target.text}`}
                style={{ marginTop: '0.15rem' }}
              />
              <span>{target.kind ? `[${JOB_KINDS.find((job) => job.id === target.kind)?.label || target.kind}] ` : ''}{target.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function VpdBuilder() {
  const [canvas, setCanvas] = useState(loadStoredCanvas);
  const [openBlock, setOpenBlock] = useState('jobs');
  const fit = useMemo(() => computeProblemSolutionFit(canvas), [canvas]);

  useEffect(() => {
    localStorage.setItem(VPD_STORAGE_KEY, JSON.stringify(canvas));
  }, [canvas]);

  const addItem = (listKey, text, kind) => {
    setCanvas((prev) => ({
      ...prev,
      [listKey]: [
        ...prev[listKey],
        {
          id: createItemId(listKey),
          text,
          ...(listKey === 'jobs' ? { kind: kind || 'functional' } : {}),
        },
      ],
    }));
  };

  const removeItem = (listKey, itemId) => {
    setCanvas((prev) => removeItemFromCanvas(prev, listKey, itemId));
  };

  const handleToggleLink = (kind, customerId, valueId) => {
    setCanvas((prev) => ({ ...prev, links: toggleLink(prev.links, kind, customerId, valueId) }));
  };

  const handleLoadExample = () => {
    setCanvas(normalizeVpdCanvas(EXAMPLE_VPD_CANVAS));
  };

  const handleReset = () => {
    setCanvas(normalizeVpdCanvas(EMPTY_VPD_CANVAS));
  };

  const renderItemList = (listKey, items) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.65rem' }}>
      {items.map((item) => (
        <div key={item.id} style={{ background: 'var(--ddk-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.55rem 0.65rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.45, fontWeight: 500 }}>
              {item.kind && <span className="badge badge-soft" style={{ marginRight: '0.35rem', fontSize: '0.6rem' }}>{JOB_KINDS.find((job) => job.id === item.kind)?.label}</span>}
              {item.text}
            </p>
            <button
              type="button"
              onClick={() => removeItem(listKey, item.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              aria-label={`Hapus ${item.text}`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>Value Proposition Design</span>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--ddk-dark)' }}>
          Kanvas Proposisi Nilai (VPD)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.4rem', maxWidth: '52rem', lineHeight: 1.65 }}>
          Value Proposition Design membesarkan dua blok Business Model Canvas: Proposisi Nilai dan Segmen Pelanggan. Cocokkan Peta Nilai dengan Profil Pelanggan — termasuk Jobs To Be Done — untuk menguji kecocokan masalah–solusi sebelum Anda mengklaim product-market fit.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button type="button" className="btn btn-primary" onClick={handleLoadExample} style={{ fontSize: '0.8rem' }}>
            <Sparkles size={14} /> Muat contoh Kopi AJIB
          </button>
          <button type="button" className="btn btn-outline" onClick={handleReset} style={{ fontSize: '0.8rem' }}>
            <RotateCcw size={14} /> Reset kanvas
          </button>
        </div>
        <label style={{ display: 'block', marginTop: '1rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
          Segmen pelanggan untuk kanvas ini
          <input
            type="text"
            value={canvas.segmentName}
            onChange={(e) => setCanvas((prev) => ({ ...prev, segmentName: e.target.value }))}
            placeholder="Contoh: profesional muda perkantoran urban"
            style={{
              display: 'block',
              width: '100%',
              marginTop: '0.35rem',
              padding: '0.55rem 0.7rem',
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border-subtle)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          />
        </label>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.45rem' }}>
          Satu Value Proposition Canvas untuk satu segmen. Progres tersimpan otomatis di peramban ini.
        </p>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <BookOpen size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Definisi kanvas dan setiap blok</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
          {Object.values(VPD_SIDES).map((side) => (
            <div key={side.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.9rem', borderTop: `3px solid ${side.id === 'valueMap' ? '#AF6A00' : 'var(--ddk-primary-blue)'}` }}>
              <strong style={{ display: 'block', color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{side.title} · {side.idLabel}</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.4rem' }}>{side.summary}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {Object.values(VPD_BLOCKS).map((block) => {
            const open = openBlock === block.key;
            return (
              <div key={block.key} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenBlock(open ? null : block.key)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    background: open ? 'var(--ddk-light-gray)' : 'var(--ddk-white)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 800,
                    color: 'var(--ddk-dark)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                  }}
                >
                  {block.en} · {block.idLabel}
                </button>
                {open && (
                  <div style={{ padding: '0 1rem 1rem', background: 'var(--ddk-light-gray)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{block.definition}</p>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: '0.5rem' }}>
                      <strong>Contoh Kopi AJIB.</strong> {block.example}
                    </p>
                    {block.key === 'jobs' && (
                      <ul style={{ marginTop: '0.6rem', paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {JOB_KINDS.map((job) => (
                          <li key={job.id}><strong>{job.label}.</strong> {job.description}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <FitMeter fit={fit} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <section className="card" style={{ background: 'var(--bg-surface)', borderTop: '4px solid #AF6A00' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Peta Nilai (Value Map)</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.35rem 0 1rem', lineHeight: 1.6 }}>
            Zoom in blok Proposisi Nilai pada BMC. Tautkan setiap item ke jobs, nyeri, atau manfaat di sebelah kanan.
          </p>
          {VALUE_FIELDS.map((field) => (
            <div key={field.key} style={{ marginBottom: '1.15rem' }}>
              <h3 style={{ fontSize: '0.92rem', color: 'var(--ddk-dark)' }}>{VPD_BLOCKS[field.key].en} · {VPD_BLOCKS[field.key].idLabel}</h3>
              {canvas[field.key].map((item) => (
                <div key={item.id} style={{ background: '#fffaf0', border: '1px solid #F2DF9D', borderRadius: 'var(--radius-sm)', padding: '0.6rem', marginTop: '0.45rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', fontWeight: 600 }}>{item.text}</p>
                    <button type="button" onClick={() => removeItem(field.key, item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }} aria-label={`Hapus ${item.text}`}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <LinkedChecklist
                    item={item}
                    targets={canvas[field.targetKey]}
                    kind={field.kind}
                    links={canvas.links}
                    onToggle={handleToggleLink}
                    targetLabel={field.targetLabel}
                  />
                </div>
              ))}
              <ItemComposer
                label={VPD_BLOCKS[field.key].idLabel}
                placeholder={field.placeholder}
                onAdd={(text) => addItem(field.key, text)}
              />
            </div>
          ))}
        </section>

        <section className="card" style={{ background: 'var(--bg-surface)', borderTop: '4px solid var(--ddk-primary-blue)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Profil Pelanggan · Jobs To Be Done</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.35rem 0 1rem', lineHeight: 1.6 }}>
            Zoom in blok Segmen Pelanggan pada BMC. Sisi ini adalah kanvas pekerjaan pelanggan (JTBD) beserta nyeri dan manfaatnya.
          </p>
          {CUSTOMER_FIELDS.map((field) => (
            <div key={field.key} style={{ marginBottom: '1.15rem' }}>
              <h3 style={{ fontSize: '0.92rem', color: 'var(--ddk-dark)' }}>{VPD_BLOCKS[field.key].en} · {VPD_BLOCKS[field.key].idLabel}</h3>
              {renderItemList(field.key, canvas[field.key])}
              <ItemComposer
                label={VPD_BLOCKS[field.key].idLabel}
                placeholder={field.placeholder}
                onAdd={(text, kind) => addItem(field.key, text, kind)}
                extra={field.key === 'jobs' ? { label: 'Jenis pekerjaan', defaultValue: 'functional', options: JOB_KINDS } : null}
              />
            </div>
          ))}
        </section>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.75rem' }}>Tiga tingkat kecocokan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
          {FIT_LEVELS.map((level) => (
            <article key={level.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.9rem' }}>
              <span className="badge badge-soft" style={{ marginBottom: '0.4rem' }}>{level.stage}</span>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--ddk-dark)' }}>{level.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.5rem' }}>{level.idLabel}</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{level.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)', borderLeft: '4px solid var(--ddk-gold)' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.65rem' }}>{VPD_BMC_RELATION.title}</h2>
        <ul style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {VPD_BMC_RELATION.points.map((point) => (
            <li key={point} style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Quote size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Referensi</h2>
        </div>
        <ul style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {VPD_REFERENCES.map((ref) => (
            <li key={ref.citation} style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>{ref.citation}</span>
              <span style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{ref.note}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.9rem', lineHeight: 1.55 }}>
          Value Proposition Canvas adalah kerangka kerja Strategyzer (Osterwalder, Pigneur, Bernarda, dan Smith), digunakan di sini untuk tujuan pembelajaran dengan atribusi. Nomor halaman tidak dicantumkan karena berbeda antarcetakan.
        </p>
      </div>
    </div>
  );
}

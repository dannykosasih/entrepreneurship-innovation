import React, { useEffect, useMemo, useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  BookOpen,
  Quote,
  Link2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { VpcBookCanvas } from './VpcBookCanvas';
import { VpcCanvasForm } from './VpcCanvasForm';
import { TestingLab } from './TestingLab';
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
      ? 'Banyak tautan sudah terpasang di atas kertas — ini belum bukti fit lapangan'
      : fit.score >= 50
        ? 'Sebagian jobs, nyeri, atau manfaat masih terbuka'
        : 'Banyak butir pelanggan belum berpasangan';

  return (
    <div className="card" style={{ background: 'var(--bg-surface)', borderTop: '4px solid var(--ddk-primary-blue)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Skor tautan di kanvas</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Kelengkapan tautan di atas kertas</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '36rem', lineHeight: 1.6 }}>
            Angka ini merata-ratakan berapa banyak pekerjaan, nyeri, dan manfaat pada profil yang sudah tertaut ke item di peta nilai. Ini alat bantu kelengkapan rancangan di atas kertas. Alat ini tidak mengukur apakah butir itu penting bagi pelanggan, apakah tautannya masuk akal, atau apakah sudah ada bukti wawancara, penggunaan, atau pembayaran. Skor tinggi bukan problem-solution fit, apalagi product-market fit.
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
          <CheckCircle2 size={16} aria-hidden="true" /> Semua butir di profil ini sudah punya pasangan di peta nilai. Itu kelengkapan rancangan, bukan bukti bahwa pelanggan peduli atau akan membeli. Utamakan butir yang penting; tidak semua keluhan kecil harus dipasangkan.
        </p>
      )}
    </div>
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>Value Proposition Design</span>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--ddk-dark)' }}>
          Kanvas Proposisi Nilai (Value Proposition Canvas)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.4rem', maxWidth: '52rem', lineHeight: 1.65 }}>
          Value Proposition Canvas, sebagaimana diajarkan dalam Value Proposition Design, membesarkan dua blok Business Model Canvas: Proposisi Nilai dan Segmen Pelanggan. Cocokkan Peta Nilai dengan Profil Pelanggan — jobs pada profil ini sejalan dengan tradisi Jobs To Be Done — untuk merancang kecocokan masalah–solusi di atas kertas, lalu uji dengan bukti pelanggan sebelum mengklaim product-market fit. Contoh Kopi AJIB diambil dari studi kasus pembelajaran kursus ini, bukan dari verifikasi independen atas perusahaan publik. Angka yang tidak ada di naskah kasus ditandai sebagai ilustrasi tambahan.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button type="button" className="btn btn-primary" onClick={handleLoadExample} style={{ fontSize: '0.8rem' }}>
            <Sparkles size={14} /> Muat contoh ilustrasi Kopi AJIB
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
                      {block.example}
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

      <VpcCanvasForm
        canvas={canvas}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onToggleLink={handleToggleLink}
      />

      <VpcBookCanvas
        canvas={canvas}
        fit={fit}
      />

      <FitMeter fit={fit} />

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

      <TestingLab scope="vpd" canvas={canvas} />

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
          Value Proposition Canvas adalah kerangka kerja Strategyzer (Osterwalder, Pigneur, Bernarda, dan Smith), digunakan di sini untuk tujuan pembelajaran dengan atribusi. Bagian Canvas dikutip sebagai §1.1–§1.3. Nomor halaman cetak tidak dipaksakan karena dapat berbeda antarcetakan.
        </p>
      </div>
    </div>
  );
}

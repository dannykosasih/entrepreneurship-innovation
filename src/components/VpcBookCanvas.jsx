import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Trash2, Link2 } from 'lucide-react';
import { JOB_KINDS, VPD_BLOCKS } from '../data/vpdCanvasData';
import { LINK_KINDS } from '../lib/vpdFit';
import { CanvasIcon, VPC_BLOCK_ICONS } from './CanvasIcon';
import '../vpc-canvas.css';

const VALUE_SEGMENTS = [
  { key: 'gainCreators', kind: 'gain-creator', targetKey: 'gains', targetLabel: 'manfaat', placeholder: 'Contoh: lokasi gerai di jalur commuting...', className: 'vpc-seg-gain-creators' },
  { key: 'painRelievers', kind: 'pain-reliever', targetKey: 'pains', targetLabel: 'nyeri', placeholder: 'Contoh: pesan duluan agar tidak antre...', className: 'vpc-seg-pain-relievers' },
  { key: 'products', kind: 'job-product', targetKey: 'jobs', targetLabel: 'pekerjaan', placeholder: 'Contoh: aplikasi pesan-ambil...', className: 'vpc-seg-products' },
];

const CUSTOMER_SEGMENTS = [
  { key: 'gains', kind: 'gain-creator', sourceKey: 'gainCreators', className: 'vpc-seg-gains' },
  { key: 'pains', kind: 'pain-reliever', sourceKey: 'painRelievers', className: 'vpc-seg-pains' },
  { key: 'jobs', kind: 'job-product', sourceKey: 'products', className: 'vpc-seg-jobs' },
];

const VALUE_KEYS = new Set(VALUE_SEGMENTS.map((segment) => segment.key));

function SegmentComposer({ label, placeholder, onAdd, extra = null }) {
  const [text, setText] = useState('');
  const [extraValue, setExtraValue] = useState(extra ? extra.defaultValue : '');

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value, extraValue);
    setText('');
  };

  return (
    <div className="vpc-composer">
      {extra && (
        <select
          value={extraValue}
          onChange={(event) => setExtraValue(event.target.value)}
          aria-label={extra.label}
        >
          {extra.options.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
      )}
      <input
        type="text"
        placeholder={placeholder}
        aria-label={label}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') submit(); }}
      />
      <button type="button" onClick={submit} aria-label={`Tambah ${label}`}>
        <Plus size={12} /> Tambah
      </button>
    </div>
  );
}

function StickyNote({
  item,
  listKey,
  kind,
  selected,
  isPartner,
  isUnaddressed,
  isUnused,
  onSelect,
  onRemove,
}) {
  const jobKind = item.kind ? JOB_KINDS.find((job) => job.id === item.kind) : null;
  const classes = [
    'vpc-sticky',
    `vpc-sticky-${listKey}`,
    selected ? 'is-selected' : '',
    isPartner ? 'is-partner' : '',
    isUnaddressed ? 'is-unaddressed' : '',
    isUnused ? 'is-unused' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-sticky-id={item.id}
      style={{ display: 'flex' }}
    >
      <button
        type="button"
        onClick={() => onSelect(item, listKey, kind)}
        aria-pressed={selected}
        aria-label={`${item.text}${selected ? ' (dipilih)' : ''}`}
        style={{
          appearance: 'none',
          background: 'none',
          border: 0,
          padding: 0,
          margin: 0,
          textAlign: 'left',
          cursor: 'pointer',
          flex: 1,
          minWidth: 0,
          font: 'inherit',
          color: 'inherit',
        }}
      >
        {jobKind && <span className="sticky-kind">{jobKind.label}</span>}
        <span>{item.text}</span>
      </button>
      <button
        type="button"
        className="vpc-sticky-remove"
        onClick={() => onRemove(listKey, item.id)}
        aria-label={`Hapus ${item.text}`}
      >
        <Trash2 size={11} />
      </button>
    </div>
  );
}

export function VpcBookCanvas({
  canvas,
  fit,
  onAddItem,
  onRemoveItem,
  onToggleLink,
}) {
  const rootRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [lines, setLines] = useState([]);

  const partnerIds = useMemo(() => {
    const activeId = selected?.id || hoverId;
    if (!activeId) return new Set();
    return new Set(
      canvas.links
        .filter((link) => link.customerId === activeId || link.valueId === activeId)
        .flatMap((link) => [link.customerId, link.valueId])
        .filter((id) => id !== activeId)
    );
  }, [canvas.links, selected, hoverId]);

  const unaddressedIds = useMemo(() => new Set([
    ...fit.categories.jobs.unaddressed.map((item) => item.id),
    ...fit.categories.pains.unaddressed.map((item) => item.id),
    ...fit.categories.gains.unaddressed.map((item) => item.id),
  ]), [fit]);

  const unusedIds = useMemo(() => new Set([
    ...fit.unused.products.map((item) => item.id),
    ...fit.unused.painRelievers.map((item) => item.id),
    ...fit.unused.gainCreators.map((item) => item.id),
  ]), [fit]);

  useEffect(() => {
    const update = () => {
      const root = rootRef.current;
      const activeId = selected?.id || hoverId;
      if (!root || !activeId) {
        setLines([]);
        return;
      }
      const rootBox = root.getBoundingClientRect();
      const relevant = canvas.links.filter((link) => link.customerId === activeId || link.valueId === activeId);
      const next = relevant.map((link) => {
        const from = root.querySelector(`[data-sticky-id="${link.valueId}"]`);
        const to = root.querySelector(`[data-sticky-id="${link.customerId}"]`);
        if (!from || !to) return null;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const x1 = a.right - rootBox.left;
        const y1 = a.top + a.height / 2 - rootBox.top;
        const x2 = b.left - rootBox.left;
        const y2 = b.top + b.height / 2 - rootBox.top;
        const mid = (x1 + x2) / 2;
        return {
          id: link.id,
          kind: link.kind,
          d: `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
        };
      }).filter(Boolean);
      setLines(next);
    };
    update();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (observer && rootRef.current) observer.observe(rootRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [canvas, selected, hoverId]);

  const handleSelect = (item, listKey, kind) => {
    if (!selected) {
      setSelected({ id: item.id, listKey, kind, text: item.text });
      return;
    }
    if (selected.id === item.id) {
      setSelected(null);
      return;
    }
    const selectedIsValue = VALUE_KEYS.has(selected.listKey);
    const thisIsValue = VALUE_KEYS.has(listKey);
    if (selected.kind === kind && selectedIsValue !== thisIsValue) {
      const customerId = thisIsValue ? selected.id : item.id;
      const valueId = thisIsValue ? item.id : selected.id;
      onToggleLink(kind, customerId, valueId);
      return;
    }
    setSelected({ id: item.id, listKey, kind, text: item.text });
  };

  const selectedTargets = selected && VALUE_KEYS.has(selected.listKey)
    ? canvas[LINK_KINDS[selected.kind]?.customerKey] || []
    : [];

  const strokeFor = (kind) => {
    if (kind === 'gain-creator') return '#168567';
    if (kind === 'pain-reliever') return '#B42318';
    return '#1266B1';
  };

  const renderSegment = (segment, side) => {
    const block = VPD_BLOCKS[segment.key];
    return (
      <div key={segment.key} className={`vpc-segment ${segment.className}`}>
        <div className="vpc-segment-head">
          <span className="canvas-icon-badge">
            <CanvasIcon name={VPC_BLOCK_ICONS[segment.key]} size={20} />
          </span>
          <h3>
            {block.en}
            <small>{block.idLabel}</small>
          </h3>
        </div>
        <div
          className="vpc-stickies"
          onMouseLeave={() => setHoverId(null)}
        >
          {canvas[segment.key].map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoverId(item.id)}
            >
              <StickyNote
                item={item}
                listKey={segment.key}
                kind={segment.kind}
                selected={selected?.id === item.id}
                isPartner={partnerIds.has(item.id)}
                isUnaddressed={side === 'customer' && unaddressedIds.has(item.id)}
                isUnused={side === 'value' && unusedIds.has(item.id)}
                onSelect={handleSelect}
                onRemove={onRemoveItem}
              />
            </div>
          ))}
        </div>
        <SegmentComposer
          label={block.idLabel}
          placeholder={segment.placeholder || `Tambah ${block.idLabel.toLowerCase()}...`}
          onAdd={(text, kind) => onAddItem(segment.key, text, kind)}
          extra={segment.key === 'jobs' ? { label: 'Jenis pekerjaan', defaultValue: 'functional', options: JOB_KINDS } : null}
        />
      </div>
    );
  };

  return (
    <section className="vpc-book-wrap" aria-labelledby="vpc-book-title">
      <div className="vpc-book-head">
        <div>
          <h2 id="vpc-book-title">Kanvas Proposisi Nilai, bentuk buku</h2>
          <p>
            Tata letak mengikuti Value Proposition Design: Peta Nilai berbentuk persegi di kiri
            (Pencipta Manfaat, Pereda Nyeri, Produk &amp; Layanan) dan Profil Pelanggan berbentuk
            lingkaran di kanan (Manfaat, Nyeri, Pekerjaan Pelanggan). Digambar ulang; ikon orisinal DeKa.
          </p>
        </div>
      </div>
      <p className="vpc-book-hint">
        Pilih tempelan di satu sisi, lalu klik pasangan yang sesuai di sisi lain untuk menautkan atau melepasnya. Arahkan kursor untuk melihat garis kecocokan. Tempelan yang belum tertangani diberi tepi merah lembut.
      </p>

      <div className="vpc-book" ref={rootRef}>
        <svg className="vpc-book-svg" aria-hidden="true">
          {lines.map((line) => (
            <path key={line.id} d={line.d} stroke={strokeFor(line.kind)} />
          ))}
        </svg>

        <section
          className="vpc-value-map"
          aria-label="Peta Nilai (Value Map)"
        >
          {VALUE_SEGMENTS.map((segment) => renderSegment(segment, 'value'))}
        </section>

        <div className="vpc-fit-bridge" aria-hidden="true">
          <strong>FIT</strong>
          <span>Peta nilai menempel pada profil pelanggan</span>
        </div>

        <section
          className="vpc-profile"
          aria-label="Profil Pelanggan (Customer Profile)"
        >
          {CUSTOMER_SEGMENTS.map((segment) => renderSegment(segment, 'customer'))}
        </section>
      </div>

      <div className="vpc-match-panel">
        <h3>
          <Link2 size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Mencocokkan tempelan
        </h3>
        {!selected && (
          <p>Belum ada tempelan yang dipilih. Klik satu item di peta nilai atau profil pelanggan untuk mulai menautkan.</p>
        )}
        {selected && (
          <>
            <p>
              Dipilih: <strong>{selected.text}</strong>
              {VALUE_KEYS.has(selected.listKey)
                ? ' — klik nyeri, manfaat, atau pekerjaan yang sesuai, atau gunakan kotak centang di bawah.'
                : ' — klik item peta nilai yang sesuai untuk menautkan atau melepasnya.'}
            </p>
            {VALUE_KEYS.has(selected.listKey) && (
              selectedTargets.length === 0 ? (
                <p>Tambah item di sisi profil pelanggan untuk mulai mencocokkan.</p>
              ) : (
                <fieldset style={{ border: 0, padding: 0 }}>
                  <legend style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Cocokkan ke {VALUE_SEGMENTS.find((segment) => segment.key === selected.listKey)?.targetLabel}
                  </legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {selectedTargets.map((target) => {
                      const checked = canvas.links.some((link) => (
                        link.kind === selected.kind && link.valueId === selected.id && link.customerId === target.id
                      ));
                      return (
                        <label key={target.id} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-body)' }}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onToggleLink(selected.kind, target.id, selected.id)}
                            aria-label={`Tautkan ${selected.text} ke ${target.text}`}
                          />
                          <span>{target.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )
            )}
            <button
              type="button"
              className="btn btn-outline"
              style={{ marginTop: '0.65rem', fontSize: '0.75rem' }}
              onClick={() => setSelected(null)}
            >
              Tutup pilihan
            </button>
          </>
        )}
      </div>
    </section>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { JOB_KINDS, VPD_BLOCKS } from '../data/vpdCanvasData';
import { CanvasIcon, VPC_BLOCK_ICONS } from './CanvasIcon';
import '../vpc-canvas.css';

const VALUE_SEGMENTS = [
  { key: 'products', kind: 'job-product', className: 'vpc-seg-products' },
  { key: 'gainCreators', kind: 'gain-creator', className: 'vpc-seg-gain-creators' },
  { key: 'painRelievers', kind: 'pain-reliever', className: 'vpc-seg-pain-relievers' },
];

const CUSTOMER_SEGMENTS = [
  { key: 'jobs', kind: 'job-product', className: 'vpc-seg-jobs' },
  { key: 'gains', kind: 'gain-creator', className: 'vpc-seg-gains' },
  { key: 'pains', kind: 'pain-reliever', className: 'vpc-seg-pains' },
];

function GiftMark() {
  return (
    <svg className="vpc-center-svg" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="13" width="20" height="14" rx="1.4" fill="#fff" stroke="#14134b" strokeWidth="1.7" />
      <rect x="5" y="9" width="22" height="5" rx="1" fill="#fff" stroke="#14134b" strokeWidth="1.7" />
      <path d="M16 9.2v17.8" fill="none" stroke="#14134b" strokeWidth="1.7" />
      <path
        d="M16 9.2c-3.4-4.2-7.4-1.1-4.1 2.1 1.6 1.5 4.1-2.1 4.1-2.1 3.4-4.2 7.4-1.1 4.1 2.1C18.5 12.8 16 9.2 16 9.2z"
        fill="none"
        stroke="#14134b"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaceMark() {
  return (
    <svg className="vpc-center-svg" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="#fff" stroke="#14134b" strokeWidth="1.7" />
      <circle cx="13" cy="14.2" r="1.35" fill="#14134b" />
      <path d="M8.2 16.2 L5.6 16.2 L8.2 18.4" fill="none" stroke="#14134b" strokeWidth="1.55" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M11.2 19.6 Q14.2 22 17.2 19.4" fill="none" stroke="#14134b" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}

function DisplaySticky({ item, listKey, selected, isPartner, isUnaddressed, isUnused, onSelect }) {
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
    <button
      type="button"
      className={classes}
      data-sticky-id={item.id}
      onClick={() => onSelect(item.id)}
      aria-pressed={selected}
      aria-label={`${item.text}${selected ? ' (disorot)' : ''}`}
    >
      {jobKind && <span className="sticky-kind">{jobKind.label}</span>}
      <span>{item.text}</span>
    </button>
  );
}

function SegmentDisplay({
  segment,
  side,
  canvas,
  selectedId,
  partnerIds,
  unaddressedIds,
  unusedIds,
  onSelect,
  onHover,
}) {
  const block = VPD_BLOCKS[segment.key];
  const shortEn = {
    jobs: 'Customer Jobs',
    pains: 'Pains',
    gains: 'Gains',
    products: 'Products & Services',
    painRelievers: 'Pain Relievers',
    gainCreators: 'Gain Creators',
  }[segment.key] || block.en;
  const items = canvas[segment.key];

  return (
    <div className={`vpc-segment ${segment.className}`}>
      <div className="vpc-seg-body">
        <div className="vpc-segment-head">
          <span className="canvas-icon-badge">
            <CanvasIcon name={VPC_BLOCK_ICONS[segment.key]} size={18} />
          </span>
          <h3>
            {segment.key === 'products' ? <>Products &amp;<br />Services</> : shortEn}
            <small>{block.idLabel}</small>
          </h3>
        </div>
        <div
          className="vpc-stickies"
          onMouseLeave={() => onHover(null)}
        >
          {items.length === 0 && (
            <p className="vpc-empty-seg">Belum ada isian di formulir.</p>
          )}
          {items.map((item) => (
            <div key={item.id} onMouseEnter={() => onHover(item.id)}>
              <DisplaySticky
                item={item}
                listKey={segment.key}
                selected={selectedId === item.id}
                isPartner={partnerIds.has(item.id)}
                isUnaddressed={side === 'customer' && unaddressedIds.has(item.id)}
                isUnused={side === 'value' && unusedIds.has(item.id)}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VpcBookCanvas({ canvas, fit }) {
  const rootRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [lines, setLines] = useState([]);

  const activeId = selectedId || hoverId;

  const partnerIds = useMemo(() => {
    if (!activeId) return new Set();
    return new Set(
      canvas.links
        .filter((link) => link.customerId === activeId || link.valueId === activeId)
        .flatMap((link) => [link.customerId, link.valueId])
        .filter((id) => id !== activeId)
    );
  }, [canvas.links, activeId]);

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
  }, [canvas, activeId]);

  const handleSelect = (id) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  const strokeFor = (kind) => {
    if (kind === 'gain-creator') return '#168567';
    if (kind === 'pain-reliever') return '#B42318';
    return '#1266B1';
  };

  const highlighted = activeId
    ? [...VALUE_SEGMENTS, ...CUSTOMER_SEGMENTS]
      .flatMap((segment) => canvas[segment.key].map((item) => ({ ...item, key: segment.key })))
      .find((item) => item.id === activeId)
    : null;

  const partners = highlighted
    ? canvas.links
      .filter((link) => link.customerId === highlighted.id || link.valueId === highlighted.id)
      .map((link) => {
        const otherId = link.customerId === highlighted.id ? link.valueId : link.customerId;
        const other = [...VALUE_SEGMENTS, ...CUSTOMER_SEGMENTS]
          .flatMap((segment) => canvas[segment.key])
          .find((item) => item.id === otherId);
        return other?.text;
      })
      .filter(Boolean)
    : [];

  return (
    <section className="vpc-book-wrap" aria-labelledby="vpc-book-title">
      <div className="vpc-book-head">
        <div>
          <h2 id="vpc-book-title">Kanvas Proposisi Nilai, bentuk buku</h2>
          <p>
            Tata letak mengikuti Value Proposition Canvas resmi Strategyzer (Osterwalder dan rekan):
            Peta Nilai berbentuk persegi di kiri, Profil Pelanggan berbentuk lingkaran di kanan.
            Kanvas ini hanya menampilkan hasil isian formulir — tambah, hapus, dan tautan dikerjakan
            di formulir. Digambar ulang dengan CSS/SVG orisinal; ikon garis DeKa.
          </p>
        </div>
      </div>
      <p className="vpc-book-hint">
        Arahkan kursor atau klik tempelan untuk menyorot pasangannya. Tempelan pelanggan yang belum
        tertaut diberi tepi merah lembut. Item peta nilai yang belum tertaut sedikit diredupkan.
      </p>

      <div className="vpc-book" ref={rootRef}>
        <svg className="vpc-book-svg" aria-hidden="true">
          {lines.map((line) => (
            <path key={line.id} d={line.d} stroke={strokeFor(line.kind)} />
          ))}
        </svg>

        <section className="vpc-value-map" aria-label="Peta Nilai (Value Map)">
          <svg className="vpc-dividers" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="0" x2="50" y2="50" />
            <line x1="0" y1="100" x2="50" y2="50" />
            <line x1="50" y1="50" x2="100" y2="50" />
          </svg>
          {VALUE_SEGMENTS.map((segment) => (
            <SegmentDisplay
              key={segment.key}
              segment={segment}
              side="value"
              canvas={canvas}
              selectedId={selectedId}
              partnerIds={partnerIds}
              unaddressedIds={unaddressedIds}
              unusedIds={unusedIds}
              onSelect={handleSelect}
              onHover={setHoverId}
            />
          ))}
          <div className="vpc-center-mark" aria-hidden="true">
            <GiftMark />
          </div>
        </section>

        <div className="vpc-fit-bridge" aria-hidden="true">
          <span className="vpc-fit-chevrons" title="Pencipta manfaat menghadap manfaat">
            <i className="vpc-chevron vpc-chevron-right" />
            <i className="vpc-chevron vpc-chevron-left" />
          </span>
          <strong>FIT</strong>
          <span className="vpc-fit-chevrons" title="Pereda nyeri menghadap nyeri">
            <i className="vpc-chevron vpc-chevron-right" />
            <i className="vpc-chevron vpc-chevron-left" />
          </span>
        </div>

        <section className="vpc-profile" aria-label="Profil Pelanggan (Customer Profile)">
          <svg className="vpc-dividers" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="50" x2="50" y2="50" />
            <line x1="50" y1="50" x2="85.355" y2="14.645" />
            <line x1="50" y1="50" x2="85.355" y2="85.355" />
          </svg>
          {CUSTOMER_SEGMENTS.map((segment) => (
            <SegmentDisplay
              key={segment.key}
              segment={segment}
              side="customer"
              canvas={canvas}
              selectedId={selectedId}
              partnerIds={partnerIds}
              unaddressedIds={unaddressedIds}
              unusedIds={unusedIds}
              onSelect={handleSelect}
              onHover={setHoverId}
            />
          ))}
          <div className="vpc-center-mark" aria-hidden="true">
            <FaceMark />
          </div>
        </section>
      </div>

      <p className="vpc-highlight-readout">
        {highlighted
          ? partners.length
            ? <>Disorot: <strong>{highlighted.text}</strong> — tertaut ke {partners.join('; ')}.</>
            : <>Disorot: <strong>{highlighted.text}</strong> — belum tertaut.</>
          : 'Kanvas hanya menampilkan hasil formulir. Klik tempelan untuk melihat tautannya.'}
      </p>
    </section>
  );
}

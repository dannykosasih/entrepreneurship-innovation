import React, { useState } from 'react';
import { Plus, Trash2, Link2 } from 'lucide-react';
import { getVpdContent } from '../data/vpdCanvasData.en';
import { useLanguage } from '../context/LanguageContext';
import { CanvasIcon, VPC_BLOCK_ICONS } from './CanvasIcon';
import '../vpc-canvas.css';

const VALUE_FIELDS_ID = [
  { key: 'products', kind: 'job-product', placeholder: 'Contoh: aplikasi pesan-ambil...' },
  { key: 'gainCreators', kind: 'gain-creator', placeholder: 'Contoh: lokasi gerai di jalur commuting...' },
  { key: 'painRelievers', kind: 'pain-reliever', placeholder: 'Contoh: pesan duluan agar tidak antre...' },
];

const VALUE_FIELDS_EN = [
  { key: 'products', kind: 'job-product', placeholder: 'Example: order-ahead mobile app...' },
  { key: 'gainCreators', kind: 'gain-creator', placeholder: 'Example: outlet locations along commute path...' },
  { key: 'painRelievers', kind: 'pain-reliever', placeholder: 'Example: order ahead to skip queues...' },
];

const CUSTOMER_FIELDS_ID = [
  { key: 'jobs', kind: 'job-product', placeholder: 'Contoh: mendapatkan kafein berkualitas sebelum rapat...' },
  { key: 'gains', kind: 'gain-creator', placeholder: 'Contoh: pesanan siap saat tiba...' },
  { key: 'pains', kind: 'pain-reliever', placeholder: 'Contoh: antre panjang di kafe...' },
];

const CUSTOMER_FIELDS_EN = [
  { key: 'jobs', kind: 'job-product', placeholder: 'Example: get quality caffeine before a meeting...' },
  { key: 'gains', kind: 'gain-creator', placeholder: 'Example: order ready on arrival...' },
  { key: 'pains', kind: 'pain-reliever', placeholder: 'Example: long café queues...' },
];

const LINK_GROUPS_ID = [
  { kind: 'job-product', valueKey: 'products', customerKey: 'jobs', valueLabel: 'Produk & layanan', customerLabel: 'pekerjaan pelanggan' },
  { kind: 'pain-reliever', valueKey: 'painRelievers', customerKey: 'pains', valueLabel: 'Pereda nyeri', customerLabel: 'nyeri pelanggan' },
  { kind: 'gain-creator', valueKey: 'gainCreators', customerKey: 'gains', valueLabel: 'Pencipta manfaat', customerLabel: 'manfaat pelanggan' },
];

const LINK_GROUPS_EN = [
  { kind: 'job-product', valueKey: 'products', customerKey: 'jobs', valueLabel: 'Products & services', customerLabel: 'customer jobs' },
  { kind: 'pain-reliever', valueKey: 'painRelievers', customerKey: 'pains', valueLabel: 'Pain relievers', customerLabel: 'customer pains' },
  { kind: 'gain-creator', valueKey: 'gainCreators', customerKey: 'gains', valueLabel: 'Gain creators', customerLabel: 'customer gains' },
];

function FieldComposer({ block, placeholder, onAdd, isJobs, jobKinds, isEn }) {
  const [text, setText] = useState('');
  const [kind, setKind] = useState('functional');

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(block.key, value, isJobs ? kind : undefined);
    setText('');
  };

  const labelTarget = isEn ? block.en.toLowerCase() : block.idLabel.toLowerCase();

  return (
    <div className="vpc-composer">
      {isJobs && (
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value)}
          aria-label={isEn ? 'Job type' : 'Jenis pekerjaan'}
        >
          {jobKinds.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
      )}
      <input
        type="text"
        placeholder={placeholder}
        aria-label={isEn ? `Add ${labelTarget}` : `Tambah ${labelTarget}`}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') submit(); }}
      />
      <button type="button" onClick={submit} aria-label={isEn ? `Add ${labelTarget}` : `Tambah ${labelTarget}`}>
        <Plus size={12} /> {isEn ? 'Add' : 'Tambah'}
      </button>
    </div>
  );
}

function FieldCard({ field, items, onAdd, onRemove, block, jobKinds, isEn }) {
  return (
    <section className="vpc-field-card" aria-labelledby={`vpc-field-${field.key}`}>
      <div className="vpc-segment-head">
        <span className="canvas-icon-badge">
          <CanvasIcon name={VPC_BLOCK_ICONS[field.key]} size={18} />
        </span>
        <h3 id={`vpc-field-${field.key}`}>
          {block.en}
          {!isEn && <small>{block.idLabel}</small>}
        </h3>
      </div>
      <ul className="vpc-field-list">
        {items.length === 0 && (
          <li className="vpc-field-empty">{isEn ? 'No items yet.' : 'Belum ada item.'}</li>
        )}
        {items.map((item) => {
          const jobKind = item.kind ? jobKinds.find((job) => job.id === item.kind) : null;
          return (
            <li key={item.id} className={`vpc-field-item vpc-sticky-${field.key}`}>
              <span>
                {jobKind && <span className="sticky-kind">{jobKind.label}</span>}
                {item.text}
              </span>
              <button
                type="button"
                className="vpc-sticky-remove"
                onClick={() => onRemove(field.key, item.id)}
                aria-label={isEn ? `Remove ${item.text}` : `Hapus ${item.text}`}
              >
                <Trash2 size={12} />
              </button>
            </li>
          );
        })}
      </ul>
      <FieldComposer
        block={block}
        placeholder={field.placeholder}
        onAdd={onAdd}
        isJobs={field.key === 'jobs'}
        jobKinds={jobKinds}
        isEn={isEn}
      />
    </section>
  );
}

export function VpcCanvasForm({ canvas, onAddItem, onRemoveItem, onToggleLink }) {
  const { lang, isEn } = useLanguage();
  const { JOB_KINDS, VPD_BLOCKS } = getVpdContent(lang);
  const valueFields = isEn ? VALUE_FIELDS_EN : VALUE_FIELDS_ID;
  const customerFields = isEn ? CUSTOMER_FIELDS_EN : CUSTOMER_FIELDS_ID;
  const linkGroups = isEn ? LINK_GROUPS_EN : LINK_GROUPS_ID;

  return (
    <section className="vpc-form-wrap" aria-labelledby="vpc-form-title">
      <div className="vpc-book-head">
        <div>
          <h2 id="vpc-form-title">
            {isEn ? 'Fill in the canvas via form' : 'Isi kanvas lewat formulir'}
          </h2>
          <p>
            {isEn
              ? 'Write customer jobs, pains, gains, products & services, pain relievers, and gain creators here, then link matching pairs. The visual canvas below strictly displays your entries inside the proper segments — there is no direct add/delete on the square and circle shapes.'
              : 'Tulis pekerjaan, nyeri, manfaat, produk dan layanan, pereda nyeri, serta pencipta manfaat di sini, lalu tautkan pasangan yang sesuai. Kanvas di bawah hanya menampilkan hasil isian di segmen yang tepat — tidak ada tambah atau hapus langsung pada bentuk persegi dan lingkaran.'}
          </p>
        </div>
      </div>

      <div className="vpc-form-columns">
        <div>
          <h3 className="vpc-form-side-title">{isEn ? 'Value Map' : 'Peta Nilai'}</h3>
          {valueFields.map((field) => (
            <FieldCard
              key={field.key}
              field={field}
              items={canvas[field.key]}
              onAdd={onAddItem}
              onRemove={onRemoveItem}
              block={VPD_BLOCKS[field.key]}
              jobKinds={JOB_KINDS}
              isEn={isEn}
            />
          ))}
        </div>
        <div>
          <h3 className="vpc-form-side-title">{isEn ? 'Customer Profile' : 'Profil Pelanggan'}</h3>
          {customerFields.map((field) => (
            <FieldCard
              key={field.key}
              field={field}
              items={canvas[field.key]}
              onAdd={onAddItem}
              onRemove={onRemoveItem}
              block={VPD_BLOCKS[field.key]}
              jobKinds={JOB_KINDS}
              isEn={isEn}
            />
          ))}
        </div>
      </div>

      <div className="vpc-match-panel">
        <h3>
          <Link2 size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          {isEn ? 'Link sticky notes' : 'Tautkan tempelan'}
        </h3>
        <p>
          {isEn
            ? 'Match value map items with customer profile items of the same type. The link score is computed from these checkboxes, not from clicking on the canvas.'
            : 'Pasangkan item peta nilai dengan item profil yang sama jenisnya. Skor tautan dihitung dari centang ini, bukan dari klik pada kanvas.'}
        </p>
        {linkGroups.map((group) => {
          const values = canvas[group.valueKey];
          const customers = canvas[group.customerKey];
          return (
            <fieldset key={group.kind} className="vpc-link-group">
              <legend>{group.valueLabel} ↔ {group.customerLabel}</legend>
              {values.length === 0 || customers.length === 0 ? (
                <p>
                  {isEn
                    ? `Fill in both sides first to link ${group.customerLabel}.`
                    : `Isi kedua sisi dulu untuk menautkan ${group.customerLabel}.`}
                </p>
              ) : (
                <div className="vpc-link-rows">
                  {values.map((value) => (
                    <div key={value.id} className="vpc-link-row">
                      <strong>{value.text}</strong>
                      {customers.map((customer) => {
                        const checked = canvas.links.some((link) => (
                          link.kind === group.kind
                          && link.valueId === value.id
                          && link.customerId === customer.id
                        ));
                        return (
                          <label key={customer.id}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => onToggleLink(group.kind, customer.id, value.id)}
                              aria-label={isEn ? `Link ${value.text} to ${customer.text}` : `Tautkan ${value.text} ke ${customer.text}`}
                            />
                            <span>{customer.text}</span>
                          </label>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}


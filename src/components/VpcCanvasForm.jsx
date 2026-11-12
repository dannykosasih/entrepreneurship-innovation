import React, { useState } from 'react';
import { Plus, Trash2, Link2 } from 'lucide-react';
import { JOB_KINDS, VPD_BLOCKS } from '../data/vpdCanvasData';
import { CanvasIcon, VPC_BLOCK_ICONS } from './CanvasIcon';
import '../vpc-canvas.css';

const VALUE_FIELDS = [
  { key: 'products', kind: 'job-product', placeholder: 'Contoh: aplikasi pesan-ambil...' },
  { key: 'gainCreators', kind: 'gain-creator', placeholder: 'Contoh: lokasi gerai di jalur commuting...' },
  { key: 'painRelievers', kind: 'pain-reliever', placeholder: 'Contoh: pesan duluan agar tidak antre...' },
];

const CUSTOMER_FIELDS = [
  { key: 'jobs', kind: 'job-product', placeholder: 'Contoh: mendapatkan kafein berkualitas sebelum rapat...' },
  { key: 'gains', kind: 'gain-creator', placeholder: 'Contoh: pesanan siap saat tiba...' },
  { key: 'pains', kind: 'pain-reliever', placeholder: 'Contoh: antre panjang di kafe...' },
];

const LINK_GROUPS = [
  { kind: 'job-product', valueKey: 'products', customerKey: 'jobs', valueLabel: 'Produk & layanan', customerLabel: 'pekerjaan pelanggan' },
  { kind: 'pain-reliever', valueKey: 'painRelievers', customerKey: 'pains', valueLabel: 'Pereda nyeri', customerLabel: 'nyeri pelanggan' },
  { kind: 'gain-creator', valueKey: 'gainCreators', customerKey: 'gains', valueLabel: 'Pencipta manfaat', customerLabel: 'manfaat pelanggan' },
];

function FieldComposer({ block, placeholder, onAdd, isJobs }) {
  const [text, setText] = useState('');
  const [kind, setKind] = useState('functional');

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(block.key, value, isJobs ? kind : undefined);
    setText('');
  };

  return (
    <div className="vpc-composer">
      {isJobs && (
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value)}
          aria-label="Jenis pekerjaan"
        >
          {JOB_KINDS.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
      )}
      <input
        type="text"
        placeholder={placeholder}
        aria-label={`Tambah ${block.idLabel.toLowerCase()}`}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') submit(); }}
      />
      <button type="button" onClick={submit} aria-label={`Tambah ${block.idLabel.toLowerCase()}`}>
        <Plus size={12} /> Tambah
      </button>
    </div>
  );
}

function FieldCard({ field, items, onAdd, onRemove }) {
  const block = VPD_BLOCKS[field.key];
  return (
    <section className="vpc-field-card" aria-labelledby={`vpc-field-${field.key}`}>
      <div className="vpc-segment-head">
        <span className="canvas-icon-badge">
          <CanvasIcon name={VPC_BLOCK_ICONS[field.key]} size={18} />
        </span>
        <h3 id={`vpc-field-${field.key}`}>
          {block.en}
          <small>{block.idLabel}</small>
        </h3>
      </div>
      <ul className="vpc-field-list">
        {items.length === 0 && <li className="vpc-field-empty">Belum ada item.</li>}
        {items.map((item) => {
          const jobKind = item.kind ? JOB_KINDS.find((job) => job.id === item.kind) : null;
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
                aria-label={`Hapus ${item.text}`}
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
      />
    </section>
  );
}

export function VpcCanvasForm({ canvas, onAddItem, onRemoveItem, onToggleLink }) {
  return (
    <section className="vpc-form-wrap" aria-labelledby="vpc-form-title">
      <div className="vpc-book-head">
        <div>
          <h2 id="vpc-form-title">Isi kanvas lewat formulir</h2>
          <p>
            Tulis pekerjaan, nyeri, manfaat, produk dan layanan, pereda nyeri, serta pencipta
            manfaat di sini, lalu tautkan pasangan yang sesuai. Kanvas di bawah hanya menampilkan
            hasil isian di segmen yang tepat — tidak ada tambah atau hapus langsung pada bentuk
            persegi dan lingkaran.
          </p>
        </div>
      </div>

      <div className="vpc-form-columns">
        <div>
          <h3 className="vpc-form-side-title">Peta Nilai</h3>
          {VALUE_FIELDS.map((field) => (
            <FieldCard
              key={field.key}
              field={field}
              items={canvas[field.key]}
              onAdd={onAddItem}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
        <div>
          <h3 className="vpc-form-side-title">Profil Pelanggan</h3>
          {CUSTOMER_FIELDS.map((field) => (
            <FieldCard
              key={field.key}
              field={field}
              items={canvas[field.key]}
              onAdd={onAddItem}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
      </div>

      <div className="vpc-match-panel">
        <h3>
          <Link2 size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Tautkan tempelan
        </h3>
        <p>
          Pasangkan item peta nilai dengan item profil yang sama jenisnya. Skor tautan dihitung
          dari centang ini, bukan dari klik pada kanvas.
        </p>
        {LINK_GROUPS.map((group) => {
          const values = canvas[group.valueKey];
          const customers = canvas[group.customerKey];
          return (
            <fieldset key={group.kind} className="vpc-link-group">
              <legend>{group.valueLabel} ↔ {group.customerLabel}</legend>
              {values.length === 0 || customers.length === 0 ? (
                <p>Isi kedua sisi dulu untuk menautkan {group.customerLabel}.</p>
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
                              aria-label={`Tautkan ${value.text} ke ${customer.text}`}
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


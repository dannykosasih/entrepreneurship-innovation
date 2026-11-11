import React, { useState } from 'react';
import { Award, Printer, X, ShieldCheck } from 'lucide-react';

export function CertificateModal({ isOpen, onClose, overallScore, userPersona }) {
  const [studentName, setStudentName] = useState('Innovative Learner');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = `DDK-EI-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div role="dialog" aria-modal="true" aria-label="DDK Credential preview" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(6, 30, 56, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '880px',
        width: '100%',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--ddk-mid-gray)'
      }}>
        {/* Modal Controls Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--ddk-light-gray)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={22} color="var(--ddk-gold)" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>
              Pratinjau Sertifikat Resmi DDK Academy
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <label htmlFor="certificate-recipient" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Nama Penerima:</label>
              <input
                id="certificate-recipient"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--ddk-dark)'
                }}
              />
            </div>

            <button onClick={handlePrint} className="btn btn-gold" style={{ fontSize: '0.8rem', padding: '0.45rem 0.95rem' }}>
              <Printer size={14} /> Cetak / Unduh PDF
            </button>
            <button aria-label="Close certificate" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Certificate Paper */}
        <div style={{
          padding: '3rem',
          background: '#FFFFFF',
          color: '#0F172A',
          margin: '1.5rem',
          border: '14px double #0C4F8E',
          borderRadius: '4px',
          textAlign: 'center',
          boxShadow: '0 4px 25px rgba(12, 79, 142, 0.08)',
          position: 'relative'
        }}>
          {/* Watermark Seal */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.04,
            pointerEvents: 'none'
          }}>
            <ShieldCheck size={420} color="#0C4F8E" />
          </div>

          <div style={{
            fontSize: '0.85rem',
            fontWeight: 900,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#0C4F8E',
            fontFamily: 'var(--font-heading)',
            marginBottom: '0.4rem'
          }}>
            DHARMA KORPORASI • DDK ACADEMY
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            Executive Training & Entrepreneurship Education
          </div>

          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            color: '#0C4F8E',
            letterSpacing: '0.02em',
            marginBottom: '1rem'
          }}>
            CERTIFICATE OF COMPLETION
          </h2>

          <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '1rem', marginBottom: '1.25rem' }}>
            Diberikan dengan penuh kehormatan kepada:
          </p>

          <div style={{
            fontSize: '2.15rem',
            fontWeight: 800,
            color: '#0C4F8E',
            borderBottom: '2.5px solid #F5C842',
            display: 'inline-block',
            paddingBottom: '0.35rem',
            minWidth: '380px',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-heading)'
          }}>
            {studentName}
          </div>

          <p style={{ color: '#475569', fontSize: '0.975rem', maxWidth: '640px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            atas keberhasilan menyelesaikan seluruh kurikulum terstruktur, asesmen testbank, analisis studi kasus bisnis Kopi AJIB, dan simulasi ventura pada program:
          </p>

          <div style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#0C4F8E',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Entrepreneurship & Innovation Mastery
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'var(--ddk-light-gray)',
            padding: '0.6rem 1.75rem',
            borderRadius: '999px',
            border: '1.5px solid var(--border-subtle)',
            fontSize: '0.85rem',
            marginBottom: '2.5rem'
          }}>
            <span>Nilai Akhir: <strong style={{ color: '#0C4F8E' }}>{overallScore}% ({overallScore >= 85 ? 'Grade A' : 'Grade B+'})</strong></span>
            <span>•</span>
            <span>Diterbitkan: <strong>{currentDate}</strong></span>
            <span>•</span>
            <span>ID Kredensial: <strong>{certificateId}</strong></span>
          </div>

          {/* DDK Official Signature */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid #E2E8F0',
            paddingTop: '1.5rem',
            marginTop: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.5rem', color: '#0C4F8E', marginBottom: '0.2rem' }}>
                Danny Kosasih
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0C4F8E', fontFamily: 'var(--font-heading)' }}>Danny Kosasih</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Founder & CEO Dharma Korporasi</div>
              <div style={{ fontSize: '0.75rem', color: '#0F5FA8', fontWeight: 600 }}>LinkedIn Top Voice | AI & Innovation Trainer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

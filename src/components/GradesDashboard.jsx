import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BarChart3, 
  CheckCircle2, 
  Rocket, 
  HelpCircle, 
  Sparkles 
} from 'lucide-react';

export function GradesDashboard({ 
  completedModules, 
  quizScores, 
  completedCases, 
  simulatorScore, 
  onOpenCertificate 
}) {
  const totalModules = 13;
  const moduleProgressPct = Math.round((completedModules.length / totalModules) * 100);
  const moduleWeightedScore = (moduleProgressPct * 0.20);

  const quizScoresArr = Object.values(quizScores);
  const avgQuizPct = quizScoresArr.length > 0
    ? Math.round(quizScoresArr.reduce((a, b) => a + b, 0) / quizScoresArr.length)
    : 0;
  const quizWeightedScore = (avgQuizPct * 0.30);

  const totalCases = 2;
  const casePct = Math.round((completedCases.length / totalCases) * 100);
  const caseWeightedScore = (casePct * 0.25);

  const simPct = simulatorScore !== undefined ? simulatorScore : 0;
  const simWeightedScore = (simPct * 0.25);

  const totalScore = Math.round(moduleWeightedScore + quizWeightedScore + caseWeightedScore + simWeightedScore);

  let letterGrade = 'F';
  let gpaPoint = 0.0;
  let statusText = 'Perlu Peningkatan';
  let statusColor = '#BE123C';

  if (totalScore >= 85) {
    letterGrade = 'A';
    gpaPoint = 4.0;
    statusText = 'Distinction / Honors (DDK Scholar)';
    statusColor = 'var(--ddk-primary-blue)';
  } else if (totalScore >= 80) {
    letterGrade = 'A-';
    gpaPoint = 3.7;
    statusText = 'Excellent Standing';
    statusColor = 'var(--ddk-primary-blue)';
  } else if (totalScore >= 75) {
    letterGrade = 'B+';
    gpaPoint = 3.3;
    statusText = 'Very Good Standing';
    statusColor = 'var(--ddk-dark)';
  } else if (totalScore >= 70) {
    letterGrade = 'B';
    gpaPoint = 3.0;
    statusText = 'Satisfactory Passing';
    statusColor = 'var(--ddk-dark)';
  } else if (totalScore >= 60) {
    letterGrade = 'C+';
    gpaPoint = 2.3;
    statusText = 'Dalam Progres';
    statusColor = '#D97706';
  } else {
    letterGrade = 'Incomplete';
    gpaPoint = 1.0;
    statusText = 'Belum Memenuhi Syarat Kelulusan';
    statusColor = 'var(--text-muted)';
  }

  const badges = [
    { title: "Mindset Pioneer", desc: "Tuntas Modul 0 & 1 Mindset Kuratko", earned: completedModules.includes('mod-0') || completedModules.includes('mod-1') },
    { title: "Customer Discovery Hero", desc: "Skor >= 70% Asesmen Steve Blank", earned: (quizScores['quiz-4'] || 0) >= 70 },
    { title: "New Retail Strategist", desc: "Tuntas Studi Kasus Kopi AJIB", earned: completedCases.includes('case-kopi-ajib') },
    { title: "Unit Economics Master", desc: "Skor >= 70% Finansial & CAC/CLV", earned: (quizScores['quiz-10'] || 0) >= 70 },
    { title: "Simulated Founder", desc: "Tuntas 4 Kuartal Simulasi Bisnis DDK", earned: simulatorScore !== undefined }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              DDK Academic Performance
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--ddk-dark)' }}>
              Buku Nilai & Sertifikasi DDK
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
              Dihitung berdasarkan rubrik kurikulum resmi (Modul 20%, Kuis 30%, Studi Kasus 25%, Simulasi 25%).
            </p>
          </div>

          {totalScore >= 70 && (
            <button
              onClick={onOpenCertificate}
              className="btn btn-gold"
              style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
            >
              <Award size={18} /> Buka & Cetak Sertifikat Kelulusan
            </button>
          )}
        </div>
      </div>

      {/* Main Grade Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            TOTAL SKOR AKHIR LMS
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: 'var(--ddk-primary-blue)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {totalScore}%
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: statusColor, fontFamily: 'var(--font-heading)' }}>
            Status: {statusText}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            NILAI HURUF (GRADE)
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: 'var(--ddk-dark)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {letterGrade}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Indeks Prestasi: <strong style={{ color: 'var(--ddk-dark)' }}>{gpaPoint.toFixed(2)}</strong> / 4.00
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            MODUL DITUNTASKAN
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: 'var(--ddk-primary-blue)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {completedModules.length}/{totalModules}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {moduleProgressPct}% Progres Kurikulum
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            HASIL SIMULATOR
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: simulatorScore !== undefined ? '#D97706' : 'var(--text-muted)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {simulatorScore !== undefined ? `${simulatorScore}` : 'N/A'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {simulatorScore !== undefined ? 'Uji Strategi Kuartalan' : 'Belum Dijalankan'}
          </div>
        </div>
      </div>

      {/* Weighted Component Breakdown Table */}
      <div className="card" style={{ background: 'var(--ddk-white)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ddk-dark)' }}>
          <BarChart3 size={18} color="var(--ddk-primary-blue)" /> Rincian Bobot Penilaian Silabus DDK
        </h3>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--ddk-dark)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                <th style={{ padding: '0.85rem', textAlign: 'left' }}>Komponen Silabus</th>
                <th style={{ padding: '0.85rem', textAlign: 'center' }}>Bobot Silabus</th>
                <th style={{ padding: '0.85rem', textAlign: 'center' }}>Capaian Anda</th>
                <th style={{ padding: '0.85rem', textAlign: 'right', color: 'var(--ddk-gold)' }}>Nilai Terbobot</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>1. Ketuntasan Modul Pembelajaran (13 Bab)</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>20%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>{completedModules.length} dari {totalModules} ({moduleProgressPct}%)</td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{moduleWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>2. Asesmen Kuis Interaktif & Testbank</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>30%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>{avgQuizPct}% Rata-rata ({quizScoresArr.length} kuis)</td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{quizWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>3. Analisis Studi Kasus (Kopi AJIB & AI Inovasi)</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>25%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>{completedCases.length} dari {totalCases} ({casePct}%)</td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{caseWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>4. Hasil Simulasi Strategi Bisnis Ventura DDK</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>25%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>{simPct}% Skor Ventura</td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{simWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ background: 'var(--ddk-blue-subtle)', fontWeight: 900 }}>
                <td style={{ padding: '0.95rem 0.85rem', color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>NILAI AKHIR KOMPOSIT DDK</td>
                <td style={{ padding: '0.95rem 0.85rem', textAlign: 'center' }}>100%</td>
                <td style={{ padding: '0.95rem 0.85rem', textAlign: 'center' }}>—</td>
                <td style={{ padding: '0.95rem 0.85rem', textAlign: 'right', color: 'var(--ddk-dark)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                  {totalScore}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="card" style={{ background: 'var(--ddk-white)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ddk-dark)' }}>
          <Sparkles size={18} color="var(--ddk-gold)" /> Lencana Kompetensi & Pengakuan DDK
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {badges.map((b, idx) => (
            <div
              key={idx}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: b.earned ? 'var(--ddk-light-gray)' : 'var(--bg-primary)',
                border: '1.5px solid',
                borderColor: b.earned ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                opacity: b.earned ? 1 : 0.45,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.35rem' }}>{b.earned ? '🎖️' : '🔒'}</span>
                {b.earned && <CheckCircle2 size={16} color="var(--ddk-primary-blue)" />}
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>
                {b.title}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                {b.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

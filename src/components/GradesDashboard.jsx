import React from 'react';
import { COURSES } from '../data/coursesData';
import { useLanguage } from '../context/LanguageContext';
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
  const { isEn } = useLanguage();
  const totalModules = COURSES.length || 15;
  const moduleProgressPct = Math.min(100, Math.round((completedModules.length / totalModules) * 100));
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
  let statusText = isEn ? 'Needs Improvement' : 'Perlu Peningkatan';
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
    statusText = isEn ? 'In Progress' : 'Dalam Progres';
    statusColor = '#D97706';
  } else {
    letterGrade = 'Incomplete';
    gpaPoint = 1.0;
    statusText = isEn ? 'Not Yet Eligible for Graduation' : 'Belum Memenuhi Syarat Kelulusan';
    statusColor = 'var(--text-muted)';
  }

  const badges = [
    {
      title: 'Mindset Pioneer',
      desc: isEn ? 'Completed Modules 0 & 1 Kuratko Mindset' : 'Tuntas Modul 0 & 1 Mindset Kuratko',
      earned: completedModules.includes('mod-0') || completedModules.includes('mod-1'),
    },
    {
      title: 'Customer Discovery Hero',
      desc: isEn ? 'Score >= 70% on Steve Blank Assessment' : 'Skor >= 70% Asesmen Steve Blank',
      earned: (quizScores['quiz-4'] || 0) >= 70,
    },
    {
      title: 'New Retail Strategist',
      desc: isEn ? 'Completed Kopi AJIB Case Study' : 'Tuntas Studi Kasus Kopi AJIB',
      earned: completedCases.includes('case-kopi-ajib'),
    },
    {
      title: 'Unit Economics Master',
      desc: isEn ? 'Score >= 70% on Finance & CAC/CLV' : 'Skor >= 70% Finansial & CAC/CLV',
      earned: (quizScores['quiz-10'] || 0) >= 70,
    },
    {
      title: 'Simulated Founder',
      desc: isEn ? 'Completed 4-Quarter DDK Business Simulation' : 'Tuntas 4 Kuartal Simulasi Bisnis DDK',
      earned: simulatorScore !== undefined,
    },
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
              {isEn ? 'DDK Gradebook & Certification' : 'Buku Nilai & Sertifikasi DDK'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
              {isEn
                ? 'Calculated from the official curriculum rubric (Modules 20%, Quizzes 30%, Case Studies 25%, Simulation 25%).'
                : 'Dihitung berdasarkan rubrik kurikulum resmi (Modul 20%, Kuis 30%, Studi Kasus 25%, Simulasi 25%).'}
            </p>
          </div>

          {totalScore >= 70 && (
            <button
              onClick={onOpenCertificate}
              className="btn btn-gold"
              style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
            >
              <Award size={18} />{' '}
              {isEn ? 'Open & Print Completion Certificate' : 'Buka & Cetak Sertifikat Kelulusan'}
            </button>
          )}
        </div>
      </div>

      {/* Main Grade Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            {isEn ? 'OVERALL LMS SCORE' : 'TOTAL SKOR AKHIR LMS'}
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
            {isEn ? 'LETTER GRADE' : 'NILAI HURUF (GRADE)'}
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: 'var(--ddk-dark)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {letterGrade}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {isEn ? 'GPA:' : 'Indeks Prestasi:'} <strong style={{ color: 'var(--ddk-dark)' }}>{gpaPoint.toFixed(2)}</strong> / 4.00
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            {isEn ? 'MODULES COMPLETED' : 'MODUL DITUNTASKAN'}
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: 'var(--ddk-primary-blue)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {completedModules.length}/{totalModules}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {moduleProgressPct}% {isEn ? 'Curriculum Progress' : 'Progres Kurikulum'}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--ddk-white)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            {isEn ? 'SIMULATOR RESULT' : 'HASIL SIMULATOR'}
          </div>
          <div style={{ fontSize: '3.25rem', fontWeight: 900, color: simulatorScore !== undefined ? '#D97706' : 'var(--text-muted)', margin: '0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            {simulatorScore !== undefined ? `${simulatorScore}` : 'N/A'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {simulatorScore !== undefined
              ? (isEn ? 'Quarterly Strategy Trial' : 'Uji Strategi Kuartalan')
              : (isEn ? 'Not Run Yet' : 'Belum Dijalankan')}
          </div>
        </div>
      </div>

      {/* Weighted Component Breakdown Table */}
      <div className="card" style={{ background: 'var(--ddk-white)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ddk-dark)' }}>
          <BarChart3 size={18} color="var(--ddk-primary-blue)" />{' '}
          {isEn ? 'DDK Syllabus Grading Breakdown' : 'Rincian Bobot Penilaian Silabus DDK'}
        </h3>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--ddk-dark)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                <th style={{ padding: '0.85rem', textAlign: 'left' }}>{isEn ? 'Syllabus Component' : 'Komponen Silabus'}</th>
                <th style={{ padding: '0.85rem', textAlign: 'center' }}>{isEn ? 'Syllabus Weight' : 'Bobot Silabus'}</th>
                <th style={{ padding: '0.85rem', textAlign: 'center' }}>{isEn ? 'Your Achievement' : 'Capaian Anda'}</th>
                <th style={{ padding: '0.85rem', textAlign: 'right', color: 'var(--ddk-gold)' }}>{isEn ? 'Weighted Score' : 'Nilai Terbobot'}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>
                  {isEn ? `1. Learning Module Completion (${totalModules} Chapters)` : `1. Ketuntasan Modul Pembelajaran (${totalModules} Bab)`}
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>20%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                  {completedModules.length} {isEn ? 'of' : 'dari'} {totalModules} ({moduleProgressPct}%)
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{moduleWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>
                  {isEn ? '2. Interactive Quizzes & Testbank Assessments' : '2. Asesmen Kuis Interaktif & Testbank'}
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>30%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                  {avgQuizPct}% {isEn ? `Average (${quizScoresArr.length} quizzes)` : `Rata-rata (${quizScoresArr.length} kuis)`}
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{quizWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>
                  {isEn ? '3. Case Study Analysis (Kopi AJIB & AI Innovation)' : '3. Analisis Studi Kasus (Kopi AJIB & AI Inovasi)'}
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>25%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                  {completedCases.length} {isEn ? 'of' : 'dari'} {totalCases} ({casePct}%)
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{caseWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 600 }}>
                  {isEn ? '4. DDK Venture Strategy Simulation Result' : '4. Hasil Simulasi Strategi Bisnis Ventura DDK'}
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>25%</td>
                <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                  {simPct}% {isEn ? 'Venture Score' : 'Skor Ventura'}
                </td>
                <td style={{ padding: '0.85rem', textAlign: 'right', fontWeight: 700 }}>{simWeightedScore.toFixed(1)}%</td>
              </tr>
              <tr style={{ background: 'var(--ddk-blue-subtle)', fontWeight: 900 }}>
                <td style={{ padding: '0.95rem 0.85rem', color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>
                  {isEn ? 'DDK COMPOSITE FINAL SCORE' : 'NILAI AKHIR KOMPOSIT DDK'}
                </td>
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
          <Sparkles size={18} color="var(--ddk-gold)" />{' '}
          {isEn ? 'DDK Competency Badges & Recognition' : 'Lencana Kompetensi & Pengakuan DDK'}
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

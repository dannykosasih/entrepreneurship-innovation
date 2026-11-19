import React from 'react';
import { LayoutDashboard, BookOpen, HelpCircle, GraduationCap, Briefcase, Rocket, LayoutGrid, Layers, Search, Library, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Sidebar({ activeTab, setActiveTab, onOpenCertificate, menuOpen }) {
  const { isEn } = useLanguage();
  const groups = [
    [
      isEn ? 'Learning space' : 'Ruang belajar',
      [
        ['dashboard', isEn ? 'My dashboard' : 'Dasbor saya', LayoutDashboard],
        ['courses', isEn ? 'My learning' : 'Materi belajar', BookOpen],
        ['quizzes', isEn ? 'Assignments' : 'Kuis & Tugas', HelpCircle],
        ['grades', isEn ? 'Learning calendar & Grades' : 'Kalender & Nilai', GraduationCap],
      ],
    ],
    [
      isEn ? 'Explore & tools' : 'Eksplorasi & alat',
      [
        ['case-studies', isEn ? 'Case library' : 'Studi kasus', Briefcase],
        ['simulator', isEn ? 'Startup simulator' : 'Simulator startup', Rocket],
        ['bmc-builder', isEn ? 'BMC Strategy Tool' : 'Alat Strategi BMC', LayoutGrid],
        ['vpd-builder', isEn ? 'Value Proposition Design' : 'VPD Proposisi Nilai', Layers],
        ['knowledge-hub', isEn ? 'Knowledge wiki' : 'Wiki pengetahuan', Search],
        ['sources', isEn ? 'Resources & Syllabus' : 'Referensi & Silabus', Library],
      ],
    ],
  ];
  return <aside id="academy-navigation" className={`neon-sidebar ${menuOpen ? 'is-open' : ''}`}>
    <span className="neon-eyebrow">Venture.exe / Neon Nights</span>
    {groups.map(([label,items]) => <nav aria-label={label} key={label}><h2>{label}</h2>{items.map(([id,text,Icon]) => <button key={id} aria-current={activeTab===id ? 'page' : undefined} onClick={() => setActiveTab(id)}><Icon size={17} aria-hidden="true"/><span>{text}</span></button>)}</nav>)}
    <div className="sidebar-footer">
      <strong>Danny Kosasih</strong>
      <p>{isEn ? 'Faculty Lead · Dharma Korporasi' : 'Ketua Pengajar · Dharma Korporasi'}</p>
      <button className="neon-button" onClick={onOpenCertificate}><Award size={16} aria-hidden="true"/>{isEn ? 'DDK Credential' : 'Sertifikat DDK'}</button>
    </div>
  </aside>;
}


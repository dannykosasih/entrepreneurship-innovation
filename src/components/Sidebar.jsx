import React from 'react';
import { LayoutDashboard, BookOpen, HelpCircle, GraduationCap, Briefcase, Rocket, LayoutGrid, Layers, Search, Library, Award } from 'lucide-react';
const groups = [
  ['Learning space', [['dashboard','My dashboard',LayoutDashboard],['courses','My learning',BookOpen],['quizzes','Assignments',HelpCircle],['grades','Learning calendar & Grades',GraduationCap]]],
  ['Explore & tools', [['case-studies','Case library',Briefcase],['simulator','Startup simulator',Rocket],['bmc-builder','BMC Strategy Tool',LayoutGrid],['vpd-builder','VPD Proposisi Nilai',Layers],['knowledge-hub','Knowledge wiki',Search],['sources','Resources & Syllabus',Library]]],
];
export function Sidebar({ activeTab, setActiveTab, onOpenCertificate, menuOpen }) {
  return <aside id="academy-navigation" className={`neon-sidebar ${menuOpen ? 'is-open' : ''}`}>
    <span className="neon-eyebrow">Venture.exe / Neon Nights</span>
    {groups.map(([label,items]) => <nav aria-label={label} key={label}><h2>{label}</h2>{items.map(([id,text,Icon]) => <button key={id} aria-current={activeTab===id ? 'page' : undefined} onClick={() => setActiveTab(id)}><Icon size={17} aria-hidden="true"/><span>{text}</span></button>)}</nav>)}
    <div className="sidebar-footer"><strong>Danny Kosasih</strong><p>Faculty Lead · Dharma Korporasi</p><button className="neon-button" onClick={onOpenCertificate}><Award size={16} aria-hidden="true"/>DDK Credential</button></div>
  </aside>;
}

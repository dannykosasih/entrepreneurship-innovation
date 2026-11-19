import React, { useState } from 'react';
import { ArrowRight, BookOpen, Briefcase, Rocket, LayoutGrid, Layers, Sparkles, Award } from 'lucide-react';
import { getCourses } from '../data/coursesData';
import { useLanguage } from '../context/LanguageContext';

function WindowBar({ children }) {
  return <div className="neon-windowbar"><span><i aria-hidden="true"/>{children}</span><span aria-hidden="true">— □ ×</span></div>;
}
export function Dashboard({ completedModules = [], completedCases = [], simulatorScore, overallScore, setActiveTab, onSelectModule, onOpenCertificate }) {
  const { lang, isEn } = useLanguage();
  const courses = getCourses(lang);
  const [motionPaused, setMotionPaused] = useState(false);
  const next = courses.find(course => !completedModules.includes(course.id)) || courses[0];
  const progress = Math.min(100, Math.round(completedModules.length / courses.length * 100));
  const select = (id) => { onSelectModule?.(id); setActiveTab('courses'); };
  return <div className={`neon-dashboard ${motionPaused ? 'motion-paused' : ''}`}>
    <div className="neon-edition">
      <span>{isEn ? 'Entrepreneurship & Innovation' : 'Kewirausahaan & Inovasi'}</span>
      <button onClick={() => setMotionPaused(v => !v)} aria-pressed={motionPaused}>
        {motionPaused ? (isEn ? 'Resume effects' : 'Lanjutkan efek') : (isEn ? 'Pause effects' : 'Jeda efek')}
      </button>
    </div>
    <section className="neon-hero" aria-labelledby="venture-heading">
      <div>
        <span className="neon-eyebrow">
          {isEn ? 'Your next big idea starts here' : 'Ide besar Anda berikutnya dimulai di sini'}
          <span className="neon-cursor" aria-hidden="true"> ▌</span>
        </span>
        <h1 id="venture-heading">
          {isEn
            ? <>From idea to<br/><span>sustainable</span><br/>business.</>
            : <>Dari ide menuju<br/><span>bisnis yang</span><br/>berkelanjutan.</>}
        </h1>
        <p>{isEn ? 'Your next big idea starts with what you learn today.' : 'Ide besar Anda berikutnya dimulai dari apa yang Anda pelajari hari ini.'}</p>
        <div className="neon-actions">
          <button className="neon-button" onClick={() => select(next.id)}>
            {isEn ? 'Continue learning' : 'Lanjutkan belajar'}<ArrowRight size={18} aria-hidden="true"/>
          </button>
          <button className="neon-button secondary" onClick={() => setActiveTab('courses')}>
            {isEn ? 'Explore courses' : 'Jelajahi materi'}<ArrowRight size={18} aria-hidden="true"/>
          </button>
        </div>
        <div className="neon-pixels" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
      </div>
      <div className="neon-visual">
        <div className="neon-decor" aria-hidden="true">
          <span className="neon-tube"/><span className="neon-tube magenta"/>
          {Array.from({length:5},(_,i)=><Sparkles key={i} className={`neon-star star-${i}`} size={i%2 ? 14 : 23}/>)}
        </div>
        <div className="neon-window photo-window">
          <WindowBar>venture_journey.exe</WindowBar>
          <div className="neon-photo">
            <img
              src="/neon/images/workshop.jpg"
              alt={isEn ? 'Illustrative collaboration around a table; not actual course participants' : 'Ilustrasi kolaborasi di meja kerja; bukan peserta kelas sebenarnya'}
              fetchPriority="high"
              width="1200"
              height="800"
            />
            <span className="scanline-overlay" aria-hidden="true"/>
          </div>
          <div className="neon-photo-caption">
            {isEn ? 'Learn → Build → Innovate' : 'Belajar → Bangun → Berinovasi'}
            <span>{isEn ? 'Illustrative photo' : 'Foto ilustrasi'}</span>
          </div>
        </div>
        <div className="neon-sticker">
          {isEn ? 'NOT JUST THEORY.' : 'BUKAN SEKADAR TEORI.'}
          <strong>{isEn ? 'Learn. Build. Innovate.' : 'Belajar. Bangun. Berinovasi.'}</strong>
        </div>
      </div>
    </section>
    <section className="neon-facts" aria-label={isEn ? 'Course features' : 'Fitur kursus'}>
      {[
        [BookOpen, isEn ? `${courses.length} chapters` : `${courses.length} bab`, isEn ? 'Chapters 00–14' : 'Bab 00–14'],
        [Briefcase, 'Kopi AJIB', isEn ? 'Retail innovation case' : 'Studi kasus inovasi ritel'],
        [Rocket, isEn ? 'Startup Simulator' : 'Simulator Startup', isEn ? '4-Quarter Decision Engine' : 'Mesin Keputusan 4 Kuartal'],
        [LayoutGrid, 'Business Model Canvas', isEn ? '9 building blocks' : '9 blok bangunan bisnis'],
      ].map(([Icon,title,text])=><div key={title}><Icon size={21} aria-hidden="true"/><strong>{title}</strong><small>{text}</small></div>)}
    </section>
    <section className="neon-progress" aria-label={isEn ? 'Your saved learning progress' : 'Progres belajar tersimpan Anda'}>
      <div>
        <span>{isEn ? 'Learning progress' : 'Progres belajar'}</span>
        <strong>{progress}%</strong>
        <progress max="100" value={progress} aria-label={isEn ? 'Learning progress' : 'Progres belajar'}/>
      </div>
      <div><span>{isEn ? 'Chapters completed' : 'Bab diselesaikan'}</span><strong>{completedModules.length} / {courses.length}</strong></div>
      <div><span>{isEn ? 'Current grade' : 'Nilai saat ini'}</span><strong>{overallScore} / 100</strong></div>
      <button className="neon-button" onClick={() => setActiveTab('grades')}>
        {isEn ? 'Learning calendar & Grades' : 'Kalender & Nilai'}<ArrowRight size={17} aria-hidden="true"/>
      </button>
      <small className="progress-note">{isEn ? 'Progress is saved on this browser.' : 'Progres tersimpan di browser ini.'}</small>
    </section>
    <div className="neon-ticker">
      {isEn
        ? <>Mindset <span>✳</span> Customer Discovery <span>✳</span> Design Thinking <span>✳</span> Business Model Canvas</>
        : <>Mindset <span>✳</span> Customer Discovery <span>✳</span> Design Thinking <span>✳</span> Business Model Canvas</>}
    </div>
    <section className="neon-directory" aria-labelledby="journey-heading">
      <div className="neon-sectionhead">
        <div>
          <span className="neon-eyebrow">{isEn ? 'Directory / My learning' : 'Direktori / Materi belajar'}</span>
          <h2 id="journey-heading">
            {isEn ? <>Your venture journey.<br/>Ready to explore?</> : <>Perjalanan ventura Anda.<br/>Siap menjelajah?</>}
          </h2>
        </div>
        <p>{courses[0].description}</p>
      </div>
      <div className="neon-course-grid">
        {[courses[0], courses[4], courses[5]].map(course=><article className="neon-window course-window" key={course.id}>
          <WindowBar>{isEn ? `chapter_${course.number}.ddk` : `bab_${course.number}.ddk`}</WindowBar>
          <div className="neon-course-body">
            <div className="chapter-number"><span>{course.number}</span><BookOpen size={22} aria-hidden="true"/></div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
          <button
            className="neon-course-link"
            onClick={()=>select(course.id)}
            aria-label={isEn ? `Open chapter ${course.number}: ${course.title}` : `Buka bab ${course.number}: ${course.title}`}
          >
            <span>{course.duration}</span><ArrowRight size={18} aria-hidden="true"/>
          </button>
        </article>)}
      </div>
      <button className="neon-text-link" onClick={()=>setActiveTab('courses')}>
        {isEn ? `View all ${courses.length} chapters` : `Lihat semua ${courses.length} bab`} <ArrowRight size={17} aria-hidden="true"/>
      </button>
    </section>
    <aside className="neon-mentor">
      <div>
        <span className="neon-eyebrow">{isEn ? 'Your mentor’s note' : 'Catatan mentor Anda'}</span>
        <strong>Danny Kosasih</strong>
        <small>{isEn ? 'Faculty Lead · Dharma Korporasi' : 'Ketua Pengajar · Dharma Korporasi'}</small>
      </div>
      <p>
        {isEn
          ? '“Think like an entrepreneur: validate the problem before building the solution. This week, talk to three potential customers and listen for what they actually need.”'
          : '“Berpikirlah seperti seorang wirausaha: validasi masalahnya sebelum membangun solusinya. Minggu ini, berbincanglah dengan tiga calon pelanggan dan dengarkan apa yang benar-benar mereka butuhkan.”'}
      </p>
    </aside>
    <section className="neon-case neon-window">
      <WindowBar>case_library / kopi_ajib</WindowBar>
      <div className="neon-case-grid">
        <img
          src="/neon/images/coffee.jpg"
          alt={isEn ? 'Illustrative coffee preparation; not a Kopi AJIB location' : 'Ilustrasi penyajian kopi; bukan lokasi gerai Kopi AJIB'}
          loading="lazy"
          width="1000"
          height="750"
        />
        <div>
          <span className="neon-eyebrow">{isEn ? 'Practical case · Retail innovation' : 'Studi kasus praktis · Inovasi ritel'}</span>
          <h2>
            {isEn ? <>Retail Innovation:<br/><span>Kopi AJIB</span></> : <>Inovasi Ritel:<br/><span>Kopi AJIB</span></>}
          </h2>
          <p>{isEn ? 'Apply your strategy to a real business.' : 'Terapkan strategi Anda pada studi bisnis nyata.'}</p>
          <small>{isEn ? '4 strategic activities · About 45 min' : '4 aktivitas strategis · Sekitar 45 menit'}</small>
          {completedCases.includes('case-kopi-ajib') && (
            <span className="saved-state">{isEn ? 'Completed on this browser' : 'Tuntas tersimpan di browser ini'}</span>
          )}
          <button className="neon-button" onClick={()=>setActiveTab('case-studies')}>
            {isEn ? 'Explore case' : 'Pelajari studi kasus'}<ArrowRight size={18} aria-hidden="true"/>
          </button>
          <small className="image-disclaimer">
            {isEn ? 'Illustrative photography · Not a Kopi AJIB location' : 'Foto ilustrasi · Bukan lokasi gerai Kopi AJIB'}
          </small>
        </div>
      </div>
    </section>
    <section className="neon-tools">
      <span className="neon-eyebrow">{isEn ? 'Explore & tools / Quick accelerators' : 'Eksplorasi & alat / Akselerator cepat'}</span>
      <h2>{isEn ? 'Put your ideas to work_' : 'Wujudkan ide Anda sekarang_'}</h2>
      <div className="neon-tool-grid">
        {[
          [Rocket, isEn ? 'Startup Simulator' : 'Simulator Startup', isEn ? '4-Quarter Runway & Decision Engine' : 'Mesin Keputusan & Runway 4 Kuartal', 'simulator'],
          [LayoutGrid, isEn ? 'BMC Strategy Tool' : 'Alat Strategi BMC', isEn ? 'Osterwalder 9-Building Block Architect' : 'Arsitek 9 Blok Model Bisnis Osterwalder', 'bmc-builder'],
          [Layers, isEn ? 'Value Proposition Design' : 'VPD Proposisi Nilai', isEn ? 'Match your Value Map with Jobs To Be Done' : 'Cocokkan Peta Nilai dengan Jobs To Be Done', 'vpd-builder'],
        ].map(([Icon,title,text,tab])=><article className="neon-tool" key={tab}>
          <Icon size={28} aria-hidden="true"/>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
            {tab==='simulator' && simulatorScore !== undefined && (
              <small>{isEn ? `Saved score: ${simulatorScore}%` : `Skor tersimpan: ${simulatorScore}%`}</small>
            )}
            <button className="neon-text-link" onClick={()=>setActiveTab(tab)}>
              {isEn ? 'Launch tool' : 'Buka alat'}<ArrowRight size={17} aria-hidden="true"/>
            </button>
          </div>
        </article>)}
      </div>
    </section>
    <section className="neon-resources">
      <button className="neon-button" onClick={()=>setActiveTab('knowledge-hub')}>
        {isEn ? 'Knowledge wiki' : 'Wiki pengetahuan'}<BookOpen size={17} aria-hidden="true"/>
      </button>
      <button className="neon-button" onClick={()=>setActiveTab('sources')}>
        {isEn ? 'Resources & Syllabus' : 'Referensi & Silabus'}<ArrowRight size={17} aria-hidden="true"/>
      </button>
      <button className="neon-button" onClick={onOpenCertificate}>
        {isEn ? 'DDK Credential' : 'Sertifikat DDK'}<Award size={17} aria-hidden="true"/>
      </button>
    </section>
    <footer className="neon-footer">
      <strong>DDK Academy / Dharma Korporasi</strong>
      <span>{isEn ? 'Entrepreneurship & Innovation · Learn. Build. Innovate.' : 'Kewirausahaan & Inovasi · Belajar. Bangun. Berinovasi.'}</span>
    </footer>
  </div>;
}

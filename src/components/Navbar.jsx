import React from 'react';
import { Award, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Navbar({ setActiveTab, userPersona, setUserPersona, onOpenCertificate, menuOpen, onToggleMenu }) {
  const { lang, isEn, setLang } = useLanguage();
  return <header className="neon-nav">
    <button className="brand-button" onClick={() => setActiveTab('dashboard')} aria-label={isEn ? 'DDK Academy home' : 'Beranda DDK Academy'}>
      <span className="ddk-badge">DDK</span>
      <span>DDK Academy<small>{isEn ? 'Learn. Build. Innovate.' : 'Belajar. Bangun. Berinovasi.'}</small></span>
    </button>
    <label className="persona-label">{isEn ? 'Learning lens' : 'Lensa belajar'}
        <select value={userPersona} onChange={e => setUserPersona(e.target.value)}>
          <option value="student">{isEn ? 'University Student (S1/S2)' : 'Mahasiswa (S1/S2)'}</option>
          <option value="professional">{isEn ? 'Professional & Intrapreneur' : 'Profesional & Intrapreneur'}</option>
          <option value="sme">{isEn ? 'Business Owner & SME' : 'Pemilik Bisnis & UMKM'}</option>
          <option value="founder">{isEn ? 'Startup & Tech Founder' : 'Pendiri Startup & Teknologi'}</option>
        </select>
    </label>
    <div className="neon-nav-actions">
      <div className="lang-toggle" role="group" aria-label={isEn ? 'Language switch' : 'Pilih bahasa'}>
        <button type="button" className={lang === 'id' ? 'is-active' : ''} aria-pressed={lang === 'id'} onClick={() => setLang('id')}>ID</button>
        <button type="button" className={lang === 'en' ? 'is-active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      </div>
      <button className="neon-button credential-button" onClick={onOpenCertificate}><Award size={17} aria-hidden="true"/>{isEn ? 'DDK Credential' : 'Sertifikat DDK'}</button>
      <button className="menu-toggle" aria-label={menuOpen ? (isEn ? 'Close navigation' : 'Tutup navigasi') : (isEn ? 'Open navigation' : 'Buka navigasi')} aria-expanded={menuOpen} aria-controls="academy-navigation" onClick={onToggleMenu}>{menuOpen ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}


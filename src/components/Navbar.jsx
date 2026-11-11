import React from 'react';
import { Award, Menu, X } from 'lucide-react';

export function Navbar({ setActiveTab, userPersona, setUserPersona, onOpenCertificate, menuOpen, onToggleMenu }) {
  return <header className="neon-nav">
    <button className="brand-button" onClick={() => setActiveTab('dashboard')} aria-label="DDK Academy home">
      <span className="ddk-badge">DDK</span><span>DDK Academy<small>Learn. Build. Innovate.</small></span>
    </button>
    <label className="persona-label">Learning lens
        <select value={userPersona} onChange={e => setUserPersona(e.target.value)}>
          <option value="student">University Student (S1/S2)</option>
          <option value="professional">Professional & Intrapreneur</option>
          <option value="sme">Business Owner & SME</option>
          <option value="founder">Startup & Tech Founder</option>
        </select>
    </label>
    <div className="neon-nav-actions">
      <button className="neon-button credential-button" onClick={onOpenCertificate}><Award size={17} aria-hidden="true"/>DDK Credential</button>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="academy-navigation" onClick={onToggleMenu}>{menuOpen ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}

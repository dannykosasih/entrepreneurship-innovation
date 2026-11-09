import React from 'react';
import { 
  Award, 
  HelpCircle, 
  Bell, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  userPersona, 
  setUserPersona, 
  progress, 
  overallScore, 
  onOpenCertificate 
}) {
  const personas = [
    { id: 'student', label: 'University Student (S1/S2)', icon: '🎓' },
    { id: 'professional', label: 'Professional & Intrapreneur', icon: '💼' },
    { id: 'sme', label: 'Business Owner & SME', icon: '🏪' },
    { id: 'founder', label: 'Startup & Tech Founder', icon: '🚀' }
  ];

  return (
    <header style={{
      height: '70px',
      background: '#FFFFFF',
      borderBottom: '1px solid var(--line)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(7, 63, 120, 0.03)'
    }}>
      {/* Left: Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--muted)',
            fontSize: '13px',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--font-heading)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--blue)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
        >
          Courses
        </button>
        <span style={{ color: '#CBD5E1' }}>/</span>
        <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Entrepreneurship & Innovation
        </strong>
        <span style={{
          marginLeft: '8px',
          fontSize: '10px',
          fontWeight: 700,
          background: 'var(--sky)',
          color: 'var(--blue)',
          padding: '2px 8px',
          borderRadius: '99px',
          fontFamily: 'var(--font-heading)'
        }}>
          Dharma Korporasi
        </span>
      </div>

      {/* Right: Actions, Lens, Notification & User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Persona Lens Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
            Lens:
          </span>
          <select 
            value={userPersona}
            onChange={(e) => setUserPersona(e.target.value)}
            style={{
              background: '#F5F8FC',
              color: 'var(--navy)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              outline: 'none'
            }}
          >
            {personas.map(p => (
              <option key={p.id} value={p.id}>
                {p.icon} {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* DDK Credential Button */}
        <button 
          onClick={onOpenCertificate}
          style={{
            border: '1px solid #F0AE15',
            background: 'var(--gold)',
            color: 'var(--navy)',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 6px rgba(255, 201, 40, 0.25)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          <Award size={14} /> DDK Credential
        </button>

        {/* Help Center */}
        <button
          onClick={() => setActiveTab('sources')}
          style={{
            background: 'none',
            border: 'none',
            color: '#53677C',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 6px',
            fontFamily: 'var(--font-heading)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--blue)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#53677C'; }}
        >
          Help center
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setActiveTab('grades')}
          title="Notifications & Grade telemetry"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '6px',
            display: 'grid',
            placeItems: 'center',
            color: '#53677C'
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--gold)',
            border: '1.5px solid #FFFFFF'
          }} />
        </button>

        {/* User Avatar */}
        <div 
          title="Danny Kosasih (Faculty Lead, Dharma Korporasi)"
          style={{
            height: '36px',
            width: '36px',
            borderRadius: '50%',
            background: '#D9EAFA',
            color: 'var(--navy)',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: '12.5px',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 2px 5px rgba(7, 63, 120, 0.1)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          DK
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { 
  LayoutDashboard,
  BookOpen, 
  HelpCircle, 
  Briefcase, 
  Rocket, 
  LayoutGrid, 
  Search, 
  Library, 
  GraduationCap, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, onOpenCertificate }) {
  const learningSpaceItems = [
    { id: 'dashboard', label: 'My dashboard', icon: LayoutDashboard, badge: 'Home' },
    { id: 'courses', label: 'My learning', icon: BookOpen, badge: '15 CH' },
    { id: 'quizzes', label: 'Assignments', icon: HelpCircle, badge: 'Tests' },
    { id: 'grades', label: 'Learning calendar & Grades', icon: GraduationCap, badge: 'Record' },
  ];

  const exploreItems = [
    { id: 'case-studies', label: 'Case library', icon: Briefcase, badge: 'Kopi AJIB' },
    { id: 'simulator', label: 'Startup simulator', icon: Rocket, badge: '4Q' },
    { id: 'bmc-builder', label: 'BMC Strategy Tool', icon: LayoutGrid, badge: '9 Blocks' },
    { id: 'knowledge-hub', label: 'Knowledge wiki', icon: Search, badge: 'Wiki' },
    { id: 'sources', label: 'Resources & Syllabus', icon: Library, badge: 'Syllabus' },
  ];

  const renderNavButton = (item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '10px 12px',
          borderRadius: '10px',
          border: 'none',
          background: isActive ? 'var(--navy)' : 'transparent',
          color: isActive ? '#FFFFFF' : '#53677C',
          fontWeight: isActive ? 700 : 600,
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          textAlign: 'left',
          fontFamily: 'var(--font-heading)',
          boxShadow: isActive ? '0 6px 16px rgba(7, 63, 120, 0.22)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = '#F0F4F9';
            e.currentTarget.style.color = 'var(--navy)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#53677C';
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <Icon 
            size={17} 
            color={isActive ? 'var(--gold)' : '#718096'} 
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <span style={{
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '5px',
            background: isActive ? 'rgba(255, 201, 40, 0.25)' : '#E9F0F8',
            color: isActive ? 'var(--gold)' : '#64748B',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)'
          }}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside style={{
      width: '248px',
      flexShrink: 0,
      background: '#FFFFFF',
      borderRight: '1px solid var(--line)',
      padding: '22px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minHeight: 'calc(100vh - 74px)'
    }}>
      {/* Brand Header */}
      <div 
        onClick={() => setActiveTab('dashboard')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '11px',
          padding: '0 6px',
          cursor: 'pointer'
        }}
      >
        <div style={{
          height: '40px',
          width: '40px',
          borderRadius: '12px',
          background: 'var(--navy)',
          border: '2px solid var(--gold)',
          color: 'var(--gold)',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '15px',
          flexShrink: 0,
          boxShadow: '0 4px 10px rgba(7, 63, 120, 0.2)'
        }}>
          DDK
        </div>
        <div>
          <strong style={{
            display: 'block',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '17px',
            color: 'var(--navy)',
            lineHeight: 1.15
          }}>
            DDK Academy
          </strong>
          <small style={{
            display: 'block',
            color: 'var(--muted)',
            fontSize: '11px',
            marginTop: '2px'
          }}>
            Learn. Build. Innovate.
          </small>
        </div>
      </div>

      {/* Section 1: LEARNING SPACE */}
      <div>
        <div style={{
          padding: '0 10px 8px',
          color: '#94A3B8',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '1.15px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-heading)'
        }}>
          LEARNING SPACE
        </div>
        <nav style={{ display: 'grid', gap: '4px' }}>
          {learningSpaceItems.map(renderNavButton)}
        </nav>
      </div>

      {/* Section 2: EXPLORE */}
      <div>
        <div style={{
          padding: '0 10px 8px',
          color: '#94A3B8',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '1.15px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-heading)'
        }}>
          EXPLORE & TOOLS
        </div>
        <nav style={{ display: 'grid', gap: '4px' }}>
          {exploreItems.map(renderNavButton)}
        </nav>
      </div>

      {/* Side Bottom: Keep your momentum */}
      <div style={{
        marginTop: 'auto',
        border: '1px solid var(--line)',
        borderRadius: '14px',
        padding: '14px',
        background: '#F9FBFD',
        boxShadow: '0 2px 6px rgba(7, 63, 120, 0.03)'
      }}>
        <b style={{
          display: 'block',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '13px',
          color: 'var(--navy)',
          marginBottom: '4px'
        }}>
          Keep your momentum
        </b>
        <p style={{
          fontSize: '11px',
          color: 'var(--muted)',
          lineHeight: 1.45,
          margin: '0 0 10px'
        }}>
          Small steps today bring your idea closer to reality.
        </p>
        <button
          onClick={() => {
            if (onOpenCertificate) onOpenCertificate();
            else setActiveTab('grades');
          }}
          style={{
            border: 'none',
            background: 'var(--gold)',
            borderRadius: '8px',
            padding: '9px 12px',
            color: 'var(--navy)',
            fontWeight: 800,
            fontSize: '11.5px',
            width: '100%',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(255, 201, 40, 0.3)',
            transition: 'all 0.15s ease',
            fontFamily: 'var(--font-heading)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#F0BE18'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)'; }}
        >
          View learning plan &nbsp;→
        </button>
      </div>
    </aside>
  );
}

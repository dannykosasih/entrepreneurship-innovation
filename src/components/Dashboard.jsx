import React from 'react';
import { COURSES } from '../data/coursesData';
import { 
  Rocket, 
  LayoutGrid, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Flame, 
  Compass, 
  Clock, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function Dashboard({ 
  completedModules = [], 
  quizScores = {}, 
  completedCases = [], 
  simulatorScore = 85, 
  overallScore = 86, 
  setActiveTab, 
  onSelectModule,
  onOpenCertificate,
  userPersona = 'student'
}) {
  const totalModules = COURSES.length || 15;
  const completedCount = completedModules.length;
  const progressPct = Math.min(100, Math.round((completedCount / totalModules) * 100));

  // Determine next uncompleted chapter
  const nextCourse = COURSES.find(c => !completedModules.includes(c.id)) || COURSES[0];

  const getPersonaGreeting = () => {
    switch (userPersona) {
      case 'student': return 'Good morning, Danny 👋';
      case 'professional': return 'Good morning, Intrapreneur Danny 👋';
      case 'sme': return 'Good morning, Business Leader Danny 👋';
      case 'founder': return 'Good morning, Founder Danny 👋';
      default: return 'Good morning, Danny 👋';
    }
  };

  const getGradeRating = (score) => {
    if (score >= 85) return { grade: 'Grade A', text: 'Great work!', color: 'var(--green)' };
    if (score >= 75) return { grade: 'Grade B+', text: 'On track', color: 'var(--blue)' };
    return { grade: 'In Progress', text: 'Keep going!', color: 'var(--muted)' };
  };

  const gradeInfo = getGradeRating(overallScore);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{
            color: 'var(--blue)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1.3px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px'
          }}>
            <Calendar size={13} /> Monday, 9 November 2026
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '28px',
            color: 'var(--navy)',
            margin: '4px 0 6px',
            letterSpacing: '-0.7px'
          }}>
            {getPersonaGreeting()}
          </h1>
          <p style={{ color: 'var(--muted)', margin: 0, fontSize: '14px' }}>
            Your next big idea starts with what you learn today.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('courses')}
            style={{
              border: '1px solid var(--line)',
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '10px 16px',
              color: 'var(--navy)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 5px rgba(7, 63, 120, 0.04)',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-heading)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; }}
          >
            <span>＋</span> Explore courses
          </button>

          <button 
            onClick={onOpenCertificate}
            style={{
              border: 'none',
              background: 'var(--navy)',
              borderRadius: '10px',
              padding: '10px 16px',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(7, 63, 120, 0.2)',
              fontFamily: 'var(--font-heading)'
            }}
          >
            <Award size={15} color="var(--gold)" /> DDK Credential
          </button>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        {/* Stat 1: Learning Progress */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--line)',
          borderRadius: '14px',
          padding: '17px 18px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--muted)',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <span>Learning progress</span>
            <span style={{ fontSize: '16px', color: 'var(--blue)' }}>◉</span>
          </div>
          <strong style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '26px',
            color: 'var(--navy)',
            margin: '10px 0 3px'
          }}>
            {progressPct}%
          </strong>
          <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>↑ 8%</span> from last week
          </small>
        </div>

        {/* Stat 2: Chapters Completed */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--line)',
          borderRadius: '14px',
          padding: '17px 18px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--muted)',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <span>Chapters completed</span>
            <span style={{ fontSize: '16px', color: 'var(--blue)' }}>▣</span>
          </div>
          <strong style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '26px',
            color: 'var(--navy)',
            margin: '10px 0 3px'
          }}>
            {completedCount} <small style={{ fontSize: '14px', color: '#8A98A8', fontWeight: 600 }}>/ {totalModules}</small>
          </strong>
          <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Keep your weekly streak going
          </small>
        </div>

        {/* Stat 3: Current Grade */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--line)',
          borderRadius: '14px',
          padding: '17px 18px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--muted)',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <span>Current grade</span>
            <span style={{ fontSize: '16px', color: 'var(--gold)' }}>✦</span>
          </div>
          <strong style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '26px',
            color: 'var(--navy)',
            margin: '10px 0 3px'
          }}>
            {overallScore} <small style={{ fontSize: '14px', color: '#8A98A8', fontWeight: 600 }}>/ 100</small>
          </strong>
          <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: gradeInfo.color, fontWeight: 700 }}>{gradeInfo.grade}</span> · {gradeInfo.text}
          </small>
        </div>

        {/* Stat 4: Learning Streak */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--line)',
          borderRadius: '14px',
          padding: '17px 18px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--muted)',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <span>Learning streak</span>
            <span style={{ fontSize: '16px', color: '#E06A3B' }}>♨</span>
          </div>
          <strong style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '26px',
            color: 'var(--navy)',
            margin: '10px 0 3px'
          }}>
            4 days
          </strong>
          <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Your personal best is 9 days
          </small>
        </div>
      </section>

      {/* Main 2-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.7fr) minmax(285px, 0.88fr)',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left Column (Main Section) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Card: Pick up where you left off */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow)',
            padding: '22px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '17px',
                color: 'var(--navy)',
                margin: 0
              }}>
                Pick up where you left off
              </h2>
              <button
                onClick={() => setActiveTab('courses')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--blue)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                View all courses &nbsp;→
              </button>
            </div>

            {/* Course Item 1: Entrepreneurship & Innovation */}
            <article style={{
              border: '1px solid var(--line)',
              borderRadius: '13px',
              overflow: 'hidden',
              marginBottom: '14px',
              boxShadow: '0 2px 8px rgba(7, 63, 120, 0.04)'
            }}>
              <div style={{
                height: '104px',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(115deg, #073F78, #1674BD)'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '17px',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.18)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  borderRadius: '99px',
                  padding: '4px 10px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  CORE COURSE · {completedCount} OF {totalModules} CHAPTERS
                </span>
                <span className="orb" />
                <h3 style={{
                  position: 'relative',
                  color: 'white',
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '18px',
                  letterSpacing: '-0.3px'
                }}>
                  Entrepreneurship & Innovation
                </h3>
              </div>

              <div style={{
                padding: '15px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                background: '#FFFFFF'
              }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <b style={{ display: 'block', color: 'var(--ink)', fontSize: '13px', marginBottom: '3px', fontFamily: 'var(--font-heading)' }}>
                    From idea to sustainable business
                  </b>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>
                    Next up: <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{nextCourse.title}</span>
                  </p>
                  <div style={{
                    height: '6px',
                    background: '#E9EFF5',
                    borderRadius: '99px',
                    marginTop: '10px',
                    maxWidth: '280px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progressPct}%`,
                      background: 'var(--gold)',
                      borderRadius: '99px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onSelectModule) onSelectModule(nextCourse.id);
                    setActiveTab('courses');
                  }}
                  style={{
                    background: 'var(--navy)',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: '9px',
                    padding: '10px 16px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(7, 63, 120, 0.2)',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-heading)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--blue)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy)'; }}
                >
                  Continue learning &nbsp;→
                </button>
              </div>
            </article>

            {/* Course Item 2: Retail Innovation: Kopi AJIB */}
            <article style={{
              border: '1px solid var(--line)',
              borderRadius: '13px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(7, 63, 120, 0.04)'
            }}>
              <div style={{
                height: '104px',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(115deg, #AF6A00, #F0AE15)'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '17px',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '99px',
                  padding: '4px 10px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  PRACTICAL CASE · {completedCases.includes('case-kopi-ajib') ? 'COMPLETED' : 'NEW'}
                </span>
                <span className="orb" />
                <h3 style={{
                  position: 'relative',
                  color: 'white',
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '18px',
                  letterSpacing: '-0.3px'
                }}>
                  Retail Innovation: Kopi AJIB
                </h3>
              </div>

              <div style={{
                padding: '15px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                background: '#FFFFFF'
              }}>
                <div>
                  <b style={{ display: 'block', color: 'var(--ink)', fontSize: '13px', marginBottom: '3px', fontFamily: 'var(--font-heading)' }}>
                    Apply your strategy to a real business
                  </b>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>
                    Case study · 4 strategic activities · About 45 min
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('case-studies')}
                  style={{
                    background: 'var(--navy)',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: '9px',
                    padding: '10px 16px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(7, 63, 120, 0.2)',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-heading)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--blue)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy)'; }}
                >
                  Explore case &nbsp;→
                </button>
              </div>
            </article>
          </section>

          {/* Quick Accelerators Row: Simulator & BMC Strategy Tool */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px'
          }}>
            {/* Startup Simulator Box */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--sky)',
                  color: 'var(--blue)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <Rocket size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>
                    Startup Simulator
                  </h4>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    4-Quarter Runway & Decision Engine
                  </small>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--green)',
                  background: '#E5F5EF',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  Score: {simulatorScore}%
                </span>
                <button
                  onClick={() => setActiveTab('simulator')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--blue)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Launch tool &nbsp;→
                </button>
              </div>
            </div>

            {/* BMC Strategy Tool Box */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 201, 40, 0.2)',
                  color: '#926C05',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>
                    BMC Strategy Tool
                  </h4>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    Osterwalder 9-Building Block Architect
                  </small>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#926C05',
                  background: 'var(--ddk-gold-subtle)',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  Strategyzer Grid
                </span>
                <button
                  onClick={() => setActiveTab('bmc-builder')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--blue)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Open canvas &nbsp;→
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Focus: Mentor's Note */}
          <div className="focus-box" style={{ boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
              <div className="focus-bulb">
                ✦
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', margin: 0, color: 'var(--navy)' }}>
                  Your mentor's note
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: '10px', fontWeight: 600 }}>
                  Danny Kosasih • Dharma Korporasi
                </small>
              </div>
            </div>
            <p style={{
              fontSize: '12.5px',
              lineHeight: 1.6,
              color: '#475569',
              margin: '8px 0 0'
            }}>
              <b style={{ color: 'var(--navy)' }}>Think like an entrepreneur:</b> validate the problem before building the solution. This week, talk to three potential customers and listen for what they actually need.
            </p>
          </div>

          {/* Your Learning Path */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow)',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '15px',
                color: 'var(--navy)',
                margin: 0
              }}>
                Your learning path
              </h2>
              <button
                onClick={() => setActiveTab('courses')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--blue)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                All 15 &nbsp;→
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Path 1: Opportunity & Mindset */}
              <div 
                onClick={() => {
                  if (onSelectModule) onSelectModule('mod-0');
                  setActiveTab('courses');
                }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer'
                }}
              >
                <div className="num-pill done">✓</div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', margin: '1px 0 2px', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Opportunity & Mindset
                  </b>
                  <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Chapters 00–03 (Intro & Mindset)
                  </small>
                </div>
                <span className="status-badge-done">Done</span>
              </div>

              {/* Path 2: Design Thinking */}
              <div 
                onClick={() => {
                  if (onSelectModule) onSelectModule('mod-4');
                  setActiveTab('courses');
                }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer'
                }}
              >
                <div className="num-pill">04</div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', margin: '1px 0 2px', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Customer Discovery
                  </b>
                  <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Recognizing Opportunity
                  </small>
                </div>
                <span className="status-badge-next">Next</span>
              </div>

              {/* Path 3: Creative Pursuit of Ideas */}
              <div 
                onClick={() => {
                  if (onSelectModule) onSelectModule('mod-5');
                  setActiveTab('courses');
                }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer'
                }}
              >
                <div className="num-pill">05</div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', margin: '1px 0 2px', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Design Thinking
                  </b>
                  <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Creative pursuit of ideas
                  </small>
                </div>
                <span className="status-badge-upnext">Up next</span>
              </div>

              {/* Path 4: Bootstrapping */}
              <div 
                onClick={() => {
                  if (onSelectModule) onSelectModule('mod-6');
                  setActiveTab('courses');
                }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  cursor: 'pointer'
                }}
              >
                <div className="num-pill">06</div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', margin: '1px 0 2px', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Resources & Bootstrapping
                  </b>
                  <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    Find your first resources
                  </small>
                </div>
                <span className="status-badge-upnext">Upcoming</span>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow)',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '15px',
                color: 'var(--navy)',
                margin: 0
              }}>
                Recent activity
              </h2>
              <button
                onClick={() => setActiveTab('grades')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--blue)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                See all &nbsp;→
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: '#EEF5FB',
                  color: 'var(--blue)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: '13px'
                }}>
                  ✓
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Quiz: Customer Discovery
                  </b>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    Score 9/10 (90%)
                  </small>
                </div>
                <time style={{ color: '#98A5B4', fontSize: '10.5px' }}>Today</time>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: '#FFF9E4',
                  color: '#926C05',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: '13px'
                }}>
                  ▤
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Business Model Canvas
                  </b>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    9-Block Draft saved & exported
                  </small>
                </div>
                <time style={{ color: '#98A5B4', fontSize: '10.5px' }}>Yesterday</time>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: '#E5F5EF',
                  color: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: '13px'
                }}>
                  ✦
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px', display: 'block', color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
                    Startup Simulator Run
                  </b>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    Quarter 4 Runway closed (85%)
                  </small>
                </div>
                <time style={{ color: '#98A5B4', fontSize: '10.5px' }}>2d ago</time>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

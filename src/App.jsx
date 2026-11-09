import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LearningMaterial } from './components/LearningMaterial';
import { QuizSection } from './components/QuizSection';
import { CaseStudies } from './components/CaseStudies';
import { StartupSimulator } from './components/StartupSimulator';
import { BmcBuilder } from './components/BmcBuilder';
import { KnowledgeHub } from './components/KnowledgeHub';
import { SourcesReading } from './components/SourcesReading';
import { GradesDashboard } from './components/GradesDashboard';
import { CertificateModal } from './components/CertificateModal';
import { COURSES } from './data/coursesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState('mod-0');
  const [userPersona, setUserPersona] = useState('student');
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Persistent LMS State
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('innoventures_completed_modules');
      return saved ? JSON.parse(saved) : ['mod-0', 'mod-1'];
    } catch {
      return ['mod-0', 'mod-1'];
    }
  });

  const [quizScores, setQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem('innoventures_quiz_scores');
      return saved ? JSON.parse(saved) : { 'quiz-0': 100, 'quiz-1': 100 };
    } catch {
      return { 'quiz-0': 100, 'quiz-1': 100 };
    }
  });

  const [completedCases, setCompletedCases] = useState(() => {
    try {
      const saved = localStorage.getItem('innoventures_completed_cases');
      return saved ? JSON.parse(saved) : ['case-kopi-ajib'];
    } catch {
      return ['case-kopi-ajib'];
    }
  });

  const [simulatorScore, setSimulatorScore] = useState(() => {
    try {
      const saved = localStorage.getItem('innoventures_simulator_score');
      return saved ? JSON.parse(saved) : 85;
    } catch {
      return 85;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('innoventures_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('innoventures_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem('innoventures_completed_cases', JSON.stringify(completedCases));
  }, [completedCases]);

  useEffect(() => {
    if (simulatorScore !== undefined) {
      localStorage.setItem('innoventures_simulator_score', JSON.stringify(simulatorScore));
    }
  }, [simulatorScore]);

  // Handler functions
  const handleToggleCompleteModule = (modId) => {
    setCompletedModules(prev => 
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  const handleSaveQuizScore = (qId, score) => {
    setQuizScores(prev => ({
      ...prev,
      [qId]: score
    }));
  };

  const handleMarkCaseComplete = (caseId) => {
    setCompletedCases(prev => 
      prev.includes(caseId) ? prev : [...prev, caseId]
    );
  };

  const handleSaveSimulatorScore = (score) => {
    setSimulatorScore(score);
  };

  const handleJumpToQuiz = (courseId) => {
    const matchedQuizId = `quiz-${courseId.replace('mod-', '')}`;
    setActiveQuizId(matchedQuizId);
    setActiveTab('quizzes');
  };

  // Overall Score Calculation (20% Modules, 30% Quizzes, 25% Cases, 25% Simulation)
  const totalModules = COURSES.length || 15;
  const moduleProgressPct = Math.min(100, Math.round((completedModules.length / totalModules) * 100));
  const quizScoresArr = Object.values(quizScores);
  const avgQuizPct = quizScoresArr.length > 0
    ? Math.round(quizScoresArr.reduce((a, b) => a + b, 0) / quizScoresArr.length)
    : 0;
  const casePct = Math.round((completedCases.length / 2) * 100);
  const simPct = simulatorScore !== undefined ? simulatorScore : 0;
  const overallScore = Math.round(
    (moduleProgressPct * 0.20) + 
    (avgQuizPct * 0.30) + 
    (casePct * 0.25) + 
    (simPct * 0.25)
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userPersona={userPersona}
        setUserPersona={setUserPersona}
        progress={{ completedModulesCount: completedModules.length, totalModulesCount: totalModules }}
        overallScore={overallScore}
        onOpenCertificate={() => setIsCertModalOpen(true)}
      />

      <div style={{ display: 'flex', flex: 1, width: '100%', minHeight: 'calc(100vh - 70px)' }}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenCertificate={() => setIsCertModalOpen(true)}
        />

        <main style={{ flex: 1, padding: '24px 32px 48px', minWidth: 0, overflowY: 'auto' }}>
          {activeTab === 'dashboard' && (
            <Dashboard
              completedModules={completedModules}
              quizScores={quizScores}
              completedCases={completedCases}
              simulatorScore={simulatorScore}
              overallScore={overallScore}
              setActiveTab={setActiveTab}
              onSelectModule={(id) => {
                setSelectedCourseId(id);
                setActiveTab('courses');
              }}
              onOpenCertificate={() => setIsCertModalOpen(true)}
              userPersona={userPersona}
            />
          )}

          {activeTab === 'courses' && (
            <LearningMaterial
              completedModules={completedModules}
              onToggleCompleteModule={handleToggleCompleteModule}
              onJumpToQuiz={handleJumpToQuiz}
              userPersona={userPersona}
              selectedCourseId={selectedCourseId}
              onSelectCourse={setSelectedCourseId}
            />
          )}

          {activeTab === 'quizzes' && (
            <QuizSection
              quizScores={quizScores}
              onSaveQuizScore={handleSaveQuizScore}
              activeQuizId={activeQuizId}
              setActiveQuizId={setActiveQuizId}
            />
          )}

          {activeTab === 'case-studies' && (
            <CaseStudies
              completedCases={completedCases}
              onMarkCaseComplete={handleMarkCaseComplete}
            />
          )}

          {activeTab === 'simulator' && (
            <StartupSimulator
              onSaveSimulatorScore={handleSaveSimulatorScore}
              previousScore={simulatorScore}
            />
          )}

          {activeTab === 'bmc-builder' && (
            <BmcBuilder />
          )}

          {activeTab === 'knowledge-hub' && (
            <KnowledgeHub />
          )}

          {activeTab === 'sources' && (
            <SourcesReading />
          )}

          {activeTab === 'grades' && (
            <GradesDashboard
              completedModules={completedModules}
              quizScores={quizScores}
              completedCases={completedCases}
              simulatorScore={simulatorScore}
              onOpenCertificate={() => setIsCertModalOpen(true)}
            />
          )}
        </main>
      </div>

      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        overallScore={overallScore}
        userPersona={userPersona}
      />
    </div>
  );
}

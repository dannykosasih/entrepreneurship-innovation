import React, { useState } from 'react';
import { QUIZZES } from '../data/quizzesData';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Check, 
  Info, 
  Sparkles 
} from 'lucide-react';

export function QuizSection({ quizScores, onSaveQuizScore, activeQuizId, setActiveQuizId }) {
  const currentQuiz = QUIZZES.find(q => q.id === (activeQuizId || QUIZZES[0].id)) || QUIZZES[0];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / currentQuiz.questions.length) * 100);
    setSubmitted(true);
    onSaveQuizScore(currentQuiz.id, scorePct);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return {
      correct: correctCount,
      total: currentQuiz.questions.length,
      percentage: Math.round((correctCount / currentQuiz.questions.length) * 100)
    };
  };

  const results = submitted ? calculateScore() : null;

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Quiz List Sidebar */}
      <div style={{
        width: '300px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{ 
          fontSize: '0.8rem', 
          fontWeight: 800, 
          color: 'var(--ddk-primary-blue)', 
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.25rem',
          fontFamily: 'var(--font-heading)'
        }}>
          DDK Chapter Assessments
        </div>

        {QUIZZES.map((quiz) => {
          const isActive = quiz.id === currentQuiz.id;
          const score = quizScores[quiz.id];
          return (
            <div
              key={quiz.id}
              onClick={() => {
                setActiveQuizId(quiz.id);
                setSelectedAnswers({});
                setSubmitted(false);
              }}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'var(--ddk-white)' : 'var(--ddk-light-gray)',
                border: isActive ? '2px solid var(--ddk-primary-blue)' : '1px solid var(--border-subtle)',
                boxShadow: isActive ? '0 4px 12px rgba(12, 79, 142, 0.12)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ 
                  fontWeight: isActive ? 700 : 600, 
                  fontSize: '0.85rem', 
                  color: isActive ? 'var(--ddk-dark)' : 'var(--text-body)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {quiz.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {quiz.questions.length} Questions
                </div>
              </div>
              {score !== undefined && (
                <span className={`badge ${score >= 70 ? 'badge-gold' : 'badge-soft'}`}>
                  {score}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Quiz Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Quiz Header */}
        <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                DDK Testbank Assessment
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>
                {currentQuiz.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
                {currentQuiz.description}
              </p>
            </div>
            {submitted && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: results.percentage >= 70 ? 'var(--ddk-primary-blue)' : '#E11D48', fontFamily: 'var(--font-heading)' }}>
                  {results.percentage}%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {results.correct} of {results.total} questions verified
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        {currentQuiz.questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const isQuestionSubmitted = submitted;
          const isCorrect = selectedOption === q.correctAnswer;

          return (
            <div key={q.id} className="card" style={{ background: 'var(--ddk-white)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--ddk-dark)',
                  color: 'var(--ddk-gold)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: 'var(--font-heading)'
                }}>
                  {qIndex + 1}
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ddk-dark)', lineHeight: 1.4, fontFamily: 'var(--font-heading)' }}>
                  {q.question}
                </div>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  let optionBg = 'var(--ddk-light-gray)';
                  let optionBorder = 'var(--border-subtle)';
                  let optionColor = 'var(--text-body)';

                  if (isQuestionSubmitted) {
                    if (optIdx === q.correctAnswer) {
                      optionBg = 'rgba(15, 95, 168, 0.1)';
                      optionBorder = 'var(--ddk-primary-blue)';
                      optionColor = 'var(--ddk-dark)';
                    } else if (isThisSelected && !isCorrect) {
                      optionBg = 'rgba(225, 29, 72, 0.08)';
                      optionBorder = '#E11D48';
                      optionColor = '#BE123C';
                    }
                  } else if (isThisSelected) {
                    optionBg = 'var(--ddk-blue-subtle)';
                    optionBorder = 'var(--ddk-primary-blue)';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: optionBg,
                        border: `1.5px solid ${optionBorder}`,
                        cursor: isQuestionSubmitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        fontSize: '0.925rem',
                        color: optionColor,
                        fontWeight: isThisSelected ? 600 : 400,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isThisSelected ? '5px solid var(--ddk-primary-blue)' : '1.5px solid var(--ddk-mid-gray)',
                          background: 'white',
                          flexShrink: 0
                        }} />
                        <span>{option}</span>
                      </div>
                      {isQuestionSubmitted && optIdx === q.correctAnswer && (
                        <CheckCircle2 size={18} color="var(--ddk-primary-blue)" />
                      )}
                      {isQuestionSubmitted && isThisSelected && !isCorrect && (
                        <XCircle size={18} color="#E11D48" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Rationale explanation */}
              {isQuestionSubmitted && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCorrect ? 'var(--ddk-blue-subtle)' : 'var(--ddk-light-gray)',
                  borderLeft: `4px solid ${isCorrect ? 'var(--ddk-primary-blue)' : 'var(--ddk-gold)'}`,
                  fontSize: '0.875rem',
                  color: 'var(--text-body)'
                }}>
                  <div style={{ fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                    <Info size={15} color="var(--ddk-primary-blue)" /> Danny Kosasih's Analysis & Rationale:
                  </div>
                  <div>{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit or Reset */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingBottom: '2rem' }}>
          {submitted ? (
            <button onClick={handleResetQuiz} className="btn btn-outline">
              <RotateCcw size={16} /> Retake Assessment
            </button>
          ) : (
            <button 
              onClick={handleSubmitQuiz} 
              disabled={Object.keys(selectedAnswers).length < currentQuiz.questions.length}
              className="btn btn-gold"
              style={{
                fontSize: '0.95rem',
                padding: '0.8rem 1.75rem',
                opacity: Object.keys(selectedAnswers).length < currentQuiz.questions.length ? 0.6 : 1,
                cursor: Object.keys(selectedAnswers).length < currentQuiz.questions.length ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Answers ({Object.keys(selectedAnswers).length}/{currentQuiz.questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

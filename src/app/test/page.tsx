'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/context/ThemeContext';
import {
  questions, badges, getEarnedBadges, awardBadge, getScores, saveScore,
  type Question, type BadgeId, STREAK_KEY,
} from '@/lib/questions';
import { topics, categories } from '@/lib/topics';
import {
  Trophy, Zap, BookOpen, Calendar, CheckCircle, XCircle,
  ArrowRight, Star, RotateCcw, Home, ChevronRight, Target,
  Flame, Shield, Award,
} from 'lucide-react';

// ── TYPES ─────────────────────────────────────────────────────────────────────
type Phase = 'hub' | 'topic-select' | 'quiz' | 'feedback' | 'results';
type QuizMode = 'topic' | 'full' | 'daily';

interface AnswerRecord {
  question: Question;
  userAnswer: string;
  correct: boolean;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDailyQuestions(ageGroup: '8-13' | '13-18'): Question[] {
  const today = new Date().toISOString().slice(0, 10);
  const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
  const eligible = questions.filter(q => q.ageGroup === 'both' || q.ageGroup === ageGroup);
  const sorted = [...eligible].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * seed + a.id.charCodeAt(1) * 13) % 100;
    const hashB = (b.id.charCodeAt(0) * seed + b.id.charCodeAt(1) * 13) % 100;
    return hashA - hashB;
  });
  return sorted.slice(0, 5);
}

function getTopicQuestions(topicSlug: string, ageGroup: '8-13' | '13-18'): Question[] {
  const byTopic = questions.filter(q =>
    q.topicSlug === topicSlug && (q.ageGroup === 'both' || q.ageGroup === ageGroup)
  );
  const byCategory = shuffle(questions.filter(q =>
    !q.topicSlug &&
    (q.ageGroup === 'both' || q.ageGroup === ageGroup)
  )).slice(0, 2);
  return shuffle([...byTopic, ...byCategory]).slice(0, 8);
}

function getFullExamQuestions(ageGroup: '8-13' | '13-18'): Question[] {
  const eligible = questions.filter(q => q.ageGroup === 'both' || q.ageGroup === ageGroup);
  return shuffle(eligible).slice(0, 20);
}

function checkBadges(
  answers: AnswerRecord[],
  streak: number,
  mode: QuizMode,
  earned: BadgeId[]
): BadgeId[] {
  const newBadges: BadgeId[] = [];
  const award = (id: BadgeId) => {
    if (!earned.includes(id) && !newBadges.includes(id)) {
      awardBadge(id);
      newBadges.push(id);
    }
  };

  const correct = answers.filter(a => a.correct);
  const total = answers.length;

  if (correct.length > 0) award('first-answer');
  if (streak >= 5) award('ace-pilot');
  if (correct.some(a => a.question.difficulty === 'hard')) award('codebreaker');
  if (correct.length === total && total > 0) award('perfect-score');
  if (mode === 'full') award('historian');

  const battleAnswers = answers.filter(a => a.question.category === 'battles');
  if (battleAnswers.length > 0 && battleAnswers.every(a => a.correct)) award('battle-commander');

  const trenchAnswers = answers.filter(a =>
    a.question.category === 'homefront' || a.question.category === 'battles'
  );
  if (trenchAnswers.filter(a => a.correct).length >= 5) award('trench-expert');

  // Daily streak
  if (mode === 'daily') {
    try {
      const streakData = JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"last":""}');
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let count = streakData.last === yesterday ? streakData.count + 1 : 1;
      localStorage.setItem(STREAK_KEY, JSON.stringify({ count, last: today }));
      if (count >= 3) award('daily-streak');
    } catch {}
  }

  return newBadges;
}

// ── CATEGORY CONFIG ──────────────────────────────────────────────────────────
const catColors: Record<string, string> = {
  causes: '#c94c20', battles: '#8b2020', people: '#2d5f8a',
  technology: '#2d6b5f', homefront: '#7c5cbf', 'turning-points': '#c9a84c',
  aftermath: '#5c3d8f', general: '#4a7c59',
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function TestPage() {
  const { ageGroup } = useApp();

  const [phase, setPhase] = useState<Phase>('hub');
  const [quizMode, setQuizMode] = useState<QuizMode>('topic');
  const [selectedTopicSlug, setSelectedTopicSlug] = useState<string | null>(null);

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [newBadges, setNewBadges] = useState<BadgeId[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<BadgeId[]>([]);

  // Drag-match state: left item → selected right item
  const [dragLeft, setDragLeft] = useState<string | null>(null);
  const [dragPairs, setDragPairs] = useState<Record<string, string>>({});

  useEffect(() => {
    setEarnedBadges(getEarnedBadges());
  }, [phase]);

  const startQuiz = useCallback((mode: QuizMode, topicSlug?: string) => {
    let qs: Question[];
    if (mode === 'topic' && topicSlug) {
      qs = getTopicQuestions(topicSlug, ageGroup);
    } else if (mode === 'full') {
      qs = getFullExamQuestions(ageGroup);
    } else {
      qs = getDailyQuestions(ageGroup);
    }
    if (qs.length === 0) qs = shuffle(questions.filter(q => q.ageGroup === 'both')).slice(0, 5);
    setCurrentQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setNewBadges([]);
    setDragLeft(null);
    setDragPairs({});
    setQuizMode(mode);
    setPhase('quiz');
  }, [ageGroup]);

  const submitAnswer = useCallback((answer: string) => {
    const q = currentQuestions[currentIndex];
    const correct = answer.trim().toLowerCase() === q.answer.trim().toLowerCase();
    setSelectedAnswer(answer);
    setIsCorrect(correct);

    const newScore = correct ? score + q.points : score;
    const newStreak = correct ? streak + 1 : 0;
    const newMax = Math.max(maxStreak, newStreak);
    setScore(newScore);
    setStreak(newStreak);
    setMaxStreak(newMax);

    const newAnswers = [...answers, { question: q, userAnswer: answer, correct }];
    setAnswers(newAnswers);
    setPhase('feedback');
  }, [currentQuestions, currentIndex, score, streak, maxStreak, answers]);

  const submitDragMatch = useCallback(() => {
    const q = currentQuestions[currentIndex];
    const expectedPairs = q.pairs || [];
    const allCorrect = expectedPairs.every(p => dragPairs[p.left] === p.right);
    const answerStr = allCorrect ? q.answer : Object.entries(dragPairs).map(([l, r]) => `${l}:${r}`).join('|');
    submitAnswer(allCorrect ? q.answer : answerStr);
  }, [currentQuestions, currentIndex, dragPairs, submitAnswer]);

  const nextQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setDragLeft(null);
    setDragPairs({});
    if (currentIndex + 1 >= currentQuestions.length) {
      // End of quiz
      const quizId = quizMode === 'topic' ? `topic_${selectedTopicSlug}` :
        quizMode === 'full' ? 'full_exam' : `daily_${new Date().toISOString().slice(0, 10)}`;
      saveScore(quizId, score);
      const earned = getEarnedBadges();
      const nb = checkBadges(answers, maxStreak, quizMode, earned);
      setNewBadges(nb);
      setEarnedBadges(getEarnedBadges());
      setPhase('results');
    } else {
      setCurrentIndex(i => i + 1);
      setPhase('quiz');
    }
  }, [currentIndex, currentQuestions, quizMode, selectedTopicSlug, score, answers, maxStreak]);

  const resetToHub = () => {
    setPhase('hub');
    setSelectedTopicSlug(null);
    setEarnedBadges(getEarnedBadges());
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* HUB */}
      {phase === 'hub' && (
        <HubScreen
          ageGroup={ageGroup}
          earnedBadges={earnedBadges}
          onStartFull={() => startQuiz('full')}
          onStartDaily={() => startQuiz('daily')}
          onStartTopic={() => setPhase('topic-select')}
        />
      )}

      {/* TOPIC SELECT */}
      {phase === 'topic-select' && (
        <TopicSelectScreen
          ageGroup={ageGroup}
          onSelect={(slug) => { setSelectedTopicSlug(slug); startQuiz('topic', slug); }}
          onBack={() => setPhase('hub')}
        />
      )}

      {/* QUIZ */}
      {phase === 'quiz' && currentQuestions.length > 0 && (
        <QuizScreen
          question={currentQuestions[currentIndex]}
          index={currentIndex}
          total={currentQuestions.length}
          score={score}
          streak={streak}
          dragLeft={dragLeft}
          dragPairs={dragPairs}
          onDragLeftSelect={setDragLeft}
          onDragPair={(left, right) => {
            setDragPairs(prev => {
              const next = { ...prev };
              // Remove any existing mapping to this right item
              Object.keys(next).forEach(k => { if (next[k] === right) delete next[k]; });
              next[left] = right;
              return next;
            });
            setDragLeft(null);
          }}
          onAnswer={submitAnswer}
          onSubmitDrag={submitDragMatch}
        />
      )}

      {/* FEEDBACK */}
      {phase === 'feedback' && currentQuestions.length > 0 && (
        <FeedbackScreen
          question={currentQuestions[currentIndex]}
          userAnswer={selectedAnswer || ''}
          isCorrect={isCorrect!}
          isLast={currentIndex + 1 >= currentQuestions.length}
          onNext={nextQuestion}
        />
      )}

      {/* RESULTS */}
      {phase === 'results' && (
        <ResultsScreen
          answers={answers}
          score={score}
          maxStreak={maxStreak}
          newBadges={newBadges}
          earnedBadges={earnedBadges}
          onPlayAgain={() => {
            if (quizMode === 'topic' && selectedTopicSlug) startQuiz('topic', selectedTopicSlug);
            else startQuiz(quizMode);
          }}
          onHome={resetToHub}
        />
      )}
    </div>
  );
}

// ── HUB SCREEN ────────────────────────────────────────────────────────────────
function HubScreen({ ageGroup, earnedBadges, onStartFull, onStartDaily, onStartTopic }: {
  ageGroup: '8-13' | '13-18';
  earnedBadges: BadgeId[];
  onStartFull: () => void;
  onStartDaily: () => void;
  onStartTopic: () => void;
}) {
  const scores = typeof window !== 'undefined' ? getScores() : {};
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: '#7c5cbf' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#7c5cbf', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>Mode 2</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3" style={{ color: '#f4e8c4' }}>
            Test Your Knowledge
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--nav-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif', fontWeight: 300 }}>
            {ageGroup === '8-13'
              ? 'Answer questions about the Great War and earn badges!'
              : 'Challenge yourself with adaptive questions across all topics. Earn badges and track your progress.'}
          </p>
          {/* Stats row */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            <div>
              <div className="text-2xl font-bold font-display" style={{ color: '#f4e8c4' }}>{totalScore.toLocaleString()}</div>
              <div className="text-xs" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>Total Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display" style={{ color: '#f4e8c4' }}>{earnedBadges.length}</div>
              <div className="text-xs" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>Badges Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display" style={{ color: '#f4e8c4' }}>{questions.length}</div>
              <div className="text-xs" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>Questions Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Quiz type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {/* Topic Quiz */}
          <button onClick={onStartTopic}
            className="group text-left p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-xl"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#2d5f8a20' }}>
              <BookOpen size={22} style={{ color: '#2d5f8a' }} />
            </div>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Topic Quiz</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
              Choose a specific topic — battles, people, technology and more. Up to 8 questions tailored to that topic.
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#2d5f8a', fontFamily: 'Inter, sans-serif' }}>
              Choose topic <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Full Exam */}
          <button onClick={onStartFull}
            className="group text-left p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-xl"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#c9a84c20' }}>
              <Trophy size={22} style={{ color: '#c9a84c' }} />
            </div>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Full Exam</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
              20 questions covering all topics. Adaptive difficulty — harder as you improve. Earn the Historian badge.
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#c9a84c', fontFamily: 'Inter, sans-serif' }}>
              Start exam <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Daily Challenge */}
          <button onClick={onStartDaily}
            className="group text-left p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-xl"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#c94c2020' }}>
              <Calendar size={22} style={{ color: '#c94c20' }} />
            </div>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Daily Challenge</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
              5 fresh questions every day. Come back 3 days in a row to earn the Daily Challenger badge.
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#c94c20', fontFamily: 'Inter, sans-serif' }}>
              Today's challenge <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Badges */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Your Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map(badge => {
              const earned = earnedBadges.includes(badge.id);
              return (
                <div key={badge.id}
                  className="p-4 rounded-xl border text-center transition-all"
                  style={{
                    backgroundColor: earned ? `${badge.color}15` : 'var(--bg-secondary)',
                    borderColor: earned ? badge.color + '60' : 'var(--border)',
                    opacity: earned ? 1 : 0.5,
                  }}>
                  <div className="text-3xl mb-2">{badge.emoji}</div>
                  <div className="font-display font-bold text-sm mb-1" style={{ color: earned ? badge.color : 'var(--text-muted)' }}>
                    {badge.name}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                    {badge.description}
                  </div>
                  {earned && (
                    <div className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: badge.color + '25', color: badge.color, fontFamily: 'Inter, sans-serif' }}>
                      Earned ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TOPIC SELECT ──────────────────────────────────────────────────────────────
function TopicSelectScreen({ ageGroup, onSelect, onBack }: {
  ageGroup: '8-13' | '13-18';
  onSelect: (slug: string) => void;
  onBack: () => void;
}) {
  const catOrder = ['causes', 'battles', 'people', 'technology', 'homefront', 'turning-points', 'aftermath'];
  const topicsByCat = catOrder.map(cat => ({
    cat,
    items: topics.filter(t => t.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div>
      <div style={{ background: 'linear-gradient(150deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs mb-6 hover:opacity-80"
            style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>
            ← Back
          </button>
          <h1 className="font-display text-3xl font-black" style={{ color: '#f4e8c4' }}>Choose a Topic</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>
            Select a topic to quiz yourself on. Questions will focus on that topic.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {topicsByCat.map(({ cat, items }) => (
          <div key={cat} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">{categories[cat as keyof typeof categories]?.icon}</span>
              <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {categories[cat as keyof typeof categories]?.label}
              </h3>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(topic => (
                <button key={topic.slug} onClick={() => onSelect(topic.slug)}
                  className="group flex items-center gap-3 p-4 rounded-xl border text-left transition-all hover:shadow-md hover:scale-[1.01]"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <span className="text-2xl shrink-0">{topic.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {topic.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                      {topic.readingTime} min read
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)' }}
                    className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QUIZ SCREEN ───────────────────────────────────────────────────────────────
function QuizScreen({ question, index, total, score, streak, dragLeft, dragPairs, onDragLeftSelect, onDragPair, onAnswer, onSubmitDrag }: {
  question: Question;
  index: number;
  total: number;
  score: number;
  streak: number;
  dragLeft: string | null;
  dragPairs: Record<string, string>;
  onDragLeftSelect: (left: string) => void;
  onDragPair: (left: string, right: string) => void;
  onAnswer: (ans: string) => void;
  onSubmitDrag: () => void;
}) {
  const catColor = catColors[question.category] || '#c9a84c';
  const pct = Math.round(((index) / total) * 100);
  const difficultyColor = question.difficulty === 'easy' ? '#4a7c59' : question.difficulty === 'medium' ? '#c9a84c' : '#c94c20';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: catColor }} />
            </div>
          </div>
          <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            {index + 1} / {total}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold shrink-0" style={{ color: '#c9a84c', fontFamily: 'Inter, sans-serif' }}>
            <Zap size={12} /> {score}
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 text-xs font-bold shrink-0" style={{ color: '#c94c20', fontFamily: 'Inter, sans-serif' }}>
              <Flame size={12} /> {streak}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Difficulty + category badges */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ backgroundColor: `${catColor}20`, color: catColor, border: `1px solid ${catColor}40`, fontFamily: 'Inter, sans-serif' }}>
            {question.category}
          </span>
          <span className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
            style={{ backgroundColor: `${difficultyColor}20`, color: difficultyColor, border: `1px solid ${difficultyColor}40`, fontFamily: 'Inter, sans-serif' }}>
            {question.difficulty}
          </span>
          <span className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            +{question.points} pts
          </span>
        </div>

        {/* Question */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 leading-snug"
          style={{ color: 'var(--text-primary)' }}>
          {question.question}
        </h2>

        {/* Question type renderers */}
        {(question.type === 'multiple-choice' || question.type === 'true-false' || question.type === 'fill-blank' || question.type === 'image-match') && (
          <div className="space-y-3">
            {(question.options || []).map(option => (
              <button key={option} onClick={() => onAnswer(option)}
                className="w-full text-left px-5 py-4 rounded-xl border font-medium transition-all hover:scale-[1.01] hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                }}>
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Drag-match */}
        {question.type === 'drag-match' && question.pairs && (
          <div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
              Click an item on the left, then click the matching item on the right.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Left column */}
              <div className="space-y-2">
                <div className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Events</div>
                {shuffle(question.pairs.map(p => p.left)).map(left => {
                  const paired = dragPairs[left];
                  const isSelected = dragLeft === left;
                  return (
                    <button key={left} onClick={() => onDragLeftSelect(left)}
                      className="w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all"
                      style={{
                        backgroundColor: isSelected ? '#2d5f8a20' : paired ? '#4a7c5915' : 'var(--bg-card)',
                        borderColor: isSelected ? '#2d5f8a' : paired ? '#4a7c59' : 'var(--border)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                      {paired && <span className="text-xs mr-2" style={{ color: '#4a7c59' }}>✓</span>}
                      {left}
                    </button>
                  );
                })}
              </div>
              {/* Right column */}
              <div className="space-y-2">
                <div className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Dates</div>
                {shuffle(question.pairs.map(p => p.right)).map(right => {
                  const usedByLeft = Object.entries(dragPairs).find(([, r]) => r === right)?.[0];
                  const isMatchable = dragLeft !== null;
                  return (
                    <button key={right} onClick={() => dragLeft && onDragPair(dragLeft, right)}
                      className="w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all"
                      style={{
                        backgroundColor: usedByLeft ? '#4a7c5915' : isMatchable ? '#c9a84c10' : 'var(--bg-card)',
                        borderColor: usedByLeft ? '#4a7c59' : isMatchable ? '#c9a84c60' : 'var(--border)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, sans-serif',
                        cursor: dragLeft ? 'pointer' : 'default',
                      }}>
                      {usedByLeft && <span className="text-xs mr-2" style={{ color: '#4a7c59' }}>✓</span>}
                      {right}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Pairs preview */}
            {Object.keys(dragPairs).length > 0 && (
              <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  Your matches:
                </div>
                {Object.entries(dragPairs).map(([l, r]) => (
                  <div key={l} className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
                    {l} → {r}
                  </div>
                ))}
              </div>
            )}
            <button onClick={onSubmitDrag}
              disabled={Object.keys(dragPairs).length < (question.pairs?.length || 0)}
              className="px-6 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-40"
              style={{ backgroundColor: '#c9a84c', color: '#1c1409', fontFamily: 'Inter, sans-serif' }}>
              Submit Matches
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── FEEDBACK SCREEN ───────────────────────────────────────────────────────────
function FeedbackScreen({ question, userAnswer, isCorrect, isLast, onNext }: {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
  isLast: boolean;
  onNext: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Result banner */}
      <div style={{ backgroundColor: isCorrect ? '#4a7c5920' : '#c94c2015', borderBottom: `2px solid ${isCorrect ? '#4a7c59' : '#c94c20'}` }}>
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center gap-4">
          {isCorrect
            ? <CheckCircle size={36} style={{ color: '#4a7c59', flexShrink: 0 }} />
            : <XCircle size={36} style={{ color: '#c94c20', flexShrink: 0 }} />
          }
          <div>
            <div className="font-display text-2xl font-black"
              style={{ color: isCorrect ? '#4a7c59' : '#c94c20' }}>
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </div>
            {isCorrect && (
              <div className="text-sm" style={{ color: '#4a7c59', fontFamily: 'Inter, sans-serif' }}>
                +{question.points} points
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 flex-1 flex flex-col">
        {/* Correct answer (if wrong) */}
        {!isCorrect && (
          <div className="p-4 rounded-xl mb-5 border"
            style={{ backgroundColor: '#4a7c5910', borderColor: '#4a7c5940' }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: '#4a7c59', fontFamily: 'Inter, sans-serif' }}>Correct answer</div>
            <div className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {question.answer}
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="p-5 rounded-xl border flex-1"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={15} style={{ color: 'var(--accent-gold)' }} />
            <span className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--accent-gold)', fontFamily: 'Inter, sans-serif' }}>Did You Know?</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
            {question.explanation}
          </p>
        </div>

        {/* Next button */}
        <button onClick={onNext}
          className="mt-6 flex items-center justify-center gap-2 py-4 rounded-full text-base font-bold transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'Inter, sans-serif' }}>
          {isLast ? 'See Results' : 'Next Question'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ── RESULTS SCREEN ────────────────────────────────────────────────────────────
function ResultsScreen({ answers, score, maxStreak, newBadges, earnedBadges, onPlayAgain, onHome }: {
  answers: AnswerRecord[];
  score: number;
  maxStreak: number;
  newBadges: BadgeId[];
  earnedBadges: BadgeId[];
  onPlayAgain: () => void;
  onHome: () => void;
}) {
  const correct = answers.filter(a => a.correct).length;
  const total = answers.length;
  const pct = Math.round((correct / total) * 100);

  const gradeColor = pct >= 80 ? '#4a7c59' : pct >= 50 ? '#c9a84c' : '#c94c20';
  const gradeLabel = pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good effort!' : 'Keep practising!';

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📚'}</div>
          <h1 className="font-display text-4xl font-black mb-2" style={{ color: '#f4e8c4' }}>{gradeLabel}</h1>
          <div className="font-display text-5xl font-black mt-4" style={{ color: gradeColor }}>
            {pct}%
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>
            {correct} out of {total} correct
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Score stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Points', value: score.toLocaleString(), icon: <Zap size={18} style={{ color: '#c9a84c' }} /> },
            { label: 'Best Streak', value: `${maxStreak}`, icon: <Flame size={18} style={{ color: '#c94c20' }} /> },
            { label: 'Accuracy', value: `${pct}%`, icon: <Target size={18} style={{ color: '#2d5f8a' }} /> },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* New badges */}
        {newBadges.length > 0 && (
          <div className="mb-8 p-5 rounded-2xl border"
            style={{ backgroundColor: 'var(--accent-gold-light)', borderColor: 'var(--border-accent)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} style={{ color: 'var(--accent-gold)' }} />
              <span className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                New Badges Earned!
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {newBadges.map(id => {
                const badge = badges.find(b => b.id === id)!;
                return (
                  <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-full"
                    style={{ backgroundColor: badge.color + '25', border: `1px solid ${badge.color}60` }}>
                    <span>{badge.emoji}</span>
                    <span className="text-sm font-semibold" style={{ color: badge.color, fontFamily: 'Inter, sans-serif' }}>
                      {badge.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Answer breakdown */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Answer Breakdown
          </h2>
          <div className="space-y-3">
            {answers.map((record, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: record.correct ? '#4a7c5908' : '#c94c2008',
                  borderColor: record.correct ? '#4a7c5930' : '#c94c2030',
                }}>
                <div className="shrink-0 mt-0.5">
                  {record.correct
                    ? <CheckCircle size={18} style={{ color: '#4a7c59' }} />
                    : <XCircle size={18} style={{ color: '#c94c20' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium mb-1 leading-snug"
                    style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                    {record.question.question}
                  </div>
                  {!record.correct && (
                    <div className="text-xs" style={{ color: '#4a7c59', fontFamily: 'Inter, sans-serif' }}>
                      Correct: <strong>{record.question.answer}</strong>
                    </div>
                  )}
                </div>
                <div className="text-xs font-semibold shrink-0"
                  style={{ color: record.correct ? '#4a7c59' : 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  {record.correct ? `+${record.question.points}` : '0'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-bold transition-all hover:opacity-90 flex-1"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'Inter, sans-serif' }}>
            <RotateCcw size={15} /> Play Again
          </button>
          <button onClick={onHome}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-bold border transition-all hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            <Home size={15} /> Back to Hub
          </button>
        </div>
      </div>
    </div>
  );
}

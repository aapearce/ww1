'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/ThemeContext';
import { topics, categories, getWowTopics, type TopicCategory } from '@/lib/topics';
import { getProgress } from '@/lib/progress';
import { BookOpen, CheckCircle, Clock, Star, List, Grid3X3 } from 'lucide-react';

const categoryOrder: TopicCategory[] = ['causes', 'battles', 'people', 'technology', 'homefront', 'turning-points', 'aftermath'];

export default function LearnPage() {
  const { ageGroup } = useApp();
  const [view, setView] = useState<'thematic' | 'chronological'>('thematic');
  const [activeCategory, setActiveCategory] = useState<TopicCategory | 'all'>('all');
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const readCount = Object.values(progress).filter(Boolean).length;
  const totalCount = topics.length;
  const pct = Math.round((readCount / totalCount) * 100);

  const wowTopics = getWowTopics();

  const displayedTopics = view === 'chronological'
    ? [...topics].sort((a, b) => (a.year || '').localeCompare(b.year || ''))
    : activeCategory === 'all'
      ? topics
      : topics.filter(t => t.category === activeCategory);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background: 'linear-gradient(150deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--accent-gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>Mode 1</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-4" style={{ color: '#f4e8c4' }}>Learn</h1>
          <p className="text-base max-w-xl mb-8" style={{ color: 'var(--nav-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif', fontWeight: 300 }}>
            {ageGroup === '8-13'
              ? 'Discover the story of World War One — the people, battles, and events that changed the world.'
              : 'Explore the causes, battles, key figures and lasting consequences of the Great War through detailed articles.'}
          </p>

          {/* Progress bar */}
          <div className="max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: 'var(--nav-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>Your Progress</span>
              <span className="text-xs font-bold" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{readCount} / {totalCount} topics</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: 'var(--accent-gold)' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── WOW STORIES STRIP ── */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Star size={16} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Spotlight Stories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wowTopics.map(topic => (
              <Link key={topic.slug} href={`/learn/${topic.slug}`}
                className="group relative rounded-xl border overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-accent)', borderWidth: 1 }}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--accent-gold)' }} />
                <div className="p-5">
                  <div className="text-2xl mb-3">{topic.emoji}</div>
                  <h3 className="font-display text-base font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{topic.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
                    {topic.summary[ageGroup].substring(0, 90)}...
                  </p>
                  {progress[topic.slug] && (
                    <div className="mt-3 flex items-center gap-1">
                      <CheckCircle size={12} style={{ color: '#4a7c59' }} />
                      <span className="text-xs" style={{ color: '#4a7c59', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>Read</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── VIEW TOGGLE ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>All Topics</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('thematic')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: view === 'thematic' ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: view === 'thematic' ? 'var(--bg-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-inter, Inter), sans-serif',
              }}>
              <Grid3X3 size={13} /> Thematic
            </button>
            <button onClick={() => setView('chronological')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: view === 'chronological' ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: view === 'chronological' ? 'var(--bg-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-inter, Inter), sans-serif',
              }}>
              <List size={13} /> Timeline
            </button>
          </div>
        </div>

        {/* ── CATEGORY FILTER (thematic view only) ── */}
        {view === 'thematic' && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveCategory('all')}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: activeCategory === 'all' ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                color: activeCategory === 'all' ? '#1c1409' : 'var(--text-muted)',
                fontFamily: 'var(--font-inter, Inter), sans-serif',
              }}>
              All
            </button>
            {categoryOrder.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? categories[cat].color : 'var(--bg-secondary)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-inter, Inter), sans-serif',
                }}>
                {categories[cat].icon} {categories[cat].label}
              </button>
            ))}
          </div>
        )}

        {/* ── THEMATIC VIEW ── */}
        {view === 'thematic' && (
          <div>
            {(activeCategory === 'all' ? categoryOrder : [activeCategory as TopicCategory]).map(cat => {
              const catTopics = topics.filter(t => t.category === cat);
              if (catTopics.length === 0) return null;
              return (
                <div key={cat} className="mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-lg">{categories[cat].icon}</span>
                    <h3 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{categories[cat].label}</h3>
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{catTopics.length} topics</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catTopics.map(topic => (
                      <TopicCard key={topic.slug} topic={topic} ageGroup={ageGroup} isRead={!!progress[topic.slug]} catColor={categories[cat].color} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CHRONOLOGICAL VIEW ── */}
        {view === 'chronological' && (
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px hidden sm:block" style={{ backgroundColor: 'var(--border-accent)', opacity: 0.3 }} />
            <div className="space-y-3">
              {displayedTopics.map(topic => (
                <Link key={topic.slug} href={`/learn/${topic.slug}`}
                  className="flex items-center gap-4 group p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="w-16 shrink-0 text-right">
                    <span className="font-display text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
                      {topic.year?.split('–')[0]?.split(' ').pop()?.substring(0, 4) || '—'}
                    </span>
                  </div>
                  <div className="hidden sm:flex w-5 h-5 rounded-full border-2 shrink-0 items-center justify-center"
                    style={{ borderColor: categories[topic.category].color, backgroundColor: 'var(--bg-card)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categories[topic.category].color }} />
                  </div>
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{topic.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{topic.title}</span>
                        {topic.isWow && <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>★ Spotlight</span>}
                      </div>
                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{topic.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {progress[topic.slug] && <CheckCircle size={16} style={{ color: '#4a7c59' }} />}
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
                      <Clock size={12} />
                      {topic.readingTime}m
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TopicCard({ topic, ageGroup, isRead, catColor }: {
  topic: ReturnType<typeof topics[0]['summary']['8-13']> extends string ? any : any;
  ageGroup: '8-13' | '13-18';
  isRead: boolean;
  catColor: string;
}) {
  return (
    <Link href={`/learn/${topic.slug}`}
      className="group flex flex-col rounded-xl border overflow-hidden transition-all hover:scale-[1.01] hover:shadow-md"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: isRead ? '#4a7c59' : 'var(--border)' }}>
      <div className="h-1 w-full" style={{ backgroundColor: catColor }} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-2xl">{topic.emoji}</span>
          <div className="flex items-center gap-2">
            {topic.isWow && <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>★</span>}
            {isRead && <CheckCircle size={15} style={{ color: '#4a7c59' }} />}
          </div>
        </div>
        <h3 className="font-display font-bold text-base mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>{topic.title}</h3>
        <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
          {topic.summary[ageGroup]}
        </p>
        <div className="flex items-center justify-between">
          {topic.year && <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{topic.year}</span>}
          <div className="flex items-center gap-1 text-xs ml-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
            <Clock size={11} /> {topic.readingTime} min
          </div>
        </div>
      </div>
    </Link>
  );
}

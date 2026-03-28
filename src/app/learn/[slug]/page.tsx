'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/ThemeContext';
import { getTopicBySlug, topics, categories } from '@/lib/topics';
import { markRead, markUnread, isRead } from '@/lib/progress';
import { ArrowLeft, Clock, CheckCircle, Circle, ChevronRight, Lightbulb, Star, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { ageGroup, setAgeGroup } = useApp();
  const [read, setRead] = useState(false);
  const [mounted, setMounted] = useState(false);

  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const cat = categories[topic.category];
  const sections = topic.sections[ageGroup];

  useEffect(() => {
    setMounted(true);
    setRead(isRead(slug));
  }, [slug]);

  const toggleRead = () => {
    if (read) {
      markUnread(slug);
      setRead(false);
    } else {
      markRead(slug);
      setRead(true);
    }
  };

  // Find next topic
  const currentIndex = topics.findIndex(t => t.slug === slug);
  const nextTopic = topics[currentIndex + 1] || null;
  const prevTopic = topics[currentIndex - 1] || null;

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* ── ARTICLE HEADER ── */}
      <div style={{ background: 'linear-gradient(150deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/learn" className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
              style={{ color: 'var(--nav-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
              <ArrowLeft size={13} /> Learn
            </Link>
            <span style={{ color: 'var(--nav-muted)' }}>/</span>
            <span className="text-xs" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{cat.label}</span>
          </div>

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ backgroundColor: cat.color + '30', color: cat.color, fontFamily: 'var(--font-inter, Inter), sans-serif', border: `1px solid ${cat.color}40` }}>
              {cat.icon} {cat.label}
            </span>
            {topic.isWow && (
              <span className="text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: 'var(--accent-gold)', border: '1px solid rgba(201,168,76,0.3)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
                <Star size={10} /> Spotlight Story
              </span>
            )}
          </div>

          <div className="flex items-start gap-4">
            <span className="text-5xl">{topic.emoji}</span>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-black mb-3" style={{ color: '#f4e8c4' }}>{topic.title}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                {topic.year && (
                  <span className="text-sm" style={{ color: 'var(--nav-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{topic.year}</span>
                )}
                <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--nav-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
                  <Clock size={13} /> {topic.readingTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

          {/* Main content */}
          <div>
            {/* Age group toggle */}
            <div className="flex items-center gap-2 mb-8 p-1 rounded-full w-fit" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              {(['8-13', '13-18'] as const).map(ag => (
                <button key={ag} onClick={() => setAgeGroup(ag)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: ageGroup === ag ? 'var(--text-primary)' : 'transparent',
                    color: ageGroup === ag ? 'var(--bg-primary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-inter, Inter), sans-serif',
                  }}>
                  {ag === '8-13' ? 'Ages 8–13' : 'Ages 13–18'}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-xl p-6 mb-8 border-l-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: cat.color }}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter, Inter), sans-serif', fontWeight: 400 }}>
                {topic.summary[ageGroup]}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{section.heading}</h2>
                  <div className="space-y-4">
                    {section.body.split('\n\n').map((para, j) => (
                      <p key={j} className="text-base leading-relaxed"
                        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}
                        dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }}
                      />
                    ))}
                  </div>
                  {i < sections.length - 1 && <hr className="mt-8" style={{ borderColor: 'var(--border)' }} />}
                </div>
              ))}
            </div>

            {/* Did You Know */}
            {topic.didYouKnow && (
              <div className="mt-10 rounded-xl p-6 border" style={{ backgroundColor: 'var(--accent-gold-light)', borderColor: 'var(--border-accent)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>Did You Know?</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{topic.didYouKnow}</p>
              </div>
            )}

            {/* Mark as read */}
            {mounted && (
              <div className="mt-10">
                <button onClick={toggleRead}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all border"
                  style={{
                    backgroundColor: read ? '#4a7c5920' : 'transparent',
                    borderColor: read ? '#4a7c59' : 'var(--border)',
                    color: read ? '#4a7c59' : 'var(--text-muted)',
                    fontFamily: 'var(--font-inter, Inter), sans-serif',
                  }}>
                  {read ? <CheckCircle size={16} /> : <Circle size={16} />}
                  {read ? 'Marked as read ✓' : 'Mark as read'}
                </button>
              </div>
            )}

            {/* Next / Prev */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {prevTopic ? (
                <Link href={`/learn/${prevTopic.slug}`}
                  className="flex flex-col p-4 rounded-xl border transition-all hover:shadow-md group"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <span className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>← Previous</span>
                  <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{prevTopic.emoji} {prevTopic.title}</span>
                </Link>
              ) : <div />}
              {nextTopic && (
                <Link href={`/learn/${nextTopic.slug}`}
                  className="flex flex-col p-4 rounded-xl border transition-all hover:shadow-md text-right col-start-2"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <span className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>Next →</span>
                  <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{nextTopic.emoji} {nextTopic.title}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Key Facts */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>Key Facts</h3>
              <ul className="space-y-2.5">
                {topic.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related topics from same category */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>Related Topics</h3>
              <div className="space-y-2">
                {topics.filter(t => t.category === topic.category && t.slug !== slug).slice(0, 4).map(related => (
                  <Link key={related.slug} href={`/learn/${related.slug}`}
                    className="flex items-center gap-2 p-2 rounded-lg transition-all hover:opacity-80 group"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <span className="text-base">{related.emoji}</span>
                    <span className="text-xs font-medium flex-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>{related.title}</span>
                    <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to learn */}
            <Link href="/learn"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', fontFamily: 'var(--font-inter, Inter), sans-serif' }}>
              <BookOpen size={15} /> All Topics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

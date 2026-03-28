'use client';

import Link from 'next/link';
import { useApp } from '@/context/ThemeContext';
import { t } from '@/lib/i18n';
import { BookOpen, Trophy, Map, ArrowRight, ChevronRight } from 'lucide-react';

const wowStories = [
  {
    key: 'christmas',
    titleKey: 'wowChristmasTruce',
    descKey: 'wowChristmasTruceDesc',
    date: 'December 1914',
    emoji: '⚽',
    href: '/learn/christmas-truce',
    color: '#4a7c59',
  },
  {
    key: 'redBaron',
    titleKey: 'wowRedBaron',
    descKey: 'wowRedBaronDesc',
    date: 'April 1918',
    emoji: '✈️',
    href: '/learn/red-baron',
    color: '#8b2020',
  },
  {
    key: 'stubby',
    titleKey: 'wowStubby',
    descKey: 'wowStubbyDesc',
    date: '1917–1918',
    emoji: '🐕',
    href: '/learn/sergeant-stubby',
    color: '#6b4c11',
  },
];

const modes = [
  {
    href: '/learn',
    icon: BookOpen,
    titleKey: 'modeLearn',
    descKey: 'modeLearnDesc',
    ctaKey: 'startLearning',
    accent: '#c9a84c',
    tag: '30+ Topics',
  },
  {
    href: '/test',
    icon: Trophy,
    titleKey: 'modeTest',
    descKey: 'modeTestDesc',
    ctaKey: 'testKnowledge',
    accent: '#7c5cbf',
    tag: 'Earn Badges',
  },
  {
    href: '/map',
    icon: Map,
    titleKey: 'modeMap',
    descKey: 'modeMapDesc',
    ctaKey: 'exploreMap',
    accent: '#2d7d9a',
    tag: 'Interactive',
  },
];

const timeline = [
  { year: '1914', event: 'Assassination of Franz Ferdinand — war begins', month: 'June' },
  { year: '1914', event: 'Christmas Truce — soldiers meet in No Man\'s Land', month: 'December' },
  { year: '1915', event: 'First use of poison gas at Ypres', month: 'April' },
  { year: '1916', event: 'Battle of the Somme — the bloodiest day in British history', month: 'July' },
  { year: '1917', event: 'USA enters the war; Russia exits', month: 'April' },
  { year: '1918', event: 'Armistice signed — 11th hour, 11th day, 11th month', month: 'November' },
];

export default function HomePage() {
  const { language } = useApp();
  const tx = t[language];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 60%, #1a1208 100%)' }}
      >
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.3) 39px, rgba(201,168,76,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.3) 39px, rgba(201,168,76,0.3) 40px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ backgroundColor: 'var(--accent-gold)' }} />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--accent-gold)', fontFamily: 'Inter, sans-serif' }}>
                {tx.tagline}
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-8" style={{ color: '#f4e8c4' }}>
              {tx.heroHeading.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {tx.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--accent-gold)', color: '#1c1409', fontFamily: 'Inter, sans-serif' }}>
                {tx.startLearning}
                <ArrowRight size={16} />
              </Link>
              <Link href="/map"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all border hover:opacity-80"
                style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#f4e8c4', fontFamily: 'Inter, sans-serif' }}>
                {tx.exploreMap}
                <Map size={16} />
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}>
            {[
              { value: '10M+', label: 'Soldiers Killed' },
              { value: '30', label: 'Nations at War' },
              { value: '4 Years', label: 'Duration' },
              { value: '1,500', label: 'Miles of Trenches' },
            ].map(stat => (
              <div key={stat.label} className="px-6 py-5" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent-gold)' }}>{stat.value}</div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE MODES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map(mode => {
            const Icon = mode.icon;
            return (
              <Link
                key={mode.href}
                href={mode.href}
                className="group relative rounded-2xl p-8 border transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="absolute top-5 right-5">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)', fontFamily: 'Inter, sans-serif' }}>
                    {mode.tag}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: mode.accent + '20' }}>
                  <Icon size={22} style={{ color: mode.accent }} />
                </div>
                <h2 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {tx[mode.titleKey as keyof typeof tx]}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  {tx[mode.descKey as keyof typeof tx]}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium" style={{ color: mode.accent, fontFamily: 'Inter, sans-serif' }}>
                  {tx[mode.ctaKey as keyof typeof tx]}
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── TIMELINE STRIP ── */}
      <section style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--accent-gold)' }} />
            <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Key Moments</h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 top-3 bottom-3 w-px hidden sm:block" style={{ backgroundColor: 'var(--border-accent)', opacity: 0.4 }} />
            <div className="space-y-6 sm:pl-12">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="hidden sm:flex absolute left-1.5 w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5"
                    style={{ borderColor: 'var(--accent-gold)', backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-display text-xl font-bold w-16 shrink-0" style={{ color: 'var(--accent-gold)' }}>{item.year}</span>
                    <div>
                      <span className="text-xs uppercase tracking-wider mr-2" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{item.month}</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{item.event}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WOW STORIES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--accent-gold)' }} />
            <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{tx.featuredStories}</h2>
          </div>
          <Link href="/learn" className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--accent-gold)', fontFamily: 'Inter, sans-serif' }}>
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {wowStories.map(story => (
            <Link
              key={story.key}
              href={story.href}
              className="group rounded-2xl border overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* Coloured band */}
              <div className="h-2 w-full" style={{ backgroundColor: story.color }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{story.emoji}</span>
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{story.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tx[story.titleKey as keyof typeof tx]}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  {tx[story.descKey as keyof typeof tx]}
                </p>
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: story.color, fontFamily: 'Inter, sans-serif' }}>
                  {tx.readMore}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t mt-8" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--accent-gold)' }}>
              <span className="text-xs font-bold" style={{ color: '#1c1409', fontFamily: 'Playfair Display, serif' }}>GW</span>
            </div>
            <span className="font-display text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>{tx.siteTitle}</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{tx.footerRights}</p>
        </div>
      </footer>

    </div>
  );
}

'use client';

import Link from 'next/link';
import { useApp } from '@/context/ThemeContext';
import { t, languages } from '@/lib/i18n';
import { useState } from 'react';
import { Moon, Sun, Globe, BookOpen, Trophy, Map, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, language, setLanguage, ageGroup, setAgeGroup } = useApp();
  const tx = t[language];
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language)!;

  return (
    <nav className="sticky top-0 z-50 border-b" style={{
      backgroundColor: 'var(--nav-bg)',
      borderColor: 'rgba(201,168,76,0.2)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--accent-gold)' }}>
              <span className="text-xs font-bold" style={{ color: 'var(--nav-bg)', fontFamily: 'Playfair Display, serif' }}>GW</span>
            </div>
            <span className="font-display text-lg font-bold tracking-wide hidden sm:block" style={{ color: 'var(--accent-gold)' }}>
              {tx.siteTitle}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/learn" icon={<BookOpen size={15} />} label={tx.modeLearn} />
            <NavLink href="/test" icon={<Trophy size={15} />} label={tx.modeTest} />
            <NavLink href="/map" icon={<Map size={15} />} label={tx.modeMap} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">

            {/* Age group toggle */}
            <div className="hidden sm:flex items-center rounded-full p-0.5 gap-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => setAgeGroup('8-13')}
                className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                style={{
                  backgroundColor: ageGroup === '8-13' ? 'var(--accent-gold)' : 'transparent',
                  color: ageGroup === '8-13' ? 'var(--nav-bg)' : 'var(--nav-muted)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                8–13
              </button>
              <button
                onClick={() => setAgeGroup('13-18')}
                className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                style={{
                  backgroundColor: ageGroup === '13-18' ? 'var(--accent-gold)' : 'transparent',
                  color: ageGroup === '13-18' ? 'var(--nav-bg)' : 'var(--nav-muted)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                13–18
              </button>
            </div>

            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
                style={{ color: 'var(--nav-muted)', backgroundColor: langOpen ? 'rgba(255,255,255,0.08)' : 'transparent' }}
              >
                <Globe size={14} />
                <span className="hidden sm:block">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                <span className="sm:hidden">{currentLang.flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-xl shadow-2xl overflow-hidden z-50 border"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: language === lang.code ? 'var(--accent-gold-light)' : 'transparent',
                        color: language === lang.code ? 'var(--accent-gold)' : 'var(--text-secondary)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all"
              style={{ color: 'var(--nav-muted)', backgroundColor: 'transparent' }}
              aria-label={theme === 'dark' ? tx.lightMode : tx.darkMode}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--nav-muted)' }}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-1" style={{ borderColor: 'rgba(201,168,76,0.15)', backgroundColor: 'var(--nav-bg)' }}>
          <MobileNavLink href="/learn" icon={<BookOpen size={16} />} label={tx.modeLearn} onClick={() => setMobileOpen(false)} />
          <MobileNavLink href="/test" icon={<Trophy size={16} />} label={tx.modeTest} onClick={() => setMobileOpen(false)} />
          <MobileNavLink href="/map" icon={<Map size={16} />} label={tx.modeMap} onClick={() => setMobileOpen(false)} />
          <div className="flex gap-2 pt-3">
            <button onClick={() => setAgeGroup('8-13')} className="flex-1 text-xs py-2 rounded-full font-medium transition-all"
              style={{ backgroundColor: ageGroup === '8-13' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.06)', color: ageGroup === '8-13' ? 'var(--nav-bg)' : 'var(--nav-muted)' }}>
              Ages 8–13
            </button>
            <button onClick={() => setAgeGroup('13-18')} className="flex-1 text-xs py-2 rounded-full font-medium transition-all"
              style={{ backgroundColor: ageGroup === '13-18' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.06)', color: ageGroup === '13-18' ? 'var(--nav-bg)' : 'var(--nav-muted)' }}>
              Ages 13–18
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
      style={{ color: 'var(--nav-muted)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>
      {icon}
      <span className="uppercase text-xs tracking-widest">{label}</span>
    </Link>
  );
}

function MobileNavLink({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:opacity-80"
      style={{ color: 'var(--nav-text)', fontFamily: 'Inter, sans-serif' }}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

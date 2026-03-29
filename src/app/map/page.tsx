'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/ThemeContext';
import { battles, timelinePeriods, type Battle } from '@/lib/map-data';
import {
  Play, Pause, SkipBack, SkipForward,
  Layers, X, Music, VolumeX, Map,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

// Load Leaflet map client-side only
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="text-center">
        <Map size={40} style={{ color: 'var(--text-muted)' }} className="mx-auto mb-3 animate-pulse" />
        <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
          Loading map…
        </p>
      </div>
    </div>
  ),
});

const PERIOD_ICONS = ['💥', '💥', '⚔️', '🪖', '🩸', '⭐', '💀', '🏆'];

export default function MapPage() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const [timelineStep, setTimelineStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(2000); // ms per step
  const [activeBattle, setActiveBattle] = useState<Battle | null>(null);
  const [showBattles, setShowBattles] = useState(true);
  const [showFrontLines, setShowFrontLines] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxStep = timelinePeriods.length - 1;
  const currentPeriod = timelinePeriods[timelineStep];

  // Count visible battles at this step
  const visibleBattles = battles.filter(b => b.timelineStep <= timelineStep);

  // ── AUTO-PLAY ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        setTimelineStep(s => {
          if (s >= maxStep) { setIsPlaying(false); return s; }
          return s + 1;
        });
      }, playSpeed);
    }
    return () => { if (playTimerRef.current) clearTimeout(playTimerRef.current); };
  }, [isPlaying, timelineStep, playSpeed, maxStep]);

  // ── KEYBOARD CONTROLS ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setTimelineStep(s => Math.min(s + 1, maxStep));
      if (e.key === 'ArrowLeft') setTimelineStep(s => Math.max(s - 1, 0));
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.key === 'Escape') setActiveBattle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [maxStep]);

  // ── MUSIC (placeholder — add /public/ww1-music.mp3 to enable) ──────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!audioRef.current) {
      audioRef.current = new Audio('/ww1-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    if (musicOn) {
      audioRef.current.play().catch(() => {}); // graceful fail if file missing
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  const handleBattleSelect = useCallback((battle: Battle | null) => {
    setActiveBattle(battle);
  }, []);

  const step = useCallback((dir: number) => {
    setTimelineStep(s => Math.max(0, Math.min(maxStep, s + dir)));
    setIsPlaying(false);
  }, [maxStep]);

  const frontColor = isDark ? '#c94c20' : '#a33';
  const panelBg = isDark ? '#1a1208' : '#fdfaf4';
  const overlayBg = isDark ? 'rgba(15,10,4,0.82)' : 'rgba(253,250,244,0.88)';

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>

      {/* ── MAP AREA ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MapClient
          timelineStep={timelineStep}
          showBattles={showBattles}
          showFrontLines={showFrontLines}
          isDark={isDark}
          onBattleSelect={handleBattleSelect}
          selectedBattleId={activeBattle?.id ?? null}
        />

        {/* ── PERIOD OVERLAY (top-left) ───────────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 16, left: 16, zIndex: 900,
          background: overlayBg,
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '12px 18px',
          border: '1px solid var(--border)',
          maxWidth: 260,
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>{PERIOD_ICONS[timelineStep]}</span>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold)', lineHeight: 1 }}>
                {currentPeriod.year}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.2, marginTop: 2 }}>
                {currentPeriod.label}
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            {currentPeriod.description}
          </p>
        </div>

        {/* ── TOP-RIGHT CONTROLS ──────────────────────────────────────────── */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 900, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Layers toggle */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLayers(s => !s)}
              title="Toggle layers"
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: overlayBg, border: '1px solid var(--border)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-primary)',
              }}>
              <Layers size={16} />
            </button>
            {showLayers && (
              <div style={{
                position: 'absolute', top: 0, right: 46,
                background: overlayBg, backdropFilter: 'blur(8px)',
                border: '1px solid var(--border)',
                borderRadius: 12, padding: '10px 14px',
                minWidth: 160, zIndex: 901,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
                  Layers
                </div>
                {[
                  { label: '⚔️ Battle markers', val: showBattles, set: setShowBattles },
                  { label: '🔴 Front lines', val: showFrontLines, set: setShowFrontLines },
                ].map(({ label, val, set }) => (
                  <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 0', fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={val} onChange={e => set(e.target.checked)}
                      style={{ accentColor: 'var(--accent-gold)', width: 14, height: 14 }} />
                    {label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Music toggle */}
          <button
            onClick={() => setMusicOn(m => !m)}
            title={musicOn ? 'Mute music' : 'Play period music'}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: musicOn ? 'var(--accent-gold)' : overlayBg,
              border: `1px solid ${musicOn ? 'var(--accent-gold)' : 'var(--border)'}`,
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: musicOn ? '#1c1409' : 'var(--text-primary)',
            }}>
            {musicOn ? <Music size={15} /> : <VolumeX size={15} />}
          </button>
        </div>

        {/* ── BATTLE COUNT PILL ────────────────────────────────────────────── */}
        {timelineStep > 0 && (
          <div style={{
            position: 'absolute', bottom: 8, left: 16, zIndex: 900,
            background: overlayBg, backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            borderRadius: 20, padding: '5px 12px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 12, color: 'var(--accent-gold)' }}>⚔️</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
              {visibleBattles.length} battles
            </span>
          </div>
        )}

        {/* ── LEGEND ───────────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 8, right: 60, zIndex: 900,
          background: overlayBg, backdropFilter: 'blur(8px)',
          border: '1px solid var(--border)',
          borderRadius: 10, padding: '7px 12px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {[
            { colour: '#c94c20', label: 'Western Front' },
            { colour: '#2d5f8a', label: 'Eastern Front' },
            { colour: '#7c5cbf', label: 'Other fronts' },
          ].map(({ colour, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: colour }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── BATTLE INFO PANEL ────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 950,
          width: activeBattle ? 320 : 0,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}>
          {activeBattle && (
            <div style={{
              width: 320, height: '100%',
              background: panelBg,
              borderLeft: '1px solid var(--border)',
              overflowY: 'auto',
              padding: '20px 20px 24px',
              boxSizing: 'border-box',
            }}>
              {/* Close */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <button onClick={() => setActiveBattle(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
                  <X size={18} />
                </button>
              </div>

              {/* Emoji + name */}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{activeBattle.emoji}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                  {activeBattle.name}
                </h2>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  {activeBattle.startDate}
                  {activeBattle.endDate !== activeBattle.startDate && ` – ${activeBattle.endDate}`}
                </div>
              </div>

              {/* Front badge */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                  padding: '3px 12px', borderRadius: 20, textTransform: 'capitalize',
                  background: `${frontColours[activeBattle.front]}20`,
                  color: frontColours[activeBattle.front],
                  border: `1px solid ${frontColours[activeBattle.front]}50`,
                }}>
                  {activeBattle.front} front
                </span>
              </div>

              {/* Combatants */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                <div style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2d5f8a', marginBottom: 4 }}>Allies</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activeBattle.allies}</div>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8b2020', marginBottom: 4 }}>Central Powers</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activeBattle.central}</div>
                </div>
              </div>

              {/* Narrative */}
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: 16 }}>
                {activeBattle.narrative}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: '#8b202015', border: '1px solid #8b202030' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8b2020', marginBottom: 2 }}>Casualties</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{activeBattle.casualties}</div>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--accent-gold-light, #c9a84c15)', border: '1px solid var(--border-accent, #c9a84c40)' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold)', marginBottom: 2 }}>Result</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{activeBattle.result}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── TIMELINE BAR ───────────────────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        background: isDark ? '#0a0702' : '#1c1409',
        borderTop: '1px solid rgba(201,168,76,0.2)',
        padding: '12px 20px 14px',
        zIndex: 1000,
      }}>
        {/* Dot track */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 10 }}>
          {timelinePeriods.map((period, i) => {
            const active = i === timelineStep;
            const past = i < timelineStep;
            return (
              <div key={i} style={{ flex: i < timelinePeriods.length - 1 ? '1' : '0', display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => { setTimelineStep(i); setIsPlaying(false); }}
                  title={`${period.year} — ${period.label}`}
                  style={{
                    width: active ? 18 : 10, height: active ? 18 : 10,
                    borderRadius: '50%',
                    background: active ? '#c9a84c' : past ? '#c9a84c80' : '#ffffff25',
                    border: active ? '2px solid #c9a84c' : 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                    padding: 0,
                    boxShadow: active ? '0 0 0 4px #c9a84c30' : 'none',
                  }} />
                {i < timelinePeriods.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, margin: '0 2px',
                    background: i < timelineStep ? '#c9a84c80' : '#ffffff15',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Prev / Play / Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => step(-1)} disabled={timelineStep === 0}
              style={{ background: 'none', border: 'none', cursor: timelineStep === 0 ? 'default' : 'pointer', color: timelineStep === 0 ? '#ffffff20' : '#c9a84c', padding: 4 }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setIsPlaying(p => !p)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#c9a84c', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1c1409',
              }}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
            </button>
            <button onClick={() => step(1)} disabled={timelineStep === maxStep}
              style={{ background: 'none', border: 'none', cursor: timelineStep === maxStep ? 'default' : 'pointer', color: timelineStep === maxStep ? '#ffffff20' : '#c9a84c', padding: 4 }}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Period label */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: '#f4e8c4', lineHeight: 1 }}>
              {currentPeriod.label}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#c9a84c', marginTop: 2 }}>
              {currentPeriod.year} · Step {timelineStep + 1} of {timelinePeriods.length}
            </div>
          </div>

          {/* Speed control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#ffffff50' }}>Speed</span>
            {[
              { label: '1×', ms: 3000 },
              { label: '2×', ms: 1500 },
              { label: '3×', ms: 800 },
            ].map(({ label, ms }) => (
              <button key={ms} onClick={() => setPlaySpeed(ms)}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                  padding: '3px 8px', borderRadius: 6, border: 'none',
                  cursor: 'pointer',
                  background: playSpeed === ms ? '#c9a84c' : '#ffffff15',
                  color: playSpeed === ms ? '#1c1409' : '#ffffff60',
                  transition: 'all 0.15s',
                }}>
                {label}
              </button>
            ))}
          </div>

          {/* Keyboard hint */}
          <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
            {['←', '→', 'Space'].map(k => (
              <kbd key={k} style={{
                fontFamily: 'Inter, sans-serif', fontSize: 10,
                padding: '2px 5px', borderRadius: 4,
                background: '#ffffff10', color: '#ffffff40',
                border: '1px solid #ffffff15',
              }}>{k}</kbd>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const frontColours: Record<string, string> = {
  western: '#c94c20',
  eastern: '#2d5f8a',
  other: '#7c5cbf',
};

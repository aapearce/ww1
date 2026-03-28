'use client';

import { useApp } from '@/context/ThemeContext';
import { BookOpen } from 'lucide-react';

export default function LearnPage() {
  const { language } = useApp();
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="text-center">
        <BookOpen size={48} style={{ color: 'var(--accent-gold)' }} className="mx-auto mb-4" />
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Learn — Coming Soon</h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Mode 1 is being built.</p>
      </div>
    </div>
  );
}

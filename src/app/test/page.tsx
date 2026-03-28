'use client';

import { Trophy } from 'lucide-react';

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="text-center">
        <Trophy size={48} style={{ color: '#7c5cbf' }} className="mx-auto mb-4" />
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Test Your Knowledge — Coming Soon</h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Mode 2 is being built.</p>
      </div>
    </div>
  );
}

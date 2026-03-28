'use client';

import { Map } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="text-center">
        <Map size={48} style={{ color: '#2d7d9a' }} className="mx-auto mb-4" />
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Interactive Map — Coming Soon</h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Mode 3 is being built.</p>
      </div>
    </div>
  );
}

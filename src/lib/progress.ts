'use client';

const PROGRESS_KEY = 'gw_progress';

export function getProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function markRead(slug: string) {
  const progress = getProgress();
  progress[slug] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function markUnread(slug: string) {
  const progress = getProgress();
  delete progress[slug];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function isRead(slug: string): boolean {
  return !!getProgress()[slug];
}

export function getReadCount(): number {
  return Object.values(getProgress()).filter(Boolean).length;
}

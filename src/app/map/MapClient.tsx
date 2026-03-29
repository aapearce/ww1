'use client';

import { useEffect, useRef } from 'react';
import type { Battle, LatLng } from '@/lib/map-data';
import { westernFrontLines, easternFrontLines, battles as allBattles } from '@/lib/map-data';

interface MapClientProps {
  timelineStep: number;
  showBattles: boolean;
  showFrontLines: boolean;
  isDark: boolean;
  onBattleSelect: (battle: Battle | null) => void;
  selectedBattleId: string | null;
}

// Front colour: warm red-orange for the battle line
const FRONT_COLOUR = '#c94c20';
const EAST_FRONT_COLOUR = '#2d5f8a';

const frontColours: Record<string, string> = {
  western: '#c94c20',
  eastern: '#2d5f8a',
  other: '#7c5cbf',
};

export default function MapClient({
  timelineStep,
  showBattles,
  showFrontLines,
  isDark,
  onBattleSelect,
  selectedBattleId,
}: MapClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const wFrontRef = useRef<any>(null);
  const eFrontRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  // ── INIT MAP ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // StrictMode fires this twice — bail if cleaned up or already initialised
      if (cancelled || !containerRef.current || mapRef.current) return;

      // Force-clear any stale Leaflet id left over from HMR / StrictMode
      const el = containerRef.current as any;
      if (el._leaflet_id) {
        delete el._leaflet_id;
        el.innerHTML = '';
      }

      let map: any;
      try {
        map = L.map(el, { center: [49.5, 8], zoom: 5, zoomControl: false, attributionControl: true });
      } catch {
        return; // Already initialised by a concurrent invocation — bail
      }
      if (cancelled) { map.remove(); return; }
      mapRef.current = map;

      // Add zoom control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Tile layer
      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      const tile = L.tileLayer(tileUrl, {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18,
      });
      tile.addTo(map);
      tileLayerRef.current = tile;

      // Front line polylines (start empty)
      const wFront = L.polyline([], {
        color: FRONT_COLOUR,
        weight: 4,
        opacity: 0.85,
        dashArray: '10, 6',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
      wFrontRef.current = wFront;

      const eFront = L.polyline([], {
        color: EAST_FRONT_COLOUR,
        weight: 3,
        opacity: 0.75,
        dashArray: '8, 5',
        lineCap: 'round',
      }).addTo(map);
      eFrontRef.current = eFront;

      // Battle markers
      allBattles.forEach(battle => {
        const colour = frontColours[battle.front];
        const icon = L.divIcon({
          className: '',
          html: `<div class="gw-marker" data-id="${battle.id}" style="background:${colour}99;border:2px solid ${colour};box-shadow:0 2px 8px rgba(0,0,0,0.45);">
                   <span style="font-size:14px;line-height:1;">${battle.emoji}</span>
                 </div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker([battle.lat, battle.lng], { icon })
          .on('click', () => onBattleSelect(battle))
          .addTo(map);

        // Start hidden
        marker.getElement()?.style && (marker.getElement()!.style.display = 'none');
        markersRef.current.set(battle.id, marker);
      });

      // Apply initial state
      applyTimelineStep(timelineStep, showBattles, showFrontLines);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
        wFrontRef.current = null;
        eFrontRef.current = null;
        tileLayerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── APPLY TIMELINE STATE ────────────────────────────────────────────────────
  function applyTimelineStep(step: number, battles: boolean, frontLines: boolean) {
    if (!mapRef.current) return;

    // Markers
    markersRef.current.forEach((marker, id) => {
      const battle = allBattles.find(b => b.id === id);
      if (!battle) return;
      const el = marker.getElement?.();
      if (!el) return;
      const visible = battles && battle.timelineStep <= step;
      el.style.display = visible ? 'block' : 'none';
      const inner = el.querySelector('.gw-marker') as HTMLElement | null;
      if (inner) {
        inner.style.transform = id === selectedBattleId ? 'scale(1.35)' : 'scale(1)';
        inner.style.boxShadow = id === selectedBattleId
          ? `0 0 0 4px rgba(201,168,76,0.65), 0 2px 12px rgba(0,0,0,0.5)`
          : '0 2px 8px rgba(0,0,0,0.45)';
      }
    });

    // Front lines
    const { frontKey } = (() => {
      // map step → frontKey
      const keys = ['none', 'forming', '1914', '1914', '1915-16', '1917', '1918-spring', '1918-autumn'];
      return { frontKey: keys[step] || 'none' };
    })();

    if (wFrontRef.current) {
      const coords = (frontLines && frontKey !== 'none') ? (westernFrontLines[frontKey] || []) : [];
      wFrontRef.current.setLatLngs(coords);
    }
    if (eFrontRef.current) {
      const eKey = ['none', 'none', '1914', '1914', '1915-16', '1917', '1918-spring', '1918-autumn'][step] || 'none';
      const coords = (frontLines && eKey !== 'none') ? (easternFrontLines[eKey] || []) : [];
      eFrontRef.current.setLatLngs(coords);
    }
  }

  // ── REACT TO PROP CHANGES ───────────────────────────────────────────────────
  useEffect(() => {
    applyTimelineStep(timelineStep, showBattles, showFrontLines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineStep, showBattles, showFrontLines, selectedBattleId]);

  // ── SWAP TILE LAYER ON THEME CHANGE ────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    (async () => {
      const L = (await import('leaflet')).default;
      tileLayerRef.current.remove();
      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      const tile = L.tileLayer(tileUrl, {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18,
      }).addTo(mapRef.current);
      tileLayerRef.current = tile;
    })();
  }, [isDark]);

  return (
    <>
      <style>{`
        .gw-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gw-marker:hover { transform: scale(1.2) !important; }
        .leaflet-control-attribution {
          font-size: 10px !important;
          background: rgba(0,0,0,0.4) !important;
          color: #aaa !important;
        }
        .leaflet-control-attribution a { color: #c9a84c !important; }
        .leaflet-control-zoom a {
          background: var(--bg-card, #fff) !important;
          color: var(--text-primary, #1c1409) !important;
          border-color: var(--border, #ddd) !important;
        }
      `}</style>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </>
  );
}

'use client';

import { createContext, use } from 'react';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const ThreatGaugeContext = createContext(null);

const LEVELS = [
  { id: 'low', label: 'Baixo', color: 'var(--secondary)' },
  { id: 'moderate', label: 'Moderado', color: 'var(--tertiary)' },
  { id: 'high', label: 'Alto', color: 'var(--primary)' },
  { id: 'critical', label: 'Crítico', color: '#ff3d00' },
];

/* ──────────────────────────────────────────────
   ThreatGauge.Root
   ────────────────────────────────────────────── */
function Root({ children, level = 'moderate', onChange }) {
  const levelIndex = LEVELS.findIndex((l) => l.id === level);
  const currentLevel = LEVELS[levelIndex] ?? LEVELS[1];

  return (
    <ThreatGaugeContext value={{ level, levelIndex, currentLevel, levels: LEVELS, onChange }}>
      <div className="flex flex-col gap-3">{children}</div>
    </ThreatGaugeContext>
  );
}

/* ──────────────────────────────────────────────
   ThreatGauge.Bar — segmented visual
   ────────────────────────────────────────────── */
function Bar({ interactive = false }) {
  const { levelIndex, levels, onChange } = use(ThreatGaugeContext);

  return (
    <div className="grid grid-cols-4 gap-1">
      {levels.map((l, i) => (
        <button
          key={l.id}
          type="button"
          className={`h-[6px] rounded-full bg-[var(--surface-container-highest)] border-none cursor-default transition-all duration-250 ${interactive ? "cursor-pointer h-[8px] hover:opacity-85 hover:scale-y-125" : ""}`}
          style={i <= levelIndex ? { background: l.color, boxShadow: `0 0 8px ${l.color}40` } : {}}
          onClick={interactive ? () => onChange?.(l.id) : undefined}
          aria-label={`Nível ${l.label}`}
          disabled={!interactive}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   ThreatGauge.Label
   ────────────────────────────────────────────── */
function Label() {
  const { currentLevel } = use(ThreatGaugeContext);
  return (
    <div className="flex items-center gap-2" style={{ color: currentLevel.color }}>
      <span className="w-2 h-2 rounded-full shrink-0 animate-pulse-glow" style={{ background: currentLevel.color }} />
      <span className="font-['Inter',sans-serif] text-[0.8125rem] font-[600] tracking-[0.04em] uppercase">{currentLevel.label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ThreatGauge.Selector — clickable level picker
   ────────────────────────────────────────────── */
function Selector({ value, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {LEVELS.map((l) => (
        <button
          key={l.id}
          type="button"
          className="p-[0.5rem_0.75rem] flex flex-1 justify-center items-center rounded-md text-[0.8125rem] font-[500] font-['Inter',sans-serif] border border-[rgba(90,65,56,0.2)] text-[var(--on-surface-variant)] bg-[var(--surface-container)] cursor-pointer transition-all duration-150 text-center hover:bg-[var(--surface-container-high)]"
          style={value === l.id ? { borderColor: l.color, color: l.color, background: `${l.color}12` } : {}}
          onClick={() => onChange?.(l.id)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export { Root, Bar, Label, Selector, LEVELS };

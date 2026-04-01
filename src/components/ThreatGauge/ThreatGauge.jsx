'use client';

import { createContext, use } from 'react';
import styles from './ThreatGauge.module.css';

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
      <div className={styles.root}>{children}</div>
    </ThreatGaugeContext>
  );
}

/* ──────────────────────────────────────────────
   ThreatGauge.Bar — segmented visual
   ────────────────────────────────────────────── */
function Bar({ interactive = false }) {
  const { levelIndex, levels, onChange } = use(ThreatGaugeContext);

  return (
    <div className={styles.bar}>
      {levels.map((l, i) => (
        <button
          key={l.id}
          type="button"
          className={`${styles.segment} ${i <= levelIndex ? styles.segmentActive : ''} ${interactive ? styles.segmentInteractive : ''}`}
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
    <div className={styles.label} style={{ color: currentLevel.color }}>
      <span className={styles.labelDot} style={{ background: currentLevel.color }} />
      <span className={styles.labelText}>{currentLevel.label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ThreatGauge.Selector — clickable level picker
   ────────────────────────────────────────────── */
function Selector({ value, onChange }) {
  return (
    <div className={styles.selector}>
      {LEVELS.map((l) => (
        <button
          key={l.id}
          type="button"
          className={`${styles.selectorBtn} ${value === l.id ? styles.selectorBtnActive : ''}`}
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

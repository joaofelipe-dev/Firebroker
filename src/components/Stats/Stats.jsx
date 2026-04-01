'use client';

import { createContext, use } from 'react';
import styles from './Stats.module.css';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const StatsContext = createContext(null);

/* ──────────────────────────────────────────────
   Stats.Root — grid wrapper
   ────────────────────────────────────────────── */
function Root({ children, columns = 4 }) {
  return (
    <StatsContext value={{ columns }}>
      <div
        className={styles.root}
        style={{ '--stats-cols': columns }}
      >
        {children}
      </div>
    </StatsContext>
  );
}

/* ──────────────────────────────────────────────
   Stats.Item
   ────────────────────────────────────────────── */
function Item({ value, label, icon, variant = 'default' }) {
  return (
    <div className={`${styles.item} ${styles[`item--${variant}`]}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Stats.Trend
   ────────────────────────────────────────────── */
function Trend({ value, direction = 'up', children }) {
  const isUp = direction === 'up';
  return (
    <div className={`${styles.trend} ${isUp ? styles['trend--up'] : styles['trend--down']}`}>
      <span>{isUp ? '↑' : '↓'} {value}</span>
      {children && <span className={styles.trendLabel}>{children}</span>}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export { Root, Item, Trend };

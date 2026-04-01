'use client';

import { createContext, use } from 'react';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const StatsContext = createContext(null);

/* ──────────────────────────────────────────────
   Stats.Root — grid wrapper
   ────────────────────────────────────────────── */
function Root({ children, columns = 4 }) {
  // Using dynamic inline CSS for the varying columns at 900px
  return (
    <StatsContext value={{ columns }}>
      <div
        className="grid grid-cols-1 gap-4 max-[479px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(var(--stats-cols,4),_1fr)]"
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
  const baseClasses = "bg-[var(--surface-container)] rounded-2xl p-6 flex flex-col gap-2 border transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]";
  
  const variants = {
    default: "border-[rgba(90,65,56,0.12)]",
    fire: "border-[rgba(255,87,34,0.15)] bg-gradient-to-br from-[var(--surface-container)] to-[rgba(255,87,34,0.04)]",
    success: "border-[rgba(136,217,130,0.12)]",
    warning: "border-[rgba(255,184,101,0.12)]"
  };

  return (
    <div className={`${baseClasses} ${variants[variant] || variants.default}`}>
      {icon && <span className="text-[1.5rem] leading-none">{icon}</span>}
      <span className="font-['Manrope',sans-serif] text-[2.25rem] font-extrabold text-[var(--on-surface)] tracking-[-0.04em] leading-none">{value}</span>
      <span className="text-[0.8125rem] font-medium text-[var(--on-surface-variant)] opacity-65">{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Stats.Trend
   ────────────────────────────────────────────── */
function Trend({ value, direction = 'up', children }) {
  const isUp = direction === 'up';
  
  return (
    <div className={`inline-flex items-center gap-2 text-[0.75rem] font-semibold mt-1 ${isUp ? 'text-[var(--secondary)]' : 'text-[var(--primary)]'}`}>
      <span>{isUp ? '↑' : '↓'} {value}</span>
      {children && <span className="text-[var(--on-surface-variant)] font-normal opacity-65">{children}</span>}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export { Root, Item, Trend };

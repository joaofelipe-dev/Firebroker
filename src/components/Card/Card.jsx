'use client';

import { createContext, use } from 'react';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const CardContext = createContext(null);

/* ──────────────────────────────────────────────
   Card.Root — main container
   ────────────────────────────────────────────── */
function Root({ children, outline = false, className = '' }) {
  return (
    <CardContext value={{ outline }}>
      <div
        className={`bg-[var(--surface-container)] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg ${
          outline ? 'border border-[rgba(90,65,56,0.12)]' : 'shadow-sm'
        } ${className}`}
      >
        {children}
      </div>
    </CardContext>
  );
}

/* ──────────────────────────────────────────────
   Card.Header — header section
   ────────────────────────────────────────────── */
function Header({ children, className = '' }) {
  return (
    <div className={`p-6 border-b border-[rgba(90,65,56,0.08)] ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Card.Title — header title
   ────────────────────────────────────────────── */
function Title({ children, className = '' }) {
  return (
    <h2 className={`text-[1.25rem] font-bold text-[var(--on-surface)] m-0 ${className}`}>
      {children}
    </h2>
  );
}

/* ──────────────────────────────────────────────
   Card.Body — main content area
   ────────────────────────────────────────────── */
function Body({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Card.Footer — footer section
   ────────────────────────────────────────────── */
function Footer({ children, className = '' }) {
  return (
    <div className={`p-6 border-t border-[rgba(90,65,56,0.08)] text-[0.875rem] text-[var(--on-surface-variant)] ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Card.Badge — status badge
   ────────────────────────────────────────────── */
function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[rgba(90,65,56,0.1)] text-[var(--on-surface-variant)]',
    warning: 'bg-[rgba(255,184,101,0.15)] text-[#ffb865]',
    success: 'bg-[rgba(136,217,130,0.15)] text-[var(--secondary)]',
    error: 'bg-[rgba(243,36,36,0.15)] text-[var(--error)]',
    fire: 'bg-[rgba(255,87,34,0.15)] text-[var(--primary)]',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[0.75rem] font-semibold tracking-[0.04em] uppercase ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export {
  Root,
  Header,
  Title,
  Body,
  Footer,
  Badge,
};

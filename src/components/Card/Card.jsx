'use client';

import { createContext, use } from 'react';
import styles from './Card.module.css';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const CardContext = createContext(null);

function useCard() {
  return use(CardContext);
}

/* ──────────────────────────────────────────────
   Card.Root
   ────────────────────────────────────────────── */
function Root({ children, variant = 'default', className = '', onClick, as: Tag = 'div' }) {
  return (
    <CardContext value={{ variant }}>
      <Tag
        className={`${styles.root} ${styles[`root--${variant}`]} ${className}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      >
        {children}
      </Tag>
    </CardContext>
  );
}

/* ──────────────────────────────────────────────
   Card.Header
   ────────────────────────────────────────────── */
function Header({ children, icon, action }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        {icon && <span className={styles.headerIcon}>{icon}</span>}
        <div className={styles.headerContent}>{children}</div>
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Card.Body
   ────────────────────────────────────────────── */
function Body({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
}

/* ──────────────────────────────────────────────
   Card.Footer
   ────────────────────────────────────────────── */
function Footer({ children }) {
  return <div className={styles.footer}>{children}</div>;
}

/* ──────────────────────────────────────────────
   Card.Badge
   ────────────────────────────────────────────── */
function Badge({ children, variant = 'default' }) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${variant}`]}`}>
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────────
   Card.Title
   ────────────────────────────────────────────── */
function Title({ children, as: Tag = 'h3' }) {
  return <Tag className={styles.title}>{children}</Tag>;
}

/* ──────────────────────────────────────────────
   Card.Description
   ────────────────────────────────────────────── */
function Description({ children }) {
  return <p className={styles.description}>{children}</p>;
}

/* ──────────────────────────────────────────────
   Card.Divider
   ────────────────────────────────────────────── */
function Divider() {
  return <div className={styles.divider} />;
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export { Root, Header, Title, Description, Body, Footer, Badge, Divider };

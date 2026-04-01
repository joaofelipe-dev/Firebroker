"use client";

import { createContext, use, useState } from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

/* ──────────────────────────────────────────────
   Context & Provider
   ────────────────────────────────────────────── */
const NavigationContext = createContext(null);

function useNavigation() {
  const ctx = use(NavigationContext);
  if (!ctx)
    throw new Error(
      "Navigation subcomponents must be used inside <Navigation.Provider>",
    );
  return ctx;
}

function Provider({ children, activeItem }) {
  const [active, setActive] = useState(activeItem ?? "");
  return (
    <NavigationContext value={{ active, setActive }}>
      {children}
    </NavigationContext>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Brand
   ────────────────────────────────────────────── */
function Brand({ href = "/", children }) {
  return (
    <Link href={href} className={styles.brand}>
      <span className={styles.brandIcon}>🔥</span>
      <span className={styles.brandName}>{children ?? "FireBroker"}</span>
      <span className={styles.brandTag}>SENTINEL</span>
    </Link>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Menu
   ────────────────────────────────────────────── */
function Menu({ children, vertical = false }) {
  return (
    <nav
      className={`${styles.menu} ${vertical ? styles.menuVertical : styles.menuHorizontal}`}
      role="navigation"
    >
      {children}
    </nav>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Item
   ────────────────────────────────────────────── */
function Item({ href, id, icon, children, onClick }) {
  const { active, setActive } = useNavigation();
  const isActive = active === id;

  return (
    <Link
      href={href}
      className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
      onClick={() => {
        setActive(id);
        onClick?.();
      }}
    >
      {icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </Link>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Action — CTA button
   ────────────────────────────────────────────── */
function Action({ href, children, variant = "primary" }) {
  return (
    <Link
      href={href}
      className={`${styles.action} ${styles[`action--${variant}`]}`}
    >
      {children}
    </Link>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Bar — wrapper glassmorphism
   ────────────────────────────────────────────── */
function Bar({ children }) {
  return (
    <header className={styles.bar}>
      <div className={styles.barInner}>{children}</div>
    </header>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Sidebar — vertical admin sidebar
   ────────────────────────────────────────────── */
function Sidebar({ children }) {
  return <aside className={styles.sidebar}>{children}</aside>;
}

/* ──────────────────────────────────────────────
   Export as compound component
   ────────────────────────────────────────────── */
export { Provider, Bar, Sidebar, Brand, Menu, Item, Action };

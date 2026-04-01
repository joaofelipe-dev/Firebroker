'use client';

import { createContext, use, useState } from 'react';
import Link from 'next/link';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const NavigationContext = createContext(null);

function useNavigation() {
  return use(NavigationContext);
}

/* ──────────────────────────────────────────────
   Navigation.Provider
   ────────────────────────────────────────────── */
function Provider({ children, activeItem }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <NavigationContext value={{ activeItem, isMobileOpen, setIsMobileOpen }}>
      {children}
    </NavigationContext>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Bar — horizontal top navigation
   ────────────────────────────────────────────── */
function Bar({ children }) {
  const { isMobileOpen, setIsMobileOpen } = useNavigation();

  return (
    <nav className="sticky top-0 z-50 bg-[var(--surface-container-low)] border-b border-[rgba(90,65,56,0.1)] relative">
      <div className="px-5 md:px-8 py-4 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {children}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md text-[var(--on-surface-variant)] hover:bg-[rgba(255,87,34,0.1)] transition-colors ml-auto"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Sidebar — vertical side navigation
   ────────────────────────────────────────────── */
function Sidebar({ children }) {
  const { isMobileOpen, setIsMobileOpen } = useNavigation();

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-[var(--surface-container-low)] border-b border-[rgba(90,65,56,0.1)]">
        <Brand />
        <button
          className="p-2 rounded-md text-[var(--on-surface-variant)] hover:bg-[rgba(255,87,34,0.1)] transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
      <aside className={`
        ${isMobileOpen ? 'flex' : 'hidden'} 
        lg:flex 
        w-full lg:w-64 
        bg-[var(--surface-container-low)] 
        border-b lg:border-b-0 lg:border-r border-[rgba(90,65,56,0.1)] 
        flex-col overflow-y-auto
      `}>
        {children}
      </aside>
    </>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Brand — logo/branding
   ────────────────────────────────────────────── */
function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-['Manrope',sans-serif] font-bold text-[1.25rem] text-[var(--primary)] hover:opacity-80 transition-opacity">
      <span className="text-[1.5rem]">🔥</span>
      <span>FireBroker</span>
    </Link>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Menu — menu container
   ────────────────────────────────────────────── */
function Menu({ children, orientation = 'horizontal' }) {
  const { isMobileOpen } = useNavigation();

  if (orientation === 'vertical') {
    return (
      <ul className="flex flex-col gap-2 list-none m-0 px-2 flex-1">
        {children}
      </ul>
    );
  }

  return (
    <>
      <ul className="hidden md:flex items-center gap-2 flex-1 list-none m-0 p-0">
        {children}
      </ul>
      {isMobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--surface-container-low)] border-b border-[rgba(90,65,56,0.1)] shadow-lg md:hidden">
          <ul className="flex flex-col gap-2 p-4 list-none m-0">
            {children}
          </ul>
        </div>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Item — individual menu item
   ────────────────────────────────────────────── */
function Item({ id, href, icon, children }) {
  const { activeItem, setIsMobileOpen } = useNavigation();
  const isActive = activeItem === id;

  return (
    <li>
      <Link
        href={href}
        onClick={() => setIsMobileOpen?.(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-[0.875rem] font-medium transition-all duration-150 ${isActive
          ? 'bg-[var(--primary)] text-white'
          : 'text-[var(--on-surface-variant)] hover:bg-[rgba(255,87,34,0.1)]'
          }`}
      >
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    </li>
  );
}

/* ──────────────────────────────────────────────
   Navigation.Action — CTA button
   ────────────────────────────────────────────── */
function Action({
  href = '#',
  variant = 'filled',
  children,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-[0.875rem] transition-all duration-150 font-[\'Inter\',sans-serif] drop-shadow-[0_2px_10px_rgba(255,87,34,0.3)]';

  const variants = {
    filled:
      'bg-gradient-to-br from-[var(--primary)] to-[var(--primary)/0.6] text-[var(--on-primary)] hover:shadow-lg hover:-translate-y-[2px]',
    ghost:
      'bg-transparent border border-[rgba(90,65,56,0.2)] text-[var(--on-surface)] hover:bg-[rgba(255,87,34,0.1)]',
  };

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant] || variants.filled} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export {
  Provider,
  Bar,
  Sidebar,
  Brand,
  Menu,
  Item,
  Action,
};

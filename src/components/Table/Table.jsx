'use client';

import { createContext, use, useState } from 'react';

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const TableContext = createContext(null);

function useTable() {
  return use(TableContext);
}

/* ──────────────────────────────────────────────
   Table.Root
   ────────────────────────────────────────────── */
function Root({ children, onRowClick, selectable = false }) {
  const [selectedRow, setSelectedRow] = useState(null);

  function handleRowClick(id) {
    if (selectable) setSelectedRow(id === selectedRow ? null : id);
    onRowClick?.(id);
  }

  return (
    <TableContext value={{ onRowClick: handleRowClick, selectedRow, selectable }}>
      <div className="overflow-x-auto rounded-2xl border border-[rgba(90,65,56,0.12)] bg-[var(--surface-container)]">
        <table className="w-full border-collapse font-['Inter',sans-serif]">
          {children}
        </table>
      </div>
    </TableContext>
  );
}

/* ──────────────────────────────────────────────
   Table.Head
   ────────────────────────────────────────────── */
function Head({ children }) {
  return <thead className="border-b border-[rgba(90,65,56,0.12)] bg-[var(--surface-container-low)]">{children}</thead>;
}

/* ──────────────────────────────────────────────
   Table.HeadCell
   ────────────────────────────────────────────── */
function HeadCell({ children, align = 'left' }) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <th className={`p-[1rem_1.25rem] text-[0.75rem] font-[600] uppercase tracking-[0.05em] text-[var(--on-surface-variant)] bg-transparent whitespace-nowrap ${alignClasses[align] || alignClasses.left}`}>
      {children}
    </th>
  );
}

/* ──────────────────────────────────────────────
   Table.Body
   ────────────────────────────────────────────── */
function Body({ children }) {
  return <tbody>{children}</tbody>;
}

/* ──────────────────────────────────────────────
   Table.Row
   ────────────────────────────────────────────── */
function Row({ children, id, clickable = false }) {
  const { onRowClick, selectedRow } = useTable();
  const isSelected = selectedRow === id;

  const baseClasses = "border-b border-[rgba(90,65,56,0.08)] transition-colors duration-150 last:border-b-0";
  const hoverClasses = clickable ? "cursor-pointer hover:bg-[rgba(255,255,255,0.02)]" : "";
  const selectedClasses = isSelected ? "bg-[rgba(255,87,34,0.06)]" : "";

  return (
    <tr
      className={`${baseClasses} ${hoverClasses} ${selectedClasses}`}
      onClick={clickable ? () => onRowClick?.(id) : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </tr>
  );
}

/* ──────────────────────────────────────────────
   Table.Cell
   ────────────────────────────────────────────── */
function Cell({ children, align = 'left', muted = false }) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <td className={`p-[1rem_1.25rem] text-[0.875rem] whitespace-nowrap ${muted ? 'text-[var(--on-surface-variant)]' : 'text-[var(--on-surface)]'} ${alignClasses[align] || alignClasses.left}`}>
      {children}
    </td>
  );
}

/* ──────────────────────────────────────────────
   Table.Empty
   ────────────────────────────────────────────── */
function Empty({ children, colSpan = 99 }) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-[3rem_1.25rem] text-center text-[var(--on-surface-variant)] text-[0.875rem] italic">
        {children || 'Nenhum dado encontrado.'}
      </td>
    </tr>
  );
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export { Root, Head, HeadCell, Body, Row, Cell, Empty };

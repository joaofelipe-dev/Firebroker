'use client';

import { createContext, use, useState } from 'react';
import styles from './Table.module.css';

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
      <div className={styles.wrapper}>
        <table className={styles.table}>
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
  return <thead className={styles.head}>{children}</thead>;
}

/* ──────────────────────────────────────────────
   Table.HeadCell
   ────────────────────────────────────────────── */
function HeadCell({ children, align = 'left' }) {
  return (
    <th className={`${styles.headCell} ${styles[`align-${align}`]}`}>
      {children}
    </th>
  );
}

/* ──────────────────────────────────────────────
   Table.Body
   ────────────────────────────────────────────── */
function Body({ children }) {
  return <tbody className={styles.body}>{children}</tbody>;
}

/* ──────────────────────────────────────────────
   Table.Row
   ────────────────────────────────────────────── */
function Row({ children, id, clickable = false }) {
  const { onRowClick, selectedRow } = useTable();
  const isSelected = selectedRow === id;

  return (
    <tr
      className={`${styles.row} ${clickable ? styles.rowClickable : ''} ${isSelected ? styles.rowSelected : ''}`}
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
  return (
    <td className={`${styles.cell} ${styles[`align-${align}`]} ${muted ? styles.cellMuted : ''}`}>
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
      <td colSpan={colSpan} className={styles.empty}>
        {children || 'Nenhum dado encontrado.'}
      </td>
    </tr>
  );
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export { Root, Head, HeadCell, Body, Row, Cell, Empty };

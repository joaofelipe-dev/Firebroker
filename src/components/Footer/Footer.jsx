'use client';

export const Footer = () => {
  return (
    <footer className="bg-[var(--surface-container-low)] border-t border-[rgba(90,65,56,0.1)] py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-[var(--on-surface-variant)] text-[0.875rem]">
          João Felipe - FireBroker © 2026
        </p>
        <p className="text-[var(--on-surface-variant)] opacity-60 text-[0.75rem]">
          Transformando olhos atentos em ações decisivas.
        </p>
      </div>
    </footer>
  );
};

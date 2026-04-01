'use client';

import dynamic from 'next/dynamic';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { useState } from "react";

// Carregar o componente Map dinamicamente sem SSR
const DynamicMap = dynamic(() => import("@/components/Map").then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--surface-container-low)]">
      <div className="text-center">
        <div className="text-[2rem] mb-4">🗺️</div>
        <p className="text-[var(--on-surface-variant)]">Carregando mapa...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [showLegend, setShowLegend] = useState(true);

  return (
    <>
      <Navigation.Provider activeItem="map">
        <Navigation.Bar>
          <Navigation.Brand />
          <Navigation.Menu>
            <Navigation.Item id="home" href="/">
              Início
            </Navigation.Item>
            <Navigation.Item id="map" href="/map">
              Mapa
            </Navigation.Item>
            <Navigation.Item id="how-it-works" href="/how-it-works">
              Como Funciona
            </Navigation.Item>
            <Navigation.Item id="report" href="/report">
              Denunciar
            </Navigation.Item>
            <Navigation.Item id="admin" href="/admin">
              Admin
            </Navigation.Item>
          </Navigation.Menu>
        </Navigation.Bar>
      </Navigation.Provider>

      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-theme(spacing.16))] bg-[var(--surface)]">
        {/* MAPA - PRINCIPAL */}
        <div className="flex-1 relative order-2 lg:order-1">
          <DynamicMap height="calc(100vh - 64px)" />

          {/* Botão para toggle de legenda em mobile */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="absolute top-4 left-4 z-10 lg:hidden bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow"
            title="Mostrar/Ocultar Legenda"
          >
            📋
          </button>
        </div>

        {/* PAINEL LATERAL - LEGENDA E INFORMAÇÕES */}
        <aside
          className={`w-full lg:w-80 bg-[var(--surface-container-low)] border-t lg:border-l lg:border-t-0 border-[rgba(90,65,56,0.1)] flex flex-col overflow-y-auto transition-all duration-300 ${!showLegend && 'max-h-0 lg:max-h-full overflow-hidden lg:overflow-y-auto'
            }`}
        >
          {/* Header */}
          <div className="sticky top-0 p-6 bg-[var(--surface-container)] border-b border-[rgba(90,65,56,0.1)]">
            <h2 className="text-[1.25rem] font-bold text-[var(--on-surface)]">
              Mapa de Focos
            </h2>
            <p className="text-[0.875rem] text-[var(--on-surface-variant)] mt-2">
              Ribeirão Preto, SP
            </p>
          </div>

          {/* Legend */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-[0.875rem] font-semibold text-[var(--on-surface)] uppercase tracking-[0.04em] mb-3">
                Nível de Severidade
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: '#ff3d00' }}
                  />
                  <span className="text-[0.875rem]">Crítico</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: '#ff5722' }}
                  />
                  <span className="text-[0.875rem]">Alto</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: '#ffc069' }}
                  />
                  <span className="text-[0.875rem]">Moderado</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: '#88d982' }}
                  />
                  <span className="text-[0.875rem]">Baixo</span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <Card.Root className="mt-6 border border-[rgba(255,87,34,0.2)]">
              <Card.Body className="text-[0.875rem]">
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-[var(--on-surface)]">
                      Como usar
                    </div>
                    <ul className="text-[var(--on-surface-variant)] text-[0.8125rem] mt-2 space-y-1">
                      <li>• Role para zoom</li>
                      <li>• Arraste para mover</li>
                      <li>• Clique em marcadores</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--on-surface)]">
                      Focos Ativos
                    </div>
                    <p className="text-[var(--on-surface-variant)] text-[0.8125rem] mt-2">
                      4 incêndios monitorados nas últimas 3 horas
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card.Root>
          </div>

          {/* CTA */}
          <div className="p-6 mt-auto border-t border-[rgba(90,65,56,0.1)]">
            <Navigation.Action
              href="/report"
              className="w-full justify-center"
            >
              🔥 Reportar Foco
            </Navigation.Action>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
}

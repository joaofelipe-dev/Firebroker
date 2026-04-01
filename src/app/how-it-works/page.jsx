'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";

export default function HowItWorks() {
  return (
    <>
      <Navigation.Provider activeItem="how-it-works">
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

      <main className="py-16 px-8 min-h-[80vh] bg-[var(--surface)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-extrabold mb-4 leading-tight">
              Como Funciona
            </h1>
            <p className="text-[1.125rem] text-[var(--on-surface-variant)] max-w-[600px]">
              O FireBroker é uma plataforma que utiliza inteligência artificial para detectar e combater incêndios florestais em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Step 1 */}
            <Card.Root>
              <Card.Header>
                <div className="flex items-center gap-4">
                  <span className="text-[2rem]">👁️</span>
                  <Card.Title>Detecção Comunitária</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="text-[var(--on-surface-variant)]">
                  Cidadãos atentos reportam focos de incêndio através da plataforma, fornecendo fotos, localização e descrição detalhada do incidente.
                </p>
              </Card.Body>
            </Card.Root>

            {/* Step 2 */}
            <Card.Root>
              <Card.Header>
                <div className="flex items-center gap-4">
                  <span className="text-[2rem]">🛰️</span>
                  <Card.Title>Análise Orbital</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="text-[var(--on-surface-variant)]">
                  Os dados são cruzados automaticamente com satélites do INPE, confirmando incêndios e detectando focos não reportados.
                </p>
              </Card.Body>
            </Card.Root>

            {/* Step 3 */}
            <Card.Root>
              <Card.Header>
                <div className="flex items-center gap-4">
                  <span className="text-[2rem]">🤖</span>
                  <Card.Title>Análise de IA</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="text-[var(--on-surface-variant)]">
                  Algoritmos analisam severidade, trajetória prevista e riscos adjacentes para priorizar respostas.
                </p>
              </Card.Body>
            </Card.Root>

            {/* Step 4 */}
            <Card.Root>
              <Card.Header>
                <div className="flex items-center gap-4">
                  <span className="text-[2rem]">🚒</span>
                  <Card.Title>Despacho Tactical</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="text-[var(--on-surface-variant)]">
                  Equipes de resposta são despachadas automaticamente com todas as informações necessárias para ação imediata.
                </p>
              </Card.Body>
            </Card.Root>
          </div>

          <Card.Root className="mt-12 border border-[rgba(255,87,34,0.2)]">
            <Card.Header>
              <Card.Title>Resultado</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-[2.25rem] font-extrabold text-[var(--primary)]">2.4m</div>
                  <p className="text-[var(--on-surface-variant)] text-[0.875rem]">
                    Tempo médio de resposta
                  </p>
                </div>
                <div>
                  <div className="text-[2.25rem] font-extrabold text-[var(--secondary)]">42%</div>
                  <p className="text-[var(--on-surface-variant)] text-[0.875rem]">
                    Redução em áreas queimadas
                  </p>
                </div>
                <div>
                  <div className="text-[2.25rem] font-extrabold text-[var(--tertiary)]">14k</div>
                  <p className="text-[var(--on-surface-variant)] text-[0.875rem]">
                    Denúncias atendidas
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </main>

      <Footer />
    </>
  );
}

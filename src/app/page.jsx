"use client";
import { Navigation } from "@/components/Navigation";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation.Provider activeItem="home">
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

      <main>
        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex items-center justify-center px-8 py-16 bg-[radial-gradient(circle_at_center_top,rgba(34, 108, 255, 0.1)_0%,var(--surface)_60%)]">
          <div className="max-w-[800px] text-center flex flex-col items-center gap-6">
            <h1 className="text-[clamp(3rem,6vw,5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
              Fire Broker <br />
              <span className="gradient-fire-text">Inteligência Ambiental</span>
            </h1>
            <p className="text-[1.25rem] text-[var(--on-surface-variant)] max-w-[600px] opacity-80">
              Transformando olhos atentos em ações decisivas. O FireBroker cruza
              dados comunitários com análise orbital para preservar os biomas
              brasileiros.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Navigation.Action href="/report">
                Fazer Denúncia
              </Navigation.Action>
              <Navigation.Action href="/how-it-works" variant="ghost">
                Como Funciona
              </Navigation.Action>
            </div>
          </div>
        </section>

        {/* STATUS SECTION */}
        <section className="py-16 px-8 bg-[var(--surface-container-low)]">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[2rem] mb-8">
              Impacto em Tempo Real
            </h2>
            <Stats.Root columns={4}>
              <Stats.Item
                variant="success"
                icon="⏱️"
                value="2.4m"
                label="Tempo Médio de Validação"
              />
              <Stats.Item
                variant="fire"
                icon="🌲"
                value="42%"
                label="Redução em Áreas Queimadas"
              />
              <Stats.Item icon="🔥" value="14k" label="Denúncias Atendidas" />
              <Stats.Item icon="👥" value="8.2k" label="Usuários Ativos 24h" />
            </Stats.Root>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

"use client";
import { Navigation } from "@/components/Navigation";
import { Stats } from "@/components/Stats";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation.Provider activeItem="home">
        <Navigation.Bar>
          <Navigation.Brand />
          <Navigation.Menu>
            <Navigation.Item id="home" href="/" icon="🏠">
              Início
            </Navigation.Item>
            <Navigation.Item id="map" href="/" icon="🗺️">
              Mapa
            </Navigation.Item>
            <Navigation.Item id="analytics" href="/" icon="📊">
              Dados
            </Navigation.Item>
          </Navigation.Menu>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Navigation.Action href="/admin" variant="ghost">
              ⚙️ Admin
            </Navigation.Action>
            <Navigation.Action href="/report">
              🔥 Reportar Foco
            </Navigation.Action>
          </div>
        </Navigation.Bar>
      </Navigation.Provider>

      <main>
        {/* HERO SECTION */}
        <section
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-8)",
            background:
              "radial-gradient(circle at center top, rgba(255, 87, 34, 0.1) 0%, var(--surface) 60%)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-6)",
            }}
          >
            <Card.Badge variant="fire">
              SISTEMA ATIVO • ALERTA VERMELHO
            </Card.Badge>
            <h1
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              The Sentinel <br />
              <span className="gradient-fire-text">Inteligência Ambiental</span>
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--on-surface-variant)",
                maxWidth: 600,
                opacity: 0.8,
              }}
            >
              Transformando olhos atentos em ações decisivas. O FireBroker cruza
              dados comunitários com análise orbital para preservar os biomas
              brasileiros.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "var(--space-4)",
                marginTop: "var(--space-4)",
              }}
            >
              <Navigation.Action href="/report">
                Fazer Denúncia
              </Navigation.Action>
              <Navigation.Action href="/" variant="ghost">
                Como Funciona
              </Navigation.Action>
            </div>
          </div>
        </section>

        {/* STATUS SECTION */}
        <section
          style={{
            padding: "var(--space-16) var(--space-8)",
            background: "var(--surface-container-low)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "var(--space-8)" }}>
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

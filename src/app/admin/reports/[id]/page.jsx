"use client";

import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { ThreatGauge } from "@/components/ThreatGauge";
import { Navigation } from "@/components/Navigation";
import styles from "../../Admin.module.css";

export default function ReportDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // In a real app we would fetch the report data using use() or useEffect
  // For now we mock the data for ID 1092
  const report = {
    id: params.id,
    type: "Incêndio Florestal",
    description:
      "Fumaça negra muito densa subindo da encosta norte. Volume aumentou drasticamente nos últimos 15 minutos e o vento está empurrando na direção leste. Sem equipes visíveis no local.",
    reporterId: "USR-992a",
    time: "14 de Agosto, 14:32 BRT",
    severity: "critical",
    location: "-18.1567, -57.4421 (Serra do Amolar, Pantanal)",
    status: "Verificando",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
      }}
    >
      {/* Header / Back Action */}
      <div>
        <button
          onClick={() => router.push("/admin")}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--primary)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            padding: "var(--space-2) 0",
            marginBottom: "var(--space-2)",
          }}
        >
          ⬅ Voltar para Dashboard
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>
            Relatório #{report.id}
          </h1>
          <Card.Badge variant="warning">{report.status}</Card.Badge>
        </div>
        <p style={{ color: "var(--on-surface-variant)" }}>
          Registrado por {report.reporterId} • {report.time}
        </p>
      </div>

      <div className={styles.detailsGrid}>
        {/* Main Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <Card.Root>
            <Card.Header>
              <Card.Title>Informações do Incidente</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--on-surface-variant)",
                      textTransform: "uppercase",
                    }}
                  >
                    Descrição da Situação
                  </div>
                  <p style={{ lineHeight: 1.6, marginTop: "var(--space-2)" }}>
                    {report.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "var(--space-4)",
                    background: "var(--surface-container-low)",
                    padding: "var(--space-4)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--on-surface-variant)",
                        textTransform: "uppercase",
                      }}
                    >
                      Tipo
                    </div>
                    <div
                      style={{ marginTop: "var(--space-2)", fontWeight: 500 }}
                    >
                      {report.type}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--on-surface-variant)",
                        textTransform: "uppercase",
                      }}
                    >
                      Coordenadas
                    </div>
                    <div
                      style={{
                        marginTop: "var(--space-2)",
                        fontWeight: 500,
                        fontFamily: "Courier New, monospace",
                      }}
                    >
                      {report.location}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card.Root>

          {/* Map Placeholder */}
          <Card.Root>
            <div
              style={{
                height: 300,
                background: "var(--surface-container-high)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--on-surface-variant)",
              }}
            >
              [ Integração com Mapa Orbital Sentinel ]
            </div>
            <Card.Footer>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "var(--on-surface-variant)",
                }}
              >
                Dados cruzados com satélites do INPE em tempo real.
              </span>
            </Card.Footer>
          </Card.Root>
        </div>

        {/* Action Panel / Sidebar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <Card.Root>
            <Card.Header>
              <Card.Title>Análise de Risco</Card.Title>
            </Card.Header>
            <Card.Body>
              <ThreatGauge.Root level={report.severity}>
                <ThreatGauge.Label />
                <div style={{ height: "var(--space-4)" }} />
                <ThreatGauge.Bar />
              </ThreatGauge.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root outline>
            <Card.Header>
              <Card.Title>Ações Operacionais</Card.Title>
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                <Navigation.Action
                  href="#"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Despachar Equipe
                </Navigation.Action>
                <Navigation.Action
                  href="#"
                  variant="ghost"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Aviso Cívil (Sirene)
                </Navigation.Action>
                <button
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--on-surface)",
                    padding: "var(--space-3)",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Baixar Risco para Moderado
                </button>
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  );
}

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ReportForm } from "@/components/ReportForm";
import { Card } from "@/components/Card";

export const metadata = {
  title: "Reportar Incêndio | FireBroker",
};

export default function ReportPage() {
  return (
    <>
      <Navigation.Provider activeItem="report">
        <Navigation.Bar>
          <Navigation.Brand />
          <Navigation.Menu>
            <Navigation.Item id="home" href="/" icon="🏠">
              Início
            </Navigation.Item>
            <Navigation.Item id="report" href="/report" icon="🔥">
              Reportar Foco
            </Navigation.Item>
          </Navigation.Menu>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Navigation.Action href="/admin" variant="ghost">
              ⚙️ Admin
            </Navigation.Action>
          </div>
        </Navigation.Bar>
      </Navigation.Provider>

      <main
        style={{
          minHeight: "80vh",
          padding: "var(--space-12) var(--space-8)",
          background: "var(--surface)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: "var(--space-8)", textAlign: "center" }}>
            <Card.Badge variant="warning">Prioridade Alta</Card.Badge>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                margin: "var(--space-4) 0",
              }}
            >
              Registrar Foco de Incêndio
            </h1>
            <p
              style={{
                color: "var(--on-surface-variant)",
                fontSize: "1.125rem",
              }}
            >
              Forneça detalhes precisos. A equipe Sentinel usará essas
              informações para despachar unidades de contenção.
            </p>
          </div>

          <Card.Root>
            <Card.Body>
              <ReportForm.Provider>
                <ReportForm.StateGate>
                  <ReportForm.Frame>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "var(--space-4)",
                      }}
                    >
                      <ReportForm.Select
                        label="Tipo de Incidente"
                        fieldName="incidentType"
                        required
                        options={[
                          { label: "Incêndio Florestal", value: "forest" },
                          {
                            label: "Queimada Agrícola Ilegal",
                            value: "agriculture",
                          },
                          { label: "Foco Urbano/Periférico", value: "urban" },
                          { label: "Outro", value: "other" },
                        ]}
                      />
                      <ReportForm.Severity />
                    </div>

                    <ReportForm.Location />

                    <ReportForm.Field
                      label="Descrição da Situação"
                      fieldName="description"
                      as="textarea"
                      placeholder="Descreva cor e volume da fumaça, direção do vento, proximidade de fiações elétricas ou construções..."
                      required
                    />

                    <ReportForm.Upload />

                    <div
                      style={{
                        marginTop: "var(--space-4)",
                        padding: "var(--space-4)",
                        background: "var(--surface-container-highest)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <ReportForm.Toggle
                        fieldName="anonymous"
                        label="Ocultar minha identidade publicamente (modo Anônimo Ativado)"
                      />
                    </div>

                    <ReportForm.Submit />
                  </ReportForm.Frame>
                </ReportForm.StateGate>
              </ReportForm.Provider>
            </Card.Body>
          </Card.Root>
        </div>
      </main>

      <Footer />
    </>
  );
}

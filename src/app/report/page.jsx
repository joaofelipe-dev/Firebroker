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

      <main className="min-h-[80vh] py-12 px-8 bg-[var(--surface)]">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8 text-center">
            <Card.Badge variant="warning">Prioridade Alta</Card.Badge>
            <h1 className="text-[2.5rem] font-extrabold my-4">
              Registrar Foco de Incêndio
            </h1>
            <p className="text-[var(--on-surface-variant)] text-[1.125rem]">
              Forneça detalhes precisos. A equipe FireBrokers usará essas
              informações para despachar unidades de contenção.
            </p>
          </div>

          <Card.Root>
            <Card.Body>
              <ReportForm.Provider>
                <ReportForm.StateGate>
                  <ReportForm.Frame>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
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

                    <div className="mt-4 p-4 bg-[var(--surface-container-highest)] rounded-md">
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

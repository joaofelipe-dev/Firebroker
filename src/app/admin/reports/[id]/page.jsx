"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { Card } from "@/components/Card";
import { ThreatGauge } from "@/components/ThreatGauge";
import { Navigation } from "@/components/Navigation";

const DynamicMap = dynamic(() => import("@/components/Map").then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full flex items-center justify-center bg-[var(--surface-container-low)]">
      <div className="text-center">
        <p className="text-[var(--on-surface-variant)] text-[0.875rem]">Carregando mapa orbital...</p>
      </div>
    </div>
  ),
});

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
    <div className="flex flex-col gap-6">
      {/* Header / Back Action */}
      <div>
        <button
          onClick={() => router.push("/admin")}
          className="bg-transparent border-none text-[var(--primary)] cursor-pointer font-['Inter',sans-serif] font-semibold py-2 mb-2 hover:underline"
        >
          ⬅ Voltar para Dashboard
        </button>
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] font-extrabold m-0 font-['Manrope',sans-serif] tracking-[-0.02em]">
            Relatório #{report.id}
          </h1>
          <Card.Badge variant="warning">{report.status}</Card.Badge>
        </div>
        <p className="text-[var(--on-surface-variant)] text-[0.875rem] opacity-80 mt-1">
          Registrado por {report.reporterId} • {report.time}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Main Details */}
        <div className="flex flex-col gap-6">
          <Card.Root>
            <Card.Header>
              <Card.Title>Informações do Incidente</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="grid gap-4">
                <div>
                  <div className="text-[0.75rem] font-semibold text-[var(--on-surface-variant)] uppercase tracking-[0.05em]">
                    Descrição da Situação
                  </div>
                  <p className="leading-[1.6] mt-2 text-[0.9375rem]">
                    {report.description}
                  </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 bg-[var(--surface-container-low)] p-4 rounded-md">
                  <div>
                    <div className="text-[0.75rem] font-semibold text-[var(--on-surface-variant)] uppercase tracking-[0.05em]">
                      Tipo
                    </div>
                    <div className="mt-2 font-medium text-[0.9375rem]">
                      {report.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-[0.75rem] font-semibold text-[var(--on-surface-variant)] uppercase tracking-[0.05em]">
                      Coordenadas
                    </div>
                    <div className="mt-2 font-medium text-[0.9375rem] font-['Courier_New',monospace]">
                      {report.location}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card.Root>

          {/* Map Placeholder */}
          <Card.Root>
            <div className="h-[300px] bg-[var(--surface-container-high)] flex items-center justify-center text-[var(--on-surface-variant)] text-[0.875rem] overflow-hidden rounded-t-xl">
              <DynamicMap height="300px" />
            </div>
            <Card.Footer>
              <span className="text-[0.875rem] text-[var(--on-surface-variant)]">
                Dados cruzados com satélites do INPE em tempo real.
              </span>
            </Card.Footer>
          </Card.Root>
        </div>

        {/* Action Panel / Sidebar */}
        <div className="flex flex-col gap-6">
          <Card.Root>
            <Card.Header>
              <Card.Title>Análise de Risco</Card.Title>
            </Card.Header>
            <Card.Body>
              <ThreatGauge.Root level={report.severity}>
                <ThreatGauge.Label />
                <div className="h-4" />
                <ThreatGauge.Bar />
              </ThreatGauge.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root outline="true">
            <Card.Header>
              <Card.Title>Ações Operacionais</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="flex flex-col gap-3">
                <Navigation.Action
                  href="#"
                  className="w-full justify-center"
                >
                  Despachar Equipe
                </Navigation.Action>
                <Navigation.Action
                  href="#"
                  variant="ghost"
                  className="w-full justify-center"
                >
                  Aviso Cívil (Sirene)
                </Navigation.Action>
                <button
                  className="bg-transparent border border-[rgba(255,255,255,0.1)] text-[var(--on-surface)] p-3 rounded-md font-semibold cursor-pointer font-['Inter',sans-serif] text-[0.875rem] transition-colors hover:bg-[var(--surface-container-high)]"
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

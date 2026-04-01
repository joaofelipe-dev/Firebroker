'use client';

import { Card } from '@/components/Card';
import { Stats } from '@/components/Stats';
import { Table } from '@/components/Table';
import { ThreatGauge } from '@/components/ThreatGauge';
import { useRouter } from 'next/navigation';

const MOCK_REPORTS = [
  { id: '1092', location: 'Zona Rural - Oeste', type: 'Incêndio Florestal', severity: 'critical', time: '10 min', status: 'Verificando' },
  { id: '1090', location: 'Ipiranga', type: 'Queimada Agrícola', severity: 'moderate', time: '2h', status: 'Despachado' },
  { id: '1089', location: 'Zona Rural - Sul', type: 'Incêndio Florestal', severity: 'high', time: '3h', status: 'Confirmado' },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">

      <header className="flex flex-wrap gap-4 justify-between items-end border-b border-[rgba(90,65,56,0.2)] pb-4">
        <div>
          <h1 className="text-[2rem] font-extrabold m-0">Centro de Comando</h1>
          <p className="text-[var(--on-surface-variant)] m-0">Painel de Controle</p>
        </div>
        <div className="flex gap-3">
          <Card.Badge variant="warning">Status: ALERTA</Card.Badge>
          <Card.Badge variant="default">Sincronizado</Card.Badge>
        </div>
      </header>

      {/* STATS OVERVIEW */}
      <Stats.Root columns={3}>
        <Stats.Item
          variant="fire"
          icon="🔥"
          value="12"
          label="Focos Críticos (24h)"
        />
        <Stats.Item
          variant="warning"
          icon="⚠️"
          value="45"
          label="Incidentes em Verificação"
        />
        <Stats.Item
          variant="success"
          icon="🛡️"
          value="8"
          label="Equipes em Campo"
        />
      </Stats.Root>

      {/* RECENT REPORTS TABLE */}
      <Card.Root>
        <Card.Header>
          <div>
            <Card.Title>Incidentes Recentes</Card.Title>
            <p className="text-[0.875rem] text-[var(--on-surface-variant)] mt-2">
              Focos reportados nas últimas 48 horas pela rede colaborativa
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Table.Root selectable onRowClick={(id) => router.push(`/admin/reports/${id}`)}>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Gravidade</Table.HeadCell>
                <Table.HeadCell>Localização</Table.HeadCell>
                <Table.HeadCell>Tipo</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell align="right">Tempo</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {MOCK_REPORTS.map((report) => (
                <Table.Row key={report.id} id={report.id} clickable>
                  <Table.Cell muted>#{report.id}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: ThreatGauge.LEVELS.find((l) => l.id === report.severity)?.color
                        }}
                      />
                      {ThreatGauge.LEVELS.find((l) => l.id === report.severity)?.label}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{report.location}</Table.Cell>
                  <Table.Cell muted>{report.type}</Table.Cell>
                  <Table.Cell>
                    <Card.Badge variant={report.status === 'Confirmado' ? 'fire' : 'default'}>
                      {report.status}
                    </Card.Badge>
                  </Table.Cell>
                  <Table.Cell align="right" muted>{report.time}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>

    </div>
  );
}


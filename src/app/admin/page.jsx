'use client';

import { Card } from '@/components/Card';
import { Stats } from '@/components/Stats';
import { Table } from '@/components/Table';
import { ThreatGauge } from '@/components/ThreatGauge';
import { useRouter } from 'next/navigation';

const MOCK_REPORTS = [
  { id: '1092', location: 'Serra do Amolar, Pantanal', type: 'Incêndio Florestal', severity: 'critical', time: '10 min atrás', status: 'Verificando' },
  { id: '1091', location: 'BR-163, km 42', type: 'Foco Urbano', severity: 'high', time: '45 min atrás', status: 'Confirmado' },
  { id: '1090', location: 'Reserva XYZ', type: 'Queimada Agrícola', severity: 'moderate', time: '2 hrs atrás', status: 'Despachado' },
  { id: '1089', location: 'Parque Nacional de Brasília', type: 'Incêndio Florestal', severity: 'high', time: '3 hrs atrás', status: 'Confirmado' },
  { id: '1088', location: 'Área Rural, GO', type: 'Outro', severity: 'low', time: 'Ontem', status: 'Finalizado' },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      
      <header style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(90,65,56,0.2)', paddingBottom: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Centro de Comando</h1>
          <p style={{ color: 'var(--on-surface-variant)', margin: 0 }}>Sistema Sentinel • Terminal de Despacho 01</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
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
          icon="👀"
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
          <Card.Title>Incidentes Recentes</Card.Title>
          <Card.Description>Focos reportados nas últimas 48 horas pela rede colaborativa</Card.Description>
        </Card.Header>
        <Card.Body nopadding>
          <Table.Root clickable onRowClick={(id) => router.push(`/admin/reports/${id}`)}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        width: 10, height: 10, borderRadius: '50%', 
                        background: ThreatGauge.LEVELS.find((l) => l.id === report.severity)?.color
                      }} />
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

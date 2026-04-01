'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

let L; // Será importado dinamicamente apenas no cliente

const initLeaflet = async () => {
  if (typeof window !== 'undefined' && !L) {
    const leaflet = await import('leaflet');
    L = leaflet.default;
  }
  return L;
};

// Importar CSS do Leaflet
if (typeof window !== 'undefined') {
  import('leaflet/dist/leaflet.css');
}

// Coordenadas de Ribeirão Preto
const RIBEIRAO_PRETO = {
  lat: -21.1914,
  lng: -47.8822,
};

// Dados de focos/incêndios em Ribeirão Preto e regiões próximas
const MOCK_FOCOS = [
  {
    id: '1092',
    lat: -21.1864,
    lng: -47.8556,
    severity: 'critical',
    label: 'Zona Rural - Oeste',
    time: '10 min',
  },
  {
    id: '1090',
    lat: -21.1550,
    lng: -47.8200,
    severity: 'moderate',
    label: 'Ipiranga',
    time: '2h',
  },
  {
    id: '1089',
    lat: -21.2400,
    lng: -47.8610,
    severity: 'high',
    label: 'Zona Rural - Sul',
    time: '3h',
  },
];

// Cores baseadas no nível de severidade
const SEVERITY_COLORS = {
  critical: '#ff3d00',
  high: '#ff5722',
  moderate: '#ffc069',
  low: '#88d982',
};

export const Map = ({ height = '400px' }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializar Leaflet apenas no cliente
    initLeaflet().then((leaflet) => {
      if (!map.current) {
        map.current = leaflet.map(mapContainer.current).setView(
          [RIBEIRAO_PRETO.lat, RIBEIRAO_PRETO.lng],
          13
        );

        // Adicionar tile layer (OpenStreetMap)
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map.current);

        // Adicionar marcadores de focos
        MOCK_FOCOS.forEach((foco) => {
          const color = SEVERITY_COLORS[foco.severity];

          // Criar ícone customizado
          const icon = leaflet.divIcon({
            html: `
              <div class="relative">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style="background-color: ${color}; box-shadow: 0 0 12px ${color}80;">
                  🔥
                </div>
                <div class="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black bg-opacity-80 text-white text-xs rounded px-2 py-1 pointer-events-none">
                  ${foco.label} <br/> ${foco.time}
                </div>
              </div>
            `,
            className: 'map-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const marker = leaflet.marker([foco.lat, foco.lng], {
            icon,
            title: foco.label,
          })
            .bindPopup(
              `
              <div class="p-2">
                <b>Foco ${foco.id}</b><br/>
                <small>${foco.label}</small><br/>
                <small>Reportado há ${foco.time}</small><br/>
                <small style="color: ${color}">Severidade: ${foco.severity.toUpperCase()}</small>
              </div>
            `,
              { maxWidth: 200 }
            )
            .addTo(map.current);

          markers.current.push(marker);
        });

        // Adicionar controle de zoom
        map.current.zoomControl.setPosition('bottomright');
      }
    });

    return () => {
      // Cleanup
    };
  }, []);

  return <div ref={mapContainer} className="w-full px-5 rounded-2xl" style={{ height }} />;
};

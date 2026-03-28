'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// マーカーのアイコンが消えるバグ対策
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  memories: any[];
}

export default function MapDisplay({ memories }: Props) {
  // 初期位置を所沢駅付近に設定（適宜調整してください）
  const center: [number, number] = [35.786, 139.473];

  return (
    <div className="h-[300px] w-full rounded-3xl overflow-hidden shadow-inner border-4 border-white mb-8">
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {memories.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={icon}>
            <Popup>
              <div className="font-bold">{m.title}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
import { divIcon } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LOCATION } from '@/config/location'

/**
 * A custom burgundy pin rendered as plain HTML (an `L.divIcon`) instead of
 * Leaflet's default marker image. This sidesteps the well-known
 * bundler-breaks-Leaflet's-default-icon-paths problem entirely (no
 * `L.Icon.Default.mergeOptions` workaround needed) and keeps the marker
 * on-brand rather than Leaflet's stock blue teardrop.
 */
const markerIcon = divIcon({
  className: '',
  html: `<span style="
    display:flex;align-items:center;justify-content:center;
    width:34px;height:34px;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    background:var(--color-primary-600);
    box-shadow:0 4px 10px rgba(0,0,0,0.35);
    border:2px solid white;
  "><span style="transform:rotate(45deg);width:10px;height:10px;border-radius:50%;background:white;"></span></span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
})

interface LocationMapProps {
  reducedMotion: boolean
}

/**
 * The only file importing `leaflet`/`react-leaflet` directly — lazy-loaded
 * via `Map` (mirrors the `Scene3D` → `HeroScene` gating pattern) so the map
 * chunk is never downloaded on a page that doesn't render it.
 */
export default function LocationMap({ reducedMotion }: LocationMapProps) {
  return (
    <MapContainer
      center={[LOCATION.latitude, LOCATION.longitude]}
      zoom={15}
      zoomAnimation={!reducedMotion}
      fadeAnimation={!reducedMotion}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label="ISTAM location map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[LOCATION.latitude, LOCATION.longitude]} icon={markerIcon} />
    </MapContainer>
  )
}

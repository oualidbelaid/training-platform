/**
 * ISTAM's physical location — a single configurable record (branding
 * refinement §7 "location: { address, latitude, longitude, phone, email }"),
 * consumed by both the contact details panel and the map so they can never
 * drift out of sync. No API key/secret involved: OpenStreetMap tiles are
 * free and keyless (spec §7/§17 "do not expose private API keys").
 */
export const LOCATION = {
  name: 'ISTAM Algérie',
  address:
    'Résidence des deux bassins, Bâtiment 1H / 1A, Oued Romane, El Achour, 16000 Alger, Algérie',
  latitude: 36.7412,
  longitude: 2.9934,
  phone: '0555 07 96 00',
  email: 'contact@istam.fr',
  hours: [
    { day: 'weekdays', value: '08:30 – 16:30' },
    { day: 'saturday', value: 'Fermé' },
  ],
} as const

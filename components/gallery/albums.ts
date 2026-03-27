export interface Album {
  id: string
  name: string
  s3Prefix: string
  photographer: string
  date: string
  location: string
  guest?: string
}

export const ALBUMS: Album[] = [
  {
    id: 'TheSocietyAtSilentEcho',
    name: 'The Society At Silent Echo',
    s3Prefix: 'public/',
    photographer: 'Lumora Captures – Isuru Pramodya',
    date: 'January 2, 2026',
    location: 'Kulttuuritalo Valve, Oulu, Finland',
    guest: 'Bhante M Anomadassi Thero',
  },
]

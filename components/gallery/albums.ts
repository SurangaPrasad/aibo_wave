export interface Album {
  id: string
  name: string
  s3Prefix: string
  photographer: string
  date: string
  location: string
}

export const ALBUMS: Album[] = [
  {
    id: 'aibo-wave',
    name: 'aibo-wave',
    s3Prefix: 'public/',
    photographer: 'Lumora Captures – Isuru Pramodya',
    date: 'January 2, 2026',
    location: 'Kulttuuritalo Valve, Oulu, Finland',
  },
]

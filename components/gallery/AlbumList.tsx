'use client'

import { useState, useEffect } from 'react'
import { MapPin, Calendar, Camera, ImageIcon, ChevronRight, User } from 'lucide-react'
import { ALBUMS, type Album } from './albums'

const S3_BASE = 'https://aibo-wave.s3.eu-north-1.amazonaws.com'
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']

function isImageKey(key: string) {
  const ext = key.split('.').pop()?.toLowerCase() ?? ''
  return IMAGE_EXTENSIONS.includes(ext)
}

async function fetchAlbumMeta(prefix: string): Promise<{ cover: string; count: number }> {
  const res = await fetch(
    `${S3_BASE}/?list-type=2&prefix=${encodeURIComponent(prefix)}`
  )
  if (!res.ok) throw new Error('listing failed')
  const text = await res.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')
  const keys = Array.from(xml.querySelectorAll('Contents Key'))
    .map((el) => el.textContent ?? '')
    .filter(isImageKey)
  const cover = keys.length > 0 ? `${S3_BASE}/${keys[0]}` : ''
  return { cover, count: keys.length }
}

function AlbumCard({ album, onOpen }: { album: Album; onOpen: (album: Album) => void }) {
  const [cover, setCover] = useState('')
  const [count, setCount] = useState<number | null>(null)
  const [coverLoaded, setCoverLoaded] = useState(false)

  useEffect(() => {
    fetchAlbumMeta(album.s3Prefix)
      .then(({ cover, count }) => {
        setCover(cover)
        setCount(count)
      })
      .catch(() => {})
  }, [album.s3Prefix])

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-amber-50 border border-amber-200"
      onClick={() => onOpen(album)}
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        {cover ? (
          <>
            {!coverLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={album.name}
              loading="lazy"
              onLoad={() => setCoverLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                coverLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-wave-light to-wave-dark">
            <ImageIcon className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Photo count badge */}
        {count !== null && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {count}
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Open arrow */}
        <div className="absolute bottom-3 right-3 bg-wave-orange text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Album info */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-wave-dark mb-3 group-hover:text-wave-orange transition-colors duration-200">
          {album.name}
        </h2>
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-start gap-2">
            <Camera className="w-4 h-4 mt-0.5 text-wave-orange shrink-0" />
            <span>{album.photographer}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-wave-orange shrink-0" />
            <span>{album.date}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-wave-orange shrink-0" />
            <span>{album.location}</span>
          </div>
          {album.guest && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-0.5 text-wave-orange shrink-0" />
              <span>{album.guest}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AlbumList({ onOpen }: { onOpen: (album: Album) => void }) {
  return (
    <section className="py-12 px-8 bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ALBUMS.map((album) => (
            <AlbumCard key={album.id} album={album} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}

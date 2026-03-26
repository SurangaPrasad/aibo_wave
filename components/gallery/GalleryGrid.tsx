'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const S3_BASE = 'https://aibo-wave.s3.eu-north-1.amazonaws.com'
const PAGE_SIZE = 12

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']

function isImageKey(key: string) {
  const ext = key.split('.').pop()?.toLowerCase() ?? ''
  return IMAGE_EXTENSIONS.includes(ext)
}

async function fetchGalleryImages(prefix: string): Promise<string[]> {
  const res = await fetch(
    `${S3_BASE}/?list-type=2&prefix=${encodeURIComponent(prefix)}`
  )
  if (!res.ok) throw new Error('Failed to fetch gallery listing')
  const text = await res.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')
  const keys = Array.from(xml.querySelectorAll('Contents Key'))
    .map((el) => el.textContent ?? '')
    .filter(isImageKey)
  return keys.map((key) => `${S3_BASE}/${key}`)
}

/** Single image card — holds its own loaded state to keep the skeleton until the img is ready */
function GalleryCard({
  src,
  index,
  onOpen,
}: {
  src: string
  index: number
  onOpen: (index: number) => void
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="break-inside-avoid mb-4 group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gray-100"
      onClick={() => onOpen(index)}
    >
      {/* Skeleton shown until the image has fully loaded */}
      {!loaded && (
        <div className="w-full animate-pulse bg-gray-200" style={{ minHeight: '180px' }} />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Gallery photo ${index + 1}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto block transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
      />
      {loaded && (
        <div className="absolute inset-0 bg-wave-dark/0 group-hover:bg-wave-dark/30 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 drop-shadow-lg" />
        </div>
      )}
    </div>
  )
}

export default function GalleryGrid({ prefix = 'public/' }: { prefix?: string }) {
  const [allImages, setAllImages] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setAllImages([])
    setVisibleCount(PAGE_SIZE)
    setInitialLoading(true)
    setError(null)
    fetchGalleryImages(prefix)
      .then(setAllImages)
      .catch((err) => setError(err.message))
      .finally(() => setInitialLoading(false))
  }, [prefix])

  // Infinite scroll: when sentinel enters viewport, reveal next PAGE_SIZE images
  useEffect(() => {
    if (allImages.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, allImages.length))
        }
      },
      { rootMargin: '300px' }
    )
    const sentinel = sentinelRef.current
    if (sentinel) observer.observe(sentinel)
    return () => { if (sentinel) observer.unobserve(sentinel) }
  }, [allImages.length])

  const visibleImages = allImages.slice(0, visibleCount)
  const hasMore = visibleCount < allImages.length

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null))
  }, [allImages.length])

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allImages.length : null))
  }, [allImages.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, prevImage, nextImage])

  if (initialLoading) {
    return (
      <section className="py-16 px-8 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-xl bg-gray-100 animate-pulse mb-4"
                style={{ height: `${180 + (i % 3) * 60}px` }}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 px-8 bg-white min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-2">Could not load gallery</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </section>
    )
  }

  if (allImages.length === 0) {
    return (
      <section className="py-24 px-8 bg-white min-h-[50vh] flex items-center justify-center">
        <p className="text-xl text-gray-500">No photos yet — check back soon!</p>
      </section>
    )
  }

  return (
    <>
      <section className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-8">
            {allImages.length} photo{allImages.length !== 1 ? 's' : ''}
          </p>

          {/* Masonry grid — only renders visibleImages */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {visibleImages.map((src, index) => (
              <GalleryCard key={src} src={src} index={index} onOpen={openLightbox} />
            ))}
          </div>

          {/* Sentinel / loading indicator */}
          <div ref={sentinelRef} className="mt-8 flex justify-center">
            {hasMore && (
              <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
                <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-wave-orange animate-spin" />
                Loading more photos…
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-wave-orange transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 text-white hover:text-wave-orange transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={allImages[lightboxIndex]}
              alt={`Gallery photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-center text-white/50 text-sm mt-3">
              {lightboxIndex + 1} / {allImages.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 text-white hover:text-wave-orange transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Carousel from '@/components/Carousel'

const S3_BASE = 'https://aibo-wave.s3.eu-north-1.amazonaws.com'
const S3_PREFIX = 'carousel/'
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']
const FALLBACK_IMAGES = [
  '/gallery-1.jpeg',
  '/gallery-2.jpeg',
  '/gallery-3.jpeg',
  '/gallery-4.jpeg',
  '/gallery-5.jpeg',
]

function isImageKey(key: string) {
  const ext = key.split('.').pop()?.toLowerCase() ?? ''
  return IMAGE_EXTENSIONS.includes(ext)
}

async function fetchFirst5(): Promise<string[]> {
  const res = await fetch(
    `${S3_BASE}/?list-type=2&prefix=${encodeURIComponent(S3_PREFIX)}&max-keys=20`
  )
  if (!res.ok) throw new Error('failed')
  const text = await res.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')
  return Array.from(xml.querySelectorAll('Contents Key'))
    .map((el) => el.textContent ?? '')
    .filter(isImageKey)
    .slice(0, 5)
    .map((key) => `${S3_BASE}/${key}`)
}

const Hero = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>(FALLBACK_IMAGES)

  useEffect(() => {
    fetchFirst5()
      .then((imgs) => { if (imgs.length > 0) setCarouselImages(imgs) })
      .catch(() => { /* keep fallback */ })
  }, [])

  return (
    <section className="bg-gradient-to-br from-wave-light to-wave-dark text-white py-24 px-8 min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight ">Artistry Interplay</h1>
          <div className="my-4 space-y-4">
            {/* <div className="text-5xl font-bold text-black">Artistry Interplay</div> */}
            <div className="text-6xl font-bold text-accent">Beacon O Wave</div>
          </div>
          <p className="text-xl leading-relaxed text-gray-300">
            A cross-cultural creative ecosystem that bridges Europe and Asia, empowering artists, entrepreneurs, and communities through meaningful cultural exchange and artistic expression.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5">
              Explore Silent Echo
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-800 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-all">
              Become a Beacon
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Carousel images={carouselImages} interval={4000} />
        </div>
      </div>
    </section>
  )
}

export default Hero

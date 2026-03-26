import Head from 'next/head'
import { useState } from 'react'
import { ArrowLeft, Camera, Calendar, MapPin } from 'lucide-react'
import GalleryHero from '@/components/gallery/GalleryHero'
import AlbumList from '@/components/gallery/AlbumList'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { type Album } from '@/components/gallery/albums'

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)

  return (
    <>
      <Head>
        <title>{selectedAlbum ? `${selectedAlbum.name} – Gallery | AIBO Wave` : 'Gallery - AIBO Wave'}</title>
        <meta name="description" content="Browse photos from the AIBO Wave creative community" />
      </Head>

      <GalleryHero />

      {selectedAlbum ? (
        <>
          {/* Album header bar */}
          <div className="bg-white border-b border-gray-100 px-8 py-5">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={() => setSelectedAlbum(null)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-wave-orange transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                All albums
              </button>
              <h2 className="text-3xl font-bold text-wave-dark mb-3">{selectedAlbum.name}</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-wave-orange" />
                  {selectedAlbum.photographer}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-wave-orange" />
                  {selectedAlbum.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-wave-orange" />
                  {selectedAlbum.location}
                </span>
              </div>
            </div>
          </div>

          <GalleryGrid prefix={selectedAlbum.s3Prefix} />
        </>
      ) : (
        <AlbumList onOpen={setSelectedAlbum} />
      )}
    </>
  )
}


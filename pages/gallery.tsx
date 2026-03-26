import Head from 'next/head'
import GalleryHero from '@/components/gallery/GalleryHero'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery - AIBO Wave</title>
        <meta name="description" content="Browse photos from the AIBO Wave creative community" />
      </Head>
      {/* <GalleryHero /> */}
      <GalleryGrid />
    </>
  )
}

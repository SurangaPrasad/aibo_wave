import Head from 'next/head'
import AboutHero from '@/components/about/AboutHero'
import Vision from '@/components/about/Vision'
import Philosophy from '@/components/about/Philosophy'

export default function About() {
  return (
    <>
      <Head>
        <title>About - AIBO Wave</title>
        <meta name="description" content="Learn about AIBO Wave's mission, vision, and philosophy" />
      </Head>
      <AboutHero />
      <Vision />
      <Philosophy />
    </>
  )
}

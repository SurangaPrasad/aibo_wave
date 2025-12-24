import Head from 'next/head'
import Hero from '@/components/home/Hero'
import Mission from '@/components/home/Mission'
import Values from '@/components/home/Values'

export default function Home() {
  return (
    <>
      <Head>
        <title>AIBO Wave - Empowering the Global Creative Citizen</title>
        <meta name="description" content="AIBO Wave - Bridging Europe and Asia through art, entrepreneurship, and community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Mission />
      <Values />
    </>
  )
}

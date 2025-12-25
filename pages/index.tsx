import Head from 'next/head'
import Hero from '@/components/home/Hero'
import Mission from '@/components/home/Mission'
import ThreePillars from '@/components/home/ThreePillars'
import SilentEcho from '@/components/home/SilentEcho'
import MemberBenefits from '@/components/home/MemberBenefits'
import PricingTiers from '@/components/home/PricingTiers'
import CallToAction from '@/components/home/CallToAction'

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
      <ThreePillars />
      <SilentEcho />
      <MemberBenefits />
      <PricingTiers />
      <CallToAction />
    </>
  )
}

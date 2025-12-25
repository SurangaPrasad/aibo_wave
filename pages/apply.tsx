import Head from 'next/head'
import ApplyHero from '@/components/apply/ApplyHero'
import ApplicationTypes from '@/components/apply/ApplicationTypes'
import CallToAction from '@/components/home/CallToAction'
import FAQ from '@/components/apply/FAQ'

export default function Apply() {
  return (
    <>
      <Head>
        <title>Apply - AIBO Wave</title>
        <meta name="description" content="Join AIBO Wave as a Community Member or Beacon Member" />
      </Head>
      <ApplyHero />
      <ApplicationTypes />
      <FAQ />
      <CallToAction />
    </>
  )
}

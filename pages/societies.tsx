import Head from 'next/head'
import SocietiesHero from '@/components/societies/SocietiesHero'
import SocietiesInfo from '@/components/societies/SocietiesInfo'
import SocietiesList from '@/components/societies/SocietiesList'

export default function Societies() {
  return (
    <>
      <Head>
        <title>Societies - AIBO Wave</title>
        <meta name="description" content="Join local AIBO Wave societies and build community" />
      </Head>
      <SocietiesHero />
      <SocietiesInfo />
      <SocietiesList />
    </>
  )
}

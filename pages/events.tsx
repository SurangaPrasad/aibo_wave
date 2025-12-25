import Head from 'next/head'
import EventsHero from '@/components/events/EventsHero'
import QuickFacts from '@/components/events/QuickFacts'
import DetailedProgram from '@/components/events/DetailedProgram'
import LogisticsPreparation from '@/components/events/LogisticsPreparation'
import StaffRoles from '@/components/events/StaffRoles'
import ContingencyPlans from '@/components/events/ContingencyPlans'

export default function Events() {
  return (
    <>
      <Head>
        <title>Events - AIBO Wave</title>
        <meta name="description" content="Discover cultural events on AIBO Wave" />
      </Head>
      <EventsHero />
      <QuickFacts />
      <DetailedProgram />
      <LogisticsPreparation />
      <StaffRoles />
      <ContingencyPlans />
    </>
  )
}

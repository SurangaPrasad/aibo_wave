import Head from 'next/head'
import EventsHero from '@/components/events/EventsHero'
import EmptyState from '@/components/events/EmptyState'

export default function Events() {
  return (
    <>
      <Head>
        <title>Events - AIBO Wave</title>
        <meta name="description" content="Discover cultural events on AIBO Wave" />
      </Head>
      <EventsHero />
      <EmptyState />
    </>
  )
}

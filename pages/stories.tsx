import Head from 'next/head'
import StoriesHero from '@/components/stories/StoriesHero'
import StoriesGrid from '@/components/stories/StoriesGrid'

export default function Stories() {
  return (
    <>
      <Head>
        <title>Stories - AIBO Wave</title>
        <meta name="description" content="Read inspiring stories from the AIBO Wave community" />
      </Head>
      <StoriesHero />
      <StoriesGrid />
    </>
  )
}

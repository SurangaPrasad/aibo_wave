import Head from 'next/head'
import ProfileHero from '@/components/profile/ProfileHero'
import ProfileContent from '@/components/profile/ProfileContent'

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile - AIBO Wave</title>
        <meta name="description" content="Manage your AIBO Wave profile" />
      </Head>
      <ProfileHero />
      <ProfileContent />
    </>
  )
}

import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold text-black">
          <Image src="/AIBOW@2x.png" alt="AIBO Wave Logo" width={500} height={80} className="-ml-12" />
        </Link>
        <nav className="flex gap-8 items-center">
          <Link href="/" className="text-gray-700 font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="text-gray-700 font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/events" className="text-gray-700 font-medium hover:text-primary transition-colors">Events</Link>
          <Link href="/societies" className="text-gray-700 font-medium hover:text-primary transition-colors">Societies</Link>
          <Link href="/stories" className="text-gray-700 font-medium hover:text-primary transition-colors">Stories</Link>
          <Link href="/profile" className="text-gray-700 font-medium hover:text-primary transition-colors">Profile</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

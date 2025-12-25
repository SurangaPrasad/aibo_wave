import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12 px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-2xl">AIBOW.fi</h4>
            <p className="text-sm text-muted-foreground">
              Artistry Interplay Beacon O Wave - A circle of equals empowering creative communities across Europe and Asia.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Marketplace</Link></li>
              <li><Link href="/events" className="hover:text-primary">Events</Link></li>
              <li><Link href="/societies" className="hover:text-primary">Societies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/silent-echo" className="hover:text-primary">Silent Echo</Link></li>
              <li><Link href="/apply" className="hover:text-primary">Become a Beacon</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:owave@aibow.fi" className="hover:text-primary">owave@aibow.fi</a></li>
              <li><a href="mailto:imbeacon@aibow.fi" className="hover:text-primary">imbeacon@aibow.fi</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AIBOW.fi. All rights reserved. | Empowering creative communities across Europe and Asia.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { ShoppingCart, Users, Music } from "lucide-react";

export default function ThreePillars() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">The AIBO Wave Ecosystem</h2>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {/* Pillar 1: Marketplace */}
        <article className="flex flex-col h-full border border-border rounded-xl p-8 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <ShoppingCart className="w-8 h-8" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Global Marketplace</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
            Access to 500,000+ buyers across Europe and Asia. Sell physical and digital products with 85% revenue retention—far better than traditional galleries or platforms.
          </p>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>✓ Art, music, books, merchandise</li>
            <li>✓ Digital content & services</li>
            <li>✓ Fair economics for creators</li>
          </ul>
        </article>

        {/* Pillar 2: Events */}
        <article className="flex flex-col h-full border border-border rounded-xl p-8 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Music className="w-8 h-8" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Curated Events</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
            Culturally-specific events (concerts, exhibitions, workshops, festivals) held across Europe and Asia. Artists perform, exhibit, and connect with their communities.
          </p>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>✓ Community visibility & engagement</li>
            <li>✓ Marketplace sales opportunities</li>
            <li>✓ Professional networking</li>
          </ul>
        </article>

        {/* Pillar 3: Societies */}
        <article className="flex flex-col h-full border border-border rounded-xl p-8 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Users className="w-8 h-8" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Local Societies</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
            Community chapters organized by cultural leaders (Beacons). Members participate in local projects, mentorship, and collaborative cultural initiatives.
          </p>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>✓ Recurring membership revenue</li>
            <li>✓ Grassroots community growth</li>
            <li>✓ Entrepreneur support</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
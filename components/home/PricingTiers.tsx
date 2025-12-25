'use client'

import { Button } from "@/components/ui/button";

export default function PricingTiers() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Join as Community Member</h2>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Founding Member - Highlighted */}
        <div className="bg-white border-4 border-accent rounded-xl p-8 lg:p-10 shadow-lg flex flex-col">
            <div className="mb-6">
              <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                Limited Time
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Founding Member</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Lifetime discounted membership - available now only
            </p>
            
            <div className="mb-8">
              <span className="text-5xl md:text-6xl font-bold text-accent">€150</span>
              <span className="text-xl text-muted-foreground ml-2 block md:inline">/year (locked-in forever)</span>
            </div>

            <ul className="space-y-3 mb-8 text-left flex-grow">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>All Community Member benefits</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Priority event access</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Founding Member badge</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Lifetime locked-in pricing</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Special recognition</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>VIP community status</span>
              </li>
            </ul>

            <Button 
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-lg font-semibold"
            >
              Become a Founding Member
            </Button>
          </div>

          {/* Beacon Member - Leadership */}
          <div className="bg-white border-2 border-border rounded-xl p-8 lg:p-10 shadow-sm flex flex-col">
            <div className="mb-6">
              <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                Leadership
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Beacon Member</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Lead a local Society and earn from community growth
            </p>
            
            <div className="mb-8">
              <span className="text-5xl md:text-6xl font-bold text-accent">€300</span>
              <span className="text-xl text-muted-foreground ml-2 block md:inline">/year + 15% revenue share</span>
            </div>

            <ul className="space-y-3 mb-8 text-left flex-grow">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>All Community Member benefits</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Private Beacon Member portal</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Event organization tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Member management dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Performance honorariums</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>15% revenue share from local Society</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Business incubation support</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Banking & invoicing partnerships</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Professional branding & digital presence</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Access to AIBO Wave Marketplace</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">✓</span>
                <span>Entrepreneurship mentorship</span>
              </li>
            </ul>

            <Button 
              size="lg"
              variant="outline"
              className="w-full text-lg font-semibold"
            >
              Apply as Beacon Member
            </Button>
          </div>
        </div>
      </section>
  );
}

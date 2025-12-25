import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export default function SocietiesList() {
  return (
    <>
      {/* Event Series */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Event Series</h2>
        
        <div className="max-w-7xl mx-auto space-y-12">
          {/* The Society at Silent Echo */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-bold mb-3">The Society at Silent Echo</h3>
                <p className="text-xl font-semibold text-primary mb-6">We See You</p>
                <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                  A 120-minute gathering inspired by the Dead Poets&apos; Society. Participants engage in poetry, music, wisdom-sharing, and personal reflection in an intimate, culturally-specific setting. Each event is tailored to a unique diaspora community and features a respected wisdom keeper (Beacon guest) who illuminates shared artistic expressions.
                </p>
                
                <div className="space-y-5 mb-8">
                  <div className="flex gap-4">
                    <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Recurring Format</p>
                      <p className="text-sm text-muted-foreground">Held quarterly in different locations across Europe and Asia</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Intimate Gatherings</p>
                      <p className="text-sm text-muted-foreground">30-120 participants per event, fostering deep community connection</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Community-Centered</p>
                      <p className="text-sm text-muted-foreground">Each event honors a specific diaspora community&apos;s language, traditions, and culture</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href="/silent-echo">
                    <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2" size="lg">
                      Learn More <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-8 md:p-12 border-l border-border">
                <h4 className="text-2xl font-bold mb-8 text-center">Inaugural Event</h4>
                <div className="space-y-4 mb-8">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Event Name</p>
                    <p className="font-medium">The Society at Silent Echo: Oulu</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Date</p>
                      <p className="font-medium text-sm">Friday, Jan 2, 2026</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Time</p>
                      <p className="font-medium text-sm">6:00 PM - 8:30 PM</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Location</p>
                    <p className="font-medium">Oulu, Finland</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Community</p>
                    <p className="font-medium">Sri Lankan Diaspora</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Capacity</p>
                      <p className="font-medium text-sm">80-120 people</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Cost</p>
                      <p className="font-medium text-sm">Free</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Beacon Guest</p>
                    <p className="font-medium text-sm">Bhante M Anomadassi</p>
                    <p className="text-xs text-muted-foreground mt-1">Buddhist Monk, Helsinki</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Hosts</p>
                    <p className="font-medium text-sm">Thilina Weththasinghe & Vidura Dias</p>
                  </div>
                </div>
                
                <Link href="/silent-echo">
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-sm" size="lg">
                    Register for Oulu Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Future Events Placeholder */}
          <div className="border border-border border-dashed rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">More Societies Coming Soon</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              We are developing additional society series tailored to different diaspora communities. Each will feature unique cultural expressions, wisdom keepers, and community-specific programming.
            </p>
            <p className="text-muted-foreground">
              Interested in hosting a Society in your community? <Link href="/apply" className="text-primary hover:underline font-semibold">Become a Beacon</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Society Membership</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-primary">Member Benefits</h3>
            <p className="text-muted-foreground mb-6"><strong>€60/year</strong> (after launch) | <strong>€15/year</strong> (early supporter)</p>
            <ul className="space-y-3 text-muted-foreground text-base">
              <li>✓ Access to all society events</li>
              <li>✓ Exclusive online content and archives</li>
              <li>✓ Private community forum</li>
              <li>✓ Exclusive member merchandise</li>
              <li>✓ Voting rights on society decisions</li>
              <li>✓ Networking with cultural community</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-primary">Beaconship (Leaders)</h3>
            <p className="text-muted-foreground mb-6"><strong>€300/year</strong> + <strong>15% revenue share</strong></p>
            <ul className="space-y-3 text-muted-foreground text-base">
              <li>✓ Organize and curate society events</li>
              <li>✓ Revenue from event ticket sales</li>
              <li>✓ Professional branding & support</li>
              <li>✓ Access to AIBO Wave Marketplace</li>
              <li>✓ Pan-European beacon network</li>
              <li>✓ Training & mentorship program</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Join a Society or Become a Beacon</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with your diaspora community, participate in meaningful cultural events, or lead your own society.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/silent-echo">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Register for Events
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="lg" variant="outline">
                Become a Beacon
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
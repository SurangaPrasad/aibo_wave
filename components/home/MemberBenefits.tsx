export default function MemberBenefits() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Member Benefits</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-4 text-primary">For Community Members</h3>
          <p className="text-muted-foreground mb-6"><strong>€60/year</strong> (after launch) | <strong>€15/year</strong> (early supporter)</p>
          <ul className="space-y-3 text-muted-foreground text-base">
            <li>✓ Monthly cultural events in your local community</li>
            <li>✓ Access to exclusive online content and archives</li>
            <li>✓ Private forum for community discussions</li>
            <li>✓ Exclusive member merchandise</li>
            <li>✓ Voting rights on local Society decisions</li>
            <li>✓ Networking with like-minded cultural enthusiasts</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-4 text-primary">For Beaconship Members & Artists</h3>
          <p className="text-muted-foreground mb-6"><strong>€300/year</strong> + <strong>15% revenue share</strong></p>
          <ul className="space-y-3 text-muted-foreground text-base">
            <li>✓ Guaranteed performance fees & honorariums</li>
            <li>✓ Professional branding & digital presence</li>
            <li>✓ Access to the global AIBO Wave Marketplace</li>
            <li>✓ Business incubation & entrepreneurship support</li>
            <li>✓ Banking & invoicing partnerships</li>
            <li>✓ Revenue share from local Society operations</li>
            <li>✓ Private Beacon Member portal & analytics</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default function ApplicationTypes() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {/* Community Member */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Community Member</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join your local Silent Echo Society and become part of a pan-European network of cultural communities.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Monthly cultural events</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Online community platform</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Exclusive member content</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Voting rights (Founding Members)</span>
              </li>
            </ul>
          </div>

          {/* Beacon Member */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Beacon Member</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Lead a local Silent Echo Society and build a thriving cultural community in your city.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Revenue share from membership</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Professional branding & support</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Entrepreneurship training</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Banking & investment partnerships</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

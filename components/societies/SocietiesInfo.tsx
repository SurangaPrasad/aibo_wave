export default function SocietiesInfo() {
  return (
    <>
      {/* Societies Overview */}
      <section className="bg-secondary/5 py-16 md:py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">What Are Societies?</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Societies are community chapters organized by cultural leaders (Beacons) who curate culturally-specific events, foster meaningful connections, and create spaces for artistic expression, wisdom-sharing, and community belonging. Each society is rooted in a unique diaspora community and operates as an autonomous cultural hub.
            </p>
          </div>
        </div>
      </section>

      {/* How Societies Work */}
      <section className="bg-secondary/5 py-20 md:py-32 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">How Societies Work</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-6">1</div>
              <h3 className="text-2xl font-bold mb-4">Community Leadership</h3>
              <p className="text-muted-foreground leading-relaxed">
                A respected cultural leader (Beacon) organizes and curates events for their diaspora community.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-6">2</div>
              <h3 className="text-2xl font-bold mb-4">Curated Events</h3>
              <p className="text-muted-foreground leading-relaxed">
                Regular gatherings (monthly, quarterly) featuring culturally-specific programming, artists, and wisdom keepers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-6">3</div>
              <h3 className="text-2xl font-bold mb-4">Community Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Members participate in local projects, mentorship, collaborative initiatives, and pan-European networking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
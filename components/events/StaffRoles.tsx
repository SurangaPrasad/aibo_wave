const StaffRoles = () => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Staff & Volunteer Roles</h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Registration Team (2-3 people)</h3>
          <p className="text-muted-foreground mb-4">
            Check-in guests, distribute welcome packets, collect attendance information, answer questions.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Venue Setup Team (2-3 people)</h3>
          <p className="text-muted-foreground mb-4">
            Arrange seating, set up stage, lighting, refreshments, registration table, welcome signage.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Tech Support (1-2 people)</h3>
          <p className="text-muted-foreground mb-4">
            Manage projector, sound system, microphones, QR code poll, screen displays, backup equipment.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Guest Liaison (1 person)</h3>
          <p className="text-muted-foreground mb-4">
            Meet guests upon arrival, coordinate timing, ensure comfort, manage transitions between segments.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Moderator (Vidura Dias)</h3>
          <p className="text-muted-foreground mb-4">
            Welcome, guide conversation, manage timing, invite audience participation, close session.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Post-Event Coordinator (1-2 people)</h3>
          <p className="text-muted-foreground mb-4">
            Manage community mingle, distribute refreshments, facilitate conversations, thank departing guests.
          </p>
        </div>
      </div>
    </section>
  )
}

export default StaffRoles

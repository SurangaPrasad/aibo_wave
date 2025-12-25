import { Clock, MapPin, Users, Heart } from 'lucide-react'

const QuickFacts = () => {
  return (
    <section className="bg-secondary/5 py-12 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <Clock className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-2">Date & Time</h3>
            <p className="text-sm text-muted-foreground">Friday, January 2, 2026 | 6:00 PM - 8:30 PM</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <MapPin className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-2">Location</h3>
            <p className="text-sm text-muted-foreground">Oulu, Finland | Sri Lankan Diaspora Community</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <Users className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-2">Capacity</h3>
            <p className="text-sm text-muted-foreground">80-120 participants | Intimate gathering</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <Heart className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-2">Cost</h3>
            <p className="text-sm text-muted-foreground">Free | Optional donations welcome</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickFacts

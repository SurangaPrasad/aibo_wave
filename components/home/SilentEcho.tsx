import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function SilentEcho() {
  return (
    <section className="bg-lime-50 py-20 md:py-32 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Society at Silent Echo</h2>
          <p className="text-2xl font-semibold text-accent mb-4">We See You</p>
          <p className="text-lg text-muted-foreground leading-relaxed px-4">
            Our flagship cultural initiative inspired by the Dead Poets&apos; Society. A 120-minute gathering for poetry, music, and wisdom-sharing, tailored to specific diaspora communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          <div className="px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">What Makes Silent Echo Special</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <strong>Culturally-Specific:</strong> Each event honors a unique diaspora community&apos;s language, traditions, and artistic expressions.
                </div>
              </li>
              <li className="flex gap-4">
                <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <strong>Beacon Guidance:</strong> A respected wisdom keeper (artist, scholar, spiritual leader) offers gentle reflections to illuminate shared art.
                </div>
              </li>
              <li className="flex gap-4">
                <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <strong>Intimate & Inclusive:</strong> 30-50 participants sharing poetry, songs, stories, and personal reflections in a safe, welcoming space.
                </div>
              </li>
              <li className="flex gap-4">
                <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <strong>Membership Model:</strong> Join a local Silent Echo Society and become part of a pan-European network of cultural communities.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm bg-white mx-4">
            <h4 className="text-2xl font-bold mb-6">Inaugural Event</h4>
            <div className="space-y-4 text-muted-foreground text-base">
              <div>
                <strong className="text-foreground">Date:</strong> January 2, 2026
              </div>
              <div>
                <strong className="text-foreground">Location:</strong> Cultural Centre, Oulu, Finland 
              </div>
              <div>
                <strong className="text-foreground">Community:</strong> Sri Lankan Diaspora
              </div>
              <div>
                <strong className="text-foreground">Beacon Guest:</strong> Bhante M Anomadassi (Buddhist Monk, Helsinki)
              </div>
              <div>
                <strong className="text-foreground">Hosts:</strong> Thilina Weththasinghe (Artist) & Vidura Dias Abayagunawardana (Lyricist)
              </div>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScEvcfe5BNFWVr6vg0ldzbStIkgqnJOrhkrKpQEqSTIzxwMsA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full mt-8"
            >
              <span className="inline-block w-full bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-md text-center font-semibold">
                Learn More
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="bg-primary/5 py-20 md:py-32 border-t border-border">
      <div className="container text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Join the Wave?</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Whether you&apos;re a community member seeking cultural connection, an artist looking to monetize your work, or a leader ready to build a local Society—there&apos;s a place for you in the AIBO Wave ecosystem.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/apply">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Apply Now
            </Button>
          </Link>
          <Link href="/silent-echo">
            <Button size="lg" variant="outline">
              Explore Silent Echo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
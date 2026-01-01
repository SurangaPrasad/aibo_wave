'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/ApplicationModal";

export default function CallToAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('apply') === 'true') {
        const element = document.getElementById('call-to-action');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  return (
    <>
      <section id="call-to-action" className="bg-primary/5 py-20 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Join the Wave?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether you&apos;re a community member seeking cultural connection, an artist looking to monetize your work, or a leader ready to build a local Society—there&apos;s a place for you in the AIBO Wave ecosystem.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90"
              onClick={() => setIsModalOpen(true)}
            >
              Apply Now
            </Button>
            <a href="/Card - Echoes of the Heart.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-primary w-full md:w-auto">
                Echoes of the Heart
              </Button>
            </a>
          </div>
        </div>
      </section>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
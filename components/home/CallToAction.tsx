'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/ApplicationModal";import RegistrationModal from '@/components/RegistrationModal'
import { Download, Play, X } from 'lucide-react';
export default function CallToAction() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isEchoesMenuOpen, setIsEchoesMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
            {/* <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90"
              onClick={() => setIsModalOpen(true)}
            >
              Apply Now
            </Button> */}
            <Button 
              size="lg" 
              variant="outline"
              className="text-black w-full md:w-auto bg-accent hover:bg-accent/90"
              onClick={() => setIsRegistrationModalOpen(true)}
            >
              Register for Event
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white w-full md:w-auto bg-black hover:bg-gray-800"
              onClick={() => setIsEchoesMenuOpen(true)}
            >
              Echoes of the Heart
            </Button>
          </div>
        </div>
      </section>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RegistrationModal isOpen={isRegistrationModalOpen} onClose={() => setIsRegistrationModalOpen(false)} />
      
      {/* Echoes of the Heart Options Modal */}
      {isEchoesMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-accent to-accent/80 px-6 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Echoes of the Heart</h2>
                <p className="text-white/90 text-sm mt-1">Choose an option</p>
              </div>
              <button
                onClick={() => setIsEchoesMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Options */}
            <div className="p-6 space-y-4">
              {/* Download PDF Option */}
              <a
                href="/Card - Echoes of the Heart.pdf"
                download
                className="block"
                onClick={() => setIsEchoesMenuOpen(false)}
              >
                <div className="flex items-center gap-4 p-5 border-2 border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Download className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Download PDF</h3>
                    <p className="text-sm text-muted-foreground">Save the document to your device</p>
                  </div>
                </div>
              </a>

              {/* Play Video Option */}
              <button
                onClick={() => {
                  setIsEchoesMenuOpen(false)
                  setIsVideoModalOpen(true)
                }}
                className="w-full"
              >
                <div className="flex items-center gap-4 p-5 border-2 border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Play className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1">Play Video</h3>
                    <p className="text-sm text-muted-foreground">Watch the video presentation</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close video"
            >
              <X className="w-8 h-8 text-white" />
            </button>

            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                controls
                autoPlay
                className="w-full h-auto"
                style={{ maxHeight: '80vh' }}
              >
                <source src="/Echoes_of_Heart.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
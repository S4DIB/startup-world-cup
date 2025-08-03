"use client";
import React, { useEffect, useRef, useState } from "react";
import Particles from "../components/Particles";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Button } from "../components/ui/button";

// DecryptedText animation component
type DecryptedTextProps = { text: string; className?: string; duration?: number };
const DecryptedText = ({ text, className = "", duration = 1200 }: DecryptedTextProps) => {
  const [display, setDisplay] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(10, Math.floor(duration / 30));
    intervalRef.current = setInterval(() => {
      frame++;
              setDisplay(() => {
          return text
            .split("")
            .map((c: string) => {
            if (c === " ") return " ";
            if (frame < totalFrames && Math.random() > frame / totalFrames) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return c;
          })
          .join("");
      });
      if (frame >= totalFrames) {
        setDisplay(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [text, duration]);
  return (
    <span className={className} style={{ letterSpacing: "0.15em" }}>{display}</span>
  );
};



export default function Home() {
  const [showSecond, setShowSecond] = useState(false);
  const [showRotating, setShowRotating] = useState(false);
  const [showStaticSecondLine, setShowStaticSecondLine] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistMessage, setWaitlistMessage] = useState("");

  // Synchronized timer for header, rotating text, and glitch
  const [currentTick, setCurrentTick] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const headerPhrases = ["AI CTO AGENT", "CREATE HISTORY"];
  const rotatingWords = ["startup?", "business?"];
  const intervalMs = 3000; // 5 seconds for sync
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTick((tick) => tick + 1);
      setGlitch(true);
      setTimeout(() => setGlitch(false), 700); // glitch for 0.7s
    }, intervalMs);
    return () => clearInterval(interval);
  }, []);
  // Header phrase and rotating word index
  const headerIndex = currentTick % headerPhrases.length;
  const rotatingIndex = currentTick % rotatingWords.length;
  // For DecryptedText re-mount
  const [headerKey, setHeaderKey] = useState(0);
  useEffect(() => { setHeaderKey((k) => k + 1); }, [headerIndex]);

  // When the second line animation is done, start rotating text after a short delay
  useEffect(() => {
    if (showSecond) {
      const t = setTimeout(() => setShowRotating(true), 1200); // match second line animation duration
      return () => clearTimeout(t);
    }
  }, [showSecond]);

  // When rotating text is done, show the static second line
  useEffect(() => {
    if (showRotating) {
      setShowStaticSecondLine(true); // switch immediately
    }
  }, [showRotating]);

  // Add Montserrat font import to the document head if not already present
  if (typeof window !== 'undefined') {
    const id = 'montserrat-font-link';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap';
      document.head.appendChild(link);
    }
  }

  // Handle waitlist submission
  const handleWaitlistSubmit = async () => {
    if (!waitlistEmail.trim()) {
      setWaitlistMessage("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setWaitlistMessage("");

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setWaitlistMessage(data.message);
        setWaitlistEmail(""); // Clear the input
      } else {
        setWaitlistMessage(data.error || "Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setWaitlistMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Header styles
  const headerStyle = {
    width: '100vw',
    padding: '0.5rem clamp(1rem, 4vw, 2.5rem)',
    position: 'fixed' as const,
    top: '0',
    left: '0',
    zIndex: 10,
    background: 'rgba(10,10,35,0.85)',
    borderBottom: '4px solid transparent',
    borderImage: 'linear-gradient(90deg, transparent 0%, #60a5fa 15%, #a78bfa 85%, transparent 100%) 1',
    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)',
    fontFamily: 'Kode Mono, monospace',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const navLinkStyle =
    'text-white text-lg font-kode-mono px-4 py-1 rounded transition-colors duration-200 hover:text-blue-400 hover:bg-blue-900/40';

  return (
    <>
      <header style={headerStyle}>
        <div style={{ width: '100%', maxWidth: 1200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
          <DecryptedText
            key={headerKey}
            text={headerPhrases[headerIndex]}
            className="text-white text-xl sm:text-2xl font-extrabold tracking-widest font-kode-mono truncate"
            duration={1200}
          />
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', minWidth: 0 }}>
            <a href="#" className={navLinkStyle}>Home</a>
            <a href="/about" className={navLinkStyle}>About</a>
            <a href="#features" className={navLinkStyle}>Features</a>
            <a href="#pricing" className={navLinkStyle}>Pricing</a>
            <a href="#contact" className={navLinkStyle}>Contact</a>
          </nav>
        </div>
      </header>
      <div style={{ position: 'fixed', inset: 0, background: '#000000', zIndex: 0 }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={180}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'auto',
            }}
          >
            <div className={glitch ? 'glitch' : ''}>
              <div
                className="rounded-xl px-8 py-3 bg-black/40 flex items-center justify-center"
                style={{
                  fontWeight: 900,
                  color: '#e5e5e5',
                  minHeight: '3.5rem',
                  fontFamily: 'Montserrat, sans-serif',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                }}
              >
                {!showRotating ? (
                  <TypewriterEffectSmooth
                    words={[
                      { text: "Not" },
                      { text: "sure" },
                      { text: "how" },
                      { text: "to" },
                      { text: "turn" },
                      { text: "your" },
                      { text: "tech" },
                      { text: "idea" },
                      { text: "into" },
                      { text: "a" },
                      { text: "startup?" },
                    ]}
                    className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-center drop-shadow-lg mb-4"
                    cursorClassName="bg-white"
                    onDone={() => setShowSecond(true)}
                    cursorCharacter="_"
                    showCursor={!showSecond}
                  />
                ) : (
                  <span
                    className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-center drop-shadow-lg mb-4"
                    style={{ lineHeight: 1.1, letterSpacing: '0.02em' }}
                  >
                    Not sure how to turn your tech idea into a{' '}
                    <span className="inline-block ml-2 bg-[#6c47ff] text-white rounded-xl px-6 py-1 font-montserrat font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                      {rotatingWords[rotatingIndex]}
                    </span>
                  </span>
                )}
              </div>
              <div
                className="rounded-xl px-8 py-3 bg-black/40 flex items-center justify-center"
                style={{
                  minHeight: '3.5rem',
                  width: '100%',
                  fontWeight: 900,
                  color: '#e5e5e5',
                  fontFamily: 'Montserrat, sans-serif',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                }}
              >
                {!showStaticSecondLine ? (
                  <TypewriterEffectSmooth
                    words={
                      showSecond
                        ? [
                            { text: "Let" },
                            { text: "your" },
                            { text: "AI" },
                            { text: "CTO" },
                            { text: "handle" },
                            { text: "all" },
                            { text: "the" },
                            { text: "technical", className: "text-blue-500" },
                            { text: "heavy", className: "text-blue-500" },
                            { text: "lifting.", className: "text-blue-500" },
                          ]
                        : [
                            { text: "Let".replace(/./g, ' ') },
                            { text: "your".replace(/./g, ' ') },
                            { text: "AI".replace(/./g, ' ') },
                            { text: "CTO".replace(/./g, ' ') },
                            { text: "handle".replace(/./g, ' ') },
                            { text: "all".replace(/./g, ' ') },
                            { text: "the".replace(/./g, ' ') },
                            { text: "technical".replace(/./g, ' ') },
                            { text: "heavy".replace(/./g, ' ') },
                            { text: "lifting.".replace(/./g, ' ') },
                          ]
                    }
                    className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-center drop-shadow-lg"
                    cursorClassName="bg-white"
                    cursorCharacter={showSecond ? "_" : undefined}
                    fadeIn={showSecond}
                    showCursor={showSecond}
                  />
                ) : (
                  <span
                    className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-center drop-shadow-lg"
                    style={{ lineHeight: 1.1, letterSpacing: '0.02em' }}
                  >
                    LET YOUR AI CTO HANDLE ALL THE <span className="text-[#6c47ff]">TECHNICAL HEAVY LIFTING.</span>
                  </span>
                )}
              </div>
              {/* Buttons below the animated text */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '4rem' }}>
                <Button
                  size="lg"
                  className="bg-[#6c47ff] text-white rounded-lg font-kode-mono px-8 py-3 text-lg shadow-lg hover:bg-[#7d5fff] transition-colors border-2 border-[#6c47ff]"
                  onClick={() => window.location.href = '/chat'}
                >
                  Try Me
                </Button>
                <Button
                  size="lg"
                  className="bg-transparent text-[#6c47ff] border-2 border-[#6c47ff] rounded-lg font-kode-mono px-8 py-3 text-lg shadow-lg hover:bg-[#6c47ff] hover:text-white transition-colors"
                >
                  Contact Us
                </Button>
              </div>
              
              {/* Development Status & Waitlist Section */}
              <div style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '6rem',
                pointerEvents: 'auto'
              }}>
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl border border-[#6c47ff]/30">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse mr-3"></div>
                      <span className="text-yellow-400 font-kode-mono text-lg font-bold">MVP IN DEVELOPMENT</span>
                    </div>
                    
                    <h3 className="text-white text-2xl font-bold mb-4 font-montserrat">
                      🚀 Early Access Coming Soon
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                                             This AI CTO Agent is currently in active development. We&apos;re building the most advanced 
                      technical advisor for non-technical founders. Join our waitlist to be among the first 
                      to experience the future of startup technical guidance.
                    </p>
                    
                                         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                       <div className="relative flex-1 max-w-sm">
                         <input
                           type="email"
                           placeholder="Enter your email"
                           value={waitlistEmail}
                           onChange={(e) => setWaitlistEmail(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleWaitlistSubmit()}
                           className="w-full px-4 py-3 bg-black/40 border border-[#6c47ff]/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6c47ff] transition-colors font-kode-mono"
                           style={{ backdropFilter: 'blur(10px)' }}
                           disabled={isSubmitting}
                         />
                       </div>
                       <Button
                         size="lg"
                         className="bg-[#6c47ff] text-white rounded-lg font-kode-mono px-6 py-3 text-base shadow-lg hover:bg-[#7d5fff] transition-colors border-2 border-[#6c47ff] whitespace-nowrap disabled:opacity-50"
                         onClick={handleWaitlistSubmit}
                         disabled={isSubmitting}
                       >
                         {isSubmitting ? "Joining..." : "Join Waitlist"}
                       </Button>
                     </div>
                     
                     {waitlistMessage && (
                       <div className={`mt-4 text-sm font-kode-mono ${
                         waitlistMessage.includes("Thank you") 
                           ? "text-green-400" 
                           : "text-red-400"
                       }`}>
                         {waitlistMessage}
                       </div>
                     )}
                    
                    <div className="mt-6 text-sm text-gray-400 font-kode-mono">
                      <span className="text-[#6c47ff]">✓</span> Early access to full features
                      <br />
                      <span className="text-[#6c47ff]">✓</span> Priority support & updates
                      <br />
                      <span className="text-[#6c47ff]">✓</span> Exclusive founder community
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

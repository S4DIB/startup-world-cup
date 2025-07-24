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
      setDisplay((prev) => {
        return text
          .split("")
          .map((c: string, i: number) => {
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

  // Glitch effect state
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    let glitchInterval: NodeJS.Timeout;
    let glitchTimeout: NodeJS.Timeout;
    if (showSecond) {
      // Wait for the second line to finish animating (1s), then start glitch loop
      glitchTimeout = setTimeout(() => {
        setGlitch(true);
        glitchInterval = setInterval(() => {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 700); // glitch for 0.7s
        }, 5000);
        setTimeout(() => setGlitch(false), 700); // initial glitch
      }, 1000);
    }
    return () => {
      clearTimeout(glitchTimeout);
      clearInterval(glitchInterval);
    };
  }, [showSecond]);

  // Header styles
  const headerStyle = {
    width: '100vw',
    padding: '0.5rem clamp(1rem, 4vw, 2.5rem)',
    position: 'fixed' as 'fixed',
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

  // Header DecryptedText loop logic
  const headerPhrases = ["AI CTO AGENT", "CREATE HISTORY"];
  const [headerIndex, setHeaderIndex] = useState(0);
  const [headerKey, setHeaderKey] = useState(0); // to force re-mount for animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeaderIndex((prev) => (prev + 1) % headerPhrases.length);
      setHeaderKey((k) => k + 1);
    }, 5000); // 10 seconds per phrase
    return () => clearTimeout(timeout);
  }, [headerIndex]);

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
            <a href="#pricing" className={navLinkStyle}>Pricing</a>
            <a href="#contact" className={navLinkStyle}>Contact</a>
            <a href="#ctc" className={navLinkStyle + ' bg-blue-500 text-white hover:bg-blue-700 ml-2 px-5'}>CTC</a>
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
                className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg font-kode-mono mb-4"
                cursorClassName="bg-white"
                onDone={() => setShowSecond(true)}
                cursorCharacter="_"
                showCursor={!showSecond}
              />
              <div style={{ minHeight: '1.2em', width: '100%', display: 'flex', justifyContent: 'center' }}>
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
                  className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg font-kode-mono"
                  cursorClassName="bg-white"
                  cursorCharacter={showSecond ? "_" : undefined}
                  fadeIn={showSecond}
                  showCursor={showSecond}
                />
              </div>
              {/* Buttons below the animated text */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '4rem' }}>
                <Button
                  size="lg"
                  className="bg-blue-500 text-white rounded-lg font-kode-mono px-8 py-3 text-lg shadow-lg hover:bg-blue-700 transition-colors border-2 border-blue-500"
                >
                  Try Me
                </Button>
                <Button
                  size="lg"
                  className="bg-transparent text-blue-500 border-2 border-blue-500 rounded-lg font-kode-mono px-8 py-3 text-lg shadow-lg hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

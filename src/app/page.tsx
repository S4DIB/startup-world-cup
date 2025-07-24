"use client";
import React, { useState } from "react";
import Particles from "../components/Particles";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Button } from "../components/ui/button";

export default function Home() {
  const [showSecond, setShowSecond] = useState(false);

  return (
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
                      { text: "technical" },
                      { text: "heavy" },
                      { text: "lifting." },
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
            <Button variant="default" size="lg">Try Me</Button>
            <Button variant="secondary" size="lg">Contact Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

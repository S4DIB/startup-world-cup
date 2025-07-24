"use client";
import React, { useState } from "react";
import Particles from "../components/Particles";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

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
          {showSecond && (
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
              <TypewriterEffectSmooth
                words={[
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
                ]}
                className="uppercase text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg font-kode-mono"
                cursorClassName="bg-white"
                cursorCharacter="_"
                fadeIn={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Particles from "../../components/Particles";
import { Button } from "../../components/ui/button";

// DecryptedText animation component (reused from homepage)
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

export default function AboutPage() {
  const [currentTick, setCurrentTick] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const headerPhrases = ["AI CTO AGENT", "ABOUT US"];
  const intervalMs = 3000;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTick((tick) => tick + 1);
      setGlitch(true);
      setTimeout(() => setGlitch(false), 700);
    }, intervalMs);
    return () => clearInterval(interval);
  }, []);

  const headerIndex = currentTick % headerPhrases.length;
  const [headerKey, setHeaderKey] = useState(0);
  useEffect(() => { setHeaderKey((k) => k + 1); }, [headerIndex]);

  // Add Montserrat font import
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
            <a href="/" className={navLinkStyle}>Home</a>
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
        
        <div style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none', overflowY: 'auto' }}>
          <div style={{ paddingTop: '80px', minHeight: '100vh', pointerEvents: 'auto' }}>
            
            {/* Hero Section */}
            <div className="flex justify-center items-center py-20">
              <div className="text-center max-w-4xl px-4">
                <div className={glitch ? 'glitch' : ''}>
                  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold font-montserrat mb-8">
                    <span className="text-[#6c47ff]">//</span> ABOUT THE AI CTO AGENT
                  </h1>
                  <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-12">
                    Your strategic technical advisor for turning ideas into successful startups
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="flex justify-center mb-20">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl border border-[#6c47ff]/30">
                <div className="text-center mb-8">
                  <h2 className="text-white text-3xl font-bold mb-4 font-montserrat">
                    <span className="text-[#6c47ff]">//</span> OUR MISSION
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#6c47ff] to-blue-500 mx-auto"></div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed text-center">
                  We bridge the gap between non-technical founders and technical execution. 
                  Our AI CTO Agent transforms your raw business idea into a comprehensive 
                  technical strategy, guiding you from concept to scale.
                </p>
              </div>
            </div>

            {/* What We Do Section */}
            <div className="flex justify-center mb-20">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-6xl border border-[#6c47ff]/30">
                <div className="text-center mb-12">
                  <h2 className="text-white text-3xl font-bold mb-4 font-montserrat">
                    <span className="text-[#6c47ff]">//</span> WHAT WE DO
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#6c47ff] to-blue-500 mx-auto mb-8"></div>
                  <p className="text-gray-300 text-lg">
                    From idea to scale - we handle the technical heavy lifting
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Plan */}
                  <div className="bg-black/40 rounded-xl p-6 border border-[#6c47ff]/20 hover:border-[#6c47ff]/50 transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#6c47ff] rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <h3 className="text-white text-xl font-bold font-montserrat">PLAN</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Transform your idea into a strategic technical roadmap with timelines, 
                      budgets, and technology recommendations.
                    </p>
                  </div>

                  {/* Build */}
                  <div className="bg-black/40 rounded-xl p-6 border border-[#6c47ff]/20 hover:border-[#6c47ff]/50 transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#6c47ff] rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <h3 className="text-white text-xl font-bold font-montserrat">BUILD</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Get step-by-step guidance on technology stack, architecture decisions, 
                      and development strategies for your MVP.
                    </p>
                  </div>

                  {/* Iterate */}
                  <div className="bg-black/40 rounded-xl p-6 border border-[#6c47ff]/20 hover:border-[#6c47ff]/50 transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#6c47ff] rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <h3 className="text-white text-xl font-bold font-montserrat">ITERATE</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Continuous improvement through data-driven insights, user feedback analysis, 
                      and performance optimization strategies.
                    </p>
                  </div>

                  {/* Scale */}
                  <div className="bg-black/40 rounded-xl p-6 border border-[#6c47ff]/20 hover:border-[#6c47ff]/50 transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#6c47ff] rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">4</span>
                      </div>
                      <h3 className="text-white text-xl font-bold font-montserrat">SCALE</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Scale with confidence through infrastructure planning, team building, 
                      and strategic growth guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Non-Technical Founders */}
            <div className="flex justify-center mb-20">
              <div className="bg-gradient-to-r from-[#6c47ff]/20 to-blue-500/20 rounded-2xl p-8 max-w-4xl border border-[#6c47ff]/30">
                <div className="text-center">
                  <h2 className="text-white text-3xl font-bold mb-6 font-montserrat">
                    🚀 FOR NON-TECHNICAL FOUNDERS
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    You have the vision. We have the technical expertise. No coding knowledge required. 
                    Our AI CTO bridges the gap between your business idea and technical execution, 
                    helping you build, launch, and scale your startup with confidence.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-[#6c47ff] text-2xl mb-2">💡</div>
                      <h3 className="text-white font-bold mb-2">Start with an Idea</h3>
                      <p className="text-gray-300 text-sm">Share your business concept and vision</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-[#6c47ff] text-2xl mb-2">🎯</div>
                      <h3 className="text-white font-bold mb-2">Get Strategic Guidance</h3>
                      <p className="text-gray-300 text-sm">Receive comprehensive technical roadmap</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-[#6c47ff] text-2xl mb-2">🚀</div>
                      <h3 className="text-white font-bold mb-2">Execute & Scale</h3>
                      <p className="text-gray-300 text-sm">Build, launch, and grow your startup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="flex justify-center mb-20">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl border border-[#6c47ff]/30">
                <div className="text-center mb-8">
                  <h2 className="text-white text-3xl font-bold mb-4 font-montserrat">
                    <span className="text-[#6c47ff]">//</span> KEY BENEFITS
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#6c47ff] to-blue-500 mx-auto"></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-[#6c47ff] text-xl mr-3">✓</span>
                      <div>
                        <h3 className="text-white font-bold mb-1">Strategic Planning</h3>
                        <p className="text-gray-300 text-sm">Comprehensive technical roadmap with timelines and budgets</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#6c47ff] text-xl mr-3">✓</span>
                      <div>
                        <h3 className="text-white font-bold mb-1">Technology Selection</h3>
                        <p className="text-gray-300 text-sm">Expert guidance on tech stack and architecture decisions</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#6c47ff] text-xl mr-3">✓</span>
                      <div>
                        <h3 className="text-white font-bold mb-1">Team Building</h3>
                        <p className="text-gray-300 text-sm">Hiring strategies and team composition recommendations</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-[#6c47ff] text-xl mr-3">✓</span>
                      <div>
                        <h3 className="text-white font-bold mb-1">Risk Mitigation</h3>
                        <p className="text-gray-300 text-sm">Identify and address potential technical challenges early</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#6c47ff] text-xl mr-3">✓</span>
                      <div>
                        <h3 className="text-white font-bold mb-1">Scalability Planning</h3>
                        <p className="text-gray-300 text-sm">Build for growth from day one with scalable architecture</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#6c47ff] text-xl mr-3">✓</span>
                      <div>
                        <h3 className="text-white font-bold mb-1">Ongoing Support</h3>
                        <p className="text-gray-300 text-sm">Continuous guidance through development and scaling phases</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex justify-center mb-20">
              <div className="text-center">
                <h2 className="text-white text-3xl font-bold mb-6 font-montserrat">
                  Ready to Turn Your Idea Into Reality?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join our waitlist to be among the first to experience the future of startup technical guidance.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-[#6c47ff] text-white rounded-lg font-kode-mono px-8 py-3 text-lg shadow-lg hover:bg-[#7d5fff] transition-colors border-2 border-[#6c47ff]"
                    onClick={() => window.location.href = '/chat'}
                  >
                    Try AI CTO
                  </Button>
                  <Button
                    size="lg"
                    className="bg-transparent text-[#6c47ff] border-2 border-[#6c47ff] rounded-lg font-kode-mono px-8 py-3 text-lg shadow-lg hover:bg-[#6c47ff] hover:text-white transition-colors"
                    onClick={() => window.location.href = '/'}
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
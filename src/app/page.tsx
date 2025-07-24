import Particles from "../components/Particles";
import TextType from "../components/TextType";

export default function Home() {
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
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none' }}>
        <TextType
          text={["Not sure how to turn your tech idea into a startup?", "Let your AI CTO handle all the technical heavy lifting."]}
          typingSpeed={60}
          variableSpeed={{ min: 60, max: 90 }}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
          className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg font-kode-mono"
          style={{ fontFamily: "'Kode Mono', monospace", fontWeight: 800, pointerEvents: 'auto' }}
        />
      </div>
    </div>
  );
}

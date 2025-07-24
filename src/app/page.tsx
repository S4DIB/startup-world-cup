import Particles from "../components/Particles";

export default function Home() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000', zIndex: 0 }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={350}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={120}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
}

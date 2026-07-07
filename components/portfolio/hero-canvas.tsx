"use client";

import { Float, MeshDistortMaterial, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Orb({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial color={color} distort={0.35} speed={1.6} roughness={0.05} />
      </Sphere>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <div className="h-[420px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1.1} />
        <pointLight position={[10, 10, 10]} intensity={30} color="#67e8f9" />
        <pointLight position={[-10, -10, -10]} intensity={20} color="#a855f7" />
        <Stars radius={90} depth={40} count={1500} factor={3} saturation={0} fade speed={1} />
        <Orb position={[-1.8, 0.5, 0]} color="#22d3ee" scale={1.2} />
        <Orb position={[1.5, -0.4, -0.8]} color="#c084fc" scale={0.95} />
        <Orb position={[0, 1.8, -1.4]} color="#38bdf8" scale={0.6} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.9} enablePan={false} />
      </Canvas>
    </div>
  );
}

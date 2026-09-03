import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function AnimatedSphere() {
  const sphereRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.2;
      sphereRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.8}>
      <MeshDistortMaterial
        color="#10b981" // emerald-500
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </Sphere>
  );
}

function ParticleCloud() {
  const ref = useRef();
  // Generate 2000 points inside a sphere
  const sphere = random.inSphere(new Float32Array(2000 * 3), { radius: 2.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9" // sky-500
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function IntelligenceSphere() {
  return (
    <div className="w-full h-full relative cursor-move">
      <Canvas 
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      className="w-full h-full pointer-events-none"
    >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <ParticleCloud />
      </Canvas>
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] animate-pulse">
          Live Intelligence Core
        </p>
      </div>
    </div>
  );
}

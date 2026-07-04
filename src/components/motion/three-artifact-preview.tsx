"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingArtifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((_, delta) => {
    if (prefersReducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        color="#c9a24b"
        wireframe
        emissive="#c9a24b"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/** Deterministic pseudo-random hash (pure function of `seed`), used instead of
 * `Math.random` so particle placement doesn't violate component purity rules. */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (pseudoRandom(i * 3.1) - 0.5) * 12;
      arr[i * 3 + 1] = (pseudoRandom(i * 7.7) - 0.5) * 8;
      arr[i * 3 + 2] = (pseudoRandom(i * 5.3) - 0.5) * 8;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#e8d9a8" transparent opacity={0.6} />
    </points>
  );
}

/**
 * Generic "no scan available yet" 3D preview — a slowly rotating wireframe
 * artifact in a field of gold dust. Used as the placeholder media viewer for
 * museum objects that don't have a real photogrammetry scan (see
 * item-detail-template.tsx `mediaViewer` slot).
 */
export function ThreeArtifactPreview() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#c9a24b" />
      <Suspense fallback={null}>
        <RotatingArtifact />
        <Particles />
      </Suspense>
    </Canvas>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/** Accumulates scroll velocity as a decaying impulse, consumed in useFrame. */
function useScrollImpulse() {
  const impulseRef = useRef(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      impulseRef.current += (y - lastYRef.current) * 0.015;
      impulseRef.current = THREE.MathUtils.clamp(impulseRef.current, -2.5, 2.5);
      lastYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return impulseRef;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The Tutankhamun head on its own — no faceted "Heritage Sphere" shell here
 * (that motif now lives only on the Museum object 3D-preview placeholder,
 * see three-artifact-preview.tsx). Just the real mask photo, curved onto a
 * near-full bust silhouette, lit and rotated on its own.
 */
function Head() {
  const groupRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);
  const impulseRef = useScrollImpulse();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const rawTexture = useTexture("/images/hero/tutankhamun-golden-mask.jpg");
  // Clone rather than mutate the hook's own texture instance — its
  // colorSpace defaults to linear, but a photographic map needs sRGB.
  const texture = useMemo(() => {
    const clone = rawTexture.clone();
    clone.colorSpace = THREE.SRGBColorSpace;
    clone.needsUpdate = true;
    return clone;
  }, [rawTexture]);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    elapsedRef.current += delta;

    // Idle drift plus a scroll-driven "kick" that decays smoothly — reactive
    // while scrolling, but never fully still.
    impulseRef.current *= 0.95;
    const baseSpeed = 0.1;
    groupRef.current.rotation.y += (baseSpeed + impulseRef.current * 0.6) * delta;

    // Slow, irrational-ratio sine layering reads as organic "random" wobble
    // rather than a mechanical, perfectly periodic spin.
    groupRef.current.rotation.x =
      Math.sin(elapsedRef.current * 0.17) * 0.08 + Math.sin(elapsedRef.current * 0.083) * 0.04;
    groupRef.current.rotation.z =
      Math.cos(elapsedRef.current * 0.11) * 0.025 + impulseRef.current * 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.15, 64, 64, -Math.PI * 0.7, Math.PI * 1.4, Math.PI * 0.06, Math.PI * 0.92]} />
        <meshStandardMaterial map={texture} metalness={0.15} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Particles() {
  const count = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (pseudoRandom(i * 3.1) - 0.5) * 10;
      arr[i * 3 + 1] = (pseudoRandom(i * 7.7) - 0.5) * 7;
      arr[i * 3 + 2] = (pseudoRandom(i * 5.3) - 0.5) * 6;
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

export function TutankhamunHead() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.3], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.75} />
      <pointLight position={[4, 4, 5]} intensity={1.6} color="#f3d98b" />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color="#4a6fa5" />
      <Suspense fallback={null}>
        <Head />
        <Particles />
      </Suspense>
    </Canvas>
  );
}

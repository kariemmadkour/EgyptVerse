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

function MaskGem() {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
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
    if (prefersReducedMotion || !groupRef.current || !shellRef.current) return;
    elapsedRef.current += delta;

    // Idle drift plus a scroll-driven "kick" that decays smoothly — reactive
    // while scrolling, but never fully still.
    impulseRef.current *= 0.95;
    const baseSpeed = 0.12;
    groupRef.current.rotation.y += (baseSpeed + impulseRef.current * 0.6) * delta;

    // Slow, irrational-ratio sine layering reads as organic "random" wobble
    // rather than a mechanical, perfectly periodic spin.
    groupRef.current.rotation.x =
      Math.sin(elapsedRef.current * 0.17) * 0.1 + Math.sin(elapsedRef.current * 0.083) * 0.05;
    groupRef.current.rotation.z =
      Math.cos(elapsedRef.current * 0.11) * 0.035 + impulseRef.current * 0.02;

    shellRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Faceted gold shell — the "Heritage Sphere" language, now wrapped around the mask */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshStandardMaterial
          color="#c9a24b"
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.28}
          emissive="#c9a24b"
          emissiveIntensity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color="#e8d9a8" wireframe transparent opacity={0.5} />
      </mesh>

      {/* The mask itself, projected onto a curved "viewport" segment facing the camera */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.55, 48, 48, -Math.PI * 0.55, Math.PI * 1.1, Math.PI * 0.12, Math.PI * 0.82]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.6} side={THREE.FrontSide} />
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

export function TutankhamunMaskSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 5]} intensity={1.4} color="#f3d98b" />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color="#4a6fa5" />
      <Suspense fallback={null}>
        <MaskGem />
        <Particles />
      </Suspense>
    </Canvas>
  );
}

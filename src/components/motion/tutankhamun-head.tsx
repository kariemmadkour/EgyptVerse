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

/** A fresh, random-feeling phase/frequency per axis so the float pattern
 * never looks identical twice, while still moving smoothly (sine-based,
 * never a jump). Randomized in an effect, not during render, since
 * `Math.random` is impure. */
function useFloatSeed() {
  const seedRef = useRef({
    xPhase: 0,
    yPhase: Math.PI / 2,
    xFreq: 0.15,
    yFreq: 0.11,
    yawPhase: 0,
  });

  useEffect(() => {
    seedRef.current = {
      xPhase: Math.random() * Math.PI * 2,
      yPhase: Math.random() * Math.PI * 2,
      xFreq: 0.15 + Math.random() * 0.1,
      yFreq: 0.11 + Math.random() * 0.08,
      yawPhase: Math.random() * Math.PI * 2,
    };
  }, []);

  return seedRef;
}

/**
 * The Tutankhamun head on its own — no faceted "Heritage Sphere" shell here
 * (that motif now lives only on the Museum object 3D-preview placeholder,
 * see three-artifact-preview.tsx). Just the real mask photo, curved onto a
 * near-full bust silhouette, drifting and rotating on its own.
 */
function Head() {
  const groupRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);
  const impulseRef = useScrollImpulse();
  const floatSeedRef = useFloatSeed();

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
    const t = elapsedRef.current;

    // Scroll-driven "kick" that decays smoothly — reactive while scrolling,
    // but never fully still.
    impulseRef.current *= 0.95;
    const seed = floatSeedRef.current;

    // Bounded "look around" yaw, not a full spin — the photo only wraps
    // ~252° of the sphere, so a continuous 360° rotation would eventually
    // swing the untextured back of the mesh into view. Oscillating within
    // a safe range keeps the mask's face on camera at all times.
    groupRef.current.rotation.y = Math.sin(t * 0.09 + seed.yawPhase) * 0.3 + impulseRef.current * 0.08;

    // Slow, irrational-ratio sine layering reads as organic "random" wobble
    // rather than a mechanical, perfectly periodic spin.
    groupRef.current.rotation.x = Math.sin(t * 0.17) * 0.06 + Math.sin(t * 0.083) * 0.03;
    groupRef.current.rotation.z = Math.cos(t * 0.11) * 0.02;

    // Gentle floating drift — up/down and left/right — on a per-mount random
    // phase/frequency, so the motion "invents" a new path each time without
    // ever jumping or repeating identically.
    groupRef.current.position.y = Math.sin(t * seed.yFreq + seed.yPhase) * 0.28;
    groupRef.current.position.x = Math.sin(t * seed.xFreq + seed.xPhase) * 0.32;
  });

  return (
    <group ref={groupRef}>
      {/* A flat plane, not a sphere segment — the photo only covers part of
          any curved wrap, and a segment large enough to rotate safely without
          ever exposing that gap ended up defeating the point of curving it.
          Rotation/tilt/float still read as a real object in 3D space. */}
      <mesh>
        <planeGeometry args={[2.6, 3.47]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.6} side={THREE.DoubleSide} />
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
      camera={{ position: [0, 0, 6.5], fov: 38 }}
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

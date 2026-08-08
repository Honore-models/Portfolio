"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Image, RoundedBox } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { certifications } from "@/data/content";

type Cert = (typeof certifications)[number];

const CARD_W = 2.2;
const CARD_H = 2.9;
const RADIUS = 4.35;

function CertCard({
  cert,
  index,
  total,
  active,
  onHover,
}: {
  cert: Cert;
  index: number;
  total: number;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * RADIUS;
  const z = Math.cos(angle) * RADIUS;

  useFrame(() => {
    if (!group.current) return;
    const target = active ? 1.1 : 1;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.14);
  });

  return (
    <group
      ref={group}
      position={[x, 0, z]}
      rotation={[0, angle, 0]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerLeave={() => onHover(null)}
    >
      {/* Outer glow (behind card, toward center) */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[CARD_W + 0.35, CARD_H + 0.35]} />
        <meshBasicMaterial
          color={cert.color}
          transparent
          opacity={active ? 0.32 : 0.14}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glass card shell */}
      <RoundedBox args={[CARD_W, CARD_H, 0.08]} radius={0.14} smoothness={8}>
        <meshPhysicalMaterial
          color="#0b1730"
          transparent
          opacity={0.72}
          roughness={0.2}
          metalness={0.25}
          transmission={0.22}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* Accent rim */}
      <mesh position={[0, CARD_H / 2 - 0.04, 0.045]}>
        <boxGeometry args={[CARD_W - 0.2, 0.035, 0.01]} />
        <meshBasicMaterial color={cert.color} />
      </mesh>
      <mesh position={[0, -(CARD_H / 2 - 0.04), 0.045]}>
        <boxGeometry args={[CARD_W - 0.2, 0.035, 0.01]} />
        <meshBasicMaterial color={cert.color} />
      </mesh>

      {/* Certificate preview */}
      <Suspense fallback={null}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- drei Image renders a WebGL mesh, not a DOM image. */}
        <Image
          url={cert.image}
          scale={[CARD_W - 0.28, CARD_H - 0.95]}
          position={[0, 0.28, 0.05]}
          radius={0.05}
          toneMapped={false}
        />
      </Suspense>

      {/* Issuer logo + meta (HTML overlay for crisp logos) */}
      <Html
        transform
        distanceFactor={1.6}
        position={[0, -1.08, 0.06]}
        style={{
          width: "210px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#07111fcc] px-2.5 py-2 backdrop-blur-md font-[family-name:var(--font-outfit)] shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.logo}
            alt={cert.provider}
            className="h-9 w-9 shrink-0 rounded-md bg-white object-contain p-0.5"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold leading-tight text-white">
              {cert.title}
            </p>
            <p className="truncate text-[9px] font-medium" style={{ color: cert.accent }}>
              {cert.provider}
            </p>
          </div>
          <span
            className="shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-bold text-white"
            style={{
              borderColor: `${cert.color}88`,
              background: `${cert.color}33`,
            }}
          >
            {cert.year}
          </span>
        </div>
      </Html>
    </group>
  );
}

function CarouselRing({
  slowed,
  hovered,
  setHovered,
}: {
  slowed: boolean;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!root.current) return;
    const speed = hovered !== null ? 0 : slowed ? 0.16 : 0.38;
    root.current.rotation.y += delta * speed;
  });

  return (
    <group ref={root}>
      {certifications.map((cert, i) => (
        <CertCard
          key={cert.id}
          cert={cert}
          index={i}
          total={certifications.length}
          active={hovered === i}
          onHover={setHovered}
        />
      ))}
    </group>
  );
}

export default function Certifications() {
  const [slowed, setSlowed] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? certifications[hovered] : null;

  return (
    <section id="certifications" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Certifications
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
            Hover any card to pause and inspect. Hover the carousel to slow the rotation.
          </p>
        </motion.div>

        <div
          className="relative h-[480px] sm:h-[540px] md:h-[600px]"
          onPointerEnter={() => setSlowed(true)}
          onPointerLeave={() => {
            setSlowed(false);
            setHovered(null);
          }}
        >
          <div className="pointer-events-none absolute inset-x-[18%] bottom-[18%] h-20 rounded-[100%] bg-cyan-400/10 blur-3xl" />

          <Canvas
            camera={{ position: [0, 0.15, 9.2], fov: 42 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.95} />
            <spotLight
              position={[4, 3, 8]}
              angle={0.55}
              penumbra={0.9}
              intensity={2.2}
              color="#9ae6ff"
            />
            <pointLight position={[-5, 1.5, 4]} intensity={1.3} color="#a855f7" />
            <pointLight position={[3, 0.5, 6]} intensity={0.8} color="#38bdf8" />
            <Suspense fallback={null}>
              <CarouselRing
                slowed={slowed}
                hovered={hovered}
                setHovered={setHovered}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="min-h-[76px] -mt-6 flex items-center justify-center">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-[#0a1628]/80 px-4 py-3 backdrop-blur-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.logo}
                alt={active.provider}
                className="h-11 w-11 rounded-lg bg-white object-contain p-1"
              />
              <div>
                <p className="text-sm font-semibold text-white">{active.title}</p>
                <p className="text-xs" style={{ color: active.accent }}>
                  {active.provider} · {active.year}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3 opacity-70">
              {certifications.map((c) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={c.id}
                  src={c.logo}
                  alt={c.provider}
                  title={c.provider}
                  className="h-8 w-8 rounded-md bg-white/90 object-contain p-0.5"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

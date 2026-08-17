"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Image, RoundedBox } from "@react-three/drei";
import { Suspense, createContext, useContext, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { certifications } from "@/data/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Cert = (typeof certifications)[number];

type CarouselConfig = {
  cardW: number;
  cardH: number;
  radius: number;
  showHtml: boolean;
  htmlWidth: number;
  distanceFactor: number;
};

const CarouselConfigContext = createContext<CarouselConfig>({
  cardW: 2.2,
  cardH: 2.9,
  radius: 4.35,
  showHtml: true,
  htmlWidth: 210,
  distanceFactor: 1.6,
});

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
  const { cardW, cardH, radius, showHtml, htmlWidth, distanceFactor } =
    useContext(CarouselConfigContext);
  const group = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

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
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[cardW + 0.35, cardH + 0.35]} />
        <meshBasicMaterial
          color={cert.color}
          transparent
          opacity={active ? 0.32 : 0.14}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <RoundedBox args={[cardW, cardH, 0.08]} radius={0.14} smoothness={8}>
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

      <mesh position={[0, cardH / 2 - 0.04, 0.045]}>
        <boxGeometry args={[cardW - 0.2, 0.035, 0.01]} />
        <meshBasicMaterial color={cert.color} />
      </mesh>
      <mesh position={[0, -(cardH / 2 - 0.04), 0.045]}>
        <boxGeometry args={[cardW - 0.2, 0.035, 0.01]} />
        <meshBasicMaterial color={cert.color} />
      </mesh>

      <Suspense fallback={null}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url={cert.image}
          scale={[cardW - 0.28, cardH - 0.95]}
          position={[0, 0.28, 0.05]}
          radius={0.05}
          toneMapped={false}
        />
      </Suspense>

      {showHtml && (
        <Html
          transform
          distanceFactor={distanceFactor}
          position={[0, -cardH / 2 + 0.38, 0.06]}
          style={{
            width: `${htmlWidth}px`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#07111fcc] px-2 py-1.5 backdrop-blur-md font-[family-name:var(--font-outfit)] shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cert.logo}
              alt={cert.provider}
              className="h-8 w-8 shrink-0 rounded-md bg-white object-contain p-0.5"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold leading-tight text-white">
                {cert.title}
              </p>
              <p
                className="truncate text-[8px] font-medium"
                style={{ color: cert.accent }}
              >
                {cert.provider}
              </p>
            </div>
            <span
              className="shrink-0 rounded-md border px-1 py-0.5 text-[8px] font-bold text-white"
              style={{
                borderColor: `${cert.color}88`,
                background: `${cert.color}33`,
              }}
            >
              {cert.year}
            </span>
          </div>
        </Html>
      )}
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [slowed, setSlowed] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? certifications[hovered] : null;

  const config: CarouselConfig = isMobile
    ? {
        cardW: 1.55,
        cardH: 2.05,
        radius: 3.1,
        showHtml: false,
        htmlWidth: 160,
        distanceFactor: 1.2,
      }
    : {
        cardW: 2.2,
        cardH: 2.9,
        radius: 4.35,
        showHtml: true,
        htmlWidth: 210,
        distanceFactor: 1.6,
      };

  const camera = isMobile
    ? { position: [0, 0.08, 6.8] as [number, number, number], fov: 50 }
    : { position: [0, 0.15, 9.2] as [number, number, number], fov: 42 };

  return (
    <section id="certifications" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Certifications
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-md mx-auto px-2">
            {isMobile
              ? "Tap and drag to explore. Tap a card to pause rotation."
              : "Hover any card to pause and inspect. Hover the carousel to slow the rotation."}
          </p>
        </motion.div>

        <div
          className="relative h-[340px] xs:h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] touch-pan-y"
          onPointerEnter={() => setSlowed(true)}
          onPointerLeave={() => {
            setSlowed(false);
            setHovered(null);
          }}
        >
          <div className="pointer-events-none absolute inset-x-[10%] sm:inset-x-[18%] bottom-[12%] sm:bottom-[18%] h-16 sm:h-20 rounded-[100%] bg-cyan-400/10 blur-3xl" />

          <CarouselConfigContext.Provider value={config}>
            <Canvas
              camera={camera}
              dpr={isMobile ? [1, 1.25] : [1, 1.75]}
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
          </CarouselConfigContext.Provider>
        </div>

        <div className="min-h-[88px] sm:min-h-[76px] -mt-4 sm:-mt-6 flex items-center justify-center px-2">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex w-full max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-[#0a1628]/80 px-3 sm:px-4 py-3 backdrop-blur-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.logo}
                alt={active.provider}
                className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-lg bg-white object-contain p-1"
              />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white truncate">
                  {active.title}
                </p>
                <p className="text-[10px] sm:text-xs truncate" style={{ color: active.accent }}>
                  {active.provider} · {active.year}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 opacity-80 max-w-full">
              {certifications.map((c) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={c.id}
                  src={c.logo}
                  alt={c.provider}
                  title={c.provider}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-white object-contain p-0.5"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

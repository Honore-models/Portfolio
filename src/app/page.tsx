"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import EngineeringStack from "@/components/sections/EngineeringStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";

const ConstellationBackground = dynamic(
  () => import("@/components/background/ConstellationBackground"),
  { ssr: false }
);

const Certifications = dynamic(
  () => import("@/components/sections/Certifications"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <ConstellationBackground />
      <Header />
      <main className="relative z-0">
        <Hero />
        <About />
        <EngineeringStack />
        <Projects />
        <Experience />
        <Certifications />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

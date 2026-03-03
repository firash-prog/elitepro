"use client";

import React from "react";
import SplashScreen from "@/components/sections/SplashScreen";
import Header from "@/components/navigation/Header";
import Hero from "@/components/sections/Hero";
import VisionScroll from "@/components/sections/VisionScroll";
import Technologies from "@/components/sections/Technologies";
import GuidingPrinciples from "@/components/sections/GuidingPrinciples";
import PersonalPerspectives from "@/components/sections/PersonalPerspectives";
import AlephPreview from "@/components/sections/AlephPreview";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Header />
      <Hero />
      <VisionScroll />
      <Technologies />
      <GuidingPrinciples />
      <PersonalPerspectives />
      <AlephPreview />
    </>
  );
}

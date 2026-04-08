import type { Metadata } from "next";
import { MissionVision } from "@/components/about/MissionVision";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutImage } from "@/components/about/AboutImage";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About | The Ark Group",
  description:
    "The Ark Group is a strategic architecture firm helping ambitious businesses build the foundations for sustainable, long-term growth.",
};

export default function AboutPage() {
  return (
    <>
      <MissionVision />
      <AboutContent />
      <AboutImage />
      <AboutHero />
    </>
  );
}

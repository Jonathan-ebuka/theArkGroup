import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Divisions } from "@/components/Divisions";
import { Approach } from "@/components/Approach";
import { FinalCTA } from "@/components/FinalCTA";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider variant="light" />
      <About />
      <SectionDivider variant="light" />
      <Divisions />
      <SectionDivider variant="dark" />
      <Approach />
      <SectionDivider variant="light" />
      <FinalCTA />
    </>
  );
}

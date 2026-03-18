import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <About />
      <FAQ variant="light" />
      <FinalCTA />
    </>
  );
}

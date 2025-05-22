import Image from "next/image";
import Hero from "@/components/Hero";
import { Spotlight } from "@/components/ui/Spotlight";
import { Navbar } from "@/components/navbar/navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
    </main>
  );
}

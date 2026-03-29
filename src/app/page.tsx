import Navbar from "@/components/Navbar";
import HeroScroll from "@/components/HeroScroll";
import SectionText from "@/components/SectionText";
import PlaneMorph from "@/components/PlaneMorph";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      <Navbar />
      
      <HeroScroll />
      
      <SectionText 
        title="Engineering" 
        subtitle="Engineered for those who move beyond boundaries. Discover a new era of aviation luxury where every detail is meticulously crafted for maximum performance."
      />
      
      <PlaneMorph />
      
      <SectionText 
        title="Boundless" 
        subtitle="Unrestricted access to the world's most exclusive destinations. Your journey begins the moment you step on board."
      />
      
      <Globe />
    </main>
  );
}

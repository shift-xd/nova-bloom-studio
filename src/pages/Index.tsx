import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { InterestsSection } from "@/components/portfolio/InterestsSection";
import { BouncingProjectCards } from "@/components/portfolio/BouncingProjectCards";
import { InstagramSection } from "@/components/portfolio/InstagramSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { VideoBackground } from "@/components/portfolio/VideoBackground";
import { FloatingParticles } from "@/components/portfolio/FloatingParticles";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <VideoBackground />
      <FloatingParticles />
      <Header />
      <main className="flex flex-col items-center">
        <div className="w-full">
          <HeroSection />
        </div>
        <SectionDivider />
        <div className="w-full">
          <AboutSection />
        </div>
        <SectionDivider />
        <div className="w-full">
          <InterestsSection />
        </div>
        <SectionDivider />
        <div className="w-full">
          <BouncingProjectCards />
        </div>
        <SectionDivider />
        <div className="w-full">
          <InstagramSection />
        </div>
        <SectionDivider />
        <div className="w-full">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { InterestsSection } from "@/components/portfolio/InterestsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <InterestsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

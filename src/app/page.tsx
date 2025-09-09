import {
  getAboutData,
  getExperienceData,
  getHeroData,
  getProjectsData,
  getSkillsData,
} from '@/lib/portfolio-data';
import AboutSection from '@/components/about-section';
import Chatbot from '@/components/chatbot';
import ContactSection from '@/components/contact-section';
import ExperienceSection from '@/components/experience-section';
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';

export default function Home() {
  const heroData = getHeroData();
  const aboutData = getAboutData();
  const experienceData = getExperienceData();
  const skillsData = getSkillsData();
  const projectsData = getProjectsData();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection data={heroData} />
        <AboutSection data={aboutData} />
        <ExperienceSection data={experienceData} />
        <SkillsSection data={skillsData} />
        <ProjectsSection data={projectsData} />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

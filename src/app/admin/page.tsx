import AdminDashboard from '@/components/admin-dashboard';
import {
  getAboutData,
  getExperienceData,
  getHeroData,
  getProjectsData,
  getSkillsData,
} from '@/lib/portfolio-data';

export default function AdminPage() {
  const heroData = getHeroData();
  const aboutData = getAboutData();
  const experienceData = getExperienceData();
  const skillsData = getSkillsData();
  const projectsData = getProjectsData();

  const portfolioData = {
    hero: [heroData], // Treat hero and about as arrays for consistency
    about: [aboutData],
    experience: experienceData,
    skills: skillsData,
    projects: projectsData,
  };

  return (
    <div className="bg-background min-h-screen">
      <AdminDashboard initialData={portfolioData} />
    </div>
  );
}

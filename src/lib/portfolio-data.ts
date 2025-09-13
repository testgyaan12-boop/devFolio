
export type HeroData = {
  title: string;
  subtitle: string;
  cta1_text: string;
  cta2_text: string;
};

export type AboutData = {
  title: string;
  paragraphs: string[];
};

export type ExperienceData = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  aiHint: string;
  liveDemoUrl: string;
};

const heroData: HeroData = {
  title: 'Chaudhary Majid Ali',
  subtitle:
    'Specializing in Java, Spring Boot, and modern frontend frameworks to build robust applications for the insurance domain.',
  cta1_text: 'Hire Me',
  cta2_text: 'Download CV',
};

const aboutData: AboutData = {
  title: 'About Me',
  paragraphs: [
    "My name is Chaudhary Majid Ali. I am a seasoned Full-Stack Developer with over three years of dedicated experience in the insurance technology sector. My expertise lies in architecting and developing scalable, high-performance applications using a robust tech stack centered around Java and Spring Boot.",
    "My specialty is to divide large tasks into small pieces and resolve each piece of the task to complete a huge task. Throughout my career, I've led teams in delivering complex projects like commercial insurance portals and motor insurance platforms. I thrive on solving challenges, from integrating with diverse third-party APIs to designing sophisticated business analytics tools. My work on projects like Finhaatpro showcases my ability to manage multiple user roles and deliver data-driven solutions.",
  ],
};

const experienceData: ExperienceData[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Finhaat',
    period: 'Nov 2022 - Present',
    description:
      'Developed and maintained web applications using Java, Spring Boot, and React. Collaborated with cross-functional teams to deliver high-quality software solutions. Led the development of a commercial insurance portal, integrating multiple third-party APIs.',
  },
  {
    role: 'Software Engineer',
    company: 'Unimoni',
    period: 'Dec 2021 - Oct 2022',
    description:
      'Designed and implemented scalable backend services for financial applications. Worked on database design, API development, and ensuring the performance and security of the platform.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Accenture',
    period: 'Dec 2020 - Dec 2021',
    description:
      'Gained hands-on experience in software development life cycle. Contributed to various projects, focusing on backend development with Java and learning about enterprise-level application architecture.',
  },
];

const skillsData: SkillCategory[] = [
  {
    category: 'Backend',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Spring Boot', level: 90 },
      { name: 'Microservices', level: 80 },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Angular', level: 80 },
    ],
  },
  {
    category: 'Database & APIs',
    skills: [
      { name: 'SQL', level: 90 },
      { name: 'REST API', level: 95 },
      { name: 'Hibernate', level: 85 },
    ],
  },
  {
    category: 'Other',
    skills: [
      { name: 'JPA', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'SOAP', level: 75 },
    ],
  },
];

const projectsData: Project[] = [
  {
    title: 'Finhaatpro',
    description:
      'A comprehensive insurance platform with role-based access for sales, POSP, and MISP. Features business analytics, renewal reminders, and POSP data management.',
    technologies: ['Java', 'Spring Boot', 'React', 'SQL', 'REST API'],
    imageUrl: 'https://picsum.photos/seed/storefront/600/400',
    aiHint: 'storefront restaurant',
    liveDemoUrl: '#',
  },
  {
    title: 'Commercial Insurance Portal',
    description:
      'Led the development of a portal that integrates with multiple insurance company APIs to provide quotes and policy management for commercial clients.',
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'Angular', 'SOAP'],
    imageUrl: 'https://picsum.photos/seed/commercial-vehicle/600/400',
    aiHint: 'commercial vehicle',
    liveDemoUrl: '#',
  },
  {
    title: 'Shop & Motor Insurance Platform',
    description:
      'A full-stack application designed to streamline the process of purchasing and managing shop and motor insurance policies for individuals and small businesses.',
    technologies: ['Java', 'JPA', 'React', 'PostgreSQL', 'Microservices'],
    imageUrl: 'https://picsum.photos/seed/storefront/600/400',
    aiHint: 'storefront restaurant',
    liveDemoUrl: '#',
  },
];

// Functions to get data
export const getHeroData = () => heroData;
export const getAboutData = () => aboutData;
export const getExperienceData = () => experienceData;
export const getSkillsData = () => skillsData;
export const getProjectsData = () => projectsData;

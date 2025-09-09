import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Rocket, Server, Smartphone } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const skillsData = [
  {
    category: 'Backend',
    icon: Server,
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Spring Boot', level: 90 },
      { name: 'Microservices', level: 80 },
    ],
  },
  {
    category: 'Frontend',
    icon: Smartphone,
    skills: [
      { name: 'React', level: 85 },
      { name: 'Angular', level: 80 },
    ],
  },
  {
    category: 'Database & APIs',
    icon: Database,
    skills: [
      { name: 'SQL', level: 90 },
      { name: 'REST API', level: 95 },
      { name: 'Hibernate', level: 85 },
    ],
  },
  {
    category: 'Other',
    icon: Code,
    skills: [
      { name: 'JPA', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'SOAP', level: 75 },
    ],
  },
];


export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">My Technical Arsenal</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            A showcase of the tools and technologies I wield to build powerful applications.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skillsData.map((category, index) => (
            <Card key={category.category} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} aria-label={`${skill.name} proficiency`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

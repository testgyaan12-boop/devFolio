import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Server, Briefcase } from 'lucide-react';

const skillCategories = [
  {
    title: 'Backend Development',
    icon: <Server className="h-8 w-8 text-primary" />,
    skills: ['Java', 'Spring Boot', 'Hibernate', 'JPA', 'REST API'],
  },
  {
    title: 'Frontend Development',
    icon: <Code className="h-8 w-8 text-primary" />,
    skills: ['React', 'Angular', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Databases',
    icon: <Database className="h-8 w-8 text-primary" />,
    skills: ['SQL', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Insurance Domain Expertise',
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    skills: ['Commercial Insurance', 'Motor Insurance', 'Shop Insurance', 'API Integration'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">My Technical Skills</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            A snapshot of the technologies and methodologies I use to bring projects to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {skillCategories.map((category) => (
            <Card key={category.title} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center text-center pb-4">
                {category.icon}
                <CardTitle className="mt-4 font-headline">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex justify-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

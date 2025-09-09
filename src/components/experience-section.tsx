import { Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const experienceData = [
  {
    role: 'Full-Stack Developer',
    company: 'Finhaat',
    period: 'Nov 2022 - Present',
    description: 'Developed and maintained web applications using Java, Spring Boot, and React. Collaborated with cross-functional teams to deliver high-quality software solutions. Led the development of a commercial insurance portal, integrating multiple third-party APIs.',
  },
  {
    role: 'Software Engineer',
    company: 'Unimoni',
    period: 'Dec 2021 - Oct 2022',
    description: 'Designed and implemented scalable backend services for financial applications. Worked on database design, API development, and ensuring the performance and security of the platform.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Accenture',
    period: 'Dec 2020 - Dec 2021',
    description: 'Gained hands-on experience in software development life cycle. Contributed to various projects, focusing on backend development with Java and learning about enterprise-level application architecture.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Work Experience</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            My professional journey and key contributions.
          </p>
        </div>
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-border" />
          {experienceData.map((item, index) => (
            <div
              key={item.company}
              className="relative mb-8 flex w-full items-center justify-between md:justify-normal md:odd:flex-row-reverse"
            >
              <div className="hidden h-full w-1/2 md:block" />
              <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="w-full md:w-1/2">
                <Card className={`transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-in-${index % 2 === 0 ? 'right' : 'left'} md:ml-4 md:odd:ml-0 md:odd:-mr-4`}>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{item.role}</CardTitle>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{item.company}</span>
                      <span>{item.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

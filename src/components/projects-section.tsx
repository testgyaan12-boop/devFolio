import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Finhaatpro',
    description: 'A comprehensive insurance platform with role-based access for sales, POSP, and MISP. Features business analytics, renewal reminders, and POSP data management.',
    technologies: ['Java', 'Spring Boot', 'React', 'SQL', 'REST API'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    aiHint: 'business dashboard',
    liveDemoUrl: '#'
  },
  {
    title: 'Commercial Insurance Portal',
    description: 'Led the development of a portal that integrates with multiple insurance company APIs to provide quotes and policy management for commercial clients.',
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'Angular', 'SOAP'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    aiHint: 'insurance portal',
    liveDemoUrl: '#'
  },
  {
    title: 'Shop & Motor Insurance Platform',
    description: 'A full-stack application designed to streamline the process of purchasing and managing shop and motor insurance policies for individuals and small businesses.',
    technologies: ['Java', 'JPA', 'React', 'PostgreSQL', 'Microservices'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    aiHint: 'e-commerce platform',
    liveDemoUrl: '#'
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Here are some of the projects I'm proud to have worked on.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-48 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={project.aiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                    <Link href={project.liveDemoUrl} target="_blank">
                      View Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

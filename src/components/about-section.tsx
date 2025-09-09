import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="https://picsum.photos/400/400"
                alt="Developer Portrait"
                width={400}
                height={400}
                className="rounded-full object-cover border-4 border-primary shadow-lg"
                data-ai-hint="professional developer"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            <p className="text-muted-foreground md:text-lg">
              I am a seasoned Full-Stack Developer with over three years of dedicated experience in the insurance technology sector. My expertise lies in architecting and developing scalable, high-performance applications using a robust tech stack centered around Java and Spring Boot.
            </p>
            <p className="text-muted-foreground md:text-lg">
              Throughout my career, I've led teams in delivering complex projects like commercial insurance portals and motor insurance platforms. I thrive on solving challenges, from integrating with diverse third-party APIs to designing sophisticated business analytics tools. My work on projects like Finhaatpro showcases my ability to manage multiple user roles and deliver data-driven solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

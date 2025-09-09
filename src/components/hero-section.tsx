import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0 opacity-20"
        data-ai-hint="professional workspace"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Senior Full-Stack Developer
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Specializing in Java, Spring Boot, and modern frontend frameworks to build robust applications for the insurance domain.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
              <Link href="#projects">
                View My Work <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

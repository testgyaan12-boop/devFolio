
'use client';

import { useState, useEffect } from 'react';
import type { HeroData } from '@/lib/portfolio-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const skills = ['Java', 'Spring Boot', 'React', 'Microservices', 'SQL'];

export default function HeroSection({ data }: { data: HeroData }) {
  const [currentSkill, setCurrentSkill] = useState('');
  const [skillIndex, setSkillIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const fullSkill = skills[skillIndex];
      
      if (isDeleting) {
        setCurrentSkill(fullSkill.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentSkill(fullSkill.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }
      
      if (!isDeleting && charIndex === fullSkill.length) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
      }
    };

    const typingTimeout = setTimeout(type, isDeleting ? 75 : 150);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, skillIndex]);

  return (
    <section className="w-full py-24 md:py-32 lg:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 animate-slide-in-right">
            <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                {data.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {data.subtitle}
              </p>
              <div className="h-10 md:h-12 flex items-center">
                <p className="text-lg md:text-xl text-primary font-medium">
                  <span className="text-foreground">Skilled in: </span>
                  <span className="font-bold">{currentSkill}</span>
                  <span className="animate-ping">|</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href="#contact">
                  {data.cta1_text} <Send className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href="/cv.pdf" download>
                  {data.cta2_text} <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center animate-slide-in-left">
             <Image
                src="https://picsum.photos/seed/hero/600/600"
                alt="Developer Portrait"
                width={550}
                height={550}
                className="rounded-full object-cover aspect-square border-8 border-secondary shadow-2xl"
                data-ai-hint="professional developer"
              />
          </div>
        </div>
      </div>
    </section>
  );
}

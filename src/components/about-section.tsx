import type { AboutData } from '@/lib/portfolio-data';
import Image from 'next/image';

export default function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex items-center justify-center animate-slide-in-right">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <Image
                src={data.imageUrl}
                alt="Developer Portrait"
                width={500}
                height={500}
                className="rounded-lg object-cover border-4 border-card shadow-lg"
                data-ai-hint="professional developer"
              />
            </div>
          </div>
          <div className="space-y-4 animate-slide-in-left">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">{data.title}</h2>
            {data.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

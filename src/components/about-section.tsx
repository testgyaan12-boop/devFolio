import type { AboutData } from '@/lib/portfolio-data';
import Image from 'next/image';

export default function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center animate-fade-in-right">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src={data.imageUrl}
                alt="Developer Portrait"
                width={400}
                height={400}
                className="rounded-full object-cover border-4 border-primary shadow-lg"
                data-ai-hint="professional developer"
              />
            </div>
          </div>
          <div className="space-y-4 animate-fade-in-left">
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

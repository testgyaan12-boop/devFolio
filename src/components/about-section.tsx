import type { AboutData } from '@/lib/portfolio-data';

export default function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 items-center justify-center">
          <div className="space-y-4 text-center max-w-3xl mx-auto animate-slide-in-up">
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

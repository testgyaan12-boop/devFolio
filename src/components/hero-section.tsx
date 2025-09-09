import type { HeroData } from '@/lib/portfolio-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';

export default function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-blue-950/50 z-0 animate-gradient-xy" />
      <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[length:100px_100px] [mask-image:linear-gradient(to_bottom,white,transparent)] animate-bg-pan" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
          <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
            {data.title}
          </h1>
          <p className="max-w-[700px] text-gray-300 md:text-xl drop-shadow-md">
            {data.subtitle}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105 shadow-lg">
              <Link href="#contact">
                {data.cta1_text} <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary transition-transform duration-300 hover:scale-105 shadow-lg">
              <Link href="/cv.pdf" download>
                {data.cta2_text} <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Code, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Majid Ali. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="GitHub">
            <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

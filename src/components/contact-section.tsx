import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 4.94A11.94 11.94 0 0 0 9.5 3C5.94 3 3 5.94 3 9.5c0 1.99.94 3.78 2.45 4.95" />
    </svg>
  );
}

const contactLinks = [
  {
    href: 'mailto:testgyaan12@gmail.com',
    label: 'Email',
    icon: <Mail className="h-8 w-8" />,
  },
  {
    href: '#', // Replace with your LinkedIn profile URL
    label: 'LinkedIn',
    icon: <Linkedin className="h-8 w-8" />,
  },
  {
    href: '#', // Replace with your GitHub profile URL
    label: 'GitHub',
    icon: <Github className="h-8 w-8" />,
  },
  {
    href: '#', // Replace with your WhatsApp link e.g., https://wa.me/1234567890
    label: 'WhatsApp',
    icon: <WhatsAppIcon />,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 animate-slide-in-up">
        <div className="space-y-3">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind or want to connect? I'd love to hear from you.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {contactLinks.map(({ href, label, icon }) => (
            <Button asChild key={label} variant="outline" size="icon" className="h-20 w-20 rounded-full transition-transform duration-300 hover:scale-110 hover:bg-primary/10">
              <Link href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                {icon}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

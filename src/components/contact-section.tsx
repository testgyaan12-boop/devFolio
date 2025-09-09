'use client';

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full transition-transform duration-300 hover:scale-105" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind or want to connect? I'd love to hear from you.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Contact Me</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-4 text-left">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" required />
                  {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                  {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message..." required className="min-h-[120px]" />
                  {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

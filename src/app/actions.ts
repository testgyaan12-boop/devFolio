'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string;
  success: boolean;
};

export async function submitContactForm(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.',
      success: false,
    };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this demo, we'll just log it and return a success message.
  console.log('New message received:', validatedFields.data);

  return {
    message: 'Thank you for your message! I will get back to you soon.',
    success: true,
  };
}

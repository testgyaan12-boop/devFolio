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

  // TODO: Implement actual email sending here using a service like Resend, SendGrid, or Nodemailer.
  // Example:
  //
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  //
  // try {
  //   await resend.emails.send({
  //     from: 'onboarding@resend.dev',
  //     to: 'testgyaan12@gmail.com',
  //     subject: `New message from ${validatedFields.data.name}`,
  //     html: `<p>You received a new message from your portfolio contact form.</p>
  //            <p><strong>Name:</strong> ${validatedFields.data.name}</p>
  //            <p><strong>Email:</strong> ${validatedFields.data.email}</p>
  //            <p><strong>Message:</strong></p>
  //            <p>${validatedFields.data.message}</p>`,
  //   });
  // } catch (error) {
  //   console.error('Email sending failed:', error);
  //   return {
  //     message: 'Sorry, something went wrong while sending your message. Please try again later.',
  //     success: false,
  //   };
  // }
  
  console.log('New message received:', validatedFields.data);
  console.log('Email would be sent to: testgyaan12@gmail.com');


  return {
    message: 'Thank you for your message! I will get back to you soon.',
    success: true,
  };
}

'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, PlusCircle, Trash } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const sections = ['Hero', 'About', 'Experience', 'Skills', 'Projects'];

  return (
    <div className="container mx-auto py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content from one place.</p>
        <div className="mt-4">
            <Button asChild variant="outline">
                <Link href="/">Back to Portfolio</Link>
            </Button>
        </div>
      </header>

      <div className="grid gap-8">
        {sections.map((section) => (
          <Card key={section} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">{section} Section</CardTitle>
              <CardDescription>
                Add, edit, or delete items in the {section.toLowerCase()} section.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/30">
                <p className="text-sm text-muted-foreground">
                  Content for the {section} section. Click to manage.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

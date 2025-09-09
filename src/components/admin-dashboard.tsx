'use client';

import {
  type AboutData,
  type ExperienceData,
  type HeroData,
  type Project,
  type SkillCategory,
} from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, PlusCircle, Trash } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

type PortfolioData = {
  hero: HeroData[];
  about: AboutData[];
  experience: ExperienceData[];
  skills: SkillCategory[];
  projects: Project[];
};

interface AdminDashboardProps {
  initialData: PortfolioData;
}

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData);

  const getSectionTitle = (key: string) => {
    if (key === 'hero') return 'Hero';
    if (key === 'about') return 'About';
    if (key === 'experience') return 'Experience';
    if (key === 'skills') return 'Skills';
    if (key === 'projects') return 'Projects';
    return 'Section';
  };
  
  const renderItemTitle = (item: any, sectionKey: keyof PortfolioData) => {
    switch (sectionKey) {
      case 'hero':
        return item.title;
      case 'about':
        return item.title;
      case 'experience':
        return `${item.role} at ${item.company}`;
      case 'skills':
        return item.category;
      case 'projects':
        return item.title;
      default:
        return 'Item';
    }
  }

  return (
    <div className="container mx-auto py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your portfolio content from one place.
        </p>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/">Back to Portfolio</Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-8">
        {(Object.keys(portfolioData) as Array<keyof PortfolioData>).map((sectionKey) => (
          <Card key={sectionKey} className="shadow-lg">
            <CardHeader className='flex-row justify-between items-center'>
              <div>
                <CardTitle className="text-2xl font-headline">
                  {getSectionTitle(sectionKey)} Section
                </CardTitle>
                <CardDescription>
                  Manage the content for the {getSectionTitle(sectionKey).toLowerCase()} section.
                </CardDescription>
              </div>
               <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add to {getSectionTitle(sectionKey)} Section</DialogTitle>
                      <DialogDescription>
                        Fill in the details to add a new item. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Form fields would be dynamically generated here */}
                      <p className='text-center text-sm text-muted-foreground'>
                        Add form fields here...
                      </p>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
                {portfolioData[sectionKey] && portfolioData[sectionKey].length > 0 ? (
                  portfolioData[sectionKey].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-secondary/30">
                      <p className="font-medium truncate pr-4">
                        {renderItemTitle(item, sectionKey)}
                      </p>
                      <div className="flex gap-2 flex-shrink-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Item</DialogTitle>
                              <DialogDescription>
                                Make changes here. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                               <p className='text-center text-sm text-muted-foreground'>
                                Edit form fields pre-filled with item data...
                              </p>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently
                                delete this item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-center text-muted-foreground py-4'>No content in this section yet.</p>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

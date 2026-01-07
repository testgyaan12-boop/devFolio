'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [issue, setIssue] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/login');
    } else {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    }
  }, [router]);

  const handleIssueSubmit = () => {
    if (!issue.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Report',
        description: 'Please describe the issue before submitting.',
      });
      return;
    }
    // Dummy submission
    console.log('Issue Reported:', { email: userEmail, issue });
    toast({
      title: 'Report Submitted',
      description: 'Thank you for your feedback. We will look into it shortly.',
    });
    setIssue('');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 md:pt-0">
      <header className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Profile & Support</h1>
      </header>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
               <Avatar className="h-20 w-20">
                 <AvatarImage src={undefined} alt="User" />
                 <AvatarFallback>
                   <User className="h-10 w-10" />
                 </AvatarFallback>
               </Avatar>
               <div>
                <p className="text-xl font-semibold">{userEmail}</p>
                <p className="text-sm text-muted-foreground">Valued Customer</p>
               </div>
            </div>
            <Separator />
             <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={userEmail || ''} readOnly disabled />
            </div>
             <div className="space-y-2">
              <Label htmlFor="name">Full Name (Optional)</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report an Issue</CardTitle>
            <CardDescription>Encounter a problem? Let us know.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issue">Describe the issue</Label>
              <Textarea
                id="issue"
                placeholder="Please provide as much detail as possible..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                rows={5}
              />
            </div>
            <Button onClick={handleIssueSubmit} className="w-full">Submit Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

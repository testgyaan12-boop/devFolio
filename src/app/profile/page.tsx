
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type IssueReport = {
  id: string;
  issue: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
};

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [issue, setIssue] = useState('');
  const [issueHistory, setIssueHistory] = useState<IssueReport[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/login');
    } else {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);

      const savedIssues = localStorage.getItem('issueHistory');
      if (savedIssues) {
        setIssueHistory(JSON.parse(savedIssues));
      }
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
    
    const newReport: IssueReport = {
      id: new Date().toISOString(),
      issue: issue,
      date: new Date().toISOString(),
      status: 'Pending',
    };

    const updatedHistory = [newReport, ...issueHistory];
    setIssueHistory(updatedHistory);
    localStorage.setItem('issueHistory', JSON.stringify(updatedHistory));

    toast({
      title: 'Report Submitted',
      description: 'Thank you for your feedback. We will look into it shortly.',
    });
    setIssue('');
  };

  const getStatusBadgeVariant = (status: IssueReport['status']) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'In Progress':
        return 'outline';
      case 'Resolved':
        return 'default';
      default:
        return 'secondary';
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 md:pt-0">
      <header className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Profile & Support</h1>
      </header>

      <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="report">Report an Issue</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
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
        </TabsContent>
        <TabsContent value="report" className="mt-4">
          <div className="grid gap-8">
             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                 <Card>
                  <AccordionTrigger className="p-6">
                     <CardHeader className="p-0 text-left">
                       <CardTitle>Previous Reports</CardTitle>
                       <CardDescription>Track the status of your submitted issues.</CardDescription>
                    </CardHeader>
                  </AccordionTrigger>
                  <AccordionContent>
                     <CardContent className="space-y-4 pt-0">
                      {issueHistory.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">You have not submitted any reports.</p>
                      ) : (
                        issueHistory.map(report => (
                          <Card key={report.id}>
                            <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                              <div className="flex-grow">
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(report.date), "MMMM d, yyyy 'at' h:mm a")}
                                </p>
                                <p className="mt-2">{report.issue}</p>
                              </div>
                              <div className="shrink-0 pt-2">
                                 <Badge variant={getStatusBadgeVariant(report.status)}>{report.status}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            </Accordion>
            
            <Card>
              <CardHeader>
                <CardTitle>Submit a New Report</CardTitle>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

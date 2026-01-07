'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      router.push('/');
    }
  }, [router]);

  const handleAuthAction = () => {
    if (isSignUp) {
      // Dummy sign up
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      toast({ title: 'Account created!', description: "You've been successfully signed up." });
      router.push('/');
    } else {
      // Dummy login
      if (password === 'password') {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/');
      } else {
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: 'Invalid password. Use "password".',
        });
      }
    }
  };
  
  if (isLoggedIn) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
          <CardDescription>
            {isSignUp ? 'Create a dummy account to get started.' : 'Sign in to access your dashboard. (Hint: password is "password")'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleAuthAction} className="w-full">
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="w-full">
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
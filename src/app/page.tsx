'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, ShoppingCart, History, CreditCard, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    if (loggedIn !== 'true') {
      router.push('/login');
    } else {
      setUserEmail(email);
      setLoading(false);
    }
  }, [router]);
  
  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-4 md:px-8">
        <div></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={undefined} alt={'User'} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Tabs defaultValue="dashboard" className="flex-grow md:pt-8">
        <div className="p-4 md:p-8 md:pb-0 pb-20">
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>This is the dashboard tab.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Dashboard content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="order">
            <Card>
              <CardHeader>
                <CardTitle>Order</CardTitle>
                <CardDescription>This is the order tab.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Order management content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>This is the history tab.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Transaction history content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>This is the payment tab.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Payment processing content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
        <TabsList className="fixed bottom-0 left-0 right-0 z-10 grid h-16 w-full grid-cols-4 rounded-none border-t bg-background md:relative md:h-10 md:w-full md:max-w-4xl md:mx-auto md:border-t-0">
          <TabsTrigger value="dashboard" className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs md:text-sm">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="order" className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs md:text-sm">Order</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary">
            <History className="h-5 w-5" />
            <span className="text-xs md:text-sm">History</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs md:text-sm">Payment</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
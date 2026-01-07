import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background p-4 md:p-8">
      <Tabs defaultValue="dashboard" className="w-full max-w-4xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="order">Order</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                This is the dashboard tab.
              </CardDescription>
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
              <CardDescription>
                This is the order tab.
              </CardDescription>
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
              <CardDescription>
                This is the history tab.
              </CardDescription>
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
              <CardDescription>
                This is the payment tab.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Payment processing content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

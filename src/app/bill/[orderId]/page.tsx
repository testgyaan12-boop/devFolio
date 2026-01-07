'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Printer } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  src: string;
  alt: string;
  hint: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Delivered';
};

export default function BillPage() {
  const router = useRouter();
  const params = useParams();
  const { orderId } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/login');
      return;
    }

    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    if (orderId) {
      const savedHistory = localStorage.getItem('orderHistory');
      if (savedHistory) {
        const history: Order[] = JSON.parse(savedHistory);
        const foundOrder = history.find(o => o.id === orderId);
        setOrder(foundOrder || null);
      }
    }
    setLoading(false);
  }, [orderId, router]);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading Bill...</div>;
  }

  if (!order) {
    return <div className="flex h-screen w-full items-center justify-center">Order not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
       <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #bill-content, #bill-content * {
            visibility: visible;
          }
          #bill-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          #print-button {
            display: none;
          }
        }
      `}</style>
      <div id="bill-content">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-primary">AquaBrand</h1>
            <CardTitle className="text-2xl mt-4">Invoice</CardTitle>
            <CardDescription>Thank you for your order!</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Billed To:</p>
                <p>{userEmail}</p>
              </div>
              <div className="text-right">
                <p><span className="font-semibold text-foreground">Invoice #:</span> {order.id.substring(0, 8)}</p>
                <p><span className="font-semibold text-foreground">Date:</span> {format(new Date(order.date), 'MMMM d, yyyy')}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map(item => (
                  <TableRow key={item.product.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold text-lg">Total</TableCell>
                  <TableCell className="text-right font-bold text-lg">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground">
              <p>AquaBrand Inc.</p>
              <p>123 Water St, Splash City, 12345</p>
              <p>contact@aquabrand.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
       <div id="print-button" className="max-w-2xl mx-auto mt-4 text-right">
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print Invoice
        </Button>
      </div>
    </div>
  );
}

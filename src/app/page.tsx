'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, History, CreditCard, User, Plus, Minus, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import placeholderImages from '@/lib/placeholder-images.json';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

type Product = {
  id: number;
  name: string;
  src: string;
  alt: string;
  hint: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const products: Product[] = placeholderImages['order-bottles'];

  const orderTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    if (loggedIn !== 'true') {
      router.push('/login');
    } else {
      setUserEmail(email);
      setLoading(false);

      const initialQuantities: Record<number, number> = {};
      products.forEach((p) => {
        initialQuantities[p.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [router, products]);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    }
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    toast({
      title: 'Added to cart',
      description: `Added ${quantity} x ${product.name} to your cart.`,
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };
  
  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
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
            <div className="space-y-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {placeholderImages['carousel-water'].map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="overflow-hidden">
                        <div className="relative h-48 md:h-80 w-full">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            style={{ objectFit: 'cover' }}
                            data-ai-hint={image.hint}
                          />
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>

              <Card>
                <CardHeader>
                  <CardTitle>Your Brand, Our Bottles</CardTitle>
                  <CardDescription>Customized water bottles with your own branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-64 w-full rounded-md overflow-hidden">
                    <Image
                      src={placeholderImages['custom-bottle'][0].src}
                      alt={placeholderImages['custom-bottle'][0].alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint={placeholderImages['custom-bottle'][0].hint}
                    />
                  </div>
                  <p className="text-muted-foreground">
                    We specialize in rebranding water bottles for hotels, corporate events, and businesses. Provide us with
                    your branding, and we'll deliver high-quality, customized water bottles that make a lasting impression.
                  </p>
                  <Button>Learn More</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advertise With Us</CardTitle>
                  <CardDescription>Reach a wider audience by featuring your brand.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-64 w-full rounded-md overflow-hidden">
                    <Image
                      src={placeholderImages['advertisement-water'][0].src}
                      alt={placeholderImages['advertisement-water'][0].alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint={placeholderImages['advertisement-water'][0].hint}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="order">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Place a New Order</CardTitle>
                    <CardDescription>Select your desired bottles and quantities.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="relative h-32 w-full sm:h-48">
                          <Image
                            src={product.src}
                            alt={product.alt}
                            fill
                            style={{ objectFit: 'cover' }}
                            data-ai-hint={product.hint}
                          />
                        </div>
                        <div className="p-2 sm:p-4">
                          <h3 className="text-sm sm:text-lg font-semibold truncate">{product.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                          <div className="mt-2 sm:mt-4 flex flex-col items-stretch gap-2">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-8 sm:w-8"
                                onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                              >
                                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Input
                                type="number"
                                className="h-6 w-10 sm:h-8 sm:w-12 text-center"
                                value={quantities[product.id] || 1}
                                onChange={(e) =>
                                  handleQuantityChange(product.id, parseInt(e.target.value, 10) || 1)
                                }
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-8 sm:w-8"
                                onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                              >
                                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                            <Button size="sm" onClick={() => handleAddToCart(product)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Review your items before checkout.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center">Your cart is empty.</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                           <div key={item.product.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="rounded-md">
                                <AvatarImage src={item.product.src} alt={item.product.alt}/>
                                <AvatarFallback>{item.product.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{item.product.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity - 1)}>
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="text-sm">{item.quantity}</span>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity + 1)}>
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                             <div className="text-right">
                               <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                               <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleRemoveFromCart(item.product.id)}>
                                  <Trash2 className="h-4 w-4" />
                               </Button>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${orderTotal.toFixed(2)}</span>
                        </div>
                         <Button className="w-full" disabled={cart.length === 0}>
                           Proceed to Checkout
                         </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
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
          <TabsTrigger
            value="dashboard"
            className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs md:text-sm">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="order"
            className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs md:text-sm">Order</span>
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary"
          >
            <History className="h-5 w-5" />
            <span className="text-xs md:text-sm">History</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs md:text-sm">Payment</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

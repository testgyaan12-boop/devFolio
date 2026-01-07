'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, History, CreditCard, User, Plus, Minus, Trash2, Download, Repeat, Moon, Sun } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Delivered';
};

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isCheckoutConfirmOpen, setIsCheckoutConfirmOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [theme, setTheme] = useState('dark');

  const products: Product[] = placeholderImages['order-bottles'];

  const orderTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    if (loggedIn !== 'true') {
      router.push('/login');
    } else {
      setUserEmail(email);
      
      const initialQuantities: Record<number, number> = {};
      products.forEach((p) => {
        initialQuantities[p.id] = 1;
      });
      setQuantities(initialQuantities);

      const savedHistory = localStorage.getItem('orderHistory');
      if (savedHistory) {
        setOrderHistory(JSON.parse(savedHistory));
      }
      
      setLoading(false);
    }
  }, [router, products]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

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

  const handleAddToCart = (product: Product, quantityToAdd?: number) => {
    const quantity = quantityToAdd || quantities[product.id] || 1;
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
  };
  
  const handleToastAndAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    handleAddToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `Added ${quantity} x ${product.name} to your cart.`,
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    setProductToDelete(null);
  };
  
  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setProductToDelete(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = () => {
    const newOrder: Order = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      items: cart,
      total: orderTotal,
      status: Math.random() > 0.5 ? 'Delivered' : 'Pending',
    };
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
    setCart([]);
    setIsCheckoutConfirmOpen(false);
    toast({
      title: 'Order Placed!',
      description: 'Your order has been successfully placed and moved to history.',
    });
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      handleAddToCart(item.product, item.quantity);
    });
    setActiveTab('product');
    toast({
      title: 'Items Added to Cart',
      description: `All items from order #${order.id.substring(0, 8)} have been added to your cart.`,
    });
  };

  const handleDownloadBill = (orderId: string) => {
    const url = `/bill/${orderId}`;
    window.open(url, '_blank');
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
       <AlertDialog open={productToDelete !== null} onOpenChange={(isOpen) => !isOpen && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove the item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => productToDelete && handleRemoveFromCart(productToDelete)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCheckoutConfirmOpen} onOpenChange={setIsCheckoutConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to place this order? This will move the items to your order history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCheckout}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-4 md:px-8">
        <h1 className="text-xl font-bold text-primary">AquaBrand</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
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
        </div>
      </header>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow md:pt-8">
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
          <TabsContent value="product">
             <div className="grid gap-8 lg:grid-cols-3">
               <div className="lg:col-span-1 lg:order-last">
                 <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                   <AccordionItem value="item-1" className="border-b-0">
                     <Card>
                       <AccordionTrigger className="p-6">
                         <div className="flex justify-between w-full">
                           <CardTitle>Order Summary</CardTitle>
                           <CardDescription className="pr-4">
                             {cart.length > 0 ? `${cart.length} item(s)` : 'Empty'}
                           </CardDescription>
                         </div>
                       </AccordionTrigger>
                       <AccordionContent>
                         <CardContent className="space-y-4 pt-0">
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
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setProductToDelete(item.product.id)}>
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
                                <Button className="w-full" disabled={cart.length === 0} onClick={() => setIsCheckoutConfirmOpen(true)}>
                                  Proceed to Checkout
                                </Button>
                             </div>
                           )}
                         </CardContent>
                       </AccordionContent>
                     </Card>
                   </AccordionItem>
                 </Accordion>
               </div>
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
                            <Button size="sm" onClick={() => handleToastAndAddToCart(product)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Here are your past orders.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderHistory.length === 0 ? (
                  <p className="text-muted-foreground text-center">You have no past orders.</p>
                ) : (
                  orderHistory.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div className="flex-grow">
                            <CardTitle className="text-lg">Order #{order.id.substring(0, 8)}</CardTitle>
                            <CardDescription>{format(new Date(order.date), "MMMM d, yyyy 'at' h:mm a")}</CardDescription>
                          </div>
                           <div className="flex items-center gap-2">
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="capitalize shrink-0">
                              {order.status}
                            </Badge>
                            <p className="font-semibold text-lg whitespace-nowrap">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-4" />
                        <div className="space-y-2">
                          {order.items.map(item => (
                             <div key={item.product.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Avatar className="rounded-md">
                                  <AvatarImage src={item.product.src} alt={item.product.alt}/>
                                  <AvatarFallback>{item.product.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{item.product.name}</p>
                                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                         <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                            <Repeat className="mr-2 h-4 w-4" />
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadBill(order.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Bill
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
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
            value="product"
            className="flex flex-col gap-1 h-full md:flex-row md:h-auto rounded-none data-[state=active]:border-t-2 md:data-[state=active]:border-t-0 md:data-[state=active]:border-b-2 border-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs md:text-sm">Product</span>
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

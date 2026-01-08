'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, History, CreditCard, User, Plus, Minus, Trash2, Download, Repeat, Moon, Sun, Info, Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

type Founder = {
  name: string;
  title: string;
  bio: string;
  src: string;
  alt: string;
  hint: string;
};

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isCheckoutConfirmOpen, setIsCheckoutConfirmOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  
  const [activePaymentTab, setActivePaymentTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLearnMoreSheetOpen, setIsLearnMoreSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [isFounderSheetOpen, setIsFounderSheetOpen] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

   const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products: Product[] = placeholderImages['order-bottles'];
  const founders: Founder[] = placeholderImages.founder;

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.name.split(' ')[0]);
    return ['all', ...Array.from(new Set(allBrands))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = brandFilter === 'all' || product.name.toLowerCase().startsWith(brandFilter.toLowerCase());
      return matchesSearch && matchesBrand;
    });
  }, [products, searchQuery, brandFilter]);

  const orderTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const filteredPayments = useMemo(() => {
    if (activePaymentTab === 'pending') {
      return orderHistory.filter(order => order.status === 'Pending');
    }
    if (activePaymentTab === 'complete') {
      return orderHistory.filter(order => order.status === 'Delivered');
    }
    return orderHistory;
  }, [orderHistory, activePaymentTab]);

  useEffect(() => {
    if (pathname === '/') {
      const tab = new URLSearchParams(window.location.search).get('tab');
      setActiveTab(tab || 'dashboard');
    }
  }, [pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/?tab=${value}`, { scroll: false });
  };


  useEffect(() => {
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
    handleTabChange('product');
    toast({
      title: 'Items Added to Cart',
      description: `All items from order #${order.id.substring(0, 8)} have been added to your cart.`,
    });
  };

  const handleDownloadBill = (orderId: string) => {
    const url = `/bill/${orderId}`;
    window.open(url, '_blank');
  };

  const handleLearnMoreClick = () => {
    if (isMobile) {
      setIsLearnMoreSheetOpen(true);
    } else {
      // Add desktop behavior here if needed, e.g., router.push('/about-branding')
      console.log("Desktop learn more clicked");
       setIsLearnMoreSheetOpen(true);
    }
  };

  const handleFounderClick = (founder: Founder) => {
    setSelectedFounder(founder);
    setIsFounderSheetOpen(true);
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

       <Sheet open={selectedProduct !== null} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
        <SheetContent side="bottom" className="h-4/5">
          {selectedProduct && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-4">
                <SheetTitle>{selectedProduct.name}</SheetTitle>
                <SheetDescription>₹{selectedProduct.price.toFixed(2)}</SheetDescription>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="relative h-64 w-full rounded-md overflow-hidden">
                  <Image
                    src={selectedProduct.src.replace('/300/300', '/600/600')}
                    alt={selectedProduct.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={selectedProduct.hint}
                  />
                </div>
                <p className="text-muted-foreground">
                  Introducing the {selectedProduct.name} - a perfect blend of style and purity. Ideal for personal use, corporate branding, or special events. This bottle is designed to be both durable and elegant. Customize it with your brand to make a lasting impression.
                </p>
              </div>
              <div className="p-4 border-t">
                 <Button className="w-full" onClick={() => {
                  handleToastAndAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}>
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={isLearnMoreSheetOpen} onOpenChange={setIsLearnMoreSheetOpen}>
        <SheetContent side="top" className="h-4/5">
          <div className="flex flex-col h-full p-4">
            <SheetHeader>
              <SheetTitle>Your Brand, Our Bottles</SheetTitle>
              <SheetDescription>Customized water bottles with your own branding.</SheetDescription>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto mt-4 space-y-4">
              <div className="relative h-48 w-full rounded-md overflow-hidden">
                <Image
                  src={placeholderImages['custom-bottle'][0].src.replace('/600/400', '/800/400')}
                  alt={placeholderImages['custom-bottle'][0].alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={placeholderImages['custom-bottle'][0].hint}
                />
              </div>
              <p className="text-muted-foreground">
                We specialize in rebranding water bottles for hotels, corporate events, and businesses. Provide us with your branding, and we'll deliver high-quality, customized water bottles that make a lasting impression. Our process is simple and efficient, ensuring you get a premium product that perfectly represents your brand.
              </p>
              <p className="text-muted-foreground">
                From sleek glass bottles to durable stainless steel options, we have a wide range of products to choose from. Our team will work with you to create a design that aligns with your brand identity.
              </p>
            </div>
             <div className="pt-4 border-t">
                 <Button className="w-full" onClick={() => {
                  setIsLearnMoreSheetOpen(false);
                  handleTabChange('product');
                }}>
                  Start Your Order
                </Button>
              </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isFounderSheetOpen} onOpenChange={(isOpen) => { if (!isOpen) setSelectedFounder(null); setIsFounderSheetOpen(isOpen);}}>
        <SheetContent side="top" className="h-4/5">
          {selectedFounder && (
            <div className="flex flex-col h-full p-4">
              <SheetHeader>
                <SheetTitle>Meet {selectedFounder.name}</SheetTitle>
                <SheetDescription>The vision behind AquaBrand.</SheetDescription>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto mt-4 space-y-4">
                <div className="relative h-64 w-full rounded-md overflow-hidden">
                  <Image
                    src={selectedFounder.src.replace('/400/400', '/800/600')}
                    alt={selectedFounder.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    data-ai-hint={selectedFounder.hint}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center pt-2">{selectedFounder.name}</h3>
                <p className="text-muted-foreground text-center -mt-3">{selectedFounder.title}</p>
                <p className="text-muted-foreground">
                  {selectedFounder.bio}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-grow md:pt-8">
        <div className="p-4 md:p-8 md:pb-0 pb-20">
          <TabsContent value="dashboard">
            <div className="space-y-8">
              <Carousel 
                className="w-full"
                plugins={[autoplayPlugin.current]}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
                opts={{
                  loop: true,
                }}
                >
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
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Track your recent purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 overflow-x-auto pb-4">
                    {orderHistory.length > 0 ? (
                      orderHistory.map(order => (
                        <Card key={order.id} className="min-w-[280px] flex-shrink-0">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">Order #{order.id.substring(0, 8)}</CardTitle>
                                <CardDescription>{format(new Date(order.date), "MMMM d, yyyy")}</CardDescription>
                              </div>
                              <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="capitalize">
                                {order.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-lg font-semibold">₹{order.total.toFixed(2)}</div>
                            <Button variant="link" className="p-0 h-auto" onClick={() => handleDownloadBill(order.id)}>
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="w-full text-center text-muted-foreground py-8">
                        You have no recent orders.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

               <Card>
                <CardHeader>
                  <CardTitle>Meet the Founders</CardTitle>
                  <CardDescription>The visionaries behind AquaBrand.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6">
                  {founders.map((founder) => (
                    <div key={founder.name} className="flex flex-col items-center gap-4 text-center">
                       <div className="relative h-32 w-32 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={founder.src}
                          alt={founder.alt}
                          fill
                          style={{ objectFit: 'cover' }}
                          data-ai-hint={founder.hint}
                        />
                      </div>
                      <div>
                         <h3 className="text-lg font-semibold">{founder.name}</h3>
                         <p className="text-sm text-muted-foreground">{founder.title}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" onClick={() => handleFounderClick(founder)}>
                          Learn More
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

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
                  <Button onClick={handleLearnMoreClick}>Learn More</Button>
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
                                      <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setProductToDelete(item.product.id)}>
                                         <Trash2 className="h-4 w-4" />
                                      </Button>
                                   </div>
                                 </div>
                               ))}
                               <Separator />
                               <div className="flex justify-between font-semibold">
                                 <span>Total</span>
                                 <span>₹{orderTotal.toFixed(2)}</span>
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
                    <CardTitle className="hidden sm:block">Place a New Order</CardTitle>
                    <CardDescription className="hidden sm:block">Select your desired bottles and quantities.</CardDescription>
                     <div className="flex items-center gap-4 pt-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="pl-8 w-full"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="sm:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Filter className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuPortal>
                             <DropdownMenuContent align="end">
                               <DropdownMenuLabel>Filter by brand</DropdownMenuLabel>
                               <DropdownMenuSeparator />
                               <DropdownMenuRadioGroup value={brandFilter} onValueChange={setBrandFilter}>
                                {brands.map(brand => (
                                  <DropdownMenuRadioItem key={brand} value={brand} className="capitalize">
                                    {brand === 'all' ? 'All Brands' : brand}
                                  </DropdownMenuRadioItem>
                                ))}
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenuPortal>
                        </DropdownMenu>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                         <Select value={brandFilter} onValueChange={setBrandFilter}>
                          <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map(brand => (
                              <SelectItem key={brand} value={brand} className="capitalize">
                                {brand === 'all' ? 'All Brands' : brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <Card 
                          key={product.id} 
                          className="overflow-hidden flex flex-col cursor-pointer"
                          onClick={() => isMobile && setSelectedProduct(product)}
                        >
                          <div className="relative h-32 w-full sm:h-48">
                            <Image
                              src={product.src}
                              alt={product.alt}
                              fill
                              style={{ objectFit: 'cover' }}
                              data-ai-hint={product.hint}
                            />
                          </div>
                          <div className="p-2 sm:p-4 flex flex-col flex-grow">
                            <h3 className="text-sm sm:text-lg font-semibold truncate flex-grow">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">₹{product.price.toFixed(2)}</p>
                            <div className="mt-2 sm:mt-4 flex flex-col items-stretch gap-2">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 sm:h-8 sm:w-8"
                                  onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, (quantities[product.id] || 1) - 1); }}
                                >
                                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                                <Input
                                  type="number"
                                  className="h-6 w-10 sm:h-8 sm:w-12 text-center"
                                  value={quantities[product.id] || 1}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(product.id, parseInt(e.target.value, 10) || 1);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 sm:h-8 sm:w-8"
                                  onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, (quantities[product.id] || 1) + 1); }}
                                >
                                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                               <div className="flex items-stretch gap-2">
                                <Button size="sm" className="flex-grow" onClick={(e) => { e.stopPropagation(); handleToastAndAddToCart(product); }}>
                                  Add
                                </Button>
                                <Button variant="outline" size="icon" className="shrink-0 hidden md:flex" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}>
                                  <Info className="h-4 w-4"/>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center text-muted-foreground py-8">
                        No products found. Try adjusting your search or filters.
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
                <CardTitle className="hidden sm:block">Order History</CardTitle>
                <CardDescription className="hidden sm:block">Here are your past orders.</CardDescription>
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
                            <p className="font-semibold text-lg whitespace-nowrap">₹{order.total.toFixed(2)}</p>
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
                              <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                         <div className="flex flex-row justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                            <Repeat className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Reorder</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadBill(order.id)}>
                            <Download className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Download Bill</span>
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
                <CardTitle className="hidden sm:block">Payment Status</CardTitle>
                <CardDescription className="hidden sm:block">View your pending and completed payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activePaymentTab} onValueChange={setActivePaymentTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="complete">Complete</TabsTrigger>
                  </TabsList>
                  <div className="mt-4 space-y-4">
                    {filteredPayments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No payments in this category.
                      </p>
                    ) : (
                      filteredPayments.map((order) => (
                        <Card key={order.id}>
                          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-grow">
                              <p className="font-semibold">Order #{order.id.substring(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">{format(new Date(order.date), "MMMM d, yyyy")}</p>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="capitalize">
                                  {order.status === 'Delivered' ? 'Complete' : 'Pending'}
                                </Badge>
                                <p className="font-semibold text-lg whitespace-nowrap">₹{order.total.toFixed(2)}</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleDownloadBill(order.id)}>
                              <Download className="h-4 w-4 md:mr-2" />
                              <span className="hidden md:inline">Download Invoice</span>
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </Tabs>
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

    

    



    

    
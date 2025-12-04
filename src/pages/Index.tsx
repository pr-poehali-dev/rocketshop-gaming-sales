import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import SearchBar from '@/components/SearchBar';
import FilterSidebar, { FilterOptions } from '@/components/FilterSidebar';
import CheckoutModal from '@/components/CheckoutModal';
import PaymentModal from '@/components/PaymentModal';
import FAQSection from '@/components/FAQSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { products, Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [hasDiscount, setHasDiscount] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000],
    platforms: [],
    categories: [],
    showDiscounted: false,
  });

  const handleGetDiscount = () => {
    if (!hasDiscount) {
      setHasDiscount(true);
      toast({
        title: '🎉 Скидка 20% активирована!',
        description: 'Скидка будет применена ко всем товарам в корзине',
      });
    }
  };

  const applyDiscount = (price: number) => {
    return hasDiscount ? price * 0.8 : price;
  };

  const handleAddToCart = (product: Product) => {
    const discountedPrice = applyDiscount(product.price);
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, price: discountedPrice, quantity: 1 }];
    });

    toast({
      title: 'Товар добавлен в корзину',
      description: hasDiscount 
        ? `${product.title} (со скидкой 20%!)` 
        : product.title,
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: 'Товар удален из корзины',
      variant: 'destructive',
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleConfirmCheckout = (paymentMethod: string, email: string) => {
    setSelectedPaymentMethod(paymentMethod);
    setCheckoutOpen(false);
    setPaymentOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      platforms: [],
      categories: [],
      showDiscounted: false,
    });
  };

  const handleSelectProduct = (product: Product) => {
    handleAddToCart(product);
    const element = document.getElementById(`product-${product.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
      filtered = filtered.filter(
        (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    if (filters.platforms.length > 0) {
      filtered = filtered.filter(
        (p) => p.platform && filters.platforms.includes(p.platform)
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.showDiscounted) {
      filtered = filtered.filter((p) => p.discount && p.discount > 0);
    }

    return filtered;
  }, [filters]);

  const categorizedProducts = useMemo(() => {
    return {
      games: filteredProducts.filter((p) => p.category === 'game'),
      currency: filteredProducts.filter((p) => p.category === 'currency'),
      subscription: filteredProducts.filter((p) => p.category === 'subscription'),
      giftcard: filteredProducts.filter((p) => p.category === 'giftcard'),
    };
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <Hero onGetDiscount={handleGetDiscount} />

      <section className="container py-8">
        <div className="flex justify-center mb-8">
          <SearchBar products={products} onSelectProduct={handleSelectProduct} />
        </div>
      </section>

      <section id="catalog" className="container py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
            />
          </aside>

          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold text-gradient-primary">
                  Каталог товаров
                </h2>
                <TabsList className="bg-card border border-border/50">
                  <TabsTrigger value="all" className="data-[state=active]:glow-primary">
                    <Icon name="Grid3x3" size={16} className="mr-2" />
                    Все ({filteredProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="games" className="data-[state=active]:glow-primary">
                    <Icon name="Gamepad2" size={16} className="mr-2" />
                    Игры ({categorizedProducts.games.length})
                  </TabsTrigger>
                  <TabsTrigger value="currency" className="data-[state=active]:glow-primary">
                    <Icon name="Coins" size={16} className="mr-2" />
                    Валюта ({categorizedProducts.currency.length})
                  </TabsTrigger>
                  <TabsTrigger value="subscription" className="data-[state=active]:glow-primary">
                    <Icon name="Star" size={16} className="mr-2" />
                    Подписки ({categorizedProducts.subscription.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-8">
                {categorizedProducts.games.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Gamepad2" size={24} className="text-primary" />
                      Игры
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorizedProducts.games.map((product) => (
                        <div key={product.id} id={`product-${product.id}`}>
                          <ProductCard
                            product={{ ...product, price: applyDiscount(product.price) }}
                            onAddToCart={handleAddToCart}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {categorizedProducts.currency.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Coins" size={24} className="text-secondary" />
                      Игровая валюта
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorizedProducts.currency.map((product) => (
                        <div key={product.id} id={`product-${product.id}`}>
                          <ProductCard
                            product={{ ...product, price: applyDiscount(product.price) }}
                            onAddToCart={handleAddToCart}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {categorizedProducts.subscription.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Star" size={24} className="text-accent" />
                      Подписки
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorizedProducts.subscription.map((product) => (
                        <div key={product.id} id={`product-${product.id}`}>
                          <ProductCard
                            product={{ ...product, price: applyDiscount(product.price) }}
                            onAddToCart={handleAddToCart}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="p-6 bg-muted/30 rounded-full inline-block mb-4">
                      <Icon name="Search" size={48} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                    <p className="text-muted-foreground mb-4">
                      Попробуйте изменить фильтры поиска
                    </p>
                    <Button onClick={handleResetFilters} variant="outline">
                      Сбросить фильтры
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="games">
                {categorizedProducts.games.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedProducts.games.map((product) => (
                      <div key={product.id} id={`product-${product.id}`}>
                        <ProductCard
                          product={{ ...product, price: applyDiscount(product.price) }}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Gamepad2" size={48} className="text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Игры не найдены</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="currency">
                {categorizedProducts.currency.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedProducts.currency.map((product) => (
                      <div key={product.id} id={`product-${product.id}`}>
                        <ProductCard
                          product={{ ...product, price: applyDiscount(product.price) }}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Coins" size={48} className="text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Валюта не найдена</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="subscription">
                {categorizedProducts.subscription.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedProducts.subscription.map((product) => (
                      <div key={product.id} id={`product-${product.id}`}>
                        <ProductCard
                          product={{ ...product, price: applyDiscount(product.price) }}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Star" size={48} className="text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Подписки не найдены</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="bg-card/30 backdrop-blur-sm border-y border-border/50 py-16">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold text-gradient-primary">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Все актуальные отзывы можете увидеть здесь:
          </p>
          <a
            href="https://t.me/RocketShopRate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-semibold"
          >
            <Icon name="MessageCircle" size={20} />
            Telegram: t.me/RocketShopRate
          </a>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <Icon name="Rocket" size={24} className="text-primary" />
                <span className="text-gradient-primary">RocketShop</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Ваш надежный магазин цифровых товаров
              </p>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                <Icon name="Clock" size={14} className="mr-1" />
                3:00-18:00 МСК
              </Badge>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a 
                    href="https://t.me/RocketShopSeller" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Icon name="MessageCircle" size={14} />
                    Telegram: @RocketShopSeller
                  </a>
                </li>
                <li>
                  <a 
                    href="https://t.me/rocketshopsup" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Icon name="Headphones" size={14} />
                    Поддержка: @rocketshopsup
                  </a>
                </li>
                <li>
                  <a 
                    href="https://t.me/RocketShopRate" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Icon name="Star" size={14} />
                    Отзывы: t.me/RocketShopRate
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Важная информация</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ⚠️ Обращаем Ваше внимание на то, что инструкции по всем товарам предоставляются в чате с продавцом после оплаты.
                <br /><br />
                Все покупки проводятся официально. Заранее уточняйте у продавца об актуальности цен. 
                В случае возникновения проблем, обратитесь в нашу службу поддержки.
                <br /><br />
                Приятных покупок. С уважением RocketShop ❤️
              </p>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 RocketShop. Все права защищены.
          </div>
        </div>
      </footer>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onConfirm={handleConfirmCheckout}
      />

      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => {
          setPaymentOpen(false);
          setCartItems([]);
        }}
        items={cartItems}
        total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        paymentMethod={selectedPaymentMethod}
      />
    </div>
  );
}

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const games: Product[] = [
    {
      id: '1',
      title: 'Cyberpunk 2077',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/7c4de600-716b-4101-a521-10589291bc5e.jpg',
      price: 1499,
      oldPrice: 2999,
      category: 'game',
      platform: 'PC',
      rating: 4.5,
      discount: 50,
    },
    {
      id: '2',
      title: 'Red Dead Redemption 2',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/5c13fbfc-bd82-4dd5-ac98-5fe3e812d9a3.jpg',
      price: 2199,
      oldPrice: 2999,
      category: 'game',
      platform: 'PC',
      rating: 4.8,
      discount: 27,
    },
    {
      id: '3',
      title: 'Elden Ring',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/7c4de600-716b-4101-a521-10589291bc5e.jpg',
      price: 2499,
      category: 'game',
      platform: 'PC',
      rating: 4.9,
    },
    {
      id: '4',
      title: 'Hogwarts Legacy',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/5c13fbfc-bd82-4dd5-ac98-5fe3e812d9a3.jpg',
      price: 2799,
      oldPrice: 3499,
      category: 'game',
      platform: 'PC',
      rating: 4.6,
      discount: 20,
    },
  ];

  const currency: Product[] = [
    {
      id: 'c1',
      title: 'Genshin Impact - 6480 Genesis Crystals',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/577251ad-81cc-4477-876d-a76bafdfb7c7.jpg',
      price: 5990,
      oldPrice: 6990,
      category: 'currency',
      discount: 14,
    },
    {
      id: 'c2',
      title: 'World of Warcraft - 60 дней подписки',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/577251ad-81cc-4477-876d-a76bafdfb7c7.jpg',
      price: 1799,
      category: 'currency',
    },
    {
      id: 'c3',
      title: 'Fortnite V-Bucks - 13500',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/577251ad-81cc-4477-876d-a76bafdfb7c7.jpg',
      price: 7499,
      oldPrice: 9999,
      category: 'currency',
      discount: 25,
    },
    {
      id: 'c4',
      title: 'Roblox - 10000 Robux',
      image: 'https://cdn.poehali.dev/projects/8a51dcd3-67d2-4ee9-86fe-ea0898574899/files/577251ad-81cc-4477-876d-a76bafdfb7c7.jpg',
      price: 6999,
      category: 'currency',
    },
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: 'Товар добавлен в корзину',
      description: product.title,
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
    toast({
      title: 'Оформление заказа',
      description: 'Функция оформления заказа будет доступна в следующей версии!',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <Hero />

      <section className="container py-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gradient-primary">Каталог товаров</h2>
            <TabsList className="bg-card border border-border/50">
              <TabsTrigger value="all" className="data-[state=active]:glow-primary">
                <Icon name="Grid3x3" size={16} className="mr-2" />
                Все
              </TabsTrigger>
              <TabsTrigger value="games" className="data-[state=active]:glow-primary">
                <Icon name="Gamepad2" size={16} className="mr-2" />
                Игры
              </TabsTrigger>
              <TabsTrigger value="currency" className="data-[state=active]:glow-primary">
                <Icon name="Coins" size={16} className="mr-2" />
                Валюта
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Gamepad2" size={24} className="text-primary" />
                Популярные игры
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Coins" size={24} className="text-secondary" />
                Игровая валюта
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currency.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="games">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="currency">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currency.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="bg-card/30 backdrop-blur-sm border-y border-border/50 py-16 mt-12">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold text-gradient-primary">
            Готовы начать играть?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных геймеров, которые уже покупают игры на RocketShop
          </p>
          <Button size="lg" className="text-lg glow-primary">
            <Icon name="Rocket" size={20} className="mr-2" />
            Создать аккаунт
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <Icon name="Rocket" size={24} className="text-primary" />
                <span className="text-gradient-primary">RocketShop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ваш надежный магазин цифровых товаров
              </p>
            </div>
            
            {[
              { title: 'Компания', items: ['О нас', 'Вакансии', 'Блог'] },
              { title: 'Помощь', items: ['FAQ', 'Поддержка', 'Контакты'] },
              { title: 'Правовая информация', items: ['Условия', 'Политика', 'Безопасность'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {col.items.map((item) => (
                    <li key={item}>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground">
                        {item}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
    </div>
  );
}

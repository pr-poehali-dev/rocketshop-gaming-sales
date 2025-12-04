import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
    { id: 'games', label: 'Игры', icon: 'Gamepad2' },
    { id: 'currency', label: 'Валюта', icon: 'Coins' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'support', label: 'Поддержка', icon: 'Headphones' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Icon name="Rocket" size={32} className="text-primary animate-glow-pulse" />
            <span className="text-gradient-primary">RocketShop</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection(item.id)}
              className={activeSection === item.id ? 'glow-primary' : ''}
            >
              <Icon name={item.icon as any} size={16} className="mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="relative hover:glow-secondary transition-all"
            onClick={onCartClick}
          >
            <Icon name="ShoppingCart" size={20} />
            {cartItemsCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent animate-glow-pulse"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Button>
          <Button className="glow-primary" size="sm">
            <Icon name="LogIn" size={16} className="mr-2" />
            Войти
          </Button>
        </div>
      </div>

      <div className="md:hidden border-t border-border/40">
        <div className="container flex overflow-x-auto gap-1 py-2 scrollbar-hide">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection(item.id)}
              className={`flex-shrink-0 ${activeSection === item.id ? 'glow-primary' : ''}`}
            >
              <Icon name={item.icon as any} size={16} className="mr-1" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}

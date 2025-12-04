import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Product } from './ProductCard';

interface SearchBarProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function SearchBar({ products, onSelectProduct }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.platform?.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [query, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="Поиск игр и валюты..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-12 bg-card border-border/50 focus:border-primary/50 focus:glow-primary transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 border-border/50 bg-card shadow-2xl max-h-96 overflow-auto animate-fade-in">
          <div className="p-2">
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all group"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {product.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {product.category === 'game' ? (
                      <>
                        <Icon name="Gamepad2" size={12} />
                        <span>Игра</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Coins" size={12} />
                        <span>Валюта</span>
                      </>
                    )}
                    {product.platform && (
                      <>
                        <span>•</span>
                        <span>{product.platform}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{product.price} ₽</div>
                  {product.discount && (
                    <div className="text-xs text-accent">-{product.discount}%</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

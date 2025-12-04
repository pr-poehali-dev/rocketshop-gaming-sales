import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  category: 'game' | 'currency';
  platform?: string;
  rating?: number;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:glow-primary animate-fade-in">
      <CardHeader className="p-0 relative">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
        {product.discount && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground font-bold glow-accent">
            -{product.discount}%
          </Badge>
        )}
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm"
        >
          {product.category === 'game' ? (
            <>
              <Icon name="Gamepad2" size={14} className="mr-1" />
              Игра
            </>
          ) : (
            <>
              <Icon name="Coins" size={14} className="mr-1" />
              Валюта
            </>
          )}
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          {product.platform && (
            <div className="flex items-center gap-1">
              <Icon name="Monitor" size={14} />
              <span>{product.platform}</span>
            </div>
          )}
          {product.rating && (
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.oldPrice} ₽
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full glow-primary group/btn" 
          onClick={() => onAddToCart(product)}
        >
          <Icon name="ShoppingCart" size={16} className="mr-2 group-hover/btn:animate-bounce" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}

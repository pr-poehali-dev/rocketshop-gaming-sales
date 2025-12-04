import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const categoryIcons = {
  game: 'Gamepad2',
  currency: 'Coins',
  subscription: 'Star',
  giftcard: 'Gift',
};

const categoryLabels = {
  game: 'Игра',
  currency: 'Валюта',
  subscription: 'Подписка',
  giftcard: 'Подарочная карта',
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:glow-primary animate-fade-in flex flex-col h-full">
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
          <Icon name={categoryIcons[product.category] as any} size={14} className="mr-1" />
          {categoryLabels[product.category]}
        </Badge>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {product.title}
          </h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <Icon name="Info" size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">{product.title}</DialogTitle>
                <DialogDescription>Подробная информация о товаре</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge>
                      <Icon name={categoryIcons[product.category] as any} size={14} className="mr-1" />
                      {categoryLabels[product.category]}
                    </Badge>
                    {product.platform && (
                      <Badge variant="outline">
                        <Icon name="Monitor" size={14} className="mr-1" />
                        {product.platform}
                      </Badge>
                    )}
                    {product.subcategory && (
                      <Badge variant="secondary">{product.subcategory}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-3xl font-bold text-primary">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.oldPrice} ₽
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full glow-primary" 
                  size="lg"
                  onClick={() => onAddToCart(product)}
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {product.subcategory && (
          <p className="text-xs text-muted-foreground mb-2">{product.subcategory}</p>
        )}
        
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

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{Math.round(product.price)} ₽</span>
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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg border-l border-border/50">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <Icon name="ShoppingCart" size={24} className="text-primary" />
            Корзина
          </SheetTitle>
          <SheetDescription>
            {totalItems > 0 ? `Товаров в корзине: ${totalItems}` : 'Корзина пуста'}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="p-6 bg-muted rounded-full">
              <Icon name="ShoppingBag" size={48} className="text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground text-center">
              Ваша корзина пуста
            </p>
            <Button onClick={onClose} className="glow-primary">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Продолжить покупки
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-6" style={{ height: 'calc(100vh - 300px)' }}>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-card border border-border/50 rounded-lg hover:border-primary/30 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                      <div className="text-sm font-bold text-primary">
                        {item.price * item.quantity} ₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span>{total} ₽</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{total} ₽</span>
                </div>
              </div>

              <SheetFooter className="flex-col sm:flex-col gap-2">
                <Button 
                  className="w-full glow-primary text-lg py-6"
                  onClick={onCheckout}
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onClose}
                >
                  Продолжить покупки
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

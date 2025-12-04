import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  paymentMethod: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  items,
  total,
  paymentMethod,
}: PaymentModalProps) {
  const commission = paymentMethod === 'sberbank' ? total * 0.02 : 0;
  const finalTotal = total + commission;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Receipt" size={24} className="text-primary" />
            Счет на оплату
          </DialogTitle>
          <DialogDescription>
            Переведите указанную сумму на реквизиты получателя
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6 bg-primary/5 border-primary/30">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Icon name="Landmark" size={20} className="text-primary" />
              Реквизиты получателя
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">Банк:</span>
                <span className="font-semibold">СберБанк</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">Номер карты:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold">2202 2083 9585 3485</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => {
                      navigator.clipboard.writeText('2202208395853485');
                    }}
                  >
                    <Icon name="Copy" size={14} />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">Получатель:</span>
                <span className="font-semibold">Никита Владимирович Т.</span>
              </div>
            </div>
          </Card>

          <div className="bg-muted/30 p-6 rounded-lg space-y-3">
            <h4 className="font-semibold mb-3">Ваш заказ:</h4>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} x{item.quantity}</span>
                <span className="font-semibold">{item.price * item.quantity} ₽</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары:</span>
                <span>{total} ₽</span>
              </div>
              {commission > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Комиссия (2%):</span>
                  <span className="text-orange-500">{commission.toFixed(2)} ₽</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>К оплате:</span>
                <span className="text-primary">{finalTotal.toFixed(2)} ₽</span>
              </div>
            </div>
          </div>

          <Card className="p-4 bg-accent/10 border-accent/30">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-accent mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold">Инструкция по оплате:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Переведите <strong className="text-foreground">{finalTotal.toFixed(2)} ₽</strong> на указанную карту</li>
                  <li>После перевода свяжитесь с нами в Telegram: <strong className="text-foreground">@RocketShopSeller</strong></li>
                  <li>Отправьте скриншот оплаты и email для получения товаров</li>
                  <li>Ожидайте получение ключей на указанный email</li>
                </ol>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button
              className="flex-1 glow-primary"
              onClick={() => {
                window.open('https://t.me/RocketShopSeller', '_blank');
              }}
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Связаться с продавцом
            </Button>
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

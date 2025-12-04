import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onConfirm: (paymentMethod: string, email: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  onConfirm,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('sberbank');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'sberbank', label: 'СберБанк', icon: 'Landmark', commission: '2%', available: true },
    { id: 'tbank', label: 'T-Bank', icon: 'Building2', commission: null, available: false },
    { id: 'sbp', label: 'СБП', icon: 'Smartphone', commission: null, available: false },
  ];

  const handleConfirm = async () => {
    if (!email || !paymentMethod) return;
    
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    onConfirm(paymentMethod, email);
    setIsProcessing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="ShoppingBag" size={24} className="text-primary" />
            Оформление заказа
          </DialogTitle>
          <DialogDescription>
            Выберите способ оплаты и укажите email для получения товаров
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Package" size={18} className="text-primary" />
              Ваш заказ ({items.length} {items.length === 1 ? 'товар' : 'товаров'})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto bg-muted/30 p-3 rounded-lg">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {item.quantity}x
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="font-semibold text-primary">
                    {item.price * item.quantity} ₽
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label htmlFor="email" className="text-base font-semibold mb-2 flex items-center gap-2">
              <Icon name="Mail" size={18} className="text-primary" />
              Email для доставки
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ключи и коды будут отправлены на этот адрес
            </p>
          </div>

          <Separator />

          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <Icon name="CreditCard" size={18} className="text-primary" />
              Способ оплаты
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-3 mt-3"
            >
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between space-x-3 p-3 rounded-lg border transition-all ${
                    method.available 
                      ? 'cursor-pointer' 
                      : 'cursor-not-allowed opacity-60'
                  } ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/5 glow-primary'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                  onClick={() => method.available && setPaymentMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id} 
                      disabled={!method.available}
                    />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className={`p-2 rounded-md ${
                        paymentMethod === method.id
                          ? 'bg-primary/20'
                          : 'bg-muted'
                      }`}>
                        <Icon
                          name={method.icon as any}
                          size={20}
                          className={paymentMethod === method.id ? 'text-primary' : ''}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{method.label}</span>
                        {method.commission && (
                          <span className="text-xs text-orange-500">
                            Комиссия {method.commission}
                          </span>
                        )}
                      </div>
                    </Label>
                  </div>
                  {!method.available && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Скоро
                    </span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товары:</span>
              <span>{total} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Комиссия:</span>
              <span className={paymentMethod === 'sberbank' ? 'text-orange-500' : 'text-green-500'}>
                {paymentMethod === 'sberbank' ? `${(total * 0.02).toFixed(2)} ₽ (2%)` : '0 ₽'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Итого к оплате:</span>
              <span className="text-primary text-2xl">
                {paymentMethod === 'sberbank' ? (total * 1.02).toFixed(2) : total} ₽
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={handleConfirm}
            disabled={!email || isProcessing}
            className="w-full glow-primary text-lg py-6"
          >
            {isProcessing ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Обработка...
              </>
            ) : (
              <>
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Оплатить {paymentMethod === 'sberbank' ? (total * 1.02).toFixed(2) : total} ₽
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="w-full"
          >
            Отменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onGetDiscount?: () => void;
}

export default function Hero({ onGetDiscount }: HeroProps) {
  const benefits = [
    { 
      icon: 'ShoppingBag', 
      title: 'Широкий выбор валют', 
      desc: 'У нас есть валюта для большинства популярных онлайн-игр, и мы постоянно добавляем новые!'
    },
    { 
      icon: 'Percent', 
      title: 'Выгодные цены', 
      desc: 'Мы предлагаем конкурентные цены и регулярные акции, чтобы вы могли экономить!'
    },
    { 
      icon: 'Zap', 
      title: 'Быстрая доставка', 
      desc: 'Получите свою валюту в кратчайшие сроки, чтобы сразу вернуться в игру!'
    },
    { 
      icon: 'Shield', 
      title: 'Безопасность', 
      desc: 'Мы используем проверенные методы доставки и гарантируем безопасность ваших транзакций!'
    },
    { 
      icon: 'Headphones', 
      title: 'Круглосуточная поддержка', 
      desc: 'Наша команда поддержки всегда готова ответить на ваши вопросы и помочь с решением проблем!'
    },
    { 
      icon: 'MousePointerClick', 
      title: 'Простой и удобный интерфейс', 
      desc: 'Легко найти нужную валюту и оформить заказ!'
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center gap-6 animate-fade-in mb-12">
          <Badge className="px-4 py-2 bg-card/90 backdrop-blur-sm border border-primary/30 glow-primary text-base">
            <Icon name="Clock" size={16} className="mr-2" />
            Часы работы: 3:00-18:00 МСК
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight animate-slide-up max-w-4xl">
            <span className="text-gradient-primary">RocketShop</span>
            {' '}
            <span className="text-foreground">-</span>
            {' '}
            <span className="text-gradient-secondary">Ваш ракетный двигатель</span>
            <br />
            <span className="text-foreground">в мире онлайн-игр!</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl animate-slide-up leading-relaxed">
            В RocketShop вы можете купить игровую валюту по самым выгодным ценам! 
            Мы предлагаем широкий ассортимент валют для популярных MMORPG, MOBA, шутеров и мобильных игр. 
            Наша команда гарантирует быструю доставку, безопасные транзакции и круглосуточную поддержку. 
            <strong className="text-foreground"> Все честно и безопасно. Если вас не устроит заказ - вернем вам деньги.</strong>
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
            <Button 
              size="lg" 
              className="text-lg glow-primary group"
              onClick={() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Icon name="Rocket" size={20} className="mr-2 group-hover:animate-bounce" />
              Перейти в каталог
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg glow-accent"
              onClick={onGetDiscount}
            >
              <Icon name="Gift" size={20} className="mr-2" />
              Дарим новым покупателям скидку 20% (получить)
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">
            Почему выбирают RocketShop?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <Card
                key={i}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:glow-primary animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Icon name={item.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Заряжайте свои игровые аккаунты и достигайте небывалых высот с нашей помощью!
          </p>
        </div>
      </div>
    </section>
  );
}

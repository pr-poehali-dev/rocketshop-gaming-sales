import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-pulse" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center gap-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-primary/30 rounded-full glow-primary">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium">Лучшие цены на игры и валюту</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight animate-slide-up">
            <span className="text-gradient-primary">Покупай игры</span>
            <br />
            <span className="text-gradient-secondary">быстрее всех</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up">
            Мгновенная доставка цифровых товаров. Тысячи игр, игровой валюты и подписок по выгодным ценам.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
            <Button size="lg" className="text-lg glow-primary group">
              <Icon name="Rocket" size={20} className="mr-2 group-hover:animate-bounce" />
              Перейти в каталог
            </Button>
            <Button size="lg" variant="outline" className="text-lg hover:glow-secondary">
              <Icon name="Gift" size={20} className="mr-2" />
              Специальные предложения
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-3xl">
            {[
              { icon: 'Zap', label: 'Мгновенно', desc: 'Доставка за 1 минуту' },
              { icon: 'Shield', label: 'Безопасно', desc: 'Официальные ключи' },
              { icon: 'Percent', label: 'Выгодно', desc: 'Скидки до 90%' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-all hover:glow-primary animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon name={item.icon as any} size={24} className="text-primary" />
                </div>
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function FAQSection() {
  const faqs = [
    {
      question: 'Как быстро я получу свой заказ?',
      answer: 'Большинство заказов обрабатываются моментально или в течение 1-5 минут. Некоторые товары (например, Robux через GamePass) требуют до 5 дней ожидания - это указано в описании товара.',
    },
    {
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Мы принимаем оплату через СберБанк (комиссия 2%). Скоро станут доступны T-Bank и СБП. После выбора способа оплаты вы получите реквизиты для перевода.',
    },
    {
      question: 'Безопасно ли покупать у вас?',
      answer: 'Да! Все покупки проводятся официально через проверенные методы. Мы гарантируем безопасность транзакций. Если вас не устроит заказ - вернем деньги.',
    },
    {
      question: 'Как получить скидку 20%?',
      answer: 'Новые покупатели получают скидку 20% на первый заказ! Просто нажмите кнопку "Дарим новым покупателям скидку 20%" в шапке сайта. Скидка применится автоматически при добавлении товаров в корзину.',
    },
    {
      question: 'Какие часы работы магазина?',
      answer: 'Мы работаем с 3:00 до 18:00 по московскому времени (МСК). В это время доступна поддержка и обработка заказов. Некоторые услуги (например, подписка Spotify) оформляются только с 10:00 до 18:00 МСК.',
    },
    {
      question: 'Что делать если возникла проблема?',
      answer: 'Свяжитесь с нашей службой поддержки в Telegram: @RocketShopSeller. Мы оперативно решим любые вопросы и поможем с заказом.',
    },
    {
      question: 'Могу ли я вернуть товар?',
      answer: 'Да, если товар не соответствует описанию или возникли проблемы с активацией - мы вернем деньги. Обратитесь в поддержку с описанием проблемы.',
    },
    {
      question: 'Где посмотреть отзывы о магазине?',
      answer: 'Все актуальные отзывы можете увидеть в нашем Telegram-канале: https://t.me/RocketShopRate',
    },
  ];

  return (
    <section className="py-16 bg-card/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient-primary">
            Часто задаваемые вопросы
          </h2>
          <p className="text-lg text-muted-foreground">
            Ответы на популярные вопросы о нашем сервисе
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 border-border/50">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary">
                  <div className="flex items-center gap-3">
                    <Icon name="HelpCircle" size={20} className="text-primary flex-shrink-0" />
                    <span className="font-semibold">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-9">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="https://t.me/RocketShopSeller"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Icon name="MessageCircle" size={18} />
            Свяжитесь с поддержкой в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}

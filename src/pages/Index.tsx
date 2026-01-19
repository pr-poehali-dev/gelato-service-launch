import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [quantity, setQuantity] = useState([100]);
  const [deliveryCountry, setDeliveryCountry] = useState('');

  const templates = [
    { id: 1, name: 'Визитка Классика', category: 'Визитки', preview: '/placeholder.svg' },
    { id: 2, name: 'Флаер Событие', category: 'Флаеры', preview: '/placeholder.svg' },
    { id: 3, name: 'Плакат Концерт', category: 'Плакаты', preview: '/placeholder.svg' },
    { id: 4, name: 'Буклет Бизнес', category: 'Буклеты', preview: '/placeholder.svg' },
    { id: 5, name: 'Визитка Креатив', category: 'Визитки', preview: '/placeholder.svg' },
    { id: 6, name: 'Баннер Акция', category: 'Баннеры', preview: '/placeholder.svg' },
  ];

  const orders = [
    { id: 'ORD-2024-001', product: 'Визитки 500 шт', status: 'В печати', date: '15.01.2026', price: '2 500 ₽' },
    { id: 'ORD-2024-002', product: 'Флаеры А5 1000 шт', status: 'Доставляется', date: '12.01.2026', price: '4 200 ₽' },
    { id: 'ORD-2024-003', product: 'Плакат А2', status: 'Завершен', date: '08.01.2026', price: '890 ₽' },
  ];

  const calculatePrice = () => {
    const basePrice = 0.25;
    const total = quantity[0] * basePrice;
    const deliveryFee = deliveryCountry ? 350 : 0;
    return { subtotal: total, delivery: deliveryFee, total: total + deliveryFee };
  };

  const price = calculatePrice();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Printer" className="text-primary" size={28} />
            <span className="text-2xl font-bold">PrintFlow</span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button 
              onClick={() => setActiveSection('home')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => setActiveSection('editor')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'editor' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Редактор
            </button>
            <button 
              onClick={() => setActiveSection('orders')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'orders' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Заказы
            </button>
            <button 
              onClick={() => setActiveSection('calculator')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'calculator' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Калькулятор
            </button>
            <button 
              onClick={() => setActiveSection('support')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'support' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Поддержка
            </button>
          </nav>

          <Button>Войти</Button>
        </div>
      </header>

      <main className="container py-8">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center py-20">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Печать без границ
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Создавайте дизайны из шаблонов, печатайте с гарантией качества и получайте быструю доставку
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => setActiveSection('editor')}>
                  Начать дизайн
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline">
                  Смотреть примеры
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Sparkles" className="text-primary" size={32} />
                  </div>
                  <CardTitle>Библиотека шаблонов</CardTitle>
                  <CardDescription>
                    Сотни готовых шаблонов для быстрого старта
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Zap" className="text-primary" size={32} />
                  </div>
                  <CardTitle>Быстрая печать</CardTitle>
                  <CardDescription>
                    Печать от 24 часов с гарантией качества
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Globe" className="text-primary" size={32} />
                  </div>
                  <CardTitle>Доставка по миру</CardTitle>
                  <CardDescription>
                    Отправляем в любую точку за 3-7 дней
                  </CardDescription>
                </CardHeader>
              </Card>
            </section>

            <section className="bg-muted/50 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
              <p className="text-muted-foreground mb-6">
                Выберите шаблон, настройте дизайн и закажите печать за несколько минут
              </p>
              <Button size="lg" onClick={() => setActiveSection('editor')}>
                Перейти в редактор
              </Button>
            </section>
          </div>
        )}

        {activeSection === 'editor' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Редактор дизайна</h2>
              <p className="text-muted-foreground">Создавайте профессиональные макеты из готовых шаблонов</p>
            </div>

            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="templates">Шаблоны</TabsTrigger>
                <TabsTrigger value="my-designs">Мои дизайны</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="space-y-6">
                <div className="flex gap-4 flex-wrap">
                  <Button variant={selectedTemplate === null ? "default" : "outline"} onClick={() => setSelectedTemplate(null)}>
                    Все
                  </Button>
                  <Button variant="outline">Визитки</Button>
                  <Button variant="outline">Флаеры</Button>
                  <Button variant="outline">Плакаты</Button>
                  <Button variant="outline">Буклеты</Button>
                  <Button variant="outline">Баннеры</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardHeader className="p-0">
                        <div className="aspect-[3/4] bg-muted rounded-t-lg overflow-hidden">
                          <img src={template.preview} alt={template.name} className="w-full h-full object-cover" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <Badge variant="secondary" className="mt-2">{template.category}</Badge>
                          </div>
                          {selectedTemplate === template.id && (
                            <Icon name="CheckCircle2" className="text-primary" size={24} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedTemplate && (
                  <div className="flex gap-4 justify-end">
                    <Button variant="outline">Предпросмотр</Button>
                    <Button>
                      Редактировать шаблон
                      <Icon name="Edit" className="ml-2" size={16} />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="my-designs">
                <Card className="p-12 text-center">
                  <Icon name="FolderOpen" className="mx-auto text-muted-foreground mb-4" size={48} />
                  <h3 className="text-xl font-semibold mb-2">У вас пока нет сохраненных дизайнов</h3>
                  <p className="text-muted-foreground mb-6">Создайте свой первый дизайн из шаблона</p>
                  <Button>Создать дизайн</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">История заказов</h2>
              <p className="text-muted-foreground">Отслеживайте статус ваших заказов</p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold">{order.id}</h3>
                          <Badge 
                            variant={order.status === 'Завершен' ? 'default' : order.status === 'Доставляется' ? 'secondary' : 'outline'}
                          >
                            {order.status === 'В печати' && <Icon name="Printer" className="mr-1" size={14} />}
                            {order.status === 'Доставляется' && <Icon name="Truck" className="mr-1" size={14} />}
                            {order.status === 'Завершен' && <Icon name="CheckCircle2" className="mr-1" size={14} />}
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{order.product}</p>
                        <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{order.price}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'calculator' && (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-2">Калькулятор стоимости</h2>
              <p className="text-muted-foreground">Рассчитайте цену и сроки доставки</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Параметры заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Тип продукта</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип продукта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cards">Визитки</SelectItem>
                      <SelectItem value="flyers">Флаеры</SelectItem>
                      <SelectItem value="posters">Плакаты</SelectItem>
                      <SelectItem value="booklets">Буклеты</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Количество: {quantity[0]} шт</Label>
                  <Slider 
                    value={quantity} 
                    onValueChange={setQuantity}
                    min={10}
                    max={5000}
                    step={10}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>10</span>
                    <span>5000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Страна доставки</Label>
                  <Select value={deliveryCountry} onValueChange={setDeliveryCountry}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Россия</SelectItem>
                      <SelectItem value="kz">Казахстан</SelectItem>
                      <SelectItem value="by">Беларусь</SelectItem>
                      <SelectItem value="other">Другие страны</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Итоговая стоимость</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Печать:</span>
                  <span className="font-semibold">{price.subtotal.toFixed(2)} ₽</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Доставка:</span>
                  <span className="font-semibold">{deliveryCountry ? `${price.delivery} ₽` : '—'}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{price.total.toFixed(2)} ₽</span>
                </div>
                <Button className="w-full" size="lg" disabled={!deliveryCountry}>
                  Оформить заказ
                </Button>
                {deliveryCountry && (
                  <p className="text-center text-sm text-muted-foreground">
                    <Icon name="Clock" className="inline mr-1" size={14} />
                    Срок доставки: 5-7 рабочих дней
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'support' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-2">Поддержка и контакты</h2>
              <p className="text-muted-foreground">Мы всегда рады помочь вам</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Icon name="MessageCircle" className="text-primary mb-2" size={32} />
                  <CardTitle>Чат поддержки</CardTitle>
                  <CardDescription>
                    Получите ответ в течение 5 минут
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Открыть чат</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Mail" className="text-primary mb-2" size={32} />
                  <CardTitle>Email поддержка</CardTitle>
                  <CardDescription>
                    support@printflow.ru
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Написать письмо</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Phone" className="text-primary mb-2" size={32} />
                  <CardTitle>Телефон</CardTitle>
                  <CardDescription>
                    +7 (495) 123-45-67
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Позвонить</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Clock" className="text-primary mb-2" size={32} />
                  <CardTitle>Часы работы</CardTitle>
                  <CardDescription>
                    Пн-Пт: 9:00 - 21:00<br />
                    Сб-Вс: 10:00 - 18:00
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Как долго занимает печать?</h4>
                  <p className="text-muted-foreground">
                    Стандартная печать занимает 1-2 рабочих дня. Экспресс-печать доступна за 24 часа.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Какие форматы файлов вы принимаете?</h4>
                  <p className="text-muted-foreground">
                    Мы принимаем PDF, AI, PSD, JPEG и PNG файлы. Рекомендуем использовать PDF для лучшего качества.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Можно ли отменить заказ?</h4>
                  <p className="text-muted-foreground">
                    Заказ можно отменить до начала печати без дополнительных комиссий.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Printer" className="text-primary" size={24} />
              <span className="font-semibold">PrintFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 PrintFlow. Печать без границ.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

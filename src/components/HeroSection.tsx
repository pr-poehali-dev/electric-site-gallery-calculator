import Icon from "@/components/ui/icon";

const HERO_IMAGE_URL =
  "https://cdn.poehali.dev/projects/910f212b-a082-4769-906d-633830c94fdc/files/4d4ac72b-f9d5-46a9-9f5d-94364de2e043.jpg";

const SERVICES = [
  {
    icon: "Zap",
    title: "Монтаж",
    items: ["Прокладка кабелей", "Установка розеток и выключателей", "Подключение щитов", "Монтаж освещения", "Умный дом"],
    from: 1500,
  },
  {
    icon: "Wrench",
    title: "Ремонт",
    items: ["Замена проводки", "Ремонт щитков", "Устранение короткого замыкания", "Восстановление цепей", "Ремонт розеток"],
    from: 800,
  },
  {
    icon: "ScanSearch",
    title: "Диагностика",
    items: ["Поиск неисправностей", "Проверка заземления", "Тепловизионный контроль", "Проверка УЗО", "Составление схем"],
    from: 500,
  },
];

const CALC_WORKS = [
  { id: "montage", label: "Монтаж", base: 3000 },
  { id: "repair", label: "Ремонт", base: 2000 },
  { id: "diagnostics", label: "Диагностика", base: 1200 },
];

const COMPLEXITY = [
  { id: "simple", label: "Простая", mult: 1.0 },
  { id: "medium", label: "Средняя", mult: 1.6 },
  { id: "hard", label: "Сложная", mult: 2.4 },
];

interface HeroSectionProps {
  visible: boolean;
  scrollTo: (id: string) => void;
  workType: string;
  setWorkType: (v: string) => void;
  complexity: string;
  setComplexity: (v: string) => void;
  rooms: number;
  setRooms: (v: number) => void;
}

export { CALC_WORKS, COMPLEXITY };

export default function HeroSection({
  visible,
  scrollTo,
  workType,
  setWorkType,
  complexity,
  setComplexity,
  rooms,
  setRooms,
}: HeroSectionProps) {
  const selectedWork = CALC_WORKS.find((w) => w.id === workType)!;
  const selectedComp = COMPLEXITY.find((c) => c.id === complexity)!;
  const price = Math.round(selectedWork.base * selectedComp.mult * rooms);
  const priceMin = Math.round(price * 0.85);
  const priceMax = Math.round(price * 1.15);

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center grid-bg pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s ease",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-ibm tracking-[0.2em] uppercase">
                  Профессиональный электрик
                </span>
              </div>

              <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground">
                НАДЁЖНАЯ
                <br />
                <span className="text-primary">ЭЛЕКТРИКА</span>
                <br />
                ПОД КЛЮЧ
              </h1>

              <p className="text-muted-foreground font-ibm text-lg leading-relaxed mb-8 max-w-md">
                Монтаж, ремонт и диагностика электрических систем любой сложности. Работаю быстро, аккуратно, с гарантией.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("calculator")}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-ibm font-medium px-6 py-3 rounded transition-all hover:scale-105"
                >
                  <Icon name="Calculator" size={18} />
                  Рассчитать стоимость
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 border border-border hover:border-primary text-foreground hover:text-primary font-ibm font-medium px-6 py-3 rounded transition-all"
                >
                  <Icon name="Phone" size={18} />
                  Позвонить
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                {[["10+", "Лет опыта"], ["500+", "Объектов"], ["100%", "Гарантия"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-oswald text-2xl font-bold text-primary">{num}</div>
                    <div className="text-xs text-muted-foreground font-ibm mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s ease 0.3s",
              }}
              className="relative"
            >
              <div className="relative rounded overflow-hidden border border-border">
                <img
                  src={HERO_IMAGE_URL}
                  alt="Электромонтаж"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded p-3 border border-border">
                  <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-ibm font-medium text-foreground">Гарантия на все работы</div>
                    <div className="text-xs text-muted-foreground">до 3 лет на монтаж</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded shadow-lg">
                <div className="font-oswald text-2xl font-bold">24/7</div>
                <div className="text-xs font-ibm">выезд</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-card electric-line">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-ibm tracking-[0.2em] uppercase">Что я делаю</span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground">УСЛУГИ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className="group bg-background border border-border hover:border-primary rounded p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/15 rounded flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                  <Icon name={service.icon as "Zap"} size={22} className="text-primary" />
                </div>

                <h3 className="font-oswald text-2xl font-semibold text-foreground mb-4">{service.title}</h3>

                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground font-ibm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-ibm">от </span>
                    <span className="font-oswald text-xl font-semibold text-primary">{service.from.toLocaleString("ru")} ₽</span>
                  </div>
                  <button
                    onClick={() => scrollTo("calculator")}
                    className="text-xs text-primary font-ibm hover:underline flex items-center gap-1"
                  >
                    Рассчитать <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-ibm tracking-[0.2em] uppercase">Онлайн-расчёт</span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground">КАЛЬКУЛЯТОР</h2>
            <p className="text-muted-foreground font-ibm mt-3">Укажите параметры и получите примерную стоимость</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="mb-8">
              <label className="block text-sm font-ibm text-muted-foreground mb-3 uppercase tracking-wider">
                Тип работ
              </label>
              <div className="grid grid-cols-3 gap-3">
                {CALC_WORKS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWorkType(w.id)}
                    className={`py-3 px-4 rounded border font-ibm text-sm font-medium transition-all ${
                      workType === w.id
                        ? "bg-primary border-primary text-white"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-ibm text-muted-foreground mb-3 uppercase tracking-wider">
                Сложность работ
              </label>
              <div className="grid grid-cols-3 gap-3">
                {COMPLEXITY.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    className={`py-3 px-4 rounded border font-ibm text-sm font-medium transition-all ${
                      complexity === c.id
                        ? "bg-primary border-primary text-white"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-ibm text-muted-foreground uppercase tracking-wider">
                  Количество комнат
                </label>
                <span className="font-oswald text-2xl text-primary font-bold">{rooms}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="calc-slider w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2 font-ibm">
                <span>1 комната</span>
                <span>10 комнат</span>
              </div>
            </div>

            <div className="bg-background border border-primary/30 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm text-muted-foreground font-ibm mb-1">Примерная стоимость</div>
                <div className="font-oswald text-4xl font-bold text-primary">
                  {priceMin.toLocaleString("ru")} — {priceMax.toLocaleString("ru")} ₽
                </div>
                <div className="text-xs text-muted-foreground font-ibm mt-1">
                  {selectedWork.label} · {selectedComp.label} сложность · {rooms} {rooms === 1 ? "комната" : rooms < 5 ? "комнаты" : "комнат"}
                </div>
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="flex-shrink-0 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-ibm font-medium px-6 py-3 rounded transition-all hover:scale-105 whitespace-nowrap"
              >
                <Icon name="Send" size={16} />
                Заказать расчёт
              </button>
            </div>

            <p className="text-xs text-muted-foreground font-ibm text-center mt-4">
              * Итоговая стоимость определяется после осмотра объекта. Расчёт — ориентировочный.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

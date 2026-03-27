import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const GALLERY_IMAGES = [
  {
    url: "https://cdn.poehali.dev/projects/910f212b-a082-4769-906d-633830c94fdc/files/4d4ac72b-f9d5-46a9-9f5d-94364de2e043.jpg",
    title: "Монтаж щитка",
    desc: "Установка распределительного щита",
  },
  {
    url: "https://cdn.poehali.dev/projects/910f212b-a082-4769-906d-633830c94fdc/files/9cb6da13-4720-4246-9e95-8ffb5109b7cf.jpg",
    title: "Проводка квартиры",
    desc: "Полная замена электропроводки",
  },
  {
    url: "https://cdn.poehali.dev/projects/910f212b-a082-4769-906d-633830c94fdc/files/894e9d6e-24a8-4ae1-8fac-00fb8df558fd.jpg",
    title: "Диагностика",
    desc: "Поиск неисправностей мультиметром",
  },
  {
    url: "https://cdn.poehali.dev/projects/910f212b-a082-4769-906d-633830c94fdc/files/5f230294-d7cf-41cd-9150-027df398b42c.jpg",
    title: "Умный дом",
    desc: "Установка интеллектуального освещения",
  },
];

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

export default function Index() {
  const [workType, setWorkType] = useState("montage");
  const [complexity, setComplexity] = useState("medium");
  const [rooms, setRooms] = useState(2);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const handleSubmit = async () => {
    if (!formName.trim() || !formPhone.trim()) return;
    setFormStatus("sending");
    try {
      const res = await fetch("https://functions.poehali.dev/fa049e60-e899-4478-83a0-e4e1decacdc7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, description: formDesc }),
      });
      if (res.ok) {
        setFormStatus("ok");
        setFormName("");
        setFormPhone("");
        setFormDesc("");
      } else {
        setFormStatus("err");
      }
    } catch {
      setFormStatus("err");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const selectedWork = CALC_WORKS.find((w) => w.id === workType)!;
  const selectedComp = COMPLEXITY.find((c) => c.id === complexity)!;
  const price = Math.round(selectedWork.base * selectedComp.mult * rooms);
  const priceMin = Math.round(price * 0.85);
  const priceMax = Math.round(price * 1.15);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-semibold text-lg tracking-wider text-foreground">
              ЭЛЕКТРО<span className="text-primary">МАСТЕР</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[["hero", "Главная"], ["services", "Услуги"], ["calculator", "Калькулятор"], ["gallery", "Галерея"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-ibm text-muted-foreground hover:text-primary transition-colors tracking-wide"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-ibm px-4 py-2 rounded transition-all"
          >
            <Icon name="Phone" size={14} />
            Вызвать
          </button>

          <button className="md:hidden text-foreground" onClick={() => setNavOpen(!navOpen)}>
            <Icon name={navOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
            {[["hero", "Главная"], ["services", "Услуги"], ["calculator", "Калькулятор"], ["gallery", "Галерея"], ["contact", "Вызвать"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors">
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

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
                  src={GALLERY_IMAGES[0].url}
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

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-ibm tracking-[0.2em] uppercase">Наши работы</span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground">ГАЛЕРЕЯ</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative rounded overflow-hidden border border-border cursor-pointer hover:border-primary transition-all"
                onClick={() => setGalleryOpen(i)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-300 flex items-end p-3">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-sm font-oswald font-semibold text-foreground">{img.title}</div>
                    <div className="text-xs text-muted-foreground font-ibm">{img.desc}</div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                    <Icon name="ZoomIn" size={14} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-background relative">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-ibm tracking-[0.2em] uppercase">Связаться</span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground">ВЫЗОВ МАСТЕРА</h2>
            <p className="text-muted-foreground font-ibm mt-3">Оставьте заявку — перезвоню в течение 15 минут</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            {formStatus === "ok" ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={28} className="text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-oswald text-2xl font-bold text-foreground mb-1">Заявка отправлена!</div>
                  <div className="text-muted-foreground font-ibm text-sm">Перезвоню вам в течение 15 минут</div>
                </div>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="text-xs text-primary font-ibm hover:underline mt-2"
                >
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs text-muted-foreground font-ibm mb-2 uppercase tracking-wider">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-ibm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-ibm mb-2 uppercase tracking-wider">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-ibm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-xs text-muted-foreground font-ibm mb-2 uppercase tracking-wider">Описание задачи</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите, что нужно сделать..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-ibm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                {formStatus === "err" && (
                  <div className="mb-4 flex items-center gap-2 text-sm text-red-400 font-ibm">
                    <Icon name="AlertCircle" size={14} />
                    Ошибка отправки. Попробуйте ещё раз.
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={formStatus === "sending" || !formName.trim() || !formPhone.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-ibm font-medium py-3.5 rounded transition-all hover:scale-[1.01]"
                >
                  {formStatus === "sending" ? (
                    <>
                      <Icon name="Loader" size={16} className="animate-spin" />
                      Отправляю...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} />
                      Отправить заявку
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: "Phone", label: "Телефон", val: "+7 (999) 000-00-00" },
              { icon: "Clock", label: "Режим", val: "Пн–Вс, 7:00–22:00" },
              { icon: "MapPin", label: "Район", val: "Москва и область" },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded p-4 text-center">
                <Icon name={item.icon as "Phone"} size={20} className="text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground font-ibm">{item.label}</div>
                <div className="text-sm font-ibm font-medium text-foreground mt-1">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-oswald font-semibold text-sm tracking-wider text-foreground">
              ЭЛЕКТРО<span className="text-primary">МАСТЕР</span>
            </span>
          </div>
          <div className="text-xs text-muted-foreground font-ibm text-center">
            Профессиональные электромонтажные работы · Гарантия на все услуги
          </div>
          <div className="text-xs text-muted-foreground font-ibm">© 2024</div>
        </div>
      </footer>

      {/* Gallery lightbox */}
      {galleryOpen !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setGalleryOpen(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setGalleryOpen(null)}
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
            <img
              src={GALLERY_IMAGES[galleryOpen].url}
              alt={GALLERY_IMAGES[galleryOpen].title}
              className="w-full rounded border border-border"
            />
            <div className="mt-3">
              <div className="font-oswald text-xl text-foreground">{GALLERY_IMAGES[galleryOpen].title}</div>
              <div className="text-sm text-muted-foreground font-ibm">{GALLERY_IMAGES[galleryOpen].desc}</div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setGalleryOpen((prev) => (prev! > 0 ? prev! - 1 : GALLERY_IMAGES.length - 1))}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-ibm"
              >
                <Icon name="ChevronLeft" size={16} /> Назад
              </button>
              <button
                onClick={() => setGalleryOpen((prev) => (prev! < GALLERY_IMAGES.length - 1 ? prev! + 1 : 0))}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-ibm"
              >
                Вперёд <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
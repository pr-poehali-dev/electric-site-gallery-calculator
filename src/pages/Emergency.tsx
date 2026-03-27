import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Emergency() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Шапка */}
      <header className="border-b border-border px-6 h-16 flex items-center justify-between max-w-6xl mx-auto w-full">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Icon name="Zap" size={16} className="text-white" />
          </div>
          <span className="font-oswald font-semibold text-lg tracking-wider text-foreground">
            ЭЛЕКТРО<span className="text-primary">МАСТЕР</span>
          </span>
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-ibm transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </button>
      </header>

      {/* Контент */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          {/* Иконка */}
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 bg-red-500/15 rounded-full flex items-center justify-center">
              <Icon name="Siren" size={44} className="text-red-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-red-500" />
            <span className="text-red-500 text-xs font-ibm tracking-[0.2em] uppercase">Срочный вызов</span>
            <div className="h-px w-10 bg-red-500" />
          </div>

          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-foreground mb-4">
            ЭКСТРЕННЫЙ<br />
            <span className="text-red-500">ВЫЕЗД</span>
          </h1>

          <p className="text-muted-foreground font-ibm text-lg leading-relaxed mb-10 max-w-sm mx-auto">
            Выезжаю в течение 30 минут. Устраняю аварии, короткие замыкания и опасные неисправности.
          </p>

          {/* Цена */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="text-sm text-muted-foreground font-ibm mb-1">Стоимость выезда</div>
            <div className="font-oswald text-5xl font-bold text-foreground">
              1 500 <span className="text-2xl">₽</span>
            </div>
            <div className="text-xs text-muted-foreground font-ibm mt-2">
              + стоимость работ по факту осмотра
            </div>
          </div>

          {/* Кнопка */}
          <a
            href="tel:89771236570"
            className="flex items-center justify-center gap-3 w-full bg-red-500 hover:bg-red-600 text-white font-oswald text-xl font-semibold py-5 rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-red-500/25"
          >
            <Icon name="Phone" size={22} />
            Вызвать сейчас
          </a>

          <p className="text-muted-foreground font-ibm text-sm mt-4">
            8 977 123-65-70 · Пн–Вс, 8:00–20:00
          </p>
        </div>
      </main>
    </div>
  );
}

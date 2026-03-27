import Icon from "@/components/ui/icon";

interface NavBarProps {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ navOpen, setNavOpen, scrollTo }: NavBarProps) {
  return (
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
  );
}

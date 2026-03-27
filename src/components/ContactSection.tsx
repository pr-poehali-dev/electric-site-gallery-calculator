import Icon from "@/components/ui/icon";

interface ContactSectionProps {
  formName: string;
  setFormName: (v: string) => void;
  formPhone: string;
  setFormPhone: (v: string) => void;
  formDesc: string;
  setFormDesc: (v: string) => void;
  formStatus: "idle" | "sending" | "ok" | "err";
  setFormStatus: (v: "idle" | "sending" | "ok" | "err") => void;
  handleSubmit: () => void;
}

export default function ContactSection({
  formName,
  setFormName,
  formPhone,
  setFormPhone,
  formDesc,
  setFormDesc,
  formStatus,
  setFormStatus,
  handleSubmit,
}: ContactSectionProps) {
  return (
    <>
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
    </>
  );
}

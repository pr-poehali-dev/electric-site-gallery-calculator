import Icon from "@/components/ui/icon";

export const GALLERY_IMAGES = [
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

interface GallerySectionProps {
  galleryOpen: number | null;
  setGalleryOpen: (i: number | null) => void;
}

export default function GallerySection({ galleryOpen, setGalleryOpen }: GallerySectionProps) {
  return (
    <>
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
                onClick={() => setGalleryOpen(galleryOpen > 0 ? galleryOpen - 1 : GALLERY_IMAGES.length - 1)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-ibm"
              >
                <Icon name="ChevronLeft" size={16} /> Назад
              </button>
              <button
                onClick={() => setGalleryOpen(galleryOpen < GALLERY_IMAGES.length - 1 ? galleryOpen + 1 : 0)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-ibm"
              >
                Вперёд <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar navOpen={navOpen} setNavOpen={setNavOpen} scrollTo={scrollTo} />

      <HeroSection
        visible={visible}
        scrollTo={scrollTo}
        workType={workType}
        setWorkType={setWorkType}
        complexity={complexity}
        setComplexity={setComplexity}
        rooms={rooms}
        setRooms={setRooms}
      />

      <GallerySection galleryOpen={galleryOpen} setGalleryOpen={setGalleryOpen} />

      <ContactSection
        formName={formName}
        setFormName={setFormName}
        formPhone={formPhone}
        setFormPhone={setFormPhone}
        formDesc={formDesc}
        setFormDesc={setFormDesc}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

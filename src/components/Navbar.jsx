// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { GiHighHeel } from "react-icons/gi";
import BussinesDetail from "./BussinesDetail"; // ← datos del negocio
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Inicio", href: "#hero" },
    { label: "Personalización", href: "#customization" },
    { label: "Precios", href: "#pricing" },
    { label: "Ubicación", href: "#location" },
  ];

  const handleMenuClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Datos desde BussinesDetail
  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";
  const whatsappMessage = encodeURIComponent(
    BussinesDetail?.contact?.whatsappMessage ??
      "Hola! Me interesa conocer más sobre sus zapatos artesanales."
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-[var(--color-surface)] shadow-lg" : "bg-transparent "
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center group-hover:bg-[var(--color-secondary)] transition-colors">
                <span className="text-[var(--color-surface)] font-serif text-xl font-semibold ">
                  AS
                </span>
              </div>
              <div>
                <h1 className="font-serif text-xl text-[var(--color-primary)] leading-tight">
                  Calzados Suárez
                </h1>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Zapatería Artesanal
                </p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.href);
                  }}
                  className="text-[var(--color-foreground)] hover:text-[var(--color-secondary)] transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
               <Link to="/products"
               className="flex gap-2 items-center space-x-2 bg-[var(--color-primary)] text-[var(--color-surface)] px-5 py-2.5 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-105"
               >
                <GiHighHeel size={20}/>
                Galería</Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[var(--color-primary)] text-[var(--color-surface)] px-5 py-2.5 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-105"
              >
                <BsWhatsapp className="w-4 h-4" />
                <span className="text-sm font-medium">Contactar</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="w-6 h-6 text-[var(--color-primary)]" />
              ) : (
                <FiMenu className="w-6 h-6 text-[var(--color-primary)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 backdrop-blur-md ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[var(--color-surface)] z-40 md:hidden transform transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl text-[var(--color-primary)]">
              Menú
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
            >
              <FiX className="w-6 h-6 text-[var(--color-primary)]" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.href);
                }}
                className="block px-4 py-3 rounded-lg text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors font-medium"
              >
                {item.label}
              </a>             
            ))}
             <Link to="/products"
               className="flex flex-row gap-2 px-4 py-3 rounded-lg text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors font-medium"
               >Galería
                {/* <GiHighHeel size={20}/> */}
                </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[var(--color-primary)] text-[var(--color-surface)] px-6 py-3 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 w-full"
            >
              <BsWhatsapp className="w-5 h-5" />
              <span className="font-medium">Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";
import BussinesDetail from "./BussinesDetail"; // ← importa la data del negocio
import { Link } from "react-router-dom";
import { MessageCircleMore } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const author = "Made by <Michel.dev>.";

  // ✅ Datos del negocio
  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";
  const whatsappMessage = encodeURIComponent(
    BussinesDetail?.contact?.whatsappMessage ??
    "Hola! Quiero diseñar mi calzado personalizado."
  );

  // ✅ Enlaces de navegación y servicios (fijos)
  const footerLinks = {
    navegacion: [
      { label: "Inicio", href: "#hero" },
      { label: "Personalización", href: "#customization" },
      { label: "Precios", href: "#pricing" },
      { label: "Ubicación", href: "#location" },
    ],
    servicios: BussinesDetail?.categories?.map((cat) => ({
      label: cat.label,
      href: "#pricing",
    })) ?? [],
  };

  // ✅ Redes sociales
  const socialLinks = [
    {
      icon: BsWhatsapp,
      href: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      label: "WhatsApp",
    },
    { icon: MessageCircleMore, href: "https://chat.whatsapp.com/Go8NUEbPg91GLkXYS9ZQIy?mode=wwt", label: "Instagram" },
    { icon: BsFacebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-surface)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
                <span className="text-[var(--color-primary)] font-serif text-xl font-semibold">
                  AS
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-tight">
                  Calzados Suárez
                </h3>
                <p className="text-sm text-[var(--color-surface)]/70">
                  Zapatería Artesanal
                </p>
              </div>
            </div>
            <p className="text-[var(--color-surface)]/80 leading-relaxed mb-6 max-w-md">
              Creando calzado artesanal personalizado desde hace años. Tu
              visión, nuestra artesanía, zapatos únicos que cuentan tu historia.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[var(--color-surface)]/10 hover:bg-[var(--color-surface)]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg mb-4">Navegación</h4>
            <ul className="space-y-2">
              {footerLinks.navegacion.map((link, index) => (
                <li key={index}>
                  { }
                  <a
                    href={link.href}
                    className="text-[var(--color-surface)]/70 hover:text-[var(--color-surface)] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <Link to="/products">Galeria</Link>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-4">Servicios</h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[var(--color-surface)]/70 hover:text-[var(--color-surface)] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-surface)]/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[var(--color-surface)]/60 text-sm">
              {currentYear} {author}
            </p>
            <p className="text-[var(--color-surface)]/60 text-sm">
              © Calzados Suárez Zapatería Artesanal. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy"
                className="text-[var(--color-surface)]/60 hover:text-[var(--color-surface)] transition-colors"
              >Política de Privacidad
              </Link>
              
              <Link to="/terms"
                className="text-[var(--color-surface)]/60 hover:text-[var(--color-surface)] transition-colors"
              >Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

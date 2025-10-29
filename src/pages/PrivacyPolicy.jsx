import { Shield, Lock, Eye, FileText, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: FileText,
      title: "1. Información que Recopilamos",
      content: [
        "Información de contacto: nombre, número de teléfono, dirección de entrega",
        "Medidas personalizadas: número de pie, ancho del pie, altura de empeine",
        "Preferencias de diseño: modelos seleccionados, combinaciones personalizadas, altura de tacón",
        "Información de comunicación: conversaciones a través de WhatsApp para coordinar pedidos",
        "Datos de entrega: dirección completa para entregas a domicilio por costo adicional",
      ],
    },
    {
      icon: Lock,
      title: "2. Uso de la Información",
      content: [
        "Confección de calzado personalizado según sus especificaciones exactas",
        "Coordinación de citas para toma de medidas y pruebas",
        "Comunicación sobre el progreso de su pedido",
        "Organización de entregas a domicilio",
        "Seguimiento post-venta y garantía de satisfacción",
        "Mejora de nuestros servicios de personalización",
      ],
    },
    {
      icon: Shield,
      title: "3. Protección de Datos",
      content: [
        "Sus datos personales y medidas son almacenados de forma segura y confidencial",
        "No compartimos su información con terceros sin su consentimiento explícito",
        "Las conversaciones de WhatsApp son privadas y solo accesibles por nuestro equipo",
        "Sus medidas personalizadas se guardan únicamente para futuros pedidos con su autorización",
        "Implementamos medidas de seguridad para proteger su información personal",
      ],
    },
    {
      icon: Eye,
      title: "4. Derechos del Cliente",
      content: [
        "Derecho a acceder a toda la información que tenemos sobre usted",
        "Derecho a solicitar corrección de datos incorrectos o desactualizados",
        "Derecho a solicitar la eliminación de sus datos personales",
        "Derecho a retirar el consentimiento para el uso de sus datos en cualquier momento",
        "Derecho a recibir una copia de sus medidas y especificaciones de diseño",
      ],
    },
    {
      icon: Phone,
      title: "5. Comunicaciones",
      content: [
        "Utilizamos WhatsApp como canal principal de comunicación",
        "Solo le contactaremos para asuntos relacionados con sus pedidos",
        "Puede solicitar no recibir comunicaciones promocionales en cualquier momento",
        "Respetamos su privacidad y no enviamos mensajes no solicitados",
        "Todas las comunicaciones son profesionales y relacionadas con nuestros servicios",
      ],
    },
    {
      icon: MapPin,
      title: "6. Entregas a Domicilio",
      content: [
        "Su dirección de entrega se utiliza exclusivamente para envíos de pedidos",
        "No compartimos su dirección con servicios de mensajería sin su conocimiento",
        "Puede solicitar entrega en dirección alternativa en cualquier momento",
        "Guardamos su dirección solo si autoriza entregas futuras",
        "Puede solicitar la eliminación de su dirección de nuestros registros",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white flex flex-col">
      {/* Header */}
      <header className="bg-[#2C1810] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-[#D4A574]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Política de Privacidad</h1>
          <p className="text-[#D4A574] text-lg">Alex Suarez - Zapatería Artesanal</p>
          <p className="text-gray-300 mt-2">Última actualización: Enero 2025</p>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 max-w-4xl mx-auto px-4 py-12">
        {/* Introducción */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#D4A574]/20">
          <p className="text-gray-700 leading-relaxed text-lg">
            En <span className="font-semibold text-[#2C1810]">Alex Suarez Zapatería Artesanal</span>, valoramos
            profundamente su privacidad y la confianza que deposita en nosotros al compartir sus datos personales y
            medidas para la confección de su calzado personalizado. Esta política explica cómo recopilamos, usamos y
            protegemos su información.
          </p>
        </div>

        {/* Secciones */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border border-[#D4A574]/20 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#D4A574]/10 p-3 rounded-xl">
                  <section.icon className="w-6 h-6 text-[#2C1810]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C1810] flex-1">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[#D4A574] mt-1.5 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Contacto */}
        <div className="bg-gradient-to-r from-[#2C1810] to-[#4A2818] rounded-2xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Phone className="w-6 h-6 text-[#D4A574]" />
            Contacto sobre Privacidad
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos sobre sus datos
            personales, puede contactarnos a través de:
          </p>
          <div className="space-y-2 text-[#D4A574]">
            <p className="font-semibold">WhatsApp: +(53) 59419319</p>
            <p className="font-semibold">
              Dirección: Avenida 27, Edificio 340 Apto3 - Entre Calle 76 y 78, San José de las Lajas, Mayabeque, Cuba
            </p>
          </div>
        </div>

        {/* Nota final */}
        <footer className="mt-8 p-6 bg-[#D4A574]/10 rounded-xl border border-[#D4A574]/30">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio será notificado a
            través de nuestros canales de comunicación habituales.
          </p>
        </footer>
      </section>
    </main>
  );
}

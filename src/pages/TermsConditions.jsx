import { FileCheck, Package, RefreshCw, Ruler, Clock, AlertCircle, CheckCircle, Truck } from "lucide-react"

const TermsConditions = () => {
  const sections = [
    {
      icon: FileCheck,
      title: "1. Aceptación de Términos",
      content: [
        "Al realizar un pedido con Alex Suarez Zapatería Artesanal, usted acepta estos términos y condiciones",
        "Estos términos aplican a todos los servicios: calzado nuevo, personalización, remontes y reparaciones",
        "Nos reservamos el derecho de modificar estos términos con previo aviso",
        "Es responsabilidad del cliente leer y comprender estos términos antes de realizar un pedido",
      ],
    },
    {
      icon: Ruler,
      title: "2. Proceso de Personalización",
      content: [
        "Cada calzado es confeccionado artesanalmente según las especificaciones del cliente",
        "El cliente puede combinar partes delanteras y traseras de diferentes modelos",
        "Ofrecemos tres alturas de tacón: bajo (3-5cm), medio (5-8cm) y alto (8-12cm)",
        "Las medidas se toman personalmente en nuestro taller para garantizar el ajuste perfecto",
        "Una vez confirmado el diseño y medidas, no se aceptan cambios en el pedido",
        "El cliente debe aprobar el diseño final antes de iniciar la confección",
      ],
    },
    {
      icon: Clock,
      title: "3. Tiempos de Entrega",
      content: [
        "Calzado nuevo personalizado: 15-20 días hábiles desde la confirmación del pedido",
        "Remontes y reparaciones: 7-10 días hábiles según complejidad",
        "Los tiempos pueden variar según la complejidad del diseño y disponibilidad de materiales",
        "Notificaremos cualquier retraso con anticipación",
        "Los pedidos urgentes pueden tener costo adicional (consultar disponibilidad)",
      ],
    },
    {
      icon: Package,
      title: "4. Pagos y Precios",
      content: [
        "Se requiere un anticipo del 50% al confirmar el pedido",
        "El saldo restante se paga al momento de la entrega",
        "Los precios incluyen: diseño, materiales, confección y una prueba de ajuste",
        "Las entregas a domicilio tienen un costo adicional según la distancia",
        "Aceptamos pagos en efectivo, nada de transferencia bancaria o pago móvil",
        "Los precios están sujetos a cambios según disponibilidad de materiales",
      ],
    },
    {
      icon: CheckCircle,
      title: "5. Garantía de Calidad",
      content: [
        "Garantizamos la calidad artesanal de cada par de zapatos",
        "Ofrecemos ajustes gratuitos dentro de los primeros 15 días",
        "Garantía contra defectos de fabricación",
        "La garantía no cubre desgaste normal por uso",
        "Reparaciones post-garantía disponibles con costo adicional",
        "Cada par incluye una prueba de ajuste antes de la entrega final",
      ],
    },
    {
      icon: RefreshCw,
      title: "6. Cambios y Devoluciones",
      content: [
        "Debido a la naturaleza personalizada, no aceptamos devoluciones por cambio de opinión",
        "Si el calzado no ajusta correctamente, realizamos modificaciones sin costo",
        "En caso de defecto de fabricación, reparamos o reemplazamos el producto",
        "El cliente debe reportar cualquier problema dentro de las primeras 48 horas",
        "No se aceptan devoluciones después de usar el calzado en exteriores",
        "Los ajustes de confort están incluidos en el precio original",
      ],
    },
    {
      icon: Truck,
      title: "7. Entregas a Domicilio",
      content: [
        "Realizamos entregas en toda la ciudad y zonas cercanas",
        "El costo de entrega varía según la distancia (consultar al momento del pedido)",
        "Coordinamos día y hora de entrega por WhatsApp",
        "El cliente debe estar presente para recibir y probar el calzado",
        "Si no hay nadie en la dirección, se reagenda la entrega (puede tener costo adicional)",
        "También puede recoger su pedido en nuestro taller sin costo adicional",
      ],
    },
    {
      icon: AlertCircle,
      title: "8. Responsabilidades del Cliente",
      content: [
        "Proporcionar medidas exactas y honestas de sus pies",
        "Asistir a las citas programadas para toma de medidas y pruebas",
        "Comunicar cualquier condición especial del pie (juanetes, dedos sensibles, etc.)",
        "Aprobar el diseño final antes de iniciar la confección",
        "Realizar los pagos en las fechas acordadas",
        "Mantener comunicación activa durante el proceso de confección",
        "Probar el calzado inmediatamente al recibirlo y reportar cualquier problema",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white">
      {/* Header */}
      <div className="bg-[#2C1810] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <FileCheck className="w-12 h-12 text-[#D4A574]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Términos y Condiciones</h1>
          <p className="text-center text-[#D4A574] text-lg">Alex Suarez - Zapatería Artesanal</p>
          <p className="text-center text-gray-300 mt-2">Última actualización: Enero 2025</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#D4A574]/20">
          <p className="text-gray-700 leading-relaxed text-lg">
            Bienvenido a <span className="font-semibold text-[#2C1810]">Alex Suarez Zapatería Artesanal</span>. Estos
            términos y condiciones establecen las reglas y regulaciones para el uso de nuestros servicios de confección
            artesanal de calzado personalizado para mujer. Al realizar un pedido, usted acepta cumplir con estos
            términos.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
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
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-[#D4A574] to-[#C4956A] rounded-2xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6" />
            Aviso Importante
          </h2>
          <p className="leading-relaxed mb-4">
            Cada par de zapatos es una obra artesanal única, confeccionada específicamente para usted. Por esta razón,
            es fundamental que:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Revise cuidadosamente el diseño antes de confirmar</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Proporcione medidas exactas de sus pies</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Asista a las pruebas programadas</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Comunique cualquier inquietud durante el proceso</span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#2C1810] to-[#4A2818] rounded-2xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">¿Preguntas sobre estos Términos?</h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            Si tiene alguna pregunta sobre estos términos y condiciones, no dude en contactarnos:
          </p>
          <div className="space-y-2 text-[#D4A574]">
            <p className="font-semibold">WhatsApp: +(53) 59419319</p>
            <p className="font-semibold">Dirección:Avenida 27, Edificio 340 Apto3 - Entre Calle 76 y 78, San José de las Lajas, Mayabeque, Cuba</p>
            <p className="font-semibold">Horario: en nuetra página principal</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-6 bg-[#D4A574]/10 rounded-xl border border-[#D4A574]/30">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Al realizar un pedido con Alex Suarez Zapatería Artesanal, usted confirma que ha leído, entendido y aceptado
            estos términos y condiciones en su totalidad.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions

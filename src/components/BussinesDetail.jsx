// src/components/BussinesDetail.jsx

const BussinesDetail = {
  // ================== Datos de contacto ==================
  contact: {
    whatsappNumbers: [{ number: "59387402", number2: "59387402" }],
    address:
      "Avenida 27, Edificio 340 Apto3 - Entre Calle 76 y 78, San José de las Lajas, Mayabeque, Cuba",
    whatsappMessage: "Hola! Quiero diseñar mi calzado personalizado.",
    wspInfo: "Quiero información sobre cómo personalizar mi calzado",
    wspDefault:
      "Hola quiero ordenar un par de Zapatos con ustedes, he visto los modelos y ya se que pedir, ayúdenme",
  },

  // ================== Horario ==================
  schedule: [
    { day: "Lunes - Viernes", hours: "8:00 AM - 8:00 PM" },
    { day: "Sábados - Domingos", hours: "10:00 AM - 4:00 PM" },
  ],

  // ================== Categorías UI ==================
  categories: [
    { id: "modelos", label: "Calzado Nuevo" },
    { id: "remontes", label: "Remontes" },
    // { id: "promociones", label: "Personalización" },
  ],

  // ================== Precios de referencia UI ==================
  pricingData: {
    modelos: [
      {
        name: "Tacones",
        price: "Desde $3000 a $4000",
        description: "Diseño tradicional con materiales premium",
        features: [
          "Selección de colores y material",
          "Medidas personalizadas",
          "3 opciones de tacón",
          "Entrega a domicilio",
        ],
        popular: false,
      },
      {
        name: "Sandalias",
        price: "Desde $2000 a $3000",
        description: "Combina estilos y crea tu diseño único",
        features: [
          "Combina partes de diferentes modelos",
          "Selección de colores",
          "Detalles personalizados",
          "Suela plana y cómoda",
        ],
        popular: false,
      },
    ],
    remontes: [
      {
        name: "Remonte Básico",
        price: "Desde $3000 a $5000",
        description: "Renovación de parte superior",
        features: [
          "Sin cambio de suela",
          "Renovación de parte superior",
          "Limpieza profunda",
          "Revisión general",
          "Revestimiento de plataformas",
        ],
        popular: true,
      },
      {
        name: "Suelas y Plantillas",
        price: "$1500",
        description: "Restauración integral de tu calzado",
        features: ["Cambio de suela", "Cambio de plantilla"],
        popular: false,
      },
    ],
  },

  // ================== 📦 Reglas globales (¡aquí movimos todo!) ==================
  rules: {
    BASE_PRICE: 2000,
    EXCEPTIONS_BASE_2500: [8, 10, 14, 21, 26, 46, 13, 16],

    TYPE_SURCHARGE: { bajo: 1000, medio: 1000, alto: 1500, sandalias: 0 },
    MATERIAL_SURCHARGE: { "Tela Durazno": 0, Charol: 500 },

    // Bloqueos por modelo (listas ampliables):
    CHAROL_BLOCKED: [2, 4, 10, 11, 19, 21, 22, 26, 31, 32, 43, 44, 46, 47, 50],
    TIPO_BAJO_BLOCKED: [7],
    TIPO_MEDIO_BLOCKED: [7],
    TIPO_ALTO_BLOCKED: [7],
    SANDALIAS_BLOCKED: [],

    // Estados de catálogo:
    UNAVAILABLE: [33],
    NEW: [2, 23, 30, 24, 25],
  },
};

export default BussinesDetail;

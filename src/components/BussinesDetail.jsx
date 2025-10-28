// src/data/BussinesDetail.js

const BussinesDetail = {
  // Datos de contacto
  contact: {
    whatsappNumbers: [ { number: "59419319", number2: "59419319" }],
    address:"Avenida 27, Edificio 340 Apto3 - Entre Calle 76 y 78, San José de las Lajas, Mayabeque, Cuba",
    whatsappMessage: "Hola! Quiero diseñar mi calzado personalizado.",
    wspInfo: "Quiero información sobre cómo personalizar mi calzado",
    wspDefault: "Hola quiero ordenar un par de Zapatos con ustedes, he visto los modelos y ya se que pedir, ayúdenme"
  },
  

  // Horario de atención
  schedule: [
    { day: "Lunes - Viernes", hours: "8:00 AM - 8:00 PM" },
    { day: "Sábados - Domingos", hours: "10:00 AM - 4:00 PM" },
  ],

  // Categorías visibles en la UI
  categories: [
    { id: "modelos", label: "Calzado Nuevo" },
    { id: "remontes", label: "Remontes" },
    // { id: "promociones", label: "Personalización" },
  ],

  // Tabla de precios / planes por categoría
  pricingData: {
    modelos: [
      {
        name: "Tacones",
        price: "Desde $3000 a $3500",
        description: "Diseño tradicional con materiales premium",
        features: [
          "Selección de colores",
          "Medidas personalizadas",
          "3 opciones de tacón",
          "Entrega a domicilio",
        ],
        popular: false,
      },
      {
        name: "Sandalias",
        price: "Desde $2000 a $2500",
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
        price: "Desde $3000 a $3500",
        description: "Renovación de parte superior",
        features: [
          "Sin cambio de suela",
          "Renovación de parte superior",
          "Limpieza profunda",
          "Revisión general",
        ],
        popular: true,
      },
      {
        name: "Suelas y Plantillas",
        price: "$1500",
        description: "Restauración integral de tu calzado",
        features: [
          "Cambio de suela",
          "Renovación de tacón",
          "Reparación de costuras",
          "Pegado",
          "Pulido y acabado",
        ],
        popular: false,
      },
    ],
    /*promociones: [
      {
        name: "Tacones por cantidad",
        price: "-$300 c/u",
        description: "Rebajas a partir de 5 encargos en adelante",
        features: ["No aceptamos transferencias"],
        popular: false,
      },
      {
        name: "Sandalias por cantidad",
        price: "-$500 c/u",
        description: "Rebajas a partir de 10 encargos en adelante",
        features: [
          "Parte delantera personalizada",
          "Parte trasera personalizada",
          "Asesoría de diseño",
        ],
        popular: true,
      },
    ],*/
  },
};

export default BussinesDetail;

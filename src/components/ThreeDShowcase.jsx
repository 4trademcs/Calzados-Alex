"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, Palette, Layers, MousePointer2, Sparkles, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom";

const ThreeDShowcase = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const features = [
    {
      icon: Eye,
      title: "Vista 360°",
      description: "Rota y examina cada detalle desde cualquier ángulo",
    },
    {
      icon: Palette,
      title: "Modelos en Tiempo Real",
      description: "Cambia de modelo instantáneamente y visualiza tu elección",
    },
    {
      icon: Layers,
      title: "Materiales y Suelas",
      description: "Recuerda que puedes combirar partes de diferentes modelos, conversemos por Whatsapp y exploremos tu idea",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-[#F5F1E8] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header con badge de innovación */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B6F47] to-[#A0826D] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">EXCLUSIVO EN CALZADOS ALEX SUAREZ</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2416] mb-6 leading-tight">
            Visualiza Tu Calzado en <span className="text-[#8B6F47]">3D</span>
          </h2>

          <p className="text-lg text-[#5C4A3A] max-w-3xl mx-auto leading-relaxed">
            Somos la primera zapatería artesanal que integra tecnología 3D para que "veas" tu calzado. Una
            experiencia única que combina tradición artesanal con innovación digital.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-lg border border-[#E5DCC9] transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#8B6F47] to-[#A0826D] rounded-xl flex items-center justify-center mb-4 shadow-md">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2416] mb-2">{feature.title}</h3>
              <p className="text-[#5C4A3A] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Demo Images Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image 1 - 3D Rotation Demo */}
          <div
            className={`relative group transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
              <img
                src="/3d.webp"
                alt="Visualización 3D de sandalia con selector de colores"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Floating indicator */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <MousePointer2 className="w-4 h-4 text-[#8B6F47] animate-pulse" />
                <span className="text-sm font-medium text-[#2C2416]">Rota 360°</span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C2416] to-transparent p-6">
                <p className="text-white font-semibold text-lg">Rotación Interactiva</p>
                <p className="text-white/80 text-sm">Examina cada detalle desde cualquier ángulo</p>
              </div>
            </div>
          </div>

          {/* Image 2 - Material & Sole Selection */}
          <div
            className={`relative group transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
              <img
                src="/3d2.webp"
                alt="Selector de materiales y tipos de suela en 3D"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Floating indicator */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8B6F47] animate-pulse" />
                <span className="text-sm font-medium text-[#2C2416]">Personalizar</span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C2416] to-transparent p-6">
                <p className="text-white font-semibold text-lg">Materiales y Suelas</p>
                <p className="text-white/80 text-sm">Visualiza en tiempo real</p>
              </div>
            </div>
          </div>
        </div>

        {/* Innovation Statement */}
        <div className={`bg-[#8B6F47] rounded-2xl text-center shadow-2xl transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} >
          <div className="grid md:grid-cols-2 gap-8 items-center mx-auto">
            <img src="/3d3.webp" alt="tutorial visual" className=" pt-8 relative drop-shadow-2xl m-auto" />
            <div className="p-8 sm:p-12">
              <div className="inline-flex mx-auto items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-3xl md:text-3xl font-bold text-white mb-4">Una Innovación Sin Precedentes</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Ninguna otra zapatería artesanal ofrece esta tecnología. Hemos unido décadas de experiencia en calzado
                hecho a mano con las herramientas digitales más avanzadas, permitiéndote ver con confianza
                antes de que comencemos a crear tu calzado único sepas como es el resultado final.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/model?model=default&tipo=Tacón+medio&color=Negro&material=Tela+Durazno"
              className="max-w-xs m-auto mb-8 inline-flex items-center justify-center gap-2 bg-white text-[#8B6F47] px-8 py-4 rounded-full font-semibold hover:bg-[#F5F1E8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explorar Modelos 3D
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThreeDShowcase

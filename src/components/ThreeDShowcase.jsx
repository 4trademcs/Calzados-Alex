"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, Palette, Layers, MousePointer2, Sparkles, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom";
import InfiniteSlider from "./InfiniteSlider";

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
          <div className=" items-center text-[#5C4A3A] flex flex-col gap-2 px-6 py-2 mb-6 ">
            <Sparkles size={55} className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide ">EXCLUSIVO EN CALZADOS ALEX SUÁREZ</span>
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
              <div className="w-14 h-14 rounded-xl bg-[#8B6F47] flex items-center justify-center mb-4 shadow-md">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2416] mb-2">{feature.title}</h3>
              <p className="text-[#5C4A3A] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <InfiniteSlider/>

        {/* Innovation Statement */}
        <div className={`bg-[#8B6F47] rounded-2xl text-center shadow-2xl transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center mx-auto">
            <img src="/3d3.webp" alt="tutorial visual" className="p-2 pt-8 relative drop-shadow-2xl m-auto" />
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

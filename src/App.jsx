import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import CustomizationShowcase from "./components/CustomizationShowcase"
import Process from "./components/Process"
import Gallery from "./components/Gallery"
import Pricing from "./components/Pricing"
import Location from "./components/Location"
import Footer from "./components/Footer"
import ScrollIndicator from "./components/ScrollIndicator"
import Loader from "./components/Loader"
import Products from "./pages/Products";

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="relative">
      {/* <ScrollIndicator /> */}
      <Navbar />
      <Hero />
      <Features />
      <CustomizationShowcase />
      <Process />
      <Gallery />
      <Pricing />
      <Location />
      <Footer />
    </div>
  )
}
